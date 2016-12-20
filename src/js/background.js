import _ from 'underscore';
import Q from 'q';
import co from 'co';
import transform from './lib/transform';

import headersParser from './lib/headers-parser';

(function (global) {
  const tabInfo = global.tabInfo = {};

  // 改变图标
  function changeIcon(id) {
    let app = transform(tabInfo[id]);
    let firstApp = app[0];
    if (_.isEmpty(firstApp) || !firstApp.name) return;
    chrome.pageAction.setIcon({
      tabId: id,
      path: `ico/${firstApp.name.replace(/\s/, '-')}.ico`
    });
    chrome.pageAction.setTitle({
      tabId: id,
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
    tabInfo[details.tabId] = tabInfo[details.tabId] || {};
    tabInfo[details.tabId].server = tabInfo[details.tabId].server || {};

    co(function*() {
      let tab = yield getTabById(details.tabId);
      let isSame = yield isSameOrigin(tab.url)(details.url);
      if (!isSame) return;

      // parse the header
      let app = headersParser(details.responseHeaders);
      _.extend(tabInfo[details.tabId].server, app);
      // console.log(details.type, JSON.stringify(details.responseHeaders));
      // console.log(details.type, details.url, tabInfo[details.tabId]);
      app = tabInfo[details.tabId];
      console.log(details.type, details.url, JSON.stringify(app));
      chrome.runtime.sendMessage({action: 'UPDATE:POP', app});

    }).catch(function (err) {
      console.error(err);
    });

  }, {
    urls: ['<all_urls>'],
    types: ['main_frame', 'xmlhttprequest', 'ping', 'script', 'stylesheet', 'font', 'object', 'image', 'other']
  }, ['responseHeaders']);

  // 消息监听
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