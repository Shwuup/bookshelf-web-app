import React, { Fragment } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import "./BookList.css";

const BookList = props => {
  const { bookList, readStatus } = props;

  return (
    <Fragment>
      <h2>Book List: {bookList.name}</h2>
      <Card.Group stackable>
        {bookList.book_infos
          .filter(book_info =>
            readStatus === "read" ? book_info.is_read : !book_info.is_read
          )
          .map(book_info => (
            <Card key={book_info.book.book_id}>
              <Image src={book_info.book.image}></Image>
              <Card.Content>
                <Card.Header>{book_info.book.title}</Card.Header>
                <Card.Meta>{`${book_info.book.author.first_name} ${book_info.book.author.last_name}`}</Card.Meta>
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

export default BookList;
