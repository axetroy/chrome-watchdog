/**
 * Created by axetroy on 16-12-13.
 */

import _ from "underscore";

import globalParser from './lib/global-parser';
import metParser from './lib/meta-parser';
import resourceParser from './lib/resource-parser';

let apps = globalParser(window);

_.extend(apps, resourceParser());

_.extend(apps, metParser());

document.querySelector('#hello').setAttribute('app', JSON.stringify(apps));