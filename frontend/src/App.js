import React, { Component } from "react";
import "./App.css";
import SignUpForm from "./SignUpForm";
import WelcomePage from "./WelcomePage";
import LogInForm from "./LogInForm";
import BookLists from "./BookLists";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={WelcomePage} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/login" component={LogInForm} />
        <Route path="/user/booklists" component={BookLists} />
      </div>
    );
  }
}

export default App;
