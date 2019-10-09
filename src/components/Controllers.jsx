import React, { Component } from "react";

class Controllers extends Component {
  constructor(props) {
    super(props);
    this.handleItemsPerPageChange = this.handleItemsPerPageChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
  }

  handleSortByChange(event) {
    this.props.handleSortByChange(parseInt(event.target.value));
  }

  handleItemsPerPageChange(event) {
    this.props.handleItemsPerPageChange(parseInt(event.target.value));
  }

  handleSearch(event) {
    this.props.handleSearch(event.target.value);
  }

  handleClearSearch(event) {
    var serchTectField = document.getElementById("serchTectField");
    serchTectField.value = "";
    this.props.handleSearch("");
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <section className="row controllers">
        <form onSubmit={this.handleSubmit}>
          <div className="form-select">
            <label htmlFor="selectSort">Items per page:</label>
            <select
              id="selectSort"
              className="custom-select custom-select-sm"
              onChange={this.handleItemsPerPageChange}
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="48">48</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Search by emplyee name"
              name="search"
              id="serchTectField"
              onChange={this.handleSearch}
            />
            <button type="button" onClick={this.handleClearSearch}>
              <i className="im im-x-mark"></i>
            </button>
          </div>
          <div className="form-select">
            <label htmlFor="selectSort">Sort by:</label>
            <select
              id="selectSort"
              className="custom-select custom-select-sm"
              onChange={this.handleSortByChange}
            >
              <option value="1">ID</option>
              <option value="2">Date of birth</option>
              <option value="3">Industry</option>
              <option value="4">Salary</option>
            </select>
          </div>
        </form>
      </section>
    );
  }
}

export default Controllers;
