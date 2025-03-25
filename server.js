const http = require('http')
const { PORT } = require('./config')
const { requestRouting } = require('./routing/routing')

// 🏗 Tutaj, stwórz funkcję 'requestListener, która przekazuje 'request' i 'response' do 'requestRouting'.
const requestListener = (request, response) => {
  requestRouting(request, response)
}
// 🏗 Tutaj, stwóz serwer Node.js. Pamiętaj przypisać go do stałej i przekazać mu 'requestListener'.
const server = http.createServer(requestListener)
// 🏗 Uruchom serwer na porcie PORT.
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
