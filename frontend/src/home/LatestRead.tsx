import React, { Fragment } from "react";
import styles from "./LatestRead.module.css";

const LatestRead = (props: any) => (
  <Fragment>
    <h3>Latest Read</h3>
    <div className={styles.container}>
      {props.readBooks.map((bookStatus: any) => (
        <div className={styles.item} key={bookStatus.book_status_id}>
          <img src={bookStatus.book.image} alt="latest read book" />
        </div>
      ))}
    </div>
  </Fragment>
);
export default LatestRead;
