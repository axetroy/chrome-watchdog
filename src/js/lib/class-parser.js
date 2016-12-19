/**
 * Created by axetroy on 16-12-16.
 */

import _ from 'underscore';

const cssClass = {
  'Bootstrap': ['hero-unit', '.carousel-control', '[class^="icon-"]:last-child'],
  'Font Awesome': ['.fa-', '.fa-lg']
};

export default function classParser(app = {}) {

  let cssRule = _.chain(document.styleSheets)
    .toArray()
    .filter(styleSheet=>styleSheet.cssRules)
    .map(styleSheet=>_.toArray(styleSheet.cssRules))
    .flatten()
    .filter(rule=>rule.selectorText)
    .value();

  _.each(cssClass, function (classes, appName) {
    if (app[appName]) return;
    let exist = _.some(cssRule, rule=> {
      return _.some(classes, className=>rule.selectorText.indexOf(className) >= 0);
    });
    if (exist) {
      app[appName] = {
        name: appName
      };
    }
  });

  return app;

}