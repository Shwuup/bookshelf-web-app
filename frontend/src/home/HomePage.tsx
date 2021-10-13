import axios from "axios";
import moment from "moment";
import React from "react";
import CurrentlyReading from "./CurrentlyReading";
import styles from "./HomePage.module.css";
import LatestRead from "./LatestRead";
import { BookStatus, Update } from "../types";
import { postUpdate, putBookStatus, deleteUpdate } from "../APIEndpoints";
import UpdateFeed from "./UpdateFeed";
import { Divider } from "semantic-ui-react";
import EditBookStatusForm from "../shelf/EditBookStatusForm";

class HomePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentBooks: [],
      readBooks: [],
      updates: [],
      token: "",
      modalOn: false,
      bookStatusModal: {},
    };
  }

  componentDidMount() {
    const { cookies } = this.props;
    const userId = cookies.get("userId");
    const token = cookies.get("tokenAuth");
    this.setState({ token: token, userId: userId });
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${userId}/updates/`)
      .then((response) => {
        this.setState({ updates: response.data });
      });
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/users/${userId}/shelf/?status=reading`
      )
      .then((response) => {
        this.setState({ currentBooks: response.data });
      });
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/users/${userId}/shelf/?status=read`
      )
      .then((response) => {
        this.setState({ readBooks: response.data });
      });
  }

  renderWithoutDeletedItem = (id: number) => {
    const newUpdates = this.state.updates.filter(
      (update: Update) => update.update_id !== id
    );
    this.setState({ updates: newUpdates });
  };

  deleteUpdate = (updateId: number) => {
    deleteUpdate(this.state.token, updateId);
  };

  apiCalls = (update: Update) => {
    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");
    const userId = cookies.get("userId");
    postUpdate(update, userId, token).then((_) => {
      const bookStatus = update.book_status;
      putBookStatus(bookStatus, token);
    });
  };

  syncBookStatusAndUpdate = (update: Update) => {
    const bookStatus = update.book_status;
    bookStatus.timestamp = update.timestamp;
    bookStatus.rating = update.rating;
    bookStatus.status = update.status;
  };

  onDropdownClick = (updateType: string, update: Update) => {
    update.status = updateType;
    update.timestamp = moment().unix();
    this.syncBookStatusAndUpdate(update);
    var newUpdatesArray = this.state.updates.slice();
    newUpdatesArray.unshift(update);
    this.setState({ updates: newUpdatesArray });
    this.apiCalls(update);
  };

  createUpdateFromBookStatus = (bookStatus: BookStatus) => {
    const update = {
      status: bookStatus.status,
      rating: bookStatus.rating,
      timestamp: bookStatus.timestamp,
      book_status: bookStatus,
    };
    return update;
  };

  addUpdate = (bookStatus: BookStatus) => {
    const newUpdates = [...this.state.updates];
    const update = this.createUpdateFromBookStatus(bookStatus);
    newUpdates.unshift(update);
    this.setState({ updates: newUpdates });
  };

  renderWithoutCurrentlyReadingBook = (id: number) => {
    const newCurrentBooks = this.state.currentBooks.filter(
      (bookStatus: BookStatus) => bookStatus.book_status_id !== id
    );
    this.setState({ currentBooks: newCurrentBooks });
  };
  renderWithAddedLatestRead = (bookStatus: BookStatus) => {
    const newLatestRead = [...this.state.readBooks, bookStatus];
    this.setState({ readBooks: newLatestRead });
  };

  doSideEffects = (bookStatus: BookStatus) => {
    this.addUpdate(bookStatus);
    this.renderWithoutCurrentlyReadingBook(bookStatus.book_status_id!);
    this.renderWithAddedLatestRead(bookStatus);
  };

  turnOffModal = () => {
    this.setState({ modalOn: false });
  };
  turnOnModal = () => {
    this.setState({ modalOn: true });
  };

  setBookStatusModal = (bookStatus: BookStatus) => {
    this.setState({ bookStatusModal: bookStatus });
  };

  render() {
    return (
      <div className={styles.container}>
        {this.state.modalOn && (
          <EditBookStatusForm
            bookStatus={this.state.bookStatusModal}
            turnOffModal={this.turnOffModal}
            token={this.state.token}
            userId={this.state.userId}
            doHomeSideEffects={this.doSideEffects}
          />
        )}
        <div className={styles.side}>
          <CurrentlyReading
            currentBooks={this.state.currentBooks}
            setBookStatusModal={this.setBookStatusModal}
            turnOnModal={this.turnOnModal}
          />
          <Divider />
          <LatestRead readBooks={this.state.readBooks.slice(0, 6)} />
        </div>
        <div className={styles.main}>
          <UpdateFeed
            onDropdownClick={this.onDropdownClick}
            updates={this.state.updates}
            deleteOnClick={this.deleteUpdate}
            renderWithoutDeletedItem={this.renderWithoutDeletedItem}
          ></UpdateFeed>
        </div>
      </div>
    );
  }
}
export default HomePage;
