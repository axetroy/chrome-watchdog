/**
 * Created by axetroy on 16-12-13.
 */

import globalParser from './parsers/global-parser';
import metParser from './parsers/meta-parser';
import {parseContent} from './parsers/resource-parser';
import classParser from './parsers/class-parser';
import htmlParser from './parsers/html-parser';
import commentParser from './parsers/comment-parser';

function parse() {
  let apps = {};

  globalParser(apps);
  parseContent(apps);
  metParser(apps);
  classParser(apps);
  htmlParser(apps);
  commentParser(apps);

  let script = document.querySelector('#chromeWatchDog');
  script.setAttribute('app', JSON.stringify(apps || {}));

  // notice the content.js
  let done = document.createEvent('Event');
  done.initEvent('ready', true, true);
  script.dispatchEvent(done);
  return apps;
}

parse();

