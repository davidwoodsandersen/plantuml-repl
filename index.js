const path = require('path');
const fs = require('fs');
const express = require('express');
const plantuml = require('node-plantuml');

const PORT = process.env.PORT || 3000;
const app = express();

const html = fs.readFileSync(path.resolve(__dirname, './public/index.html')).toString('utf8');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

app.get('/render/:format', (req, res) => {
  const format = req.params.format;
  const input = decodeURIComponent(req.query.uml);

  console.log(`Rendering as ${format.toUpperCase()}: ${input}`);

  res.setHeader('Content-Type', format == 'svg' ? 'image/svg+xml' : 'image/png');

  try {
    const rendered = plantuml.generate(input, { format: format }, function(err) {
      if (err) throw new Error(err);
    });

    rendered.out.pipe(res);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.toString());
  }
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(`Server failed to start: ${err}`);
  }
  console.log(`Server running: go to http://localhost:${PORT}`);
});
