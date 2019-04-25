import React, { Fragment } from "react";
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
        {bookShelf.books.map(book => (
          <ul>
            <li>{book.title}</li>
            <img src={book.book_cover_path} />
          </ul>
        ))}
      </Fragment>
    );
  }
}
export default BookList;
