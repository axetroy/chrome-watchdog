import _ from 'underscore';

const knownHeaders = {
  "x-powered-by": {
    // "Ruby on Rails": /Phusion Passenger/,
    "Express.js": /Express/,
    "PHP": /PHP\/?(.*)/,
    "ASP.NET": /ASP\.NET/,
    "Nette": /Nette Framework/
  },
  "server": {
    "Tengine": /Tengine(.*)/i,
    "Apache": /Apache[^-]?\/?(.*)/,
    "Tomcat": /Apache-Coyote\/?.*/,
    "GitHub": /GitHub.com/,
    "Domino": /Lotus-Domino/,
    "Play": /Play\/?(.*)/,
    "nginx": /nginx\/?(.*)/,
    "IIS": /Microsoft-IIS\/?(.*)/,
    "QFE": /qfe/i,
    "ZWS": /ZWS/i
  },
  "via": {
    "Varnish": /(.*) varnish/
  }
};

export default function headersParser(headers) {
  let app = {};
  _.each(headers, function (header) {
    if (!knownHeaders[header.name.toLowerCase()]) return;
    _.each(knownHeaders[header.name.toLowerCase()], function (reg, appName) {
      let match = header.value.match(reg);
      if (match && match.length >= 1) {
        app[appName] = {
          name: appName,
          url: '',
          exist: true,
          priority: 0,
          version: match[1] || null
        };
      }
    });
  });
  return app;
};