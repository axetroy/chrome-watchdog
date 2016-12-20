/**
 * Created by axetroy on 16-12-20.
 */

import _ from 'underscore';

export default function transform(appObject = {}) {
  appObject = _.extend({}, appObject.server, appObject.client);
  return _.chain(appObject)
    .forEach((app, name)=>app.name = name.trim())
    .map(app=>app)
    .sortBy(app=>app.name)
    .value();
}