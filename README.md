# WatchDog

[![Greenkeeper badge](https://badges.greenkeeper.io/axetroy/WatchDog.svg)](https://greenkeeper.io/)

a chrome extension to detect the lib,framework,server.

**The extension is current in Beta**

## Supports

- Server: nginx, Apache, IIS, Express, PHP...
- Api: Google Maps, Baidu Map, Google Api, gaode Map...
- Program: Hexo, WordPress, Discuz...
- Polyfill: html5siv, json3, respond...
- Lib: moment, jQuery, Rxjs, Echarts, Lo-dash...
- tool: Webpack, Babel, Typescript
- Framework: Angular, Vue, React, Backbone...

## [中文文档](https://github.com/axetroy/WatchDog/blob/master/README-zh-CN.md)

## Usage

1. Clone the repository.
2. Install [yarn](https://yarnpkg.com): `npm install -g yarn`.
3. Run `yarn`.
4. Change the package's name and description on `package.json`.
5. Change the name of your extension on `src/manifest.json`.
6. Run `npm run start`
7. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.
8. Have fun.