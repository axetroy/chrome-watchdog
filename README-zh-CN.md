# 看门狗

一个chrome扩展，用于检测类库，框架，服务器。

**扩展正在处于测试阶段**

## 支持

- Server: nginx, Apache, IIS, Express, PHP...
- Api: Google Maps, Baidu Map, Google Api, gaode Map...
- Program: Hexo, WordPress, Discuz...
- Polyfill: html5siv, json3, respond...
- Lib: moment, jQuery, Rxjs, Echarts, Lo-dash...
- tool: Webpack, Babel, Typescript
- Framework: Angular, Vue, React, Backbone...

## 检测方式

1. 通过加载页面的后缀判断
    > 例如：home.php, home.asp
    
2. 通过window下的全局变量判断
    > 例如：window.jQuery
    
3. 通过cookies判断
    > 有些第三方会在cookie留下一些信息
    
4. 通过请求返回的header判断
    > 例如：PHP, nginx, express
    
5. 通过插入在html的script/stylesheet判断

6. 通过html的meta标签判断
    > 例如：<meta name="generator" content="Discuz! X3" />是Discuz论坛

7. 通过请求的url地址判断
    > 例如：maps.googleapis.com/xxxx则是谷歌地图api

8. 通过html中的注释代码判断
    > 一般就是兼容该死的IE而加入的一些polyfill
    
9. 通过检测页面内是否有一些关键字作为判断
    > 例如：Powered by Hexo, Generated with apiDoc
    
10. 通过class查找相应的css库
    > 例如：Font Awesome 以 .fa-xxx 的形式存在
    
11. Angular模块，通过获取注射器，然后尝试获取服务
    > 例如：获取UI-Router的$state服务, injector.get('$state')

## TODO

根据以上方式，管理好分类，重构扩展。

## [English Documentation](https://github.com/axetroy/WatchDog/blob/master/README.md)

## 如何使用

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