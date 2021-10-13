import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider } from "semantic-ui-react";
import {
  getBook,
  getBookStatusByBook,
  postBookStatus,
  putBookStatus,
  postUpdate,
} from "../APIEndpoints";
import Authors from "../Authors";
import ShelfDropdown from "../ShelfDropdown";
import { Book } from "../types";
import "./BookPage.css";
import styles from "./BookPage.module.css";
import ExtraInfo from "./ExtraInfo";
import Genres from "./Genres";

const BookPage = (props: any) => {
  const { id }: any = useParams();
  const { cookies } = props;
  const userId = cookies.get("userId");
  const token = cookies.get("tokenAuth");
  const [bookStatus, setBookStatus] = useState({ status: "", timestamp: 0 });
  const [book, setBook] = useState<Book>({
    book_id: 0,
    author: [
      {
        id: 0,
        name: "",
      },
    ],
    isbn: "",
    title: "",
    pub_date: "",
    pages: 0,
    language: "",
    image: "",
    edition: "",
    blurb: "",
    publisher: { publisher_id: 0, publisher_name: "" },
    genre: [],
  });
  const shelfOnChange = (status: string, _: any) => {
    const timestamp = moment().unix();
    if (bookStatus.status === "") {
      let newBookStatus: any = {
        book: { book_id: id },
        status: status,
        rating: 0,
        timestamp: timestamp,
      };
      const update: any = {
        book_status: newBookStatus,
        status: status,
        rating: 0,
        timestamp: timestamp,
      };
      setBookStatus(newBookStatus);
      postBookStatus(newBookStatus, userId, token).then((response) => {
        const bookStatusId = response.data.book_status_id;
        update.book_status.book_status_id = bookStatusId;
        postUpdate(update, userId, token);
      });
    } else {
      const newBookStatus = { ...bookStatus };
      newBookStatus.status = status;
      newBookStatus.timestamp = timestamp;
      setBookStatus(newBookStatus);
      putBookStatus(newBookStatus, token).then((response) => {
        const update: any = {
          book_status: newBookStatus,
          status: status,
          rating: 0,
          timestamp: timestamp,
        };
        postUpdate(update, userId, token);
      });
    }
  };
  useEffect(() => {
    getBook(id).then((response) => {
      setBook(response.data);
    });
    const { cookies } = props;
    const userId = cookies.get("userId");
    getBookStatusByBook(userId, id).then((response) => {
      setBookStatus(response.data);
    });
  }, [id, props]);
  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <div className={styles.imageDiv}>
          <img
            className={styles.image}
            src={book.image}
            alt={`Cover of the book ${book.title}`}
          />
        </div>
        <ShelfDropdown
          update={{}}
          bookStatus={bookStatus}
          onDropdownClick={shelfOnChange}
        />
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{book.title}</h1>
        <Authors authors={book.author} />
        <p>{book.blurb}</p>
        <Divider />
        <div className={styles.additionalInfo}>
          <ExtraInfo book={book} />
          <Genres genres={book.genre} />
        </div>
      </div>
    </div>
  );
};
export default BookPage;
