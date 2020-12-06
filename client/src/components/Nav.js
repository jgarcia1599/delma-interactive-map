import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.collapseBars = this.collapseBars.bind(this);
  }
  collapseBars() {
    console.log("collapse bars");
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  render() {
    return (
      <nav
        id="myTopnav"
        className={this.props.isHome ? "transparentNav" : "opaqueNav"}
      >
        <Link to="/" className="activeNav">
          Map
        </Link>
        <Link to="/stories">Stories</Link>
        <Link to="/about">About</Link>
        {/* <Link to="/upload">Upload</Link> */}
        <a
          href="javascript:void(0);"
          className="icon"
          onClick={this.collapseBars}
        >
          <FontAwesomeIcon icon={faBars} />
        </a>
      </nav>
    );
  }
}
export default Nav;
