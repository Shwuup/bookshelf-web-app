import React, { Fragment } from "react";
import { Card, Image } from "semantic-ui-react";
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
        <Card.Group>
          {bookList.books.map(book => (
            <Card>
              <Image src={book.image}></Image>
              <Card.Content>
                <Card.Header>{book.title}</Card.Header>
                <Card.Meta>{`${book.author.first_name} ${book.author.last_name}`}</Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Fragment>
    );
  }
}
export default BookList;
