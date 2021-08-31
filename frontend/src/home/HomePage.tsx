import axios from "axios";
import React from "react";
import CurrentlyReading from "./CurrentlyReading";
import styles from "./HomePage.module.css";
import LatestRead from "./LatestRead";
import { Update } from "./types";
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
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/updates/`)
      .then((response) => {
        this.setState({ updates: response.data });
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/books/current/`)
      .then((response) => {
        this.setState({ currentBooks: response.data });
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/books/read/`)
      .then((response) => {
        this.setState({ readBooks: response.data });
      });
  }

  onDropdownClick = (updateType: string, update: Update) => {
    update.type = updateType;
    var newUpdatesArray = this.state.updates.slice();
    newUpdatesArray.unshift(update);
    this.setState({ updates: newUpdatesArray });
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
