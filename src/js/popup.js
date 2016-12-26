import "../css/popup.css";
import {h, render, Component} from 'preact';
import _ from 'underscore';
import {resolveImg} from './lib/resolveImg';

/**
 * 设计流程：
 *
 * 1. 初始化，从background获取数据
 * 2. 根据数据渲染页面
 * 3. 渲染完成，发送消息给background
 *
 * 监听：
 *    background发获取新的header的时候，发送消息给popup，根据新数据更新视图
 *
 */


class List extends Component {
  constructor() {
    super();
    this.state.global = chrome.extension.getBackgroundPage();       // 全局对象
    this.state.apps = [];                                           // 当前apps列表
    this.state.tab = {};                                            // 当前标签
    this.state.store = this.state.global.store;                     // 存储器

    this.initData();

    chrome.runtime.onMessage.addListener((request, sender, response)=> {
      switch (request.action) {
        case 'UPDATE:POP':
          chrome.tabs.getSelected(null, (tab)=> {
            this.state.tab = tab;
            if (tab.id !== request.id) return;
            this.setState({apps: request.data});
          });
          break;
      }
    });

  }

  static normalizeName(name) {
    return name.replace(/\s+/g, '-');
  }

  initData() {
    chrome.tabs.getSelected(null, (tab)=> {
      this.state.tab = tab;
      chrome.runtime.sendMessage({action: 'GET', id: tab.id}, (response)=> {
        let apps = this.state.store.list(tab.id);
        this.setState({apps});
      });
    });
  }

  imgErrorHandler(event) {
    let ele = event.srcElement;
    ele.setAttribute('init-src', ele.src);
    let name = ele.getAttribute('app');
    resolveImg(`ico/${List.normalizeName(name)}`, ['.png', '.jgp'])
      .then(function (img) {
        ele.src = img.src;
      })
      .catch(function () {
        ele.src = 'ico/unknown.ico';
      });
  }

  renderList(apps) {
    return _.chain(apps)
      .filter(app=>app.name)
      .map(app=> {
        let url = app.url || `https://www.google.com/#q=${app.name}`;
        return (
          <a target="_blank" href={url} title={url}
             app={JSON.stringify(app)}>
            <img className={"ico"} src={"ico/" + List.normalizeName(app.name) + ".ico"} app={app.name}
                 onerror={this.imgErrorHandler}/>
            {app.name}&nbsp;
            <span className={"version"}>{app.version || ''}</span>
          </a>
        );
      })
      .value();
  }

  render(props, state) {
    return (
      <div>
        {this.renderList(state.apps)}
        <div style={{display: 'none'}}>
          {JSON.stringify(state.apps, null, 2)}
        </div>
      </div>
    )
  }

  // after render
  componentDidUpdate() {
    let currentTab = this.state.tab;
    chrome.runtime.sendMessage({
      action: 'POP:DONE',
      id: currentTab.id,
      title: currentTab.title,
      app: this.state.apps
    });
    return true;
  }

}

render(<List />, document.body);