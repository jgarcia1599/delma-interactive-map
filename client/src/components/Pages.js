import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

import {data} from './MapClass';

class Pages extends Component {
  constructor(){
    super();
    this.state= {
      // backend_greeting : "No greeting yet"
      loaded: false,
      markerData: []
    }
  }
  
  render() {
    const filteredData = data.filter(entry => entry.id == this.props.match.params.id)
    console.log(this.props.match.params.id)  
    return (
        <div>
            <h1>
                {filteredData[0].locationName}
            </h1>
            <p>{filteredData[0].description}</p>
            <Link to="/"><h1>Back To Map</h1></Link>

       </div>

    )
  }
}

export default Pages
