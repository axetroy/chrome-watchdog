import _ from 'underscore';
import Q from 'q';
import co from 'co';

import headersParser from './parsers/headers-parser';
import urlParser from './parsers/url-parser';
import {parseJSRequest, parseCSSRequest} from './parsers/resource-parser';
import {resolveImg, loadImg} from './lib/resolveImg';

(function (global) {

  class Store {
    constructor() {
      this.data = {};
    }

    has(tabId, appName) {
      let data = this.data[tabId];
      return data ? data.hasOwnProperty(appName) : false;
    }

    set(tabId, appObject) {
      let container = this.data[tabId] = this.data[tabId] || {};
      if (!container[appObject.name]) {
        container[appObject.name] = appObject;
      } else {
        _.extend(container[appObject.name], appObject);
      }
    }

    get(tabId) {
      return this.data[tabId];
    }

    list(tabId) {
      let data = this.data[tabId] || [];
      return _.chain(data)
        .map(v=>v)
        .sortBy(v=>v.name)
        .value();
    }

    all() {

    }

    remove(tabId) {
      delete this.data[tabId];
    }
  }

  let store = global.store = new Store();

  // 改变图标
  function changeIcon(tabId) {
    let app = store.list(tabId);
    let firstApp = app[0];
    if (_.isEmpty(firstApp) || !firstApp.name) return;
    let icoPath = `ico/${firstApp.name.replace(/\s+/g, '-')}`;
    return loadImg(icoPath + '.ico')
      .then(img=>Q.resolve(img), function () {
        return resolveImg(icoPath);
      })
      .then(function (img) {
        chrome.pageAction.setIcon({
          tabId,
          path: img.src
        });
        chrome.pageAction.setTitle({
          tabId,
          title: 'Watch Dog'
        });
      })
      .catch(err=>Q.reject(err));
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


  // 发送请求前，读取header
  chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
    if (details.tabId < 0)return;   // ignore the background tab
    if (details.type === 'main_frame') store.remove(details.tabId);     // 第一次加载页面，在删除数据

    let appObject = {};

    // 资源解析
    switch (details.type) {
      case 'script':
        appObject = parseJSRequest(details);
        break;
      case 'stylesheet':
        appObject = parseCSSRequest(details);
        break;
    }

    // parse the url
    _.each(urlParser(details), app=>store.set(details.tabId, app));

    store.set(details.tabId, appObject);

    return {requestHeaders: details.requestHeaders};
  }, {urls: ["<all_urls>"]}, ["requestHeaders"]);

  // 监听http请求，读取header
  chrome.webRequest.onHeadersReceived.addListener(function (details) {
    if (details.tabId < 0)return;   // ignore the background tab

    co(function*() {
      let tab = yield getTabById(details.tabId);
      let isSame = yield isSameOrigin(tab.url)(details.url);

      if (isSame) {
        // parse the header
        _.each(headersParser(details.responseHeaders), app=>store.set(details.tabId, app));
      }

      chrome.runtime.sendMessage({action: 'UPDATE:POP', data: store.list(details.tabId), id: details.tabId});   // notify the pop update view
      changeIcon(details.tabId);
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

        _.each(request.data, appObject=>store.set(tabId, appObject));

        changeIcon(tabId);
        chrome.pageAction.show(tabId);
        break;
      case 'POP:DONE':        // pop 渲染完成
        changeIcon(tabId);
        break;
      default:
    }
    sendResponse({message: request, sender, sendResponse, app: store.get(tabId) || {}});
  });

  // when close the tab
  chrome.tabs.onRemoved.addListener(function (tabId) {
    store.remove(tabId);
  });

})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this || {});