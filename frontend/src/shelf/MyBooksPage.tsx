import moment from "moment";
import React, { Fragment } from "react";
import { getBookStatuses, postUpdate, putBookStatus } from "../APIEndpoints";
import { BookStatus } from "../types";
import BookPageGridItem from "./BookPageGridItem";
import EditBookStatusForm from "./EditBookStatusForm";
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
      userId: "",
      token: "",
      modalOn: false,
      modalBookStatus: {},
    };
  }

  componentDidMount() {
    const { cookies } = this.props;
    const userId = cookies.get("userId");
    const token = cookies.get("tokenAuth");
    getBookStatuses(userId).then((response) => {
      this.setState({
        books: response.data,
        filteredBooks: response.data,
        showHover: false,
        userId: parseInt(userId),
        token: token,
      });
    });
  }

  filterOnClick = (status: string) => {
    this.setState({ filterStatus: status });
  };

  renderWithoutDeletedItem = (bookStatusId: number) => {
    const newBooks = [...this.state.books].filter(
      (bookStatus: any) => bookStatus.book_status_id !== bookStatusId
    );
    this.setState({ books: newBooks });
  };

  updateBookStatus = (newBookStatusId: any, rating: number) => {
    const ratingTimestamp = moment().unix();
    const newBooks = [...this.state.books];
    const newBookStatusIndex = newBooks.findIndex(
      (bookStatus: any) => bookStatus.book_status_id === newBookStatusId
    );
    newBooks[newBookStatusIndex].rating = rating;
    this.setState({ books: newBooks });
    const newBookStatus = newBooks[newBookStatusIndex];
    putBookStatus(newBookStatus, this.state.token);
    this.createRatingUpdate(newBookStatus, ratingTimestamp);
  };

  createRatingUpdate = (bookStatus: BookStatus, updateTimestamp: number) => {
    const update = {
      book_status: bookStatus,
      status: "rating",
      timestamp: updateTimestamp,
      rating: bookStatus.rating,
    };
    postUpdate(update, this.state.userId, this.state.token);
  };

  renderModal = (bookStatus: any) => {
    this.setState({ modalOn: true, modalBookStatus: bookStatus });
  };

  turnOffModal = () => {
    this.setState({ modalOn: false });
  };

  render() {
    const booksToDisplay =
      this.state.filterStatus === "all"
        ? this.state.books
        : this.state.books.filter(
            (bookStatus: any) => bookStatus.status === this.state.filterStatus
          );
    return (
      <Fragment>
        {this.state.modalOn && (
          <EditBookStatusForm
            bookStatus={this.state.modalBookStatus}
            turnOffModal={this.turnOffModal}
            token={this.state.token}
            userId={this.state.userId}
          />
        )}
        <div className={styles.container}>
          <SideBar filterOnClick={this.filterOnClick} />
          <div className={styles.main}>
            <h2>Books</h2>
            <div className={styles.grid}>
              {booksToDisplay.map((bookStatus: any) => (
                <BookPageGridItem
                  key={bookStatus.book_status_id}
                  updateEvent={this.updateBookStatus}
                  bookStatus={bookStatus}
                  userId={this.state.userId}
                  token={this.state.token}
                  renderWithoutDeletedItem={this.renderWithoutDeletedItem}
                  onItemClick={this.renderModal}
                />
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MyBooksPage;
