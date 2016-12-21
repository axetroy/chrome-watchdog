import _ from 'underscore';
import Q from 'q';
import co from 'co';
import transform from './lib/transform';

import headersParser from './lib/headers-parser';

(function (global) {
  const appInfo = global.appInfo = {};

  // 改变图标
  function changeIcon(tabId) {
    let app = transform(appInfo[tabId]);
    let firstApp = app[0];
    if (_.isEmpty(firstApp) || !firstApp.name) return;
    chrome.pageAction.setIcon({
      tabId,
      path: `ico/${firstApp.name.replace(/\s/, '-')}.ico`
    });
    chrome.pageAction.setTitle({
      tabId,
      title: 'Watch Dog'
    });
  }

  // 根据id获取标签
  function getTabById(tabId) {
    let deferred = Q.defer();
    chrome.tabs.get(tabId, (tab)=> {
      deferred.resolve(tab);
    });
    return deferred.promise;
  }

  // 判断两个url，是否是同源
  function isSameOrigin(url1) {
    let originEle = document.createElement('a');
    originEle.href = url1;
    return function (url2) {
      let targetEle = document.createElement('a');
      targetEle.href = url2;
      return targetEle.hostname === originEle.hostname ? Q.resolve(true) : Q.resolve(false);
    }
  }

  // =========================  主要程序  =========================

  // 监听http请求，读取header
  chrome.webRequest.onHeadersReceived.addListener(function (details) {
    if (details.tabId < 0)return;   // ignore the background tab

    if (details.type === 'main_frame') delete appInfo[details.tabId];   // first load and delete the last tab's data

    appInfo[details.tabId] = appInfo[details.tabId] || {};
    appInfo[details.tabId].server = appInfo[details.tabId].server || {};

    co(function*() {
      let tab = yield getTabById(details.tabId);
      let isSame = yield isSameOrigin(tab.url)(details.url);
      if (!isSame) return;

      // parse the header
      let app = headersParser(details.responseHeaders);
      _.extend(appInfo[details.tabId].server, app);
      app = appInfo[details.tabId];
      chrome.runtime.sendMessage({action: 'UPDATE:POP', app, id: details.tabId});   // notify the pop update view

    }).catch(function (err) {
      console.error(err);
    });

  }, {
    urls: ['<all_urls>'],
    types: ['main_frame', 'xmlhttprequest', 'ping', 'script', 'stylesheet', 'font', 'object', 'image', 'other']
  }, ['responseHeaders']);

  // 消息监听
  chrome.runtime.onMessage.addListener(function (request = {}, sender, sendResponse) {
    let tabId = sender.tab ? sender.tab.id : request.id ? request.id : null;
    switch (request.action) {
      case 'GET':             // popup 获取
        break;
      case 'CONTENT:PARSE':   // content 解析完成
        appInfo[tabId] = appInfo[tabId] || {};
        appInfo[tabId].client = request.data;

        changeIcon(tabId, appInfo[tabId]);
        chrome.pageAction.show(tabId);
        break;
      case 'POP:DONE':        // pop 渲染完成
        changeIcon(tabId, request.app);
        break;
      default:
    }
    sendResponse({message: request, sender, sendResponse, app: appInfo[tabId] || {}});
  });

  // when close the tab
  chrome.tabs.onRemoved.addListener(function (tabId) {
    delete appInfo[tabId];    // free memory
  });

})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this || {});