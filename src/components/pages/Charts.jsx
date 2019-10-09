import React, { Component } from "react";
import CanvasJSReact from "../libraries/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends Component {
  getSalaryOptions = input => {
    const salaryStep = 20000;
    var salaries = [];
    var salaryCounts = {};
    var dataPointsSalary = [];

    for (var s = 0; s < input.length; s++)
      if (input[s].salary > 0)
        salaries.push(salaryStep * Math.floor(input[s].salary / salaryStep));

    salaries.forEach(function(x) {
      salaryCounts[x] = (salaryCounts[x] || 0) + 1;
    });

    Object.keys(salaryCounts).map(function(key) {
      return dataPointsSalary.push({
        y: salaryCounts[key],
        label:
          key / 1000 + "-" + (parseInt(key / 1000) + salaryStep / 1000) + "K"
      });
    });

    const options = {
      exportEnabled: true,
      animationEnabled: true,
      data: [
        {
          type: "column",
          dataPoints: dataPointsSalary
        }
      ]
    };

    return options;
  };

  getAge = dob => {
    var dateParts = dob.split("/");
    var checkindate = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
    var ageDifMs = Date.now() - checkindate;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  getAgeOptions = input => {
    const ageStep = 10;
    var ages = [];
    var ageCounts = {};
    var dataPointsAge = [];

    for (var a = 0; a < input.length; a++)
      ages.push(
        ageStep * Math.floor(this.getAge(input[a].date_of_birth) / ageStep)
      );

    ages.forEach(function(x) {
      ageCounts[x] = (ageCounts[x] || 0) + 1;
    });
    console.log(ageCounts);

    Object.keys(ageCounts).map(function(key) {
      return dataPointsAge.push({
        y: (ageCounts[key] * 100) / input.length,
        label: key + " to " + (parseInt(key) + ageStep)
      });
    });

    dataPointsAge[0].label = "18 to " + dataPointsAge[0].label.split(" ")[2];

    const options = {
      exportEnabled: true,
      animationEnabled: true,
      data: [
        {
          type: "doughnut",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 12,
          indexLabel: "{label} - {y}%",
          dataPoints: dataPointsAge
        }
      ]
    };

    return options;
  };

  getSalaryVsExperienceOptions = input => {
    var dataPoints = [];

    for (var i of input) {
      var salary = Math.round(i.salary / 100) / 10;
      var years_of_experience = i.years_of_experience;

      if (i.salary && i.years_of_experience)
        dataPoints.push({ x: salary, y: years_of_experience });
    }

    console.log(dataPoints);

    const options = {
      animationEnabled: true,
      zoomEnabled: true,
      axisX: {
        title: "Salary (in 1000 GBP)",
        suffix: "K",
        crosshair: {
          enabled: true,
          snapToDataPoint: false
        }
      },
      axisY: {
        title: "Experience (years)",
        includeZero: false,
        crosshair: {
          enabled: true,
          snapToDataPoint: false
        }
      },
      data: [
        {
          type: "scatter",
          markerSize: 10,
          toolTipContent:
            "<b>Salary: </b> £{x}K<br/><b>Experience: </b>{y}years",
          dataPoints: dataPoints
        }
      ]
    };

    return options;
  };
  render() {
    var input = this.props.data;

    return (
      <React.Fragment>
        <section className="row charts">
          <h2>Age distribution</h2>
          <CanvasJSChart options={this.getAgeOptions(input)} />
        </section>
        <section className="row charts">
          <h2>Salary distribution</h2>
          <CanvasJSChart options={this.getSalaryOptions(input)} />
        </section>
        <section className="row charts">
          <h2>Salary vs experience</h2>
          <CanvasJSChart options={this.getSalaryVsExperienceOptions(input)} />
        </section>
      </React.Fragment>
    );
  }
}

export default Charts;
