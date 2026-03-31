const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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
          <img src="/images/logo.png" alt="Logo" class="logo" />
          <h1>Hello, ${name}!</h1>
          <p>Greetings from ${city}</p>
          <a href="/">Back Home</a>
        </div>
      </body>
    </html>
  `);
});

// Calculator route
// Example: http://localhost:3000/calculator?a=10&b=5&op=add
app.get('/calculator', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  const op = req.query.op;

  let result;
  let symbol;

  if (isNaN(a) || isNaN(b)) {
    result = 'Please enter valid numbers';
    symbol = '';
  } else {
    switch(op) {
      case 'add':      result = a + b; symbol = '+'; break;
      case 'subtract': result = a - b; symbol = '-'; break;
      case 'multiply': result = a * b; symbol = '×'; break;
      case 'divide':   result = b !== 0 ? a / b : 'Cannot divide by zero'; symbol = '÷'; break;
      default:         result = 'Please select an operation'; symbol = '?';
    }
  }

  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="card">
          <img src="/images/logo.png" alt="Logo" class="logo" />
          <h1>Calculator</h1>
          <p class="result-line">${a} ${symbol} ${b} = <strong>${result}</strong></p>
          <a href="/calculator.html">← Calculate again</a>
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});