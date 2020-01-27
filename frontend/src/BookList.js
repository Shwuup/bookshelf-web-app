import React, { Fragment } from "react";
import { Button } from "semantic-ui-react";
import "./BookList.css";

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };
  }

  render() {
    const { bookList } = this.props;
    return (
      <Fragment>
        <h2>Book List: {bookList.name}</h2>
        {bookList.books.map(book => (
          <div>
            <img src={book.image} />
            <p>{book.title}</p>
            <p>{`${book.author.first_name} ${book.author.last_name}`}</p>
          </div>
        ))}
      </Fragment>
    );
  }
}
export default BookList;
