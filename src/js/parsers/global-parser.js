import _ from "underscore";

const jsGlobalLibs = {
  // framework
  "Angular": {
    url: "https://github.com/angular/angular.js",
    get exist() {
      return typeof angular !== "undefined" && typeof angular.module === "function";
    },
    get version() {
      return angular.version.full;
    }
  },
  "UI Router": {
    url: "https://github.com/angular-ui/ui-router",
    get exist() {
      let root = document.querySelector('[ng-app]');
      if (typeof angular !== 'object' || !root) return false;
      let injector = angular.element(root).injector();
      let $state;
      try {
        $state = injector.get('$state');
      } catch (err) {
        return false;
      }
      return (typeof $state === 'object' && typeof $state.go === 'function') || !!document.querySelector(['ui-view']);
    }
  },
  "Angular Translate": {
    url: "https://angular-translate.github.io/",
    get exist() {
      let root = document.querySelector('[ng-app]');
      if (typeof angular !== 'object' || !root) return false;
      let injector = angular.element(root).injector();
      let $translate;
      try {
        $translate = injector.get('$translate');
      } catch (err) {
        return false;
      }
      return (typeof $translate === 'function' && typeof $translate.use === 'function')
    }
  },
  "Restangular": {
    url: "http://github.com/mgonto/restangular",
    get exist() {
      let root = document.querySelector('[ng-app]');
      if (typeof angular !== 'object' || !root) return false;
      let injector = angular.element(root).injector();
      let Restangular;
      try {
        Restangular = injector.get('Restangular');
      } catch (err) {
        return false;
      }
      return Restangular && _.isFunction(Restangular.one) && _.isFunction(Restangular.all)
    }
  },
  "Angular Material": {
    url: "https://material.angularjs.org",
    get exist() {
      let root = document.querySelector('[ng-app]');
      if (typeof angular !== 'object' || !root) return false;
      let injector = angular.element(root).injector();
      let $mdDialog;
      try {
        $mdDialog = injector.get('$mdDialog');
      } catch (err) {
        return false;
      }
      return (typeof $mdDialog === 'object' && typeof $mdDialog.alert === 'function');
    }
  },
  "React": {
    url: "https://facebook.github.io",
    get exist() {
      return typeof React === 'object' || typeof ReactDOM === 'object' || typeof ReactPlayground === 'function' || !!document.querySelector('[data-reactid]');
    },
    get version() {
      return window.React ? React.version : window.ReactDOM ? ReactDOM.version : null;
    }
  },
  "avalon": {
    url: "",
    get exist() {
      return typeof avalon !== 'undefined';
    },
    get version() {
      return avalon.version;
    }
  },
  "polymer": {
    url: "",
    get exist() {
      return typeof Polymer !== 'undefined';
    },
    get version() {
      return Polymer.version;
    }
  },
  "Vue": {
    url: "",
    get exist() {
      return typeof Vue !== 'undefined';
    },
    get version() {
      return Vue.version;
    }
  },
  "Backbone": {
    get exist() {
      return typeof Backbone !== 'undefined';
    },
    get version() {
      return Backbone.VERSION;
    }
  },

  // libs
  "jQuery": {
    url: "https://github.com/jquery/jquery",
    get exist() {
      return typeof jQuery === "function" && typeof $ === "function" && $ === jQuery;
    },
    get version() {
      return jQuery.prototype.jquery;
    }
  },
  "jQuery UI": {
    url: "",
    get exist() {
      return typeof jQuery === "function" && !!jQuery.ui;
    },
    get version() {
      return jQuery.ui.version;
    }
  },
  "Prototype": {
    url: "",
    get exist() {
      return typeof Prototype !== 'undefined';
    },
    get version() {
      return Prototype.Version;
    }
  },
  "Zepto.js": {
    url: "https://github.com/madrobby/zepto",
    get exist() {
      return typeof Zepto !== 'undefined' && Zepto.fn;
    }
  },
  "moment": {
    url: "https://github.com/moment/moment",
    get exist() {
      return typeof moment === 'function';
    },
    get version() {
      return moment.version;
    }
  },
  "webpack": {
    url: "https://github.com/webpack/webpack",
    get exist() {
      return typeof webpackJsonp === 'function' || typeof webpackHotUpdate === 'function';
    }
  },
  "Lo-dash": {
    url: "",
    get exist() {
      return typeof window._ === 'function' && window._.name === 'lodash'
    },
    get version() {
      return window._.VERSION;
    }
  },
  "underscore": {
    url: "",
    get exist() {
      return typeof window._ !== 'undefined' && typeof window._.identity === 'function' && window._.identity('abc') === 'abc' && window._.name === '_';
    },
    get version() {
      return window._.VERSION;
    }
  },
  "KindEditor": {
    url: "",
    get exist() {
      return typeof KindEditor !== 'undefined';
    },
    get version() {
      return KindEditor.VERSION;
    }
  },
  "D3": {
    url: "",
    get exist() {
      return typeof d3 !== 'undefined';
    },
    get version() {
      return d3.version;
    }
  },
  "Highcharts": {
    url: "",
    get exist() {
      return typeof Highcharts !== 'undefined';
    },
    get version() {
      return Highcharts.version;
    }
  },
  "Echarts": {
    url: "http://echarts.baidu.com/",
    get exist() {
      return typeof echarts === 'object' || !!document.querySelector('[_echarts_instance_]');
    },
    get version() {
      return window.echarts ? echarts.version : null;
    }
  },
  "YUI": {
    url: "",
    get exist() {
      return typeof YAHOO === 'object';
    },
    get version() {
      return YAHOO.VERSION;
    }
  },
  "YUI-3": {
    url: "",
    get exist() {
      return typeof YUI === 'function';
    },
    get version() {
      return (YUI() | {}).version;
    }
  },
  "Spine": {
    url: "",
    get exist() {
      return typeof Spine !== 'undefined';
    },
    get version() {
      return Spine.version;
    },
  },
  "Raphael": {
    url: "",
    get exist() {
      return typeof Raphael !== 'undefined';
    },
    get version() {
      return Raphael.version;
    },
  },
  "Modernizr": {
    url: "",
    get exist() {
      return typeof Modernizr !== 'undefined';
    },
    get version() {
      return Modernizr._version;
    },
  },
  "RightJS": {
    url: "",
    get exist() {
      return typeof RightJS !== 'undefined';
    },
    get version() {
      return RightJS.version;
    },
  },
  "ExtJS": {
    url: "",
    get exist() {
      return typeof Ext === 'object';
    },
    get version() {
      return Ext.version;
    },
  },
  "MooTools": {
    url: "",
    get exist() {
      return typeof MooTools === 'object';
    },
    get version() {
      return MooTools.version;
    },
  },
  "SWFObject": {
    url: "",
    get exist() {
      return typeof SWFObject !== 'undefined' || typeof swfobject !== 'undefined';
    }
  },
  "Google Loader": {
    url: "",
    get exist() {
      return window.google && window.google.load;
    }
  },
  "Google Code Prettify": {
    url: "http://code.google.com/p/google-code-prettify/",
    get exist() {
      return window.prettyPrint;
    }
  },
  "Google Plus1": {
    url: "",
    get exist() {
      return window.gapi && window.gapi.plusone && true;
    }
  },
  "Google Ad": {
    url: "",
    get exist() {
      return window.google_ad_client;
    }
  },
  "Facebook": {
    url: "",
    get exist() {
      return window.FB && window.FB.api;
    }
  },
  "Twitter": {
    url: "",
    get exist() {
      return window.twttr;
    }
  },
  "CodeIgniter": {
    url: "",
    get exist() {
      return document.cookie.indexOf("cisession") != -1 || document.cookie.indexOf("ci_session") != -1;
    }
  },
  "Java": {
    url: "",
    get exist() {
      return document.cookie.indexOf("JSESSIONID") != -1;
    }
  },
  "Domino": {
    url: "",
    get exist() {
      return document.cookie.indexOf("LtpaToken") != -1 || document.cookie.indexOf("DomAuthSessId") != -1;
    }
  },
  "Babel": {
    url: "https://babeljs.io",
    get exist() {
      return window.Babel || window.babelHelpers || typeof window.regeneratorRuntime === 'object';
    },
    get version() {
      return window.Babel && Babel.version ? Babel.version : null;
    }
  },
  "jQuery.hotkeys": {
    url: "",
    get exist() {
      return window.jQuery && jQuery.hotkeys;
    },
    get version() {
      return jQuery.hotkeys.version;
    },
  },
  "SPDY": {
    url: "",
    get exist() {
      return window.chrome.loadTimes().wasFetchedViaSpdy;
    }
  },
  "Rxjs": {
    url: "",
    get exist() {
      return window.Rx && (_.isFunction(Rx.Observable) || _.isObject(Rx.Scheduler) || _.isFunction(Rx.Subject));
    }
  },
  "flv.js": {
    url: "https://github.com/Bilibili/flv.js",
    get exist() {
      return window.flvjs;
    },
    get version() {
      return flvjs.version;
    }
  },
  "Handlebars.js": {
    url: "http://handlebarsjs.com/",
    get exist() {
      return !!document.querySelector('script[type="text/x-handlebars-template"]');
    }
  },
  "SystemJS": {
    url: "https://github.com/systemjs/systemjs",
    get exist() {
      return window.SystemJS;
    },
    get version() {
      return SystemJS.version;
    }
  },
  "three.js": {
    url: "",
    get exist() {
      return window.THREE && typeof THREE === 'function';
    }
  },
  "axios": {
    url: "https://github.com/mzabriskie/axios",
    get exist() {
      return window.axios;
    }
  },
  "FastClick": {
    url: "",
    get exist() {
      return window.FastClick;
    }
  },
  "DocSearch": {
    url: "https://github.com/algolia/docsearch",
    get exist() {
      return window.docsearch;
    },
    get version() {
      return docsearch.version;
    }
  },
  "Socket.io": {
    url: "http://socket.io",
    get exist() {
      return typeof io === 'function' && typeof io.Socket === 'function';
    }
  }

};

// 根据全局变量进行判断
export default function globalParser(app = {}) {
  try {
    _.chain(jsGlobalLibs)
      .each((lib, name)=>lib.name = name)
      .filter(lib=>lib.exist)
      .each(function (lib) {
        app[lib.name] = _.extend({}, lib, {version: lib.version || null});
      });
  } catch (err) {
    console.error(err);
  }
  return app;
}