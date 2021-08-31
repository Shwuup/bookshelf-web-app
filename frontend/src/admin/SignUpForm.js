import React, { Component } from "react";
import axios from "axios";
import { Form, Segment, Button, Grid } from "semantic-ui-react";
import "./SignUpForm.css";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { user: "", password: "", email: "" };
  }

  handleSubmit = () =>
    axios
      .post(`${process.env.REACT_APP_API_URL}/signup/`, this.state)
      .then((response) => {
        console.log("success!");
      });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <h2>Create a new account</h2>
          <Segment>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                label={<label style={{ textAlign: "left" }}>Email</label>}
                name="email"
                placeholder="Email"
                value={this.user}
                onChange={this.handleChange}
              />

              <Form.Input
                label={<label style={{ textAlign: "left" }}>Username</label>}
                name="user"
                placeholder="Username"
                value={this.user}
                onChange={this.handleChange}
              />
              <Form.Input
                label={<label style={{ textAlign: "left" }}>Password</label>}
                name="password"
                type="password"
                placeholder="Password"
                value={this.password}
                onChange={this.handleChange}
              />

              <Button primary fluid size="large" type="submit">
                SIGN UP
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SignUpForm;
