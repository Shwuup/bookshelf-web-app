import React, { Fragment } from "react";
import styles from "./BookShelf.module.css";

class BookShelf extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentBooks: [],
      readBooks: [],
      updates: [],
    };
  }
  render() {
    return (
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default BookShelf;
