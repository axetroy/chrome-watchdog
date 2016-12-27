import _ from 'underscore';

/**
 * 数组：满足其中一个条件
 * TODO:对象，满足所有所有条件
 */
const cookiesTester = {
  "CodeIgniter": {
    keys: ['cisession', 'ci_session'],
    values: []
  },
  "Java": {
    keys: ['JSESSIONID'],
    values: []
  },
  "Domino": {
    keys: ['LtpaToken', 'DomAuthSessId'],
    values: []
  },
  "Baidu": {
    keys: 'BAIDU'
  }
};

function partialParser(str, iterator) {
  let exist = false;
  if (_.isEmpty(iterator)) return false;

  if (Array.isArray(iterator)) {    // 数组：满足其中一个条件
    exist = iterator.includes(str);
  }
  else if (_.isObject(iterator)) {
    exist = _.every(iterator, v=>str.indexOf(v) >= 0);
  }
  else if (typeof iterator === 'string') {
    exist = str.indexOf(iterator) >= 0;
  }
  return exist;
}

export default function cookiesParser(details) {
  let app = {};

  let requestHeaders = details.requestHeaders;
  let cookies = _.find(requestHeaders, header=>header.name.toLowerCase() === 'cookie') || {};   // object
  cookies = cookies.value || '';        // string
  cookies = cookies.split(/\;\s\b/g).filter(v=>v);   // array
  if (_.isEmpty(cookies)) return {};

  cookies = _.chain(cookies)
    .map(function (cookieStr) {
      let pare = cookieStr.split(/\=/);
      let name = pare[0];
      let value = pare.slice(1).join('');
      return {
        name,
        value,
        str: cookieStr
      }
    })
    .value();

  _.each(cookiesTester, function (entity, appName) {
    if (app[appName]) return;

    cookies.forEach(function (cookie) {

      let exist = partialParser(cookie.name, entity.keys);
      !exist && partialParser(cookie.value, entity.values);

      if (exist) {
        app[appName] = _.extend({
          exist: true, name: appName
        }, entity)
      }

    });

  });

  return app;

}