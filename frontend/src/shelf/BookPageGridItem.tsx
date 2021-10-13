import React, { Fragment, useState } from "react";
import { Rating } from "semantic-ui-react";
import { deleteBookStatus } from "../APIEndpoints";
import "./BookPageGridItem.css";
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
          <div
            onClick={() => props.onItemClick(props.bookStatus)}
            className={styles.hoverImage}
          >
            <DeleteButton
              deleteOnClick={deleteOnClick}
              renderWithoutDeletedItem={props.renderWithoutDeletedItem}
              id={props.bookStatus.book_status_id}
            />
            <div className={styles.hoverContent}>
              <Rating
                icon="star"
                defaultRating={props.bookStatus.rating}
                maxRating={5}
                onRate={(_, data) => {
                  props.updateEvent(
                    props.bookStatus.book_status_id,
                    data.rating
                  );
                }}
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
