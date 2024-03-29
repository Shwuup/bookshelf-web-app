import React, { Fragment } from "react";
import styles from "./CurrentlyReading.module.css";
import Authors from "../Authors";
import BookTitle from "../BookTitle";
import "./CurrentlyReading.css";
import { Button } from "semantic-ui-react";

const CurrentlyReading = (props: any) => (
  <Fragment>
    <h3>Currently Reading</h3>
    {props.currentBooks.map((bookStatus: any) => (
      <div key={bookStatus.book_status_id} className={styles.container}>
        <div className={styles.imgDiv}>
          <img
            className={styles.itemCover}
            src={bookStatus.book.image}
            alt="book cover"
          />
        </div>
        <div className={styles.linkContainer}>
          <BookTitle book={bookStatus.book} />
          <Authors authors={bookStatus.book.author} />
          <Button
            primary
            className="finishedReading"
            content="Finished reading?"
            onClick={() => {
              props.setBookStatusModal(bookStatus);
              props.turnOnModal();
            }}
          />
        </div>
      </div>
    ))}
  </Fragment>
);
export default CurrentlyReading;
