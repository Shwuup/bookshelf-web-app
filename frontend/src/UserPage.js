import axios from "axios";
import React from "react";
import "./UserPage.css";
import { Container, Message, Segment, Dropdown } from "semantic-ui-react";
import BookShelf from "./BookShelf";
import RadioButtons from "./RadioButtons";
import SearchBar from "./SearchBar";
import moment from "moment";
import { find } from "lodash";
class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      bookShelf: [],
      isLoaded: false,
      isResponseEmpty: true,
      readStatus: "unread",
      bookAlreadyInBookShelf: false,
      currentDropDownGenre: "All"
    };
  }

  componentDidMount() {
    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");

    axios
      .get("http://127.0.0.1:8000/books/", {
        headers: {
          Authorization: token
        }
      })
      .then(response => {
        const isEmpty = response.data.length === 0;
        this.setState({
          bookShelf: response.data,
          isLoaded: true,
          isResponseEmpty: isEmpty
        });
      })
      .catch(error => {
        this.setState({ isLoaded: true, error });
      });
  }

  handleChange = (_, { value }) => {
    this.setState({ readStatus: value });
  };

  addToRead = (_, data) => {
    const bookInfoId = data.value;
    const date = moment().format("DD/MM/YYYY");
    const currentBookShelf = this.state.bookShelf;
    const bookInfoIndex = currentBookShelf.findIndex(
      book_info => book_info.book_info_id === bookInfoId
    );
    const bookInfo = currentBookShelf[bookInfoIndex];
    bookInfo.date_finished_reading = date;
    bookInfo.is_read = true;

    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");
    fetch(`http://127.0.0.1:8000/books/${bookInfoId}/`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ dateAdded: date })
    }).then(() => this.setState({ bookShelf: currentBookShelf }));
  };

  onSearchResultSelect = (_, data) => {
    let date = null;
    let bookShelf = this.state.bookShelf;
    const newBook = data.result;
    const isAlreadyInBookShelf = bookShelf.find(
      book_info => book_info.book.book_id === newBook.book_id
    );
    if (isAlreadyInBookShelf) {
      this.setState({ bookAlreadyInBookShelf: true });
      setTimeout(() => this.setState({ bookAlreadyInBookShelf: false }), 3000);
    } else {
      if (this.state.readStatus === "read") {
        date = moment().format("DD/MM/YYYY");
      }
      const { cookies } = this.props;
      const token = cookies.get("tokenAuth");
      axios
        .post(
          "http://127.0.0.1:8000/books/",
          { bookId: newBook.book_id, dateRead: date },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          const bookInfo = response.data;
          bookShelf.push(bookInfo);
          this.setState({ bookShelf: bookShelf });
        });
    }
  };

  onDeleteBook = (_, data) => {
    const bookInfoId = data.value.bookInfoId;
    const bookId = data.value.bookId;
    const currentBookShelf = this.state.bookShelf;
    const newBookShelf = currentBookShelf.filter(
      book_info => book_info.book.book_id !== bookId
    );
    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");
    axios
      .delete(`http://127.0.0.1:8000/books/${bookInfoId}/`, {
        headers: {
          Authorization: token
        }
      })
      .then(() =>
        this.setState({
          bookShelf: newBookShelf
        })
      );
  };

  onDropDownChange = (_, data) => {
    const genre = data.value;
    this.setState({ currentDropDownGenre: genre });
  };

  filterByGenre = (books, genre) => {
    return genre === "All"
      ? this.state.bookShelf
      : books.filter(bookInfo =>
          find(bookInfo.book.genre, { genre_name: genre })
        );
  };

  render() {
    const genreOptions = [
      {
        key: "All",
        value: "All",
        text: "All",
        label: { color: "black", empty: true, circular: true }
      },
      {
        key: "Fiction",
        value: "Fiction",
        text: "Fiction",
        label: { color: "red", empty: true, circular: true }
      },
      {
        key: "Fantasy",
        value: "Fantasy",
        text: "Fantasy",
        label: { color: "green", empty: true, circular: true }
      },
      {
        key: "Nonfiction",
        value: "Nonfiction",
        text: "Nonfiction",
        label: { color: "grey", empty: true, circular: true }
      }
    ];

    return (
      <Container>
        <h1>bookshelf.</h1>
        <div className="search">
          <SearchBar onResultSelect={this.onSearchResultSelect} />
        </div>
        <Dropdown
          placeholder="Filter by genre"
          selection
          options={genreOptions}
          onChange={this.onDropDownChange}
        />

        {this.state.bookAlreadyInBookShelf && (
          <Message negative floating>
            You've already added this book to your bookshelf
          </Message>
        )}

        {this.state.isResponseEmpty && (
          <h2>You currently don't have any books added</h2>
        )}

        <Segment>
          <div className="slider">
            <RadioButtons
              newReadStatus={this.state.readStatus}
              handleChange={this.handleChange}
            />
          </div>

          {this.state.isLoaded && !this.state.isResponseEmpty && (
            <BookShelf
              onDelete={this.onDeleteBook}
              readStatus={this.state.readStatus}
              bookShelf={this.filterByGenre(
                this.state.bookShelf,
                this.state.currentDropDownGenre
              )}
              addToRead={this.addToRead}
            />
          )}
        </Segment>
      </Container>
    );
  }
}

export default UserPage;
