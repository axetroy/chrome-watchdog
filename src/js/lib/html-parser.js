import _ from 'underscore';

let htmlTester = {
  'SMF': /<script .+\s+var smf_/i,
  'Magento': /var BLANK_URL = '[^>]+js\/blank\.html'/i,
  'Tumblr': /<iframe src=("|')http:\/\/\S+\.tumblr\.com/i,
  'WordPress': /<link rel=("|')stylesheet("|') [^>]+wp-content/i,
  'Closure': /<script[^>]*>.*goog\.require/i,
  'Liferay': /<script[^>]*>.*LifeRay\.currentURL/i,
  'vBulletin': /vbmenu_control/i,
  'MODx': /(<a[^>]+>Powered by MODx<\/a>|var el= \$\('modxhost'\);|<script type=("|')text\/javascript("|')>var MODX_MEDIA_PATH = "media";)/i,
  'miniBB': /<a href=("|')[^>]+minibb.+\s*<!--End of copyright link/i,
  'PHP-Fusion': /(href|src)=["']?infusions\//i,
  // @todo: recheck this pattern again
  'OpenX': /(href|src)=["'].*delivery\/(afr|ajs|avw|ck)\.php[^"']*/,
  'GetSatisfaction': /asset_host\s*\+\s*"javascripts\/feedback.*\.js/igm,
  // better recognization
  'Fatwire': /\/Satellite\?|\/ContentServer\?/,
  'Contao': /powered by (TYPOlight|Contao)/i,
  'Moodle': /<link[^>]*\/theme\/standard\/styles.php".*>|<link[^>]*\/theme\/styles.php\?theme=.*".*>/,
  '1c-bitrix': /<link[^>]*\/bitrix\/.*?>/i,
  'OpenCMS': /<link[^>]*\.opencms\..*?>/i,
  'HumansTxt': /<link[^>]*href=['"]?\S*?humans\.txt.*?['"].*?\>/i,
  'Google-Font-Api': /ref=["']?http:\/\/fonts.googleapis.com\//i,
  'Prostores': /-legacycss\/Asset">/,
  'osCommerce': /(product_info\.php\?products_id|_eof \/\/-->)/,
  'OpenCart': /index.php\?route=product\/product/,
  '七牛云存储加速': /<(link|script|img)[^>]+(qiniudn\.com|qbox\.me|clouddn\.com|qiniu\.com|qnssl\.com)[^>]+>/i,
  'Shibboleth': /<form action="\/idp\/Authn\/UserPassword" method="post">/,
  "Handlebars.js": /text\/x-handlebars-template/
};

let textTester = {
  "jsDoc": {
    url: "http://usejsdoc.org/",
    test: /generated\s+by\s+JSDoc\s+([\d\.]+)?/i
  },
  "ESDoc": {
    url: "https://esdoc.org/",
    test: /Generated\s+by\s+ESDoc([\(\)\d\.]+)?/i
  },
  "apiDoc": {
    url: "http://apidocjs.com/",
    test: /Generated with apiDoc/i
  },
  "Hexo": {
    url: "https://hexo.io",
    test: /Powered by Hexo/i
  }
};

// 根据html的内容来判断
export default function htmlParser(app = {}) {

  let html = document.documentElement.outerHTML;
  let text = document.documentElement.innerText;

  _.chain(htmlTester)
    .each((reg, appName)=>htmlTester[appName] = {test: reg, name: appName})
    .reject(v=>app[v.name])
    .filter(app=>app.test.test(html))
    .each(function (v) {
      app[v.name] = {
        exist: true,
        name: v.name
      }
    });

  _.chain(textTester)
    .each((v, name)=>v.name = name)
    // .reject(v=>app[v.name])
    .each(function (v) {
      let match = text.match(v.test);
      if (_.isEmpty(match)) return;
      app[v.name] = {
        url: v.url,
        exist: true,
        name: v.name,
        version: match[1] || null
      }
    });

  return app;
}