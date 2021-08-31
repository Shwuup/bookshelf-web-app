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

  fetchBooks = (value) => {
    if (value.length < 1) {
      this.setState({ isLoading: false });
      return;
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/search/?query=${value}`)
        .then((response) => {
          this.setState({
            results: response.data,
            isLoading: false,
          });
        });
    }
  };

  eraseValueComp = () => {
    this.setState({
      value: "",
    });
  };

  handleSearchChange = (e) => {
    const value = e.target.value;
    this.setState({ isLoading: true, value });
    this.fetchBooks(value);
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <div>
        <Search
          style={this.props.style}
          onSearchChange={this.handleSearchChange}
          onResultSelect={this.props.onResultSelect}
          onMouseDown={this.eraseValueComp}
          value={value}
          results={results}
          loading={isLoading}
          placeholder={"Add a book"}
        />
      </div>
    );
  }
}

export default SearchBar;
