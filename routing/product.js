// 📦 Zaimportuj moduły 'fs' oraz 'STATUS_CODE' do obsługi produktów.
const fileSystem = require('fs')
const { STATUS_CODE } = require('../constants/statusCode.js')

const renderAddProductPage = (response) => {
  response.setHeader('Content-Type', 'text/html')
  response.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Add Product</title>
        </head>
        <body>
            <h1>Add Product</h1>
            <form action="/product/add" method="POST">
                <label for="product">Product Name:</label>
                <input type="text" id="product" name="product" required>
                <button type="submit">Add</button>
            </form>
        </body>
        </html>
    `)
}

const renderNewProductPage = (response) => {
  fileSystem.readFile('product.txt', 'utf-8', (err, data) => {
    if (err || !data.trim()) {
      console.error('Error reading product file or file is empty:', err)
      response.setHeader('Content-Type', 'text/html')
      return response.end(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Newest Product</title>
                </head>
                <body>
                    <h1>Newest Product</h1>
                    <p>No products available.</p>
                </body>
                </html>
            `)
    }

    const products = data.trim().split('\n')
    const newestProduct = products[products.length - 1]

    response.setHeader('Content-Type', 'text/html')
    response.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Newest Product</title>
            </head>
            <body>
                <h1>Newest Product</h1>
                <p>Latest added product: <strong>${newestProduct}</strong></p>
            </body>
            </html>
        `)
  })
}

const addNewProduct = (request, response) => {
  let body = ''

  request.on('data', (chunk) => {
    body += chunk.toString()
  })

  request.on('end', () => {
    const productName = new URLSearchParams(body).get('product')

    if (productName) {
      fileSystem.appendFile('product.txt', productName + '\n', (err) => {
        if (err) {
          console.error('Error saving product:', err)
          response.setHeader(STATUS_CODE.NOT_FOUND, {
            'Content-Type': 'text/html',
          })
          return response.end('<h1>500 Internal Server Error</h1>')
        }
        console.log(`New product added: ${productName}`)
        response.setHeader(STATUS_CODE.FOUND, { Location: '/product/new' })
        response.end()
      })
    } else {
      response.setHeader('Content-Type', 'text/html')
      response.end('<h1>400 Bad Request</h1>')
    }
  })
}

const productRouting = (request, response) => {
  const { url, method } = request

  if (url === '/product/add' && method === 'GET') {
    return renderAddProductPage(response)
  } else if (url === '/product/add' && method === 'POST') {
    return addNewProduct(request, response)
  } else if (url === '/product/new') {
    return renderNewProductPage(response)
  } else {
    console.log(`ERROR: requested url ${url} doesn’t exist.`)
    response.setHeader('Content-Type', 'text/html')
    response.end('<h1>404 Not Found</h1>')
  }
}

module.exports = productRouting
