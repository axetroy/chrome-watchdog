import _ from "underscore";

const jsScriptTags = {
  "\u767e\u5ea6\u7edf\u8ba1": {test: /hm\.baidu\.com\/hm?\.js/i, a: 33},        // 百度统计
  "\u767e\u5ea6\u5206\u4eab": {test: /bdimg\.share\.baidu\.com\/static\/js\//}, // 百度分享
  "\u65e0\u89c5": {test: /widget\.wumii\.(cn|com)\/ext\/relatedItemsWidget/},   // 无觅
  "\u591a\u8bf4": {test: /static\.duoshuo\.com\/embed\.js/},                    // 多说
  "\u53cb\u8a00": {test: /v\d\.uyan\.cc\/(code\/uyan\.js|js\/iframe\.js)/},     // 友言
  "\u53cb\u8350": {test: /v\d\.ujian\.cc\/code\/ujian\.js/},                    // 友荐
  "AdSense": {test: /pagead\/show_ads\.js/},
  "AddThis": {test: /addthis\.com\/js/},
  "Alfresco": {test: /(alfresco)+(-min)?(\/scripts\/menu)?\.js/},
  "Avactis": {test: /\/avactis-themes\//i},
  "Bootstrap": {test: /bootstrap(-.*)?\.js/},
  "BuySellAds": {test: /buysellads.com\/.*bsa\.js/},
  "Cappuccino": {test: /Frameworks\/Objective-J\/Objective-J\.js/},
  "Closure": {test: /\/goog\/base\.js/i},
  "Disqus": {test: /disqus.com/i},
  "Dojo": {test: /dojo(\.xd)?\.js/i},
  "Gallery2": {test: /main\.php\?.*g2_.*/i},
  "GetSatisfaction": {test: /getsatisfaction\.com\/feedback/i},
  "Google Analytics": {test: /google-analytics\.com\/(ga|urchin|analytics).js/i},
  "Google Api": {test: /apis\.google\.\w+\//i},
  "JiaThis": {test: /v\d\.jiathis\.com\/code(_mini)?\/(jiathis|jia)/},
  "Jigsy": {test: /javascripts\/asterion\.js/},
  "Joomla": {test: /\/components\/com_/},
  "KISSmetrics": {test: /i.kissmetrics.com\/i.js/},
  "MODx": {test: /\/min\/b=.*f=.*/},
  "Mollom": {test: /mollom\/mollom\.js/i},
  "MooTools": {test: /mootools/i},
  "Mura CMS": {test: /mura\/js/},
  "OpenTag": {test: /opentag.*\.js/},
  "Prototype": {test: /prototype\.js/i},
  "Quantcast": {test: /quantserve\.com\/quant\.js/i},
  "Tiki Wiki CMS Groupware": {test: /tiki-js/},
  "Ubercart": {test: /uc_cart/i},
  "Volusion": {test: /a\/j\/javascripts\.js/},
  "Weebly": {test: /weebly\.com\/weebly\//},
  "Wibiya": {test: /wibiya\.com\/Loaders\//i},
  "XenForo": {test: /js\/xenforo\//i},
  "Yola": {test: /analytics\.yola\.net/},
  "ZenPhoto": {test: /zp-core\/js/i},
  "bShare": {test: /static\.bshare\.cn\/b/},
  "cnzz": {test: /(w|s\d+)\.cnzz\.com\/(c|stat)\.php/i},
  "reCaptcha": {test: /(google\.com\/recaptcha|api\.recaptcha\.net\/)/i},
  "script.aculo.us": {test: /scriptaculous\.js/i},
  "segmentfault": {test: /w\.segmentfault\.com\/card\/\d+\.js/i},
  "Twitter": {test: /platform\.twitter\.com/i}
};
const cssGlobalLibs = {
  "Bootstrap": {
    url: "https://github.com/twbs/bootstrap",
    test: /bootstrap(-theme)?\.(min\.)?css/
  },
  "Font Awesome": {
    url: "https://github.com/FontAwesome/Font-Awesome",
    test: /font-awesome\.(min\.)?css/,
  },
  "jsDoc": {
    test: /jsdoc\.(min\.)?css/i
  },
  "Normalize.css": {
    url: "https://necolas.github.io/normalize.css",
    test: /normalize\.(min\.)?css/
  }
};

// 根据 src="/****" href="/****" 进行判断
export default function resourceParser(app = {}) {

  let css = {};
  let js = {};

  _.chain(cssGlobalLibs)
    .each((lib, name)=>lib.name = name)
    .filter((lib, name)=>_.some(document.styleSheets, style=> {
      if (!style.href) return false;
      return lib.test.test(style.href);
    }))
    .each(function (lib) {
      css[lib.name] = _.extend({}, lib);
    });

  _.chain(jsScriptTags)
    .each((lib, name)=>lib.name = name)
    .filter((lib, name)=>_.some(document.scripts, script=> {
      if (!script.src) return false;
      return lib.test.test(script.src);
    }))
    .each(function (lib) {
      js[lib.name] = _.extend({}, lib);
    });

  _.extend(app, css, js);

  return app;
}