import React, { Component } from "react";

class DisplayItem extends Component {
  render() {
    var employee = this.props.employee;
    return (
      <React.Fragment>
        <div className="col-lg-6 col-md-12">
          <div>
            <ul>
              {Object.keys(employee).map(function(key) {
                const cleanKey = (key || "").toString().replace(/_/g, " ");
                return (
                  <li key={key}>
                    <span>{cleanKey}</span>
                    <span>{employee[key]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DisplayItem;
