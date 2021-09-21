import moment from "moment";
import React from "react";
import { getBookStatuses, postUpdate, putBookStatus } from "../APIEndpoints";
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
    const { cookies } = this.props;
    const userId = cookies.get("userId");
    getBookStatuses(userId).then((response) => {
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
    const userId = cookies.get("userId");
    const newBooks = [...this.state.books];
    const newBookStatusIndex = newBooks.findIndex(
      (bookStatus: any) => bookStatus.book_status_id === newBookStatusId
    );
    newBooks[newBookStatusIndex].rating = rating;
    this.setState({ books: newBooks });
    const newBookStatus = newBooks[newBookStatusIndex];
    putBookStatus(newBookStatus, token, userId);
    this.createRatingUpdate(newBookStatus, ratingTimestamp);
  };

  createRatingUpdate = (bookStatus: BookStatus, updateTimestamp: number) => {
    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");
    const userId = cookies.get("userId");
    const update = {
      book_status: bookStatus,
      status: "rating",
      timestamp: updateTimestamp,
      rating: bookStatus.rating,
      user: bookStatus.user,
    };
    postUpdate(update, userId, token);
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
