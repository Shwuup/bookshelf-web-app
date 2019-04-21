import axios from "axios";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

class BookLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };
  }

  render() {
    const bookShelves = this.props.bookNameList;
    return (
      <Fragment>
        <h2>Book Lists</h2>
        {bookShelves.map(bookList => (
          <ul>
            <li>
              <Link to={"/user/booklist/" + bookList.name}>
                {bookList.name}
              </Link>
            </li>
          </ul>
        ))}
      </Fragment>
    );
  }
}

export default BookLists;
