import React from "react";
import Authors from "./Authors";
import styles from "./SearchResult.module.css";
const SearchResult = (props: any) => {
  const { title, author, image } = props;

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div>{title}</div>
        <Authors authors={author} />
      </div>
      <div className={styles.imgDiv}>
        <img
          className={styles.image}
          src={image}
          alt={`Cover of the book ${title}`}
        />
      </div>
    </div>
  );
};
export default SearchResult;
