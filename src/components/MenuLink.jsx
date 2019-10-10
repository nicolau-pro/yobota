import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class MenuLink extends Component {
  render() {
    var icon = "im im-" + this.props.icon;
    return (
      <React.Fragment>
        <div className="row links">
          <Link to={this.props.to}>
            <div>
              <i className={icon}></i>
            </div>
            <div>{this.props.text}</div>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default MenuLink;
