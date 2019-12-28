import axios from "axios";
import React from "react";
import { Search } from "semantic-ui-react";
import { debounce } from "lodash";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, results: [], value: "" };
    this.fetchBooks = debounce(this.fetchBooks, 300);
  }

  fetchBooks = value => {
    axios.get("http://127.0.0.1:8000/search/?query=" + value).then(response => {
      this.setState({
        results: response.data,
        isLoading: false
      });
    });
  };

  handleSearchChange = e => {
    const value = e.target.value;
    this.setState({ isLoading: true, value });
    this.fetchBooks(value);
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Search
        onSearchChange={this.handleSearchChange}
        value={value}
        results={results}
        loading={isLoading}
      />
    );
  }
}

export default SearchBar;
