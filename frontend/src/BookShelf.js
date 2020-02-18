import React, { Fragment } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import "./BookShelf.css";

const outputNames = book => {
  if (book.author.length === 1) {
    return `${book.author[0].first_name} ${book.author[0].last_name}`;
  } else if (book.author.length >= 1) {
    const l = book.author.slice(1);
    return l.reduce((acc, authorObj) => {
      return `${acc}, ${authorObj.first_name} ${authorObj.last_name}`;
    }, `${book.author[0].first_name} ${book.author[0].last_name}`);
  }
};

const BookShelf = props => {
  const { bookShelf, readStatus } = props;

  return (
    <Fragment>
      <Card.Group stackable>
        {bookShelf
          .filter(book_info =>
            readStatus === "read" ? book_info.is_read : !book_info.is_read
          )
          .map(book_info => (
            <Card key={book_info.book.book_id}>
              <Image src={book_info.book.image}></Image>
              <Card.Content>
                <Card.Header>{book_info.book.title}</Card.Header>
                <Card.Meta>{outputNames(book_info.book)}</Card.Meta>
                {readStatus === "read" && (
                  <Card.Content>{`Finished reading: ${book_info.date_finished_reading}`}</Card.Content>
                )}
              </Card.Content>
              {readStatus === "unread" && (
                <Button
                  value={book_info.book_info_id}
                  primary
                  onClick={props.addToRead}
                >
                  Add to read
                </Button>
              )}

              <Button
                value={{
                  bookInfoId: book_info.book_info_id,
                  bookId: book_info.book.book_id
                }}
                onClick={props.onDelete}
              >
                Delete
              </Button>
            </Card>
          ))}
      </Card.Group>
    </Fragment>
  );
};

export default BookShelf;
