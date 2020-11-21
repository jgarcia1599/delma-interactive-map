import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

export class Footer extends Component {
  render() {
    return (
      <>
        <footer className="footer-distributed">
          <div className="footer-right">
            <a href="https://dhakira.center/doku.php">
              <FontAwesomeIcon icon={faGlobe} />
            </a>
            <a href="https://www.facebook.com/dhakiracenter/">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </div>

          <div className="footer-left">
            <p className="boldHeader">The Delma Island Project</p>
            <p className="footer-links">
              <Link to="/">Map</Link>
              <br></br>
              <Link to="/stories">Stories</Link>
              <br></br>
              <Link to="/about">About</Link>
            </p>
            <hr></hr>
            <p>Dhakira Center For Heritage Studies &copy; 2020</p>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
