import React, { Component } from "react";
import DisplayItem from "./DisplayItem";

class Display extends Component {
  render() {
    var employees = this.props.data;
    return (
      <section className="row display">
        {employees.map(employee => (
          <DisplayItem key={employee.id} employee={employee}></DisplayItem>
        ))}
      </section>
    );
  }
}

export default Display;
