import React, { Component } from "react";

import SignUpForm from "./SignUpForm";
import WelcomePage from "./WelcomePage";
import LogInForm from "./LogInForm";
import UserPage from "./UserPage";
import BookList from "./BookList";
import { Route } from "react-router-dom";
import { withCookies } from "react-cookie";
import AddBookListForm from "./AddBookListForm";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={WelcomePage} />
        <Route path="/signup" component={SignUpForm} />
        <Route
          path="/login"
          render={() => <LogInForm cookies={this.props.cookies} />}
        />
        <Route
          path="/user"
          render={() => <UserPage cookies={this.props.cookies} />}
        />
        <Route path="/user/booklist/:id" component={BookList} />
        <Route
          path="/add"
          render={() => <AddBookListForm cookies={this.props.cookies} />}
        />
      </div>
    );
  }
}

export default withCookies(App);
