// Global variables:
var editor;
var output;

// Utility method for making HTTP GET requests:
function request(url, callback) {
  var req = new XMLHttpRequest();
  req.addEventListener('load', callback);
  req.open('GET', url);
  req.send();
}

function tryRender(input) {
  var endpoint = '/render/svg?uml=' + encodeURIComponent(input);
  request(endpoint, function() {
    output.innerHTML = this.responseText;
  });
}

// Initializes the text editor by adding
// a throttled "keyup" event listener:
function initEditor() {
  var editor = document.querySelector('#editor textarea');
  var timeout = null;

  editor.addEventListener('keyup', function(e) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      tryRender(editor.value);
    }, 1000);
  });

  return editor;
}

// Initializes a reference to the output div:
function initOutput() {
  return document.querySelector('#output div');
}

// Application entrypoint:
function main() {
  editor = initEditor();
  output = initOutput();
}

main();
