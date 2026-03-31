const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, images) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Dynamic route with query parameters
// Example: http://localhost:3000/greet?name=Sagi&city=TelAviv
app.get('/greet', (req, res) => {
  const name = req.query.name || 'Stranger';
  const city = req.query.city || 'Somewhere';
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="card">
          <h1>Hello, ${name}!</h1>
          <p>Greetings from ${city} 👋</p>
          <a href="/">← Back Home</a>
        </div>
      </body>
    </html>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
