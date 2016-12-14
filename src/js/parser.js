/**
 * Created by axetroy on 16-12-13.
 */

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
  "Prototype": {
    url: "",
    get exist() {
      return typeof Prototype !== 'undefined';
    },
    get version() {
      return Prototype.Version;
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
      return typeof webpackJsonp === 'function';
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
  }

};

const cssGlobalLibs = {
  "Bootstrap": {
    url: "https://github.com/twbs/bootstrap",
    existReg: /bootstrap(-theme)?\.(min\.)?css/
  },
  "Font Awesome": {
    url: "https://github.com/FortAwesome/Font-Awesome",
    existReg: /font-awesome\.(min\.)?css/,
  }
};

const jsScriptTags = {
  "百度统计": {existReg: /hm\.baidu\.com\/hm?\.js/i},
  "百度分享": {existReg: /bdimg\.share\.baidu\.com\/static\/js\//},
  "无觅": {existReg: /widget\.wumii\.(cn|com)\/ext\/relatedItemsWidget/},
  "多说": {existReg: /static\.duoshuo\.com\/embed\.js/},
  "友言": {existReg: /v\d\.uyan\.cc\/(code\/uyan\.js|js\/iframe\.js)/},
  "友荐": {existReg: /v\d\.ujian\.cc\/code\/ujian\.js/},
  "AdSense": {existReg: /pagead\/show_ads\.js/},
  "AddThis": {existReg: /addthis\.com\/js/},
  "Alfresco": {existReg: /(alfresco)+(-min)?(\/scripts\/menu)?\.js/},
  "Avactis": {existReg: /\/avactis-themes\//i},
  "Bootstrap": {existReg: /bootstrap(-.*)?\.js/},
  "BuySellAds": {existReg: /buysellads.com\/.*bsa\.js/},
  "Cappuccino": {existReg: /Frameworks\/Objective-J\/Objective-J\.js/},
  "Closure": {existReg: /\/goog\/base\.js/i},
  "Disqus": {existReg: /disqus.com/i},
  "Dojo": {existReg: /dojo(\.xd)?\.js/i},
  "Gallery2": {existReg: /main\.php\?.*g2_.*/i},
  "GetSatisfaction": {existReg: /getsatisfaction\.com\/feedback/i},
  "Google Analytics": {existReg: /google-analytics\.com\/(ga|urchin|analytics).js/i},
  "JiaThis": {existReg: /v\d\.jiathis\.com\/code(_mini)?\/(jiathis|jia)/},
  "Jigsy": {existReg: /javascripts\/asterion\.js/},
  "Joomla": {existReg: /\/components\/com_/},
  "KISSmetrics": {existReg: /i.kissmetrics.com\/i.js/},
  "MODx": {existReg: /\/min\/b=.*f=.*/},
  "Mollom": {existReg: /mollom\/mollom\.js/i},
  "MooTools": {existReg: /mootools/i},
  "Mura CMS": {existReg: /mura\/js/},
  "OpenTag": {existReg: /opentag.*\.js/},
  "Prototype": {existReg: /prototype\.js/i},
  "Quantcast": {existReg: /quantserve\.com\/quant\.js/i},
  "Tiki Wiki CMS Groupware": {existReg: /tiki-js/},
  "Ubercart": {existReg: /uc_cart/i},
  "Volusion": {existReg: /a\/j\/javascripts\.js/},
  "Weebly": {existReg: /weebly\.com\/weebly\//},
  "Wibiya": {existReg: /wibiya\.com\/Loaders\//i},
  "XenForo": {existReg: /js\/xenforo\//i},
  "Yola": {existReg: /analytics\.yola\.net/},
  "ZenPhoto": {existReg: /zp-core\/js/i},
  "bShare": {existReg: /static\.bshare\.cn\/b/},
  "cnzz": {existReg: /(w|s\d+)\.cnzz\.com\/(c|stat)\.php/i},
  "reCaptcha": {existReg: /(google\.com\/recaptcha|api\.recaptcha\.net\/)/i},
  "script.aculo.us": {existReg: /scriptaculous\.js/i},
  "segmentfault": {existReg: /w\.segmentfault\.com\/card\/\d+\.js/i}
};

// 根据全局变量进行判断
function globalParser() {
  let app = {};
  _.chain(jsGlobalLibs)
    .each((lib, name)=>lib.name = name)
    .filter(lib=>lib.exist)
    .each(function (lib) {
      app[lib.name] = _.extend({}, lib, {version: lib.version || null});
    });
  return app;
}

// 根据head > meta 进行判断
function metParser() {
  let app = {};

  let metaReg = {
    "generator": {
      "Joomla": /joomla!?\s*([\d\.]+)?/i,
      "vBulletin": /vBulletin\s*(.*)/i,
      "Drupal8": /Drupal (8[\d\.]*)/i,    // Drupal 8 logo.
      "Drupal": /Drupal ([1-7][\d\.]*)/i, // Original Drupal logo.
      "WordPress": /WordPress\s*(.*)/i,
      "XOOPS": /xoops/i,
      "Plone": /plone/i,
      "MediaWiki": /MediaWiki/i,
      "CMSMadeSimple": /CMS Made Simple/i,
      "SilverStripe": /SilverStripe/i,
      "Movable Type": /Movable Type/i,
      "Amiro.CMS": /Amiro/i,
      "Koobi": /koobi/i,
      "bbPress": /bbPress/i,
      "DokuWiki": /dokuWiki/i,
      "TYPO3": /TYPO3/i,
      "PHP-Nuke": /PHP-Nuke/i,
      "DotNetNuke": /DotNetNuke/i,
      "Sitefinity": /Sitefinity\s+(.*)/i,
      "WebGUI": /WebGUI/i,
      "ez Publish": /eZ\s*Publish/i,
      "BIGACE": /BIGACE/i,
      "TypePad": /typepad\.com/i,
      "Blogger": /blogger/i,
      "PrestaShop": /PrestaShop/i,
      "SharePoint": /SharePoint/,
      "JaliosJCMS": /Jalios JCMS/i,
      "ZenCart": /zen-cart/i,
      "WPML": /WPML/i,
      "PivotX": /PivotX/i,
      "OpenACS": /OpenACS/i,
      "AlphaCMS": /alphacms\s+(.*)/i,
      "concrete5": /concrete5 -\s*(.*)$/,
      "Webnode": /Webnode/,
      "GetSimple": /GetSimple/,
      "DataLifeEngine": /DataLife Engine/,
      "ClanSphere": /ClanSphere/,
      "Mura CMS": /Mura CMS\s*(.*)/i,
      "Tiki Wiki CMS Groupware": /Tiki/i
    },
    "copyright": {
      "phpBB": /phpBB/i
    },
    "elggrelease": {
      "Elgg": /.+/
    },
    "powered-by": {
      "Serendipity": /Serendipity/i
    },
    "author": {
      "Avactis": /Avactis Team/i
    }
  };

  _.each(document.getElementsByTagName("meta"), function (metaTag) {
    let name = metaTag.name || '';
    if (!metaReg[name]) return;
    _.each(metaReg[name], function (reg, appName) {
      let match = reg.exec(metaTag.content);
      app[appName] = match[1] ? match[1] : -1;
    });
  });

}

// 根据 src="/****" href="/****" 进行判断
function resourceParser() {
  let css = {};
  let js = {};

  _.chain(cssGlobalLibs)
    .each((lib, name)=>lib.name = name)
    .filter((lib, name)=>_.some(document.styleSheets, style=> {
      if (!style.href) return false;
      return lib.existReg.test(style.href);
    }))
    .each(function (lib) {
      css[lib.name] = _.extend({}, lib);
    });

  _.chain(jsScriptTags)
    .each((lib, name)=>lib.name = name)
    .filter((lib, name)=>_.some(document.scripts, script=> {
      if (!script.src) return false;
      return lib.existReg.test(script.src);
    }))
    .each(function (lib) {
      js[lib.name] = _.extend({}, lib);
    });

  return _.extend({}, css, js);
}

// 根据 response 进行判断
function responseParser() {

}

let apps = globalParser(window);

_.extend(apps, resourceParser());

_.extend(apps, metParser());

document.querySelector('#hello').setAttribute('app', JSON.stringify(apps));