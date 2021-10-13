import moment from "moment";
import React, { useState } from "react";
import { Button, Form, Rating } from "semantic-ui-react";
import { postUpdate, putBookStatus } from "../APIEndpoints";
import ShelfDropdown from "../ShelfDropdown";
import "./EditBookStatusForm.css";
import styles from "./EditBookStatusForm.module.css";

const EditBookStatusForm = (props: any) => {
  const [newBookStatus, setNewBookStatus] = useState({ ...props.bookStatus });
  const { book } = props.bookStatus;
  const onChange = (value: string, _: any) => {
    setNewBookStatus({ ...newBookStatus, status: value });
  };
  const onSubmit = () => {
    if (newBookStatus.status !== props.bookStatus) {
      const update = {
        book_status: { ...newBookStatus },
        timestamp: moment().unix(),
        rating: newBookStatus.rating,
        status: newBookStatus.status,
      };
      postUpdate(update, props.userId, props.token);
      putBookStatus(newBookStatus, props.token);
    }
  };

  return (
    <div onClick={props.turnOffModal} className={styles.fullscreen}>
      <div onClick={(event) => event.stopPropagation()} className={styles.card}>
        <div className={styles.content}>
          <div className={styles.imgDiv}>
            <img
              className={styles.image}
              src={book.image}
              alt={`Cover of the book ${book.title}`}
            />
          </div>
          <Form>
            <div className={styles.header}>{book.title}</div>
            <Form.Field>
              <label>Shelf</label>
              <ShelfDropdown
                onDropdownClick={onChange}
                bookStatus={newBookStatus}
              />
            </Form.Field>
            <Form.Field>
              <label>Rating</label>
              <Rating
                className="formRating"
                defaultRating={props.bookStatus.rating}
                icon="star"
                maxRating={5}
                onRate={(_, data) =>
                  setNewBookStatus({ ...newBookStatus, rating: data.rating })
                }
              />
            </Form.Field>
            <Form.TextArea label="Notes" placeholder="What did you think?" />
            <Button
              onClick={() => {
                onSubmit();
                props.turnOffModal();
                props.doHomeSideEffects &&
                  props.doHomeSideEffects(newBookStatus);
              }}
              className="bookFormSubmit"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditBookStatusForm;
