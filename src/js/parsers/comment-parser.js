/**
 * Created by axetroy on 16-12-24.
 */

import _ from 'underscore';

let comments = [];

function eachComment(ele) {
  for (var i = 0; i < ele.childNodes.length; i++) {
    var child = ele.childNodes[i];
    if (child.nodeType == 8) {
      comments.push(child);
    } else if (child.childNodes) {
      eachComment(child);
    }
  }
}

eachComment(document.documentElement);

const commentTester = {
  "html5shiv": {
    url: "https://github.com/aFarkas/html5shiv",
    test: /html5shiv(\.min)?\.js/
  },
  "json3.js": {
    url: "https://github.com/bestiejs/json3",
    test: /json3(\.min)\.js/
  },
  "respond.js": {
    url: "https://github.com/scottjehl/Respond",
    test: /respond(\.min)\.js/
  },
  "webSocket.js": {
    url: "https://github.com/gimite/web-socket-js",
    test: /swfobject/,
  },
  "es5-shim": {
    test: /es5-shim[\w\.]*\.js/
  },
  "videojs-ie8": {
    url: "https://github.com/videojs/ie8",
    test: /video-ie8[\w\.]*\.js/
  }
};

export default function commentsParser(apps = {}) {

  _.each(commentTester, function (app, name) {
    if (apps[name]) return;
    _.each(comments, function (node, i) {
      let text = node.textContent;
      if (app.test.test(text) && !apps[name]) {
        apps[name] = app;
      }
    });

  });

  return apps;
}