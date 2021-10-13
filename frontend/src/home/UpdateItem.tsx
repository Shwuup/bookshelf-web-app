import moment from "moment";
import React from "react";
import { Rating } from "semantic-ui-react";
import Authors from "../Authors";
import BookTitle from "../BookTitle";
import DeleteButton from "../shelf/DeleteButton";
import ShelfDropdown from "../ShelfDropdown";
import styles from "./UpdateItem.module.css";
import "./UpdateItem.css";
import { Update } from "../types";

interface UpdateItemProps {
  update: Update;
  deleteOnClick: (updateId: number) => void;
  renderWithoutDeletedItem: (id: number) => void;
  onDropdownClick: (updateType: string, update: Update) => void;
}

const decideHeader = (type: string) => {
  switch (type) {
    case "rating":
      return <p>You rated a book</p>;
    case "read":
      return <p>You finished reading</p>;
    case "reading":
      return <p>You started reading</p>;
    case "want to read":
      return <p>You want to read</p>;
  }
};

const getTimePassed = (timestamp: number) => {
  return moment.unix(timestamp).fromNow();
};

const shortenBlurb = (blurb: string) => {
  const shortenedBlurb = blurb.slice(0, 200);
  return `${shortenedBlurb}...`;
};

const UpdateItem = ({
  deleteOnClick,
  renderWithoutDeletedItem,
  onDropdownClick,
  update,
}: UpdateItemProps) => {
  const { book_status } = update;
  const { book } = book_status;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.updateDetails}>
          <div className={styles.updateText}>{decideHeader(update.status)}</div>
          {update.status === "rating" && (
            <Rating rating={update.rating} maxRating={5} disabled></Rating>
          )}
        </div>
        <div className={styles.updateDeleteButton}>
          <DeleteButton
            deleteOnClick={deleteOnClick}
            renderWithoutDeletedItem={renderWithoutDeletedItem}
            id={update.update_id!}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.imageDiv}>
          <img
            className={styles.updateItemCover}
            src={book.image}
            alt={`Cover of the book: ${book.title}`}
          />
        </div>

        <div className={styles.text}>
          <BookTitle book={book} />
          <Authors authors={book.author} />
          <p>
            {shortenBlurb(book.blurb)}{" "}
            <a href={`/book/${book.book_id}`}>Continue reading</a>
          </p>
          <div className={styles.dropdown}>
            <ShelfDropdown
              bookStatus={update.book_status}
              update={update}
              onDropdownClick={onDropdownClick}
            />
          </div>
          <div className={styles.time}>{getTimePassed(update.timestamp)}</div>
        </div>
      </div>
    </div>
  );
};
export default UpdateItem;
