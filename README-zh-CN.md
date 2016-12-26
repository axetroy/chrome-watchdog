# 看门狗

一个chrome扩展，用于检测类库，框架，服务器。

**扩展正在处于测试阶段**

## 支持

- 服务器: nginx, Apache, IIS, Express...
- Api: Google Maps, Baidu Map, Google Api, gaode Map...
- 程序: Hexo, WordPress...
- 补丁: html5siv, json3, respond...
- 库: moment, jQuery, Rxjs, Echarts, Lo-dash...
- 构建工具: Webpack, Babel
- 框架: Angular, Vue, React, Backbone...

## [English Documentation](https://github.com/axetroy/WatchDog/blob/master/README.md)

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