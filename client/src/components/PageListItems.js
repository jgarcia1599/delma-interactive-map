import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

class PageListItems extends Component {
    render() {
        return (
        <>
          {this.props.data.map((info, index) => (
            <h5 key={index}>
              <Link to={`/article/${index + 1}`}>{info.locationName}'s Page</Link>
            </h5>
          ))}
        </>
        )
      }
}

export default PageListItems
