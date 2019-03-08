import React, { Component } from "react";
import { Message, Form } from "semantic-ui-react";
import axios from "axios";

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", isValidLogin: true };
  }

  handleSubmit = () =>
    axios
      .post("http://127.0.0.1:8000/api-token-auth/", this.state)
      .then(response => {
        const token = "Token " + response["data"]["token"];
        axios.defaults.headers.common["Authorization"] = token;
        console.log(response);
      })
      .catch(error => {
        console.log(error.response.status);
        this.setState({ isValidLogin: false });
      });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <div>
        <h2>Login</h2>
        <Form error onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              label="Username"
              name="username"
              placeholder="Username"
              value={this.username}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              value={this.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          {this.state.isValidLogin ? null : (
            <Message
              error
              header="Invalid login credentials"
              content="Please try again."
            />
          )}
          <Form.Button content="Submit" />
        </Form>
      </div>
    );
  }
}

export default LogInForm;
