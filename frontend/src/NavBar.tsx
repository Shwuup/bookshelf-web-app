import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { Search } from "semantic-ui-react";
const NavBar = () => (
  <div className="nav">
    <Link to="/">
      <h1>bookshelf.</h1>
    </Link>
    <ul>
      <li>
        <Link to="/user/home">Home</Link>
      </li>
      <li>
        <Link to="/user/bookshelf">My Books</Link>
      </li>
      <li>
        <Link to="/user/stats">Stats</Link>
      </li>
    </ul>
    <Search placeholder={"Search books"} />
  </div>
);

export default NavBar;
