/**
 * Created by axetroy on 16-12-13.
 */

let head = document.getElementsByTagName('head')[0];

function insert() {
  let script = document.createElement('script');
  script.id = 'chromeWatchDog';
  script.type = 'text/javascript';
  script.src = chrome.extension.getURL('parser.bundle.js');
  head.appendChild(script);

  script.onload = function () {
    let appRaw = script.getAttribute('app');
    let app = {};
    try {
      app = JSON.parse(appRaw);
    } catch (err) {

    }
    chrome.runtime.sendMessage({action: 'PARSE', data: app});
  };

}

if (head) {
  insert();
} else {

}