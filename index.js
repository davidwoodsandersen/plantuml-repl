const path = require('path');
const fs = require('fs');
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

const html = fs.readFileSync(path.resolve(__dirname, './public/index.html')).toString('utf8');

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(`Server failed to start: ${err}`);
  }
  console.log(`Server running: go to http://localhost:${PORT}`);
});
