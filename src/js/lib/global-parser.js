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
    },
    priority: 10
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
    },
    priority: 20
  },
  "jQuery UI": {
    url: "",
    get exist() {
      return typeof jQuery === "function" && jQuery.ui;
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
      return typeof SWFObject !== 'undefined';
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
  "Twitter": {
    url: "",
    get exist() {
      return window.twttr;
    },
    get version() {
      return MooTools.version;
    },
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
      return window.Babel || window.babelHelpers || typeof regeneratorRuntime === 'object';
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
      return window.Rx;
    },
    get version() {
      return jQuery.hotkeys.version;
    },
  },
  "flv.js": {
    url: "https://github.com/Bilibili/flv.js",
    get exist() {
      return window.flvjs;
    },
    get version() {
      return flvjs.version;
    }
  }

};

// 根据全局变量进行判断
export default function globalParser(app = {}) {
  _.chain(jsGlobalLibs)
    .each((lib, name)=>lib.name = name)
    .filter(lib=>lib.exist)
    .each(function (lib) {
      app[lib.name] = _.extend({}, lib, {version: lib.version || null});
    });
  return app;
}