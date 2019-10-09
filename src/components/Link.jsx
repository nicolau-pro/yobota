import React, { Component } from "react";

class Link extends Component {
  render() {
    var icon = "im im-" + this.props.icon;
    return (
      <React.Fragment>
        <div className="row links">
          <a href={this.props.href}>
            <div>
              <i className={icon}></i>
            </div>
            <div>{this.props.text}</div>
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default Link;
