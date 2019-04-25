import axios from "axios";
import React, { Fragment } from "react";
import BookLists from "./BookLists";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      bookShelves: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");
    axios
      .get("http://127.0.0.1:8000/api/user/booklist/", {
        headers: {
          Authorization: token
        }
      })
      .then(response => {
        this.setState(
          { bookShelves: response.data, isLoaded: true },
          console.log(this.state.bookShelves)
        );
      })
      .catch(error => {
        this.setState({ isLoaded: true, error });
      });
  }

  render() {
    return (
      <Fragment>
        <h1>bookshelf.</h1>

        <BookLists bookNameList={this.state.bookShelves} />
      </Fragment>
    );
  }
}

export default UserPage;
