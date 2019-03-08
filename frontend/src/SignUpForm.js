import React, { Component } from "react";
import axios from "axios";
import { Form } from "semantic-ui-react";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { user: "", password: "", email: "" };
  }

  handleSubmit = () =>
    axios.post("http://127.0.0.1:8000/signup/", this.state).then(response => {
      console.log("success!");
    });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <div>
        <h2>Signup</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Email"
            name="email"
            placeholder="Email"
            value={this.user}
            onChange={this.handleChange}
          />
          <Form.Group>
            <Form.Input
              label="Username"
              name="user"
              placeholder="Username"
              value={this.user}
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
