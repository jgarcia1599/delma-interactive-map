import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Nav from './Nav'
import BeachImage from "../images/beach-placeholder.jpg"
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class PageListItems extends Component {
    constructor(props) {
      super(props);
      this.filterMobileList = this.filterMobileList.bind(this);
      this.updatePredicate = this.updatePredicate.bind(this);

    }

    componentDidMount() {
      this.updatePredicate();
      window.addEventListener("resize", this.updatePredicate);

    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.updatePredicate);
    }

    filterMobileList() {
      var x = document.getElementsByClassName("dropdownFilter");
      var dimContainer = document.getElementById("dimOverlay");
      x = x[0];
      console.log(dimContainer.id);
      if (x.className === "dropdownFilter") {
        x.className += " absoluteMiddle";
        dimContainer.style.display = "block";
      } else {
        x.className = "dropdownFilter";
        dimContainer.style.display = "none";

      }

    }

    updatePredicate() {
      if (window.innerWidth > 550) {
        var x = document.getElementsByClassName("dropdownFilter");
        var dimContainer = document.getElementById("dimOverlay");
        x = x[0];
        x.className = "dropdownFilter";
        dimContainer.style.display = "none";
      }
  }

    render() {
        return (
        <>
          <Nav isHome={false}></Nav>
              <div id="searchBarContainer">
                <form>
                  <button>Search</button>
                  <span><input type="text" title="Search" /></span>
                </form>
              </div>
              <div id="dimOverlay"></div>
          <div id="articlesDivCenterGrid">

            <div id="filterVerticalBarArticles">
              <button onClick={this.filterMobileList}>Filtering Options</button>
            <div className="dropdownFilter">
            <FontAwesomeIcon icon={faTimes} id="closeModalFilter" onClick={this.filterMobileList}/>
            <h2>Tags</h2>
              <div>
                <input type="checkbox"></input>    
                <span className="checkmark"></span>
                <label className="checkboxContainer">Social Life
                </label>
              </div>
              <div>
                <input type="checkbox"></input>    
                <span className="checkmark"></span>
                <label className="checkboxContainer">Fishing
                </label>
              </div>
              <div>
                <input type="checkbox"></input>    
                <span className="checkmark"></span>
                <label className="checkboxContainer">Cuisine
                </label>
              </div>
              <div>
                <input type="checkbox"></input>    
                <span className="checkmark"></span>
                <label className="checkboxContainer">Port Life
                </label>
              </div>
              </div>
            </div>
            
            <div id="articleCardsWrapper">
              {this.props.data.map((info, index) => (
                <Link key={index} to={`/articles/${index + 1}`}>
                <div key={index} className="articleCard">
                  <h1>{info.locationName}</h1>
                  <img src={BeachImage} />
                  <p>Dalma (IATA: ZDY) is an Emirati island located in the Persian Gulf approximately 42 kilometres (26 mi) off the coast of Abu Dhabi and 116 kilometres (72 mi) from Doha. The Abu Dhabi Islands Archaeological Survey ADIAS carried out an initial archaeological survey of Dalma island in 1992. A total of more than 20 archaeological sites were identified on the island, ranging in time from the Neolithic (Late Stone Age). The population consists of around 4,811 inhabitants, most of whom are Qatari who have been granted United Arab Emirates (UAE) nationality.</p>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </>
        )
      }
}

export default PageListItems
