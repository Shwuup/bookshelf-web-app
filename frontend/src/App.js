import React, { Component } from "react";

import SignUpForm from "./admin/SignUpForm";
import WelcomePage from "./admin/WelcomePage";
import LogInForm from "./admin/LogInForm";
import MyBooksPage from "./shelf/MyBooksPage";
import HomePage from "./home/HomePage";
import { Route } from "react-router-dom";
import { withCookies } from "react-cookie";
import NavBar from "./NavBar";
import "./App.css";
import BookPage from "./book-details/BookPage";
class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={WelcomePage} />
        <NavBar />
        <Route path="/signup" component={SignUpForm} />
        <Route
          path="/login"
          render={() => <LogInForm cookies={this.props.cookies} />}
        />
        <Route
          path="/user/home"
          render={() => <HomePage cookies={this.props.cookies} />}
        />

        <Route
          path="/user/bookshelf/"
          render={() => <MyBooksPage cookies={this.props.cookies} />}
        />
        <Route
          path="/book/:id"
          render={() => <BookPage cookies={this.props.cookies} />}
        />
      </div>
    );
  }
}

export default withCookies(App);
