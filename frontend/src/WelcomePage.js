import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const WelcomePage = () => (
  <div className="App">
    <header className="App-header">
      <div>
        <h1>bookshelf.</h1>
      </div>
      <h2>Manage your book-log today</h2>
      <div>
        <Button as={Link} to="/signup" primary>
          {" "}
          Sign Up
        </Button>
        <Button as={Link} to="/login" secondary>
          Log In
        </Button>
      </div>
    </header>
  </div>
);

export default WelcomePage;
