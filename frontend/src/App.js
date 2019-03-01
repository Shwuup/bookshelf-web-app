import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import "./App.css";
import SignUpForm from "./SignUpForm";
import WelcomePage from "./WelcomePage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/signup" component={SignUpForm} />
        </div>
      </Router>
    );
  }
}

export default App;
