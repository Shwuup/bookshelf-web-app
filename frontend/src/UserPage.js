import axios from "axios";
import React, { Fragment } from "react";
import BookLists from "./BookLists";
import "./UserPage.css";
import SearchBar from "./SearchBar";
import { Dimmer, Button, Dropdown, Radio } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { find } from "lodash";
import BookList from "./BookList";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      bookShelves: [],
      bookLists: [],
      isLoaded: false,
      value: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  getBookListNames(bookList) {
    return bookList["name"];
  }

  componentDidMount() {
    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");

    axios
      .get("http://127.0.0.1:8000/api/user/booklist/", {
        headers: {
          Authorization: token
        }
      })
      .then(response => {
        const bookListNames = response.data.map(this.getBookListNames);
        this.setState({
          bookShelves: response.data,
          isLoaded: true,
          bookLists: bookListNames,
          value: bookListNames[0]
        });
      })
      .catch(error => {
        this.setState({ isLoaded: true, error });
      });
  }

  onChange(_, data) {
    this.setState({ value: data.value });
  }

  render() {
    const options = this.state.bookLists.map(bookListName => {
      return { text: bookListName, key: bookListName, value: bookListName };
    });
    const bookList = find(this.state.bookShelves, { name: this.state.value });

    return (
      <Fragment>
        <h1>bookshelf.</h1>

        <Dropdown
          selection
          value={this.state.value}
          options={options}
          onChange={this.onChange}
        />
        <Button as={Link} to="/add" primary>
          Add Book List
        </Button>
        {this.state.isLoaded && <BookList bookList={bookList} />}
      </Fragment>
    );
  }
}

export default UserPage;
