import _ from "underscore";

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
const cssGlobalLibs = {
  "Bootstrap": {
    url: "https://github.com/twbs/bootstrap",
    existReg: /bootstrap(-theme)?\.(min\.)?css/
  },
  "Font Awesome": {
    url: "https://github.com/FontAwesome/Font-Awesome",
    existReg: /font-awesome\.(min\.)?css/,
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

  _.extend(app, css, js);

  return app;
}