import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/App.css";
import MenuLink from "./components/MenuLink";
import Controllers from "./components/Controllers";
import Pages from "./components/Pages";
import Display from "./components/Display";
import Charts from "./components/pages/Charts";

class App extends Component {
  constructor(props) {
    super(props);
    var data = require("./MOCK_DATA.json");
    this.state = {
      data: data,
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: 6,
      filter: "",
      filteredItems: data,
      diplayItems: [],
      sortBy: {
        id: 1,
        dob: 2,
        industry: 3,
        salary: 4
      }
    };
  }

  compareNumbers = (a, b) => {
    if (a && b) {
      return parseInt(a) < parseInt(b) ? -1 : parseInt(a) > parseInt(b) ? 1 : 0;
    } else return 0;
  };

  compareStrings = (a, b) => {
    if (a && b) {
      a = a.toLowerCase();
      b = b.toLowerCase();
      return a < b ? -1 : a > b ? 1 : 0;
    } else return 0;
  };

  compareId = (a, b) => {
    return this.compareNumbers(a.id, b.id);
  };

  compareDob = (a, b) => {
    if (a.date_of_birth && b.date_of_birth) {
      a = a.date_of_birth.split("/");
      a = parseInt(a[0]) + parseInt(a[1]) * 30 + parseInt(a[2]) * 365;
      b = b.date_of_birth.split("/");
      b = parseInt(b[0]) + parseInt(b[1]) * 30 + parseInt(b[2]) * 365;
      return this.compareNumbers(a, b);
    } else return 0;
  };

  compareIndustry = (a, b) => {
    return this.compareStrings(a.industry, b.industry);
  };

  compareSalary = (a, b) => {
    return this.compareNumbers(a.salary, b.salary);
  };

  setTotalPages = arr => {
    this.setState({
      totalPages: Math.ceil(arr.length / this.state.itemsPerPage)
    });
  };

  setDisplayItems = arr => {
    var from = this.state.currentPage * this.state.itemsPerPage;
    this.setState({
      diplayItems: arr.slice(from, from + this.state.itemsPerPage)
    });
  };

  NavigateToPage = p => {
    var range = {
      from: (p - 1) * this.state.itemsPerPage,
      to: p * this.state.itemsPerPage
    };
    this.setState({
      diplayItems: this.state.filteredItems.slice(range.from, range.to),
      currentPage: p
    });
  };

  NavigateToPrevPage = () => {
    var current = this.state.currentPage;
    if (current > 1) this.NavigateToPage(current - 1);
  };

  NavigateToNextPage = () => {
    var current = this.state.currentPage;
    if (current < this.state.totalPages) this.NavigateToPage(current + 1);
  };

  handleSortByChange = v => {
    var filteredItems = this.state.filteredItems;

    switch (v) {
      case this.state.sortBy.dob:
        filteredItems = filteredItems.sort(this.compareDob);
        break;
      case this.state.sortBy.industry:
        filteredItems = filteredItems.sort(this.compareIndustry);
        break;
      case this.state.sortBy.salary:
        filteredItems = filteredItems.sort(this.compareSalary);
        break;
      default:
        filteredItems = filteredItems.sort(this.compareId);
    }

    this.setState({
      diplayItems: filteredItems
    });

    this.NavigateToPage(1);
  };

  handleItemsPerPageChange = v => {
    this.setState({
      itemsPerPage: v,
      currentPage: 1,
      totalPages: Math.ceil(this.state.filteredItems.length / v),
      diplayItems: this.state.filteredItems.slice(0, v)
    });
  };

  filterData = (data, includeText) => {
    var filteredData = [];
    includeText = includeText.toLowerCase();

    for (var i = 0; i < data.length; i++) {
      var first_name = data[i].first_name || "";
      var last_name = data[i].last_name || "";

      if (
        first_name.toLowerCase().includes(includeText) ||
        last_name.toLowerCase().includes(includeText)
      )
        filteredData.push(data[i]);
    }
    //console.log(filteredData.length + " results for " + includeText);
    return filteredData;
  };

  handleSearch = searchText => {
    this.handleSearchData(this.state.data, searchText);
  };

  handleSearchData = (data, searchText) => {
    var filteredItems = this.filterData(data, searchText);
    this.setState({
      filter: searchText,
      filteredItems,
      totalPages: Math.ceil(filteredItems.length / this.state.itemsPerPage),
      diplayItems: filteredItems.slice(0, this.state.itemsPerPage),
      currentPage: 1
    });
  };

  componentDidMount() {
    this.setTotalPages(this.state.data);
    this.setDisplayItems(this.state.data);
    this.NavigateToPage(1);
    console.log("Loaded");
  }

  render() {
    return (
      <Router>
        <Route
          exact
          path="/"
          render={props => (
            <React.Fragment>
              <MenuLink
                icon="pie-chart"
                to="/charts"
                text="Go to charts section"
              />
              <Controllers
                handleItemsPerPageChange={this.handleItemsPerPageChange}
                handleSearch={this.handleSearch}
                handleSortByChange={this.handleSortByChange}
              />
              <Pages
                pages={{
                  total: this.state.totalPages,
                  current: this.state.currentPage
                }}
                NavigateToPage={this.NavigateToPage}
                NavigateToPrevPage={this.NavigateToPrevPage}
                NavigateToNextPage={this.NavigateToNextPage}
              />
              <Display data={this.state.diplayItems} />
            </React.Fragment>
          )}
        />
        <Route
          path="/charts"
          render={props => (
            <React.Fragment>
              <MenuLink icon="data" to="/" text="Go to list section" />
              <Charts data={this.state.data} />
            </React.Fragment>
          )}
        />
      </Router>
    );
  }
}

export default App;
