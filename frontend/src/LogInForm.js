import React, { Component } from "react";
import { Message, Form } from "semantic-ui-react";
import axios from "axios";
import { Redirect } from "react-router";
class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isValidLogin: true,
      redirect: false
    };
  }

  componentDidMount() {
    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");

    if (token) {
      this.setState({ redirect: true });
    }
  }

  handleSubmit = () =>
    axios
      .post("http://127.0.0.1:8000/api-token-auth/", this.state)
      .then(response => {
        const token = "Token " + response["data"]["token"];
        const { cookies } = this.props;
        cookies.set("tokenAuth", token, { path: "/" });
        this.setState({ redirect: true });
      })
      .catch(error => {
        console.log(error.response.status);
        this.setState({ isValidLogin: false });
      });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    const { redirect, username, password, isValidLogin } = this.state;
    if (redirect) {
      return <Redirect to="/user/booklists" />;
    }
    return (
      <div>
        <h2>Login</h2>
        <Form error onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              label="Username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Group>
          {isValidLogin ? null : (
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
