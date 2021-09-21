import React, { Component } from "react";
import { Message, Form, Segment, Button, Grid } from "semantic-ui-react";
import axios from "axios";
import { Redirect } from "react-router";
import "./LogInForm.css";
class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isValidLogin: true,
      redirect: false,
    };
  }

  componentDidMount() {
    const { cookies } = this.props;
    const token = cookies.get("tokenAuth");
    if (token) {
      this.setState({ redirect: true });
    }
  }

  handleSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api-token-auth/`, this.state)
      .then((response) => {
        const token = "Token " + response["data"]["token"];
        const userId = response["data"]["id"];
        const { cookies } = this.props;
        cookies.set("tokenAuth", token, { path: "/" });
        cookies.set("userId", userId);
        this.setState({ redirect: true });
      })
      .catch((error) => {
        this.setState({ isValidLogin: false });
      });
  };

  handleChange = (_, { name, value }) => this.setState({ [name]: value });

  render() {
    const { redirect, username, password, isValidLogin } = this.state;
    if (redirect) {
      return <Redirect to="/user/home" />;
    }
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <h2>Sign in to your account</h2>
          <Segment className="groupings">
            <Form error onSubmit={this.handleSubmit}>
              <Form.Input
                label={<label style={{ textAlign: "left" }}>Username</label>}
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
              />
              <Form.Input
                label={<label style={{ textAlign: "left" }}>Password</label>}
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />

              {isValidLogin ? null : (
                <Message
                  error
                  header="Invalid login credentials"
                  content="Please try again."
                />
              )}
              <Button primary fluid size="large" type="submit">
                LOGIN
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LogInForm;
