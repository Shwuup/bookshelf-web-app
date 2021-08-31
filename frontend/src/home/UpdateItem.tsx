import moment from "moment";
import React from "react";
import { Rating } from "semantic-ui-react";
import Authors from "../Authors";
import BookTitle from "../BookTitle";
import ShelfDropdown from "../ShelfDropdown";
import styles from "./UpdateItem.module.css";

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

const UpdateItem = ({ onDropdownClick, update }: any) => (
  <div className={styles.card}>
    <div className={styles.header}>
      <div className={styles.updateDetails}>
        <div className={styles.updateText}>{decideHeader(update.type)}</div>
        {update.type === "rating" && (
          <Rating rating={update.rating} maxRating={5} disabled></Rating>
        )}
      </div>
      <div className={styles.time}>
        <p>{getTimePassed(update.timestamp)}</p>
      </div>
    </div>
    <div className={styles.content}>
      <img
        className={styles.updateItemCover}
        src={update.book.image_url}
        alt={`Cover of the book: ${update.book.title}`}
      />
      <div className={styles.text}>
        <BookTitle book={update.book} />
        <Authors authors={update.book.author} />
        <p>{shortenBlurb(update.book.blurb)}</p>
        <ShelfDropdown
          update={update}
          category={update.type}
          onDropdownClick={onDropdownClick}
        />
      </div>
    </div>
  </div>
);
export default UpdateItem;
