/**
 * Created by axetroy on 16-12-13.
 */


function insert(callback) {
  let head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script');
  script.id = 'chromeWatchDog';
  script.type = 'text/javascript';
  script.src = chrome.extension.getURL('parser.bundle.js');

  script.onload = function () {
    callback(script);
  };

  setTimeout(function () {
    head.appendChild(script);
  }, 100);
}

function parser(script) {
  let appRaw = script.getAttribute('app');
  let app = {};
  try {
    app = JSON.parse(appRaw);
  } catch (err) {

  }
  return app;
}

function init() {
  insert(function (script) {
    let app = parser(script);
    chrome.runtime.sendMessage({action: 'CONTENT:PARSE', data: app});
  })
}

init();