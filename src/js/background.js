import _ from 'underscore';

const knownHeaders = {
  'x-powered-by': {
    // 'Ruby on Rails': /Phusion Passenger/,
    'Express.js': /Express/,
    'PHP': /PHP\/?(.*)/,
    'ASP.NET': /ASP\.NET/,
    'Nette': /Nette Framework/
  },
  'server': {
    'Tengine': /Tengine(.*)/,
    'Apache': /Apache[^-]?\/?(.*)/,
    'Tomcat': /Apache-Coyote\/?.*/,
    'GitHub': /GitHub.com/,
    'Domino': /Lotus-Domino/,
    'Play': /Play\/?(.*)/,
    'nginx': /nginx\/?(.*)/,
    'IIS': /Microsoft-IIS\/?(.*)/
  },
  'via': {
    'Varnish': /(.*) varnish/
  }
};

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
  let app = {};
  _.each(details.responseHeaders, function (header) {
    if (!knownHeaders[header.name.toLowerCase()]) return;
    _.each(knownHeaders[header.name.toLowerCase()], function (reg, appName) {
      let match = header.value.match(reg);
      if (match && match.length >= 1) {
        app[appName] = {
          name: appName,
          url: '',
          exist: true,
          priority: 0,
          version: match[1] || null
        };
      }
    });
  });
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