// Global variables:
var editor;
var output;
var buttons;

// Utility method for making HTTP POST requests:
function request(url, body, callback) {
  var req = new XMLHttpRequest();
  req.addEventListener('load', callback);
  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(body));
}

// Insert the result of the render request
// into the output div:
function tryRender() {
  setOutput('<p>Rendering...</p>');
  var endpoint = '/render/svg';
  request(endpoint, { uml: encodeURIComponent(editor.value) }, function() {
    setOutput(this.responseText);
  });
}

// Utility method for setting output:
function setOutput(data) {
  output.innerHTML = data;
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

// Initializes button element:
function initButton() {
  var render = document.getElementById('render');

  render.addEventListener('click', tryRender);

  return render;
}

// Application entrypoint:
function main() {
  editor = initEditor();
  output = initOutput();
  button = initButton();
}

main();
