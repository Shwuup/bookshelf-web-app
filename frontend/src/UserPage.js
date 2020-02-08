import axios from "axios";
import React from "react";
import "./UserPage.css";
import { Container, Button, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { find } from "lodash";
import BookList from "./BookList";
import RadioButtons from "./RadioButtons";
import SearchBar from "./SearchBar";
import moment from "moment";
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

  onChange = (_, data) => {
    this.setState({ value: data.value });
  };
  handleChange = (_, { value }) => {
    this.setState({ readStatus: value });
  };
  updateBookList = currentBookList => {
    const bookListId = currentBookList.id;
    const bookListIndex = this.state.bookShelves.find(x => x.id === bookListId);
    const currentBookShelf = this.state.bookShelves;
    currentBookShelf[bookListIndex] = currentBookList;
    this.setState({ bookShelves: currentBookShelf });
  };

  addToRead = (_, data) => {
    const bookInfoId = data.value;
    const date = moment().format("DD/MM/YYYY");
    const currentBookList = this.getCurrentBookList();
    const bookInfoIndex = currentBookList.book_infos.findIndex(
      book_info => book_info.book_info_id === bookInfoId
    );
    const bookInfo = currentBookList.book_infos[bookInfoIndex];
    bookInfo.date_finished_reading = date;
    bookInfo.is_read = true;

    this.updateBookList(currentBookList);

    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");
    axios.put("http://127.0.0.1:8000/add-book-to-read", {
      headers: {
        Authorization: token
      },
      data: { bookInfoId: bookInfoId }
    });
  };

  onSearchResultSelect = (_, data) => {
    let bookList = this.getCurrentBookList();
    const bookListId = bookList.id;
    const newBook = data.result;
    const newBookInfo = {
      book_list: "#",
      book_info_id: "#",
      book: newBook,
      date_finished_reading: null,
      is_read: false
    };
    bookList.book_infos.push(newBookInfo);
    this.updateBookList(bookList);

    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");
    axios.post(
      "http://127.0.0.1:8000/add-new-book",
      { bookListId: bookListId, bookId: newBook.book_id },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      }
    );
  };

  onDeleteBookList = () => {
    let newBookLists = this.state.bookLists.filter(
      name => name !== this.state.value
    );
    const id = this.getCurrentBookList().id;
    this.setState({
      bookLists: newBookLists,
      value: newBookLists[0]
    });

    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");
    axios.delete("http://127.0.0.1:8000/delete-book-list", {
      headers: {
        Authorization: token
      },
      data: { id: id }
    });
  };

  onDeleteBook = (_, data) => {
    const bookInfoId = data.value;
    const currentBookList = this.getCurrentBookList();
    const bookListId = currentBookList.id;
    const newBookInfoList = currentBookList.book_infos.filter(
      book_info => book_info.book_info_id !== bookInfoId
    );
    currentBookList.book_infos = newBookInfoList;
    this.updateBookList(currentBookList);

    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");
    axios.delete("http://127.0.0.1:8000/delete-book", {
      headers: {
        Authorization: token
      },
      data: { bookInfoId: bookInfoId, bookListId: bookListId }
    });
  };

  getCurrentBookList() {
    return find(this.state.bookShelves, { name: this.state.value });
  }

  render() {
    const options = this.state.bookLists.map(bookListName => {
      return { text: bookListName, key: bookListName, value: bookListName };
    });
    const bookList = this.getCurrentBookList();

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
        <SearchBar onResultSelect={this.onSearchResultSelect} />
        <Button as={Link} to="/add" primary>
          Add Book List
        </Button>
        <Button onClick={this.onDeleteBookList}>Delete Book List</Button>
        {this.state.isResponseEmpty && <h2>No Book Lists have been added</h2>}

        {this.state.isLoaded && !this.state.isResponseEmpty && (
          <BookList
            onDelete={this.onDeleteBook}
            readStatus={this.state.readStatus}
            bookList={bookList}
            addToRead={this.addToRead}
          />
        )}
      </Container>
    );
  }
}

export default UserPage;
