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
    url: "",
    test: /html5shiv(\.min)?\.js/
  },
  "json3": {
    url: "",
    test: /json3(\.min)\.js/
  },
  "respond": {
    url: "",
    test: /respond(\.min)\.js/
  },
  "webSocket.js": {
    url: "",
    test: /swfobject/,
  }
};

export default function commentsParser(apps = {}) {

  _.each(commentTester, function (app, name) {
    if (apps[name]) return;
    console.log(app);
    _.each(comments, function (node) {
      let text = node.outerHTML;
      console.log(text);
      if (app.test.test(text)) {
        console.log(app);
      }
    });

  });

  return apps;
}