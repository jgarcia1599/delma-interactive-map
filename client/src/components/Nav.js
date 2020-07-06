import React from 'react';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

export default function Nav() {
  return (
    <>
    <nav>
      <Link to="/" className="activeNav">Map</Link>
      <Link to="/stories">Stories</Link>
      <Link to="/about">About</Link>
      <a href="javascript:void(0);" class="icon" onclick="myFunction()">
        <i class="fa fa-bars"></i>
      </a>
    </nav>
    </>
  );
}
