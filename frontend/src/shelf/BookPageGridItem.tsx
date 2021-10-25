import React, { Fragment, useState } from "react";
import { Button } from "semantic-ui-react";
import { deleteBookStatus } from "../APIEndpoints";
import styles from "./BookPageGridItem.module.css";
import DeleteButton from "./DeleteButton";

const BookPageGridItem = (props: any) => {
  const [isOnHover, setIsOnHover] = useState(false);
  const showOnMouseEnter = () => setIsOnHover(true);
  const hideOnMouseLeave = () => setIsOnHover(false);

  const deleteOnClick = (bookStatusId: number) => {
    deleteBookStatus(bookStatusId, props.token);
  };

  return (
    <Fragment>
      <div
        className={styles.container}
        onMouseEnter={showOnMouseEnter}
        onMouseLeave={hideOnMouseLeave}
        key={props.bookStatus.book_status_id}
      >
        {isOnHover && (
          <div className={styles.hoverImage}>
            <DeleteButton
              deleteOnClick={deleteOnClick}
              renderWithoutDeletedItem={props.renderWithoutDeletedItem}
              id={props.bookStatus.book_status_id}
            />
            <div className={styles.hoverContent}>
              <Button
                onClick={(e, _) => {
                  props.onItemClick(props.bookStatus);
                }}
                inverted
                content="Edit"
              />
            </div>
          </div>
        )}
        <img
          className={styles.image}
          src={props.bookStatus.book.image}
          alt={`cover of ${props.bookStatus.book.title}`}
        />
      </div>
    </Fragment>
  );
};

export default BookPageGridItem;
