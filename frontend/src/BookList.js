import React, { Fragment } from "react";
import { Card, Image } from "semantic-ui-react";
import "./BookList.css";

const BookList = props => {
  const { bookList, readStatus } = props;

  return (
    <Fragment>
      <h2>Book List: {bookList.name}</h2>
      <Card.Group>
        {bookList.book_infos
          .filter(book_info =>
            readStatus === "unread" ? !book_info.is_read : book_info.is_read
          )
          .map(book_info => (
            <Card key={book_info.book_info_id}>
              <Image src={book_info.book.image}></Image>
              <Card.Content>
                <Card.Header>{book_info.book.title}</Card.Header>
                <Card.Meta>{`${book_info.book.author.first_name} ${book_info.book.author.last_name}`}</Card.Meta>
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </Fragment>
  );
};

export default BookList;
