import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class BookLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      bookShelves: [],
      isLoaded: false
    };
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
        this.setState({ bookShelves: response.data, isLoaded: true });
      })
      .catch(error => {
        this.setState({ isLoaded: true, error });
      });
  }

  render() {
    const { error, bookShelves, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return bookShelves.map(bookList => (
        <ul>
          <li>
            <Link to={"/user/booklist/" + bookList.name}>{bookList.name}</Link>
          </li>
        </ul>
      ));
    }
  }
}

export default BookLists;
