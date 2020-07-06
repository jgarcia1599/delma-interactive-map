import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

import data from '../data/data.json';

class Pages extends Component {
  render() {
    const filteredData = data.filter(entry => entry.id == this.props.match.params.id)
    console.log(filteredData)  
    return (
        <div>
            <h1>
                {filteredData[0].locationName}
            </h1>
            <Link to="/"><h1>Back To Map</h1></Link>

       </div>

    )
  }
}

export default Pages
