import React from "react";
import styles from "./ExtraInfo.module.css";
const ExtraInfo = (props: any) => {
  const { book } = props;
  return (
    <div className={styles.extraInfo}>
      <h2>Extra Information</h2>
      <div className={styles.content}>
        <div className={styles.labels}>
          <div className={styles.label}>ISBN-13:</div>
          <div className={styles.label}>Pages:</div>
          <div className={styles.label}>Publication date:</div>
          <div className={styles.label}>Language:</div>
        </div>
        <div className={styles.labelContent}>
          <div>{book.isbn}</div>
          <div>{book.pages}</div>
          <div>{book.pub_date}</div>
          <div>{book.language}</div>
        </div>
      </div>
    </div>
  );
};
export default ExtraInfo;
