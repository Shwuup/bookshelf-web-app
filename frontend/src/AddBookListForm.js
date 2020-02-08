import axios from "axios";
import React from "react";
import { Button, Form, Segment, Grid } from "semantic-ui-react";
import SearchBar from "./SearchBar";
import { withRouter } from "react-router-dom";

class AddBookListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      error: null,
      newBookList: {},
      isLoaded: false
    };
  }

  handleChange = e => this.setState({ name: e.target.value });

  handleClick = _ => {
    const { cookies, history } = this.props;
    const token = cookies.get("tokenAuth");
    const { name, newBookList } = this.state;

    axios
      .post(
        "http://127.0.0.1:8000/create-book-list",
        { bookListName: name, data: newBookList },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      )
      .then(_ => {
        history.push("/user");
      })
      .catch(error => {
        console.log(error);
      });
  };

  onResultSelect = (_, data) => {
    const bookName = data.result.title;
    const bookInfo = data.result;
    let newBookList = { ...this.state.newBookList };
    newBookList[bookName] = bookInfo;
    this.setState({ newBookList });
    data.onMouseDown();
  };

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment>
            <Form>
              <Form.Input
                label={<label style={{ textAlign: "left" }}>Name</label>}
                name="booklistname"
                value={this.state.name}
                onChange={this.handleChange}
              ></Form.Input>
              <SearchBar
                style={{ textAlign: "left" }}
                onResultSelect={this.onResultSelect}
                a
              />

              {Object.keys(this.state.newBookList).map(x => (
                <p style={{ color: "black", textAlign: "left" }}>{x}</p>
              ))}
              <Button
                primary
                fluid
                size="large"
                type="submit"
                onClick={this.handleClick}
              >
                ADD BOOK LIST
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(AddBookListForm);
