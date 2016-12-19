import "../css/popup.css";
import {h, render, Component} from 'preact';
import _ from 'underscore';

class List extends Component {
  constructor() {
    super();
    this.state.bg = chrome.extension.getBackgroundPage();
    this.state.info = {};
    this.state.tab = {};

    chrome.tabs.getSelected(null, (tab)=> {
      this.state.tab = tab;
      chrome.runtime.sendMessage({action: 'GET', id: tab.id}, (response)=> {
        let currentTabInfo = this.state.bg.tabInfo[tab.id];
        this.setState({info: currentTabInfo});
      });
    });
  }

  imgErrorHandler(event) {
    let ele = event.srcElement;
    // ele.style.visibility = 'hidden';
    ele.src = 'ico/unknown.ico';
  }

  renderList(info) {
    info = _.extend({}, info.server, info.client);
    return _.chain(info)
      .values()
      .sortBy(app=>app.name)
      .map(app=> {
        if (_.isEmpty(app) || _.isEmpty(app.name)) return void 0;
        return (
          <a target="_blank" href={app.url ? app.url : 'javascript: void 0'} title={app.url}>
            <img className={"ico"} src={"ico/" + (app.name || '').replace(/\s+/, '-') + ".ico"}
                 onerror={this.imgErrorHandler}/>
            {app.name}&nbsp;
            <span className={"version"}>{app.version || ''}</span>
          </a>
        )
      })
      .filter(v=>v)
      .value();
  }

  render(props, state) {
    return (
      <div>
        {this.renderList(state.info)}
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
      app: this.state.bg.tabInfo[currentTab.id]
    });
    return true;
  }

}

render(<List />, document.body);