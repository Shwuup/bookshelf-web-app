import axios from "axios";
import React from "react";
import "./UserPage.css";
import { Container, Button, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { find } from "lodash";
import BookList from "./BookList";
import RadioButtons from "./RadioButtons";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      bookShelves: [],
      bookLists: [],
      isLoaded: false,
      isResponseEmpty: true,
      value: "",
      readStatus: "unread"
    };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getBookListNames(bookList) {
    return bookList.name;
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
        const isEmpty = response.data.length === 0;
        const bookListNames = response.data.map(this.getBookListNames);

        this.setState({
          bookShelves: response.data,
          isLoaded: true,
          isResponseEmpty: isEmpty,
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
  handleChange(_, { value }) {
    this.setState({ readStatus: value });
  }

  render() {
    const options = this.state.bookLists.map(bookListName => {
      return { text: bookListName, key: bookListName, value: bookListName };
    });
    const bookList = find(this.state.bookShelves, { name: this.state.value });

    return (
      <Container>
        <h1>bookshelf.</h1>
        <RadioButtons
          newReadStatus={this.state.readStatus}
          handleChange={this.handleChange}
        />
        <Dropdown
          selection
          value={this.state.value}
          options={options}
          onChange={this.onChange}
        />
        <Button as={Link} to="/add" primary>
          Add Book List
        </Button>
        {this.state.isResponseEmpty && <h2>No Book Lists have been added</h2>}

        {this.state.isLoaded && !this.state.isResponseEmpty && (
          <BookList readStatus={this.state.readStatus} bookList={bookList} />
        )}
      </Container>
    );
  }
}

export default UserPage;
