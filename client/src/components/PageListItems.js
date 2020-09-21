import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import BeachImage from "../images/beach-placeholder.jpg";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class PageListItems extends Component {
  constructor(props) {
    super(props);
    this.filterMobileList = this.filterMobileList.bind(this);
    this.updatePredicate = this.updatePredicate.bind(this);
    this.state = {
      topics: [
        "Lifestyle and Culture",
        "Gender",
        "Maritime Economy",
        "Archaeology and History"
      ],
      subjectTags: [
        "Slavery",
        "War/Military",
        "Pearl Diving",
        "Education",
        "Marriage",
        "Oil/Petroleum Industry",
        "Transportation",
        "Construction",
        "Medical",
        "Clothing",
        "Food",
        "Family",
        "Majilis",
        "Language",
        "Boats/Ships",
        "Fishing",
        "Arabic Writing/Calligraphy",
        "English Writing",
        "Shops/Businesses",
        "Natural Areas",
        "Mosques",
        "Museums",
        "Religion",
        "Music",
        "Agriculture/Farms",
        "Water",
        "Housing"
      ],
      locations: [
        "Al Dafna",
        "New Delma",
        "The Old Souq",
        "Old Delma",
        "Shu'obat Hazim",
        "Al Qattara",
        "Delma Graveyard",
        "Abu Umama Mountain",
        "Ras Al Hiyam",
        "Al Biyadha",
        "Ras Aljibs Algharbi",
        "Um Al Qawaser",
        "Fuhaiheel",
        "Khourat Atiya",
        "Khourat Atiya's mountain",
        "Ras Halloum",
        "Qassar Abu Al Thorouq",
        "Khourat Yaeed",
        "Ras Al Jibs Al Sharqi",
        "Al Miyyanna",
        "Jarn Al Safafeer Mountain",
        "Al Manyoukh Mountain",
        "Bait Al Mouraikhi/Delma Museum",
        "Al Muhanadi Mosque",
        "Al Dawsari Mosque",
        "Al Mouraikhi Mosque",
        "Al Buhouth",
        "Delma Airport",
        "Old Delma Port",
        "Delma Hospital",
        "Female Wedding Hall",
        "Male Wedding Hall",
        "Delma Ferry Port",
        "Delma Mall",
        "Delma Motel",
        "Ghassan's Farm",
        "Peacock Roundabout",
        "Delma Shipyard",
        "Angry Birds Cafe",
        "Olive Trees of Delma",
        "Fish Market",
        "Al Nahyan Palace",
        "Jumaa Al Qubaisi Majlis",
        "Ghost Town",
        "New Delma Port"
      ],
      checkedSubjectTags: [],
      checkedTopics: [],
      checkedLocations: [],
      locationData: this.props.data,
      originalData: this.props.data
    };
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
    var resultsMobile = document.getElementById("showResultsNumberMobile");
    x = x[0];
    if (x.className === "dropdownFilter") {
      x.className += " absoluteMiddle";
      dimContainer.style.display = "block";
      resultsMobile.className += " displayResultsMobile";
    } else {
      x.className = "dropdownFilter";
      dimContainer.style.display = "none";
      resultsMobile.className = " ";
    }
  }

  updatePredicate() {
    if (window.innerWidth > 550) {
      var x = document.getElementsByClassName("dropdownFilter");
      var dimContainer = document.getElementById("dimOverlay");
      var resultsMobile = document.getElementById("showResultsNumberMobile");

      x = x[0];
      x.className = "dropdownFilter";
      dimContainer.style.display = "none";
      resultsMobile.className = " ";
    }
  }

  handleCheckboxChange = event => {
    var self = this;
    var newSubjectTagsArray = [];
    var newLocationsArray = [];
    var newTopicsArray = [];
    // console.log(document.getElementById(event.target.id).checked)
    if (document.getElementById(event.target.id).checked == true) {
      let changeTags = async () => {
        if (event.target.className == "subjectTags") {
          newSubjectTagsArray = [
            ...self.state.checkedSubjectTags,
            event.target.id
          ];
          if (this.state.checkedSubjectTags.includes(event.target.id)) {
            newSubjectTagsArray = newSubjectTagsArray.filter(
              tag => tag !== event.target.id
            );
          }
        } else if (event.target.className == "topics") {
          newTopicsArray = [...this.state.checkedTopics, event.target.id];
          if (this.state.checkedTopics.includes(event.target.id)) {
            newTopicsArray = newTopicsArray.filter(
              tag => tag !== event.target.id
            );
          }
        } else if (event.target.className == "locations") {
          newLocationsArray = [...this.state.checkedLocations, event.target.id];
          if (this.state.checkedLocations.includes(event.target.id)) {
            newLocationsArray = newLocationsArray.filter(
              tag => tag !== event.target.id
            );
          }
        }
      };
      let updatedRenders = async () => {
        let tempArrayOne = [];
        let tempArrayTwo = [];
        let tempArrayThree = [];
        if (newSubjectTagsArray.length != 0) {
          newSubjectTagsArray.map(checkedSubjectTag => {
            self.props.data.forEach(element => {
              if (element.subjectTags.includes(checkedSubjectTag)) {
                tempArrayOne.push(element);
              }
            });
          });
        }
        if (newTopicsArray.length != 0) {
          newTopicsArray.map(checkedTopic => {
            self.props.data.forEach(element => {
              if (element.topics.includes(checkedTopic)) {
                tempArrayTwo.push(element);
              }
            });
          });
        }
        if (newLocationsArray.length != 0) {
          newLocationsArray.map(checkedLocation => {
            self.props.data.forEach(element => {
              if (element.subjectTags.includes(checkedLocation)) {
                tempArrayThree.push(element);
              }
            });
          });
        }
        //Combine arrays
        let combinedArray = tempArrayOne.concat(tempArrayTwo);
        let combinedArrayTwo = combinedArray.concat(tempArrayThree);
        let uniqueChars = [...new Set(combinedArrayTwo)];
        self.setState({
          checkedSubjectTags: newSubjectTagsArray,
          checkedLocations: newLocationsArray,
          checkedTopics: newTopicsArray,
          locationData: uniqueChars
        });
      };
      changeTags().then(updatedRenders());
      this.forceUpdate();
    } else if (document.getElementById(event.target.id).checked == false) {
      // console.log(document.getElementById(event.target.id).checked)
      let changeTags = async () => {
        if (event.target.className == "subjectTags") {
          newSubjectTagsArray = [...self.state.checkedSubjectTags];
          if (this.state.checkedSubjectTags.includes(event.target.id)) {
            newSubjectTagsArray = newSubjectTagsArray.filter(
              tag => tag !== event.target.id
            );
          }
        } else if (event.target.className == "topics") {
          newTopicsArray = [...self.state.checkedTopics];
          if (this.state.checkedTopics.includes(event.target.id)) {
            newTopicsArray = newTopicsArray.filter(
              tag => tag !== event.target.id
            );
          }
          console.log(newTopicsArray);
        } else if (event.target.className == "locations") {
          newLocationsArray = [...self.state.checkedLocations];
          if (this.state.checkedLocations.includes(event.target.id)) {
            newLocationsArray = newLocationsArray.filter(
              tag => tag !== event.target.id
            );
          }
        }
      };
      let updatedRenders = async () => {
        let tempArrayOne = [];
        let tempArrayTwo = [];
        let tempArrayThree = [];
        if (newSubjectTagsArray.length != 0) {
          newSubjectTagsArray.map(checkedSubjectTag => {
            self.props.data.forEach(element => {
              if (element.subjectTags.includes(checkedSubjectTag)) {
                tempArrayOne.push(element);
              }
            });
          });
        }
        if (newTopicsArray.length != 0) {
          newTopicsArray.map(checkedTopic => {
            self.props.data.forEach(element => {
              if (element.topics.includes(checkedTopic)) {
                tempArrayTwo.push(element);
              }
            });
          });
        }
        if (newLocationsArray.length != 0) {
          newLocationsArray.map(checkedLocation => {
            self.props.data.forEach(element => {
              if (element.subjectTags.includes(checkedLocation)) {
                tempArrayThree.push(element);
              }
            });
          });
        }
        let combinedArray = tempArrayOne.concat(tempArrayTwo);
        let combinedArrayTwo = combinedArray.concat(tempArrayThree);
        console.log(combinedArray);
        let uniqueChars = [...new Set(combinedArrayTwo)];
        console.log(uniqueChars);
        // console.log(tempArray)
        self.setState({
          checkedSubjectTags: newSubjectTagsArray,
          checkedLocations: newLocationsArray,
          checkedTopics: newTopicsArray,
          locationData: uniqueChars
        });
      };
      changeTags().then(updatedRenders());
      this.forceUpdate();
    }
  };

  tagChange = event => {
    var self = this;
    var newTagsArray = [];
    // console.log(document.getElementById(event.target.id).checked)

    if (document.getElementById(event.target.id).checked == true) {
      let changeTags = async () => {
        newTagsArray = [...self.state.checkedSubjectTags, event.target.id];
        if (this.state.checkedSubjectTags.includes(event.target.id)) {
          newTagsArray = newTagsArray.filter(tag => tag !== event.target.id);
        }
      };
      let updatedRenders = async () => {
        let tempArrayOne = [];

        if (newTagsArray.length != 0) {
          newTagsArray.map(checkedSubjectTag => {
            self.props.data.forEach(element => {
              if (element.compiledTags.includes(checkedSubjectTag)) {
                tempArrayOne.push(element);
              }
            });
          });
        }
        //Combine arrays
        let uniqueChars = [...new Set(tempArrayOne)];
        self.setState({
          checkedSubjectTags: newTagsArray,
          locationData: uniqueChars
        });
      };
      changeTags().then(updatedRenders());
      this.forceUpdate();
    } else if (document.getElementById(event.target.id).checked == false) {
      // console.log(document.getElementById(event.target.id).checked)
      if (self.state.checkedSubjectTags.length > 1) {
        let changeTags = async () => {
          newTagsArray = [...self.state.checkedSubjectTags];
          if (this.state.checkedSubjectTags.includes(event.target.id)) {
            newTagsArray = newTagsArray.filter(tag => tag !== event.target.id);
          }
        };
        let updatedRenders = async () => {
          let tempArrayOne = [];
          if (newTagsArray.length != 0) {
            newTagsArray.map(checkedSubjectTag => {
              self.props.data.forEach(element => {
                if (element.compiledTags.includes(checkedSubjectTag)) {
                  tempArrayOne.push(element);
                }
              });
            });
          }
          let uniqueChars = [...new Set(tempArrayOne)];
          console.log(uniqueChars);
          // console.log(tempArray)
          self.setState({
            checkedSubjectTags: newTagsArray,
            locationData: uniqueChars
          });
        };
        changeTags().then(updatedRenders());
        this.forceUpdate();
      } else {
        self.setState({
          checkedSubjectTags: [],
          locationData: this.props.data
        });
      }
    }
  };
  render() {
    return (
      <>
        <Nav isHome={false}></Nav>
        <div id="storiesTitle">Browse Delma's Stories</div>
        <div id="searchBarContainer">
          <form>
            <button>Search</button>
            <span>
              <input type="text" title="Search" />
            </span>
          </form>
        </div>
        <div id="dimOverlay"></div>
        <div id="articlesDivCenterGrid">
          <div id="filterVerticalBarArticles">
            <button onClick={this.filterMobileList}>Filtering Options</button>
            <div className="dropdownFilter">
              <FontAwesomeIcon
                icon={faTimes}
                id="closeModalFilter"
                onClick={this.filterMobileList}
              />
              <h2>Topics:</h2>
              {this.state.topics.map((info, index) => (
                <div>
                  <input
                    type="checkbox"
                    class="topics"
                    onChange={this.tagChange}
                    id={info}
                  ></input>
                  <span className="checkmark"></span>
                  <label className="checkboxContainer">{info}</label>
                </div>
              ))}
              <h2>Subject Tags:</h2>
              {this.state.subjectTags.map((info, index) => (
                <div>
                  <input
                    type="checkbox"
                    class="subjectTags"
                    onChange={this.tagChange}
                    id={info}
                  ></input>
                  <span className="checkmark"></span>
                  <label className="checkboxContainer">{info}</label>
                </div>
              ))}
              <h2>Locations:</h2>
              {this.state.locations.map((info, index) => (
                <div>
                  <input
                    type="checkbox"
                    class="locations"
                    onChange={this.tagChange}
                    id={info}
                  ></input>
                  <span className="checkmark"></span>
                  <label className="checkboxContainer">{info}</label>
                </div>
              ))}
            </div>
          </div>

          <div id="articleCardsWrapper">
            {console.log(this.state.locationData)}
            {this.state.locationData.map((info, index) => (
              <Link key={info.id} to={`/articles/${info.id}`}>
                <div key={index} className="articleCard">
                  <h1>{info.locationName}</h1>
                  {/* <img src={BeachImage} /> */}
                  <img
                    src={
                      info.imagePaths[0] != ""
                        ? require("../images/" + info.imagePaths[0])
                        : BeachImage
                    }
                  />

                  <p>{info.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div id="showResultsNumberMobile">
          <button onClick={this.filterMobileList}>
            <div>View {this.state.locationData.length} Results</div>
          </button>
        </div>
      </>
    );
  }
}

export default PageListItems;
