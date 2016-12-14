import "../css/popup.css";
import {h, render, Component} from 'preact';
import _ from 'underscore';

class List extends Component {
  constructor() {
    super();
    this.state.bg = chrome.extension.getBackgroundPage();
    this.state.info = {};

    chrome.tabs.getSelected(null, (tab)=> {
      chrome.tabs.sendMessage(tab.id, {type: 0, tab: tab.id}, (response)=> {
        let currentTabInfo = this.state.bg.tabInfo[tab.id];
        this.setState({info: currentTabInfo});
      });
    });

  }

  imgErrorHandler(event) {
    let ele = event.srcElement;
    ele.style.visibility = 'hidden';
  }

  renderList(info) {
    return _.chain(info)
      .values()
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
}

render(<List />, document.body);