import React, { Fragment } from "react";
import { Button } from "semantic-ui-react";
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
            <p>{book.author}</p>
            <img src={book.book_cover_path} />
          </div>
        ))}
      </Fragment>
    );
  }
}
export default BookList;
