/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import './defaults';
import Editor from './litegraph-editor';
import { SampleContext } from '../jsrisk';

import '../nodes/Distributions';
import '../nodes/ShowSample';
import '../nodes/Histogram';
import '../nodes/Statistics';
import '../nodes/Sensitivity';
import '../nodes/SimulationCounter';
import '../nodes/Operators';
import '../nodes/utils';

import '../styles/litegraph-editor.css';
import '../styles/style.css';

const editor = new Editor('main', { miniwindow: false, skipLivemode: true, skipMaximize: true });

function updateEditorHiPPICanvas() {
  const ratio = window.devicePixelRatio;
  if (ratio === 1) {
    return;
  }
  const rect = editor.canvas.parentNode.getBoundingClientRect();
  const { width, height } = rect;
  editor.canvas.width = width * ratio;
  editor.canvas.height = height * ratio;
  editor.canvas.style.width = width + 'px';
  editor.canvas.style.height = height + 'px';
  editor.canvas.getContext('2d').scale(ratio, ratio);
}

window.graphcanvas = editor.graphcanvas;
window.graph = editor.graph;

window._ctx = null;

window.graph.onPlayEvent = function () {
  window._ctx = new SampleContext();
};

window.graph.onAfterStep = function () {
  window._ctx.clear();
};

updateEditorHiPPICanvas();

window.addEventListener('resize', function () {
  editor.graphcanvas.resize();
  updateEditorHiPPICanvas();
});

var elem = document.createElement('span');
elem.id = 'LGEditorTopBarSelector';
elem.className = 'selector';
elem.innerHTML = '';
elem.innerHTML +=
  '<button class="btn" id="load">Load</button><button class="btn" id="download">Save</button><input type="file" id="sceneInput" style="display:none;" accept=".riskscene">';
editor.tools.appendChild(elem);

elem.querySelector('#download').addEventListener('click', function () {
  var data = JSON.stringify(window.graph.serialize());
  var file = new Blob([data]).stream();
  var compressedResp = new Response(file.pipeThrough(new CompressionStream('gzip')));
  compressedResp.blob().then((cdata) => {
    var url = URL.createObjectURL(cdata);
    var element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', 'sim.riskscene');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000 * 60); //wait one minute to revoke url
  });
});

// By ChatGPT
document.getElementById('load').addEventListener('click', function () {
  const fileInput = document.getElementById('sceneInput');
  fileInput.click(); // Programmatically open the file dialog
});

document.getElementById('sceneInput').addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        var decResp = new Response(
          new Blob([event.target.result]).stream().pipeThrough(new DecompressionStream('gzip'))
        );
        decResp
          .blob()
          .then((jsonData) => {
            return jsonData.text();
          })
          .then((jsonStr) => {
            const jsonObj = JSON.parse(jsonStr);
            editor.graph.configure(jsonObj);
          });
      } catch (error) {
        alert('Error parsing scene!');
        console.error('Error parsing scene:', error);
      }
    };
    reader.onerror = function () {
      alert('Failed to read file!');
      console.error('An error occurred reading the file:', reader.error);
    };
    reader.readAsArrayBuffer(file);
  }
});
