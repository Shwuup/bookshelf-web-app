import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => (
  <div className="Welcome">
    <header className="Welcome-header">
      <div>
        <h1 id="myHeader">bookshelf.</h1>
        <h2 id = "subtitle">Manage your book-log today</h2>
      </div>
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
