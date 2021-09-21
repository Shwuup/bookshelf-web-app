import axios from "axios";
import moment from "moment";
import React from "react";
import CurrentlyReading from "./CurrentlyReading";
import styles from "./HomePage.module.css";
import LatestRead from "./LatestRead";
import { Update } from "../types";
import { postUpdate, putBookStatus } from "../APIEndpoints";
import UpdateFeed from "./UpdateFeed";

class HomePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentBooks: [],
      readBooks: [],
      updates: [],
    };
  }

  componentDidMount() {
    const { cookies } = this.props;
    const userId = cookies.get("userId");
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

  apiCalls = (update: Update) => {
    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");
    const userId = cookies.get("userId");
    postUpdate(update, userId, token).then((_) => {
      const bookStatus = update.book_status;
      putBookStatus(bookStatus, token, userId);
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
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.side}>
          <CurrentlyReading currentBooks={this.state.currentBooks} />
          <hr></hr>

          <LatestRead readBooks={this.state.readBooks.slice(0, 6)} />
        </div>
        <div className={styles.main}>
          <UpdateFeed
            onDropdownClick={this.onDropdownClick}
            updates={this.state.updates}
          ></UpdateFeed>
        </div>
      </div>
    );
  }
}
export default HomePage;
