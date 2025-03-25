// 📦 Zaimportuj moduł odpowiedzialne za routing poszczególnych części aplikacji.
// 📦 Zaimportuj obiekt STATUS_CODE.
const homeRouting = require('./home.js')
const productRouting = require('./product.js')
const logoutRouting = require('./logout.js')
const { STATUS_CODE } = require('../constants/statusCode.js')

// 🏗 Stwórz tutaj funkcję 'requestRouting', która będzie obsługiwać zapytania HTTP.
const requestRouting = (request, response) => {
  const { url, method } = request
  const date = new Date().toISOString()

  console.log(`INFO [${date}]: ${method} – ${url}`)

  if (url === '/') {
    return homeRouting(request, response)
  } else if (url.startsWith('/product')) {
    return productRouting(request, response)
  } else if (url === '/logout') {
    return logoutRouting(request, response)
  } else if (url === '/kill') {
    console.log(
      `PROCESS [${date}]: logout has been initiated and the application will be closed`
    )
    process.exit()
  } else {
    console.log(`ERROR [${date}]: requested url ${url} doesn’t exist.`)
    response.setHeader('Content-Type', 'text/html')
    response.end('<h1>404 Not Found</h1>')
  }
}

module.exports = { requestRouting }
