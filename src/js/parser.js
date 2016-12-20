/**
 * Created by axetroy on 16-12-13.
 */

import globalParser from './lib/global-parser';
import metParser from './lib/meta-parser';
import resourceParser from './lib/resource-parser';
import classParser from './lib/class-parser';
import htmlParser from './lib/html-parser';

function parse() {
  let apps = {};

  globalParser(apps);
  resourceParser(apps);
  metParser(apps);
  classParser(apps);
  htmlParser(apps);

  let script = document.querySelector('#chromeWatchDog');
  script.setAttribute('app', JSON.stringify(apps || {}));

  // notice the content.js
  let done = document.createEvent('Event');
  done.initEvent('ready', true, true);
  script.dispatchEvent(done);
  return apps;
}

parse();

