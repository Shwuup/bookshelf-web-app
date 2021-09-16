import axios from "axios";
import moment from "moment";
import React from "react";
import { createNewUpdate, updateBookStatusApiCall } from "../Services";
import { BookStatus } from "../types";
import BookPageGridItem from "./BookPageGridItem";
import styles from "./MyBooksPage.module.css";
import SideBar from "./SideBar";

class MyBooksPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      books: [],
      filteredBooks: [],
      isLoaded: false,
      isResponseEmpty: true,
      filterStatus: "all",
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/shelf/`).then((response) => {
      this.setState({
        books: response.data,
        filteredBooks: response.data,
        showHover: false,
      });
    });
  }

  filterOnClick = (status: string) => {
    this.setState({ filterStatus: status });
  };

  updateBookStatus = (newBookStatusId: any, rating: number) => {
    const ratingTimestamp = moment().unix();
    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");
    const newBooks = [...this.state.books];
    const newBookStatusIndex = newBooks.findIndex(
      (bookStatus: any) => bookStatus.book_status_id === newBookStatusId
    );
    newBooks[newBookStatusIndex].rating = rating;
    this.setState({ books: newBooks });
    const newBookStatus = newBooks[newBookStatusIndex];
    updateBookStatusApiCall(newBookStatus, token);
    this.createRatingUpdate(newBookStatus, ratingTimestamp);
  };

  createRatingUpdate = (bookStatus: BookStatus, updateTimestamp: number) => {
    const update = {
      book_status: bookStatus,
      status: "rating",
      timestamp: updateTimestamp,
      rating: bookStatus.rating,
      user: bookStatus.user,
    };
    createNewUpdate(update);
  };

  render() {
    const booksToDisplay =
      this.state.filterStatus === "all"
        ? this.state.books
        : this.state.books.filter(
            (bookStatus: any) => bookStatus.status === this.state.filterStatus
          );
    return (
      <div className={styles.container}>
        <SideBar filterOnClick={this.filterOnClick} />
        <div className={styles.main}>
          <h2>Books</h2>
          <div className={styles.grid}>
            {booksToDisplay.map((bookStatus: any) => (
              <BookPageGridItem
                updateEvent={this.updateBookStatus}
                bookStatus={bookStatus}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MyBooksPage;
