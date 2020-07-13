const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const plantuml = require('node-plantuml');

const PORT = process.env.PORT || 3000;
const app = express();

const html = fs.readFileSync(path.resolve(__dirname, './public/index.html')).toString('utf8');

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

app.post('/render/svg', (req, res) => {
  const input = decodeURIComponent(req.body.uml);

  console.log(`Rendering as SVG: ${input}`);

  res.setHeader('Content-Type', 'image/svg+xml');

  try {
    const options = {
      format: 'svg',
      config: 'monochrome'
    };
    const rendered = plantuml.generate(input, options, function(err) {
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
