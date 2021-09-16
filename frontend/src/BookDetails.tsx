import React from "react";
import styles from "./BookDetails.module.css";
import BookTitle from "./BookTitle";
import Authors from "./Authors";
import ShelfDropdown from "./ShelfDropdown";

const shortenBlurb = (blurb: string) => {
  const shortenedBlurb = blurb.slice(0, 200);
  return `${shortenedBlurb}...`;
};

const BookDetails = (props: any) => (
  <div className={styles.text}>
    <BookTitle book={props.book} />
    <Authors authors={props.book.author} />
    <p>{shortenBlurb(props.book.blurb)}</p>
  </div>
);

export default BookDetails;
