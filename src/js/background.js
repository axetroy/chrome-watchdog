import _ from 'underscore';

import headersParser from './lib/headers-parser';

(function (global) {
  const tabInfo = global.tabInfo = {};

  // listen the header
  chrome.webRequest.onHeadersReceived.addListener(function (details) {
    tabInfo[details.tabId] = tabInfo[details.tabId] || {};
    tabInfo[details.tabId].server = {};
    let app = headersParser(details.responseHeaders);
    _.extend(tabInfo[details.tabId].server, app);
  }, {
    urls: ['<all_urls>'],
    types: ['main_frame']
  }, ['responseHeaders']);

  function changeIcon(id, app = {}) {
    app = _.extend({}, app.server, app.client);
    app = Object.keys(app);
    chrome.pageAction.setIcon({
      tabId: id,
      path: `ico/${app[0].replace(/\s/, '-')}.ico`
    });
    chrome.pageAction.setTitle({
      tabId: id,
      title: 'Watch Dog'
    });
  }

  // listen the message
  chrome.runtime.onMessage.addListener(function (request = {}, sender, sendResponse) {
    let id = sender.tab ? sender.tab.id : request.id ? request.id : null;
    switch (request.action) {
      case 'GET':             // popup 获取
        break;
      case 'CONTENT:PARSE':   // content 解析完成
        tabInfo[id] = tabInfo[id] || {};
        tabInfo[id].client = request.data;

        changeIcon(id, tabInfo[id]);
        chrome.pageAction.show(id);
        break;
      case 'POP:DONE':        // pop 渲染完成
        changeIcon(id, request.app);
        break;
      default:
    }
    sendResponse({message: request, sender, sendResponse, app: tabInfo[id] || {}});
  });

  // when close the tab
  chrome.tabs.onRemoved.addListener(function (tabId) {
    delete tabInfo[tabId];    // free memory
  });

})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this || {});