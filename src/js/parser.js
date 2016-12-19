/**
 * Created by axetroy on 16-12-13.
 */

import _ from "underscore";

import globalParser from './lib/global-parser';
import metParser from './lib/meta-parser';
import resourceParser from './lib/resource-parser';
import classParser from './lib/class-parser';
import htmlParser from './lib/html-parser';

let apps = {};

globalParser(apps);
resourceParser(apps);
metParser(apps);
classParser(apps);
htmlParser(apps);

document.querySelector('#chromeWatchDog').setAttribute('app', JSON.stringify(apps));