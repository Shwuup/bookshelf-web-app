import React, { Component } from "react";

import SignUpForm from "./SignUpForm";
import WelcomePage from "./WelcomePage";
import LogInForm from "./LogInForm";
import UserPage from "./UserPage";
import BookShelf from "./BookShelf";
import { Route } from "react-router-dom";
import { withCookies } from "react-cookie";

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
        <Route path="/user/bookshelf/:id" component={BookShelf} />
      </div>
    );
  }
}

export default withCookies(App);
