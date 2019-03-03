import React, { Component } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";

class SignUpForm extends Component {
  state = { username: "", password: "" };

  handleSubmit = () =>
    axios
      .post("http://127.0.0.1:8000/api-token-auth/", this.state)
      .then(response => {
        console.log(response);
      });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <div>
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit}>
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
          <Form.Button content="Submit" />
        </Form>
      </div>
    );
  }
}

export default SignUpForm;
