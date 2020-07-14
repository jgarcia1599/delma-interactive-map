import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import BeachImage from "../images/beach-placeholder.jpg"
import {data} from './MapClass';
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            <Nav isHome={false}/>
            <div id="verticalLine"></div>
            <div id="pageContentWrapper">
              <h1>
                  {filteredData[0].locationName}
              </h1>
              <img src={BeachImage} alt="Place Holder Beach" />
              <p>
                {filteredData[0].description}
              </p>
              <Link to="/" >
                <FontAwesomeIcon icon={faArrowCircleLeft} id="arrowLeftIcon"/>
              </Link>
            </div>
       </div>

    )
  }
}

export default Pages
