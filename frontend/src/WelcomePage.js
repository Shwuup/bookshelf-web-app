import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => (
  <div className="Welcome">
    <header className="Welcome-header">
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
