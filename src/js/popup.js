import "../css/popup.css";
import {h, render, Component} from 'preact';
import _ from 'underscore';
import transform from './lib/transform';

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
    this.state.bg = chrome.extension.getBackgroundPage();
    this.state.apps = {};
    this.state.tab = {};

    this.initData();

    chrome.runtime.onMessage.addListener((request, sender, response)=> {
      switch (request.action) {
        case 'UPDATE:POP':
          this.setState({apps: transform(request.app)});
          break;
      }
    });

  }

  initData() {
    chrome.tabs.getSelected(null, (tab)=> {
      this.state.tab = tab;
      chrome.runtime.sendMessage({action: 'GET', id: tab.id}, (response)=> {
        let apps = this.state.bg.tabInfo[tab.id];
        this.setState({apps: transform(apps)});
      });
    });
  }

  imgErrorHandler(event) {
    let ele = event.srcElement;
    ele.src = 'ico/unknown.ico';
  }

  renderList(apps) {
    return _.map(apps, app=> {
      return (
        <a target="_blank" href={app.url ? app.url : 'javascript: void 0'} title={app.url} app={JSON.stringify(app)}>
          <img className={"ico"} src={"ico/" + (app.name || '').replace(/\s+/, '-') + ".ico"}
               onerror={this.imgErrorHandler}/>
          {app.name}&nbsp;
          <span className={"version"}>{app.version || ''}</span>
        </a>
      );
    });
  }

  render(props, state) {
    return (
      <div>
        {this.renderList(state.apps)}
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