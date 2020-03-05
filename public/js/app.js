// Global variables:
var editor;
var output;
var buttons;

// Utility method for making HTTP GET requests:
function request(url, callback) {
  var req = new XMLHttpRequest();
  req.addEventListener('load', callback);
  req.open('GET', url);
  req.send();
}

// Insert the result of the render request
// into the output div:
function tryRender() {
  setOutput('<p>Rendering...</p>');
  var endpoint = '/render/svg?uml=' + encodeURIComponent(editor.value);
  request(endpoint, function() {
    setOutput(this.responseText);
  });
}

// Utility method for setting output HTML:
function setOutput(html) {
  output.innerHTML = html;
}

// Initializes the text editor by adding
// a throttled "keyup" event listener:
function initEditor() {
  return document.querySelector('#editor textarea');
}

// Initializes a reference to the output div:
function initOutput() {
  return document.querySelector('#output div');
}

// Initializes button elements:
function initButtons() {
  var render = document.querySelector('#render');
  var getSvg = document.querySelector('#svg');
  var getPng = document.querySelector('#png');

  render.addEventListener('click', tryRender);
  getSvg.addEventListener('click', function() {
    window.open('/render/svg?uml=' + encodeURIComponent(editor.value));
  });
  getPng.addEventListener('click', function() {
    window.open('/render/png?uml=' + encodeURIComponent(editor.value));
  });

  return {
    render: render,
    getSvg: getSvg,
    getPng: getPng
  };
}

// Application entrypoint:
function main() {
  editor = initEditor();
  output = initOutput();
  buttons = initButtons();
}

main();
