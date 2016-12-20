/**
 * Created by axetroy on 16-12-13.
 */

import Q from 'q';
import co from 'co';

function insert() {
  let head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script');
  script.id = 'chromeWatchDog';
  script.type = 'text/javascript';
  script.src = chrome.extension.getURL('parser.bundle.js');

  let deferred = Q.defer();

  script.addEventListener('ready', function (event) {
    deferred.resolve(script);
  });

  setTimeout(function () {
    head.appendChild(script);
  }, 100);

  return deferred.promise;
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
  co(function *() {
    let script = yield insert();
    let app = parser(script);
    chrome.runtime.sendMessage({action: 'CONTENT:PARSE', data: app});
  }).catch(function () {
    console.error(err);
  });
}

init();