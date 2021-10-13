import axios from "axios";
import { debounce } from "lodash";
import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Search } from "semantic-ui-react";
import "./SearchBar.css";
import SearchResult from "./SearchResult";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: "",
      bookId: 0,
    };
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

  resultRenderer = ({ title, author, image }) => (
    <SearchResult title={title} author={author} image={image} />
  );

  handleSearchChange = (e) => {
    const value = e.target.value;
    this.setState({ isLoading: true, value });
    this.fetchBooks(value);
  };
  onResultSelect = (_, data) => {
    const bookId = data["result"]["book_id"];
    this.setState({ bookId: bookId, value: "" });
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Fragment>
        <div>
          <Search
            onSearchChange={this.handleSearchChange}
            onResultSelect={this.onResultSelect}
            value={value}
            results={results}
            loading={isLoading}
            resultRenderer={this.resultRenderer}
            placeholder={"Search for a book"}
          />
        </div>
        {this.state.bookId > 0 && (
          <Redirect to={`/book/${this.state.bookId}`} />
        )}
      </Fragment>
    );
  }
}

export default SearchBar;
