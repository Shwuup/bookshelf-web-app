import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Divider } from "semantic-ui-react";
import Authors from "../Authors";
import { getBook } from "../Services";
import ShelfDropdown from "../ShelfDropdown";
import { Book } from "../types";
import styles from "./BookPage.module.css";
import ExtraInfo from "./ExtraInfo";
import "./BookPage.css";
import Genres from "./Genres";
const BookPage = () => {
  const { id }: any = useParams();
  const bookStatus = {
    book_status_id: 6,
    book: {
      title: "Norwegian Wood",
      author: [
        {
          id: 12,
          name: "Haruki Murakami",
        },
        {
          id: 13,
          name: "Jay Rubin",
        },
      ],
      image:
        "https://booklist-images.s3.ap-southeast-2.amazonaws.com/norwegian_wood.jpg",
      book_id: 12,
      blurb:
        "The haunting, enigmatic love story that turned Murakami into a literary superstar in Japan, and is his bestselling title throughout the world\n\nWhen he hears her favourite Beatles song, Toru Watanabe recalls his first love Naoko, the girlfriend of his best friend Kizuki. Immediately he is transported back almost twenty years to his student days in Tokyo, adrift in a world of uneasy friendships, casual sex, passion, loss and desire - to a time when an impetuous young woman called Midori marches into his life and he has to choose between the future and the past.",
    },
    user: {
      id: 1,
    },
    status: "read",
    rating: 0,
    timestamp: 1630828751,
  };
  const history = useHistory();
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
  useEffect(() => {
    getBook(id).then((response) => {
      setBook(response.data);
    });
  }, [id]);
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
        <ShelfDropdown bookStatus={bookStatus} />
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
