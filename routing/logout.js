// 🏗 Stwórz funkcję 'logoutRouting', która obsłuży stronę wylogowania.
const logoutRouting = (method, response) => {
  response.setHeader('Content-Type', 'text/html')
  response.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shop – Logout</title>
        </head>
        <body>
            <h1>Logout</h1>
            <nav>
                <a href="/">Home</a> |
                <a href="/kill">Logout from application</a>
            </nav>
        </body>
        </html>
    `)
}

module.exports = logoutRouting

// Podpowiedź: response.setHeader("Content-Type", "text/html");
// 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
// Podpowiedź: return response.end();

// 🔧 Wyeksportuj funkcję 'logoutRouting', aby inne moduł mogły jej używać.
