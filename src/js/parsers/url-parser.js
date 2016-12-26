/**
 * Created by axetroy on 16-12-16.
 */

import _ from 'underscore';

const types = {
  common: ['main_frame', 'xmlhttprequest', 'ping', 'script', 'object', 'other']
};

const type = {
  client: 'client',
  server: 'server'
};

const urlTester = {
  "Google Map": {
    url: "https://developers.google.com/maps/documentation/javascript/?hl=zh-cn",
    tests: [
      /maps\.googleapis\.com/,
      /\.google\.[a-z]+\/map/
    ],
    type: type.client,
    types: types.common
  },
  "高德地图": {
    url: "http://lbs.amap.com/",
    tests: [/restapi\.amap\.com/],
    types: types.common
  },
  "百度地图": {
    url: "http://lbsyun.baidu.com/",
    tests: [/api\.map\.baidu\.com/],
    type: type.client,
    types: types.common
  },
  "PHP": {
    tests: [/\.php$/],
    type: type.server,
    types: types.common
  },
  "百度分享": {
    tests: [/bdimg\.share\.baidu\.com\/static\//],
    type: type.client,
    types: ['script']
  },
};

export default function urlParser(detail) {
  let app = {
    [type.client]: {},
    [type.server]: {}
  };

  _.each(urlTester, function (entity, name) {

    let exist = entity.tests.some(test=>test.test(detail.url));
    let correctType = _.includes(entity.types, detail.type);

    if (exist && correctType) {
      app[entity.type][name] = _.extend({exist: true, name}, entity);
    }

  });

  return app;
}