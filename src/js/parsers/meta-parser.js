import _ from "underscore";

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
    "Tiki Wiki CMS Groupware": /Tiki/i,
    "GitBook": /GitBook\s([\d\.]+)/,
    "Discuz": /Discuz\!?\s?(\w+)/i
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

export default function metParser(app = {}) {

  _.each(document.getElementsByTagName("meta"), function (metaTag) {
    let name = metaTag.name || '';

    if (!metaReg[name]) return; // unknown meta

    _.each(metaReg[name], function (reg, appName) {
      if (app[appName]) return;       // 已经存在了，就不再检测了
      let match = reg.exec(metaTag.content);
      if (_.isEmpty(match)) return;   // not match
      if (match.length === 1) return app[appName] = {name: appName};    // not fount version
      app[appName] = {
        name: appName,
        version: match[1] ? match[1] : null
      };
    });
  });

  return app;

}