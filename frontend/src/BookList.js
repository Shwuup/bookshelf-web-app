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
    const { bookShelf } = this.props.location.state;
    return (
      <Fragment>
        <h2>Book List: {bookShelf.name}</h2>
        <div>
          <Button>Add Book</Button>
        </div>
        {bookShelf.books.map(book => (
          <div>
            <p>{book.title}</p>
            <p>{`${book.author.first_name} ${book.author.last_name}`}</p>
            <img src={book.image} />
          </div>
        ))}
      </Fragment>
    );
  }
}
export default BookList;
