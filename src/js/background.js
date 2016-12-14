import _ from 'underscore';

import headersParser from './lib/headers-parser';

function log(obj) {
  if (_.isObject(obj)) {
    alert(JSON.stringify(obj, null, 2));
  } else {
    alert(obj);
  }
}

const tabInfo = window.tabInfo = {};

// collect apps from header information:
chrome.webRequest.onHeadersReceived.addListener(function (details) {
  tabInfo[details.tabId] = tabInfo[details.tabId] || {};
  let app = headersParser(details.responseHeaders);
  _.extend(tabInfo[details.tabId], app);
}, {
  urls: ['<all_urls>'],
  types: ['main_frame']
}, ['responseHeaders']);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case 'PARSE':
      tabInfo[sender.tab.id] = tabInfo[sender.tab.id] || {};
      _.extend(tabInfo[sender.tab.id], request.data);
      break;
    default:
  }
  chrome.pageAction.show(sender.tab.id);
  sendResponse({message: request, sender, sendResponse, app: tabInfo[sender.tab.id] || {}});
});

chrome.tabs.onRemoved.addListener(function (tabId) {
  delete tabInfo[tabId];    // free memory
});