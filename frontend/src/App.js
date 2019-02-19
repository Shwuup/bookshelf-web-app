import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Heading">
            <h1>bookshelf.</h1>
          </div>
          <h2>Manage your booklog today</h2>
          <div>
            <Button primary>Sign Up</Button>
            <Button secondary>Log In</Button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
