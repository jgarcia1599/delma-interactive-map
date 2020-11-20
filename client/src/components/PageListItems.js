import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import BeachImage from "../images/beach-placeholder.jpg";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import { render } from "react-dom";
import { FormGroup, FormControl as Control } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015

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
      chosenSubjects: [],
      chosenLocations: [],
      chosenTopics: [],
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

  tagChange = event => {
    var self = this;
    var newTagsArray = [];
    // console.log(document.getElementById(event.target.id).checked)
    console.log(event.target.id);

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

  tagChangeTypeAhead = (event, tagType) => {
    var self = this;
    var newTagsArray = [];
    // console.log(document.getElementById(event.target.id).checked)
    let detectTag = async () => {
      console.log("first");

      if (tagType == "locations") {
        self.setState({
          chosenLocations: event
        });
      } else if (tagType == "subjectTags") {
        self.setState({
          chosenSubjects: event
        });
      } else if (tagType == "topics") {
        self.setState({
          chosenTopics: event
        });
      }
    };
    let changeTags = async () => {
      setTimeout(function() {
        newTagsArray = self.state.chosenLocations
          .concat(self.state.chosenSubjects)
          .concat(self.state.chosenTopics);

        let tempArrayOne = [];
        console.log("third");

        if (newTagsArray.length != 0) {
          newTagsArray.map(checkedSubjectTag => {
            self.props.data.forEach(element => {
              if (element.compiledTags.includes(checkedSubjectTag)) {
                tempArrayOne.push(element);
              }
            });
          });
        } else {
          tempArrayOne = self.props.data;
        }
        //Combine arrays
        let uniqueChars = [...new Set(tempArrayOne)];

        self.setState({
          checkedSubjectTags: newTagsArray,
          locationData: uniqueChars
        });
      }, 200);
    };

    let updatedRenders = async () => {};
    detectTag()
      .then(changeTags())
      .then(updatedRenders())
      .then(this.forceUpdate());
    // this.forceUpdate();

    // else if (document.getElementById(event.target.id).checked == false) {
    //   // console.log(document.getElementById(event.target.id).checked)
    //   if (self.state.checkedSubjectTags.length > 1) {
    //     let changeTags = async () => {
    //       newTagsArray = [...self.state.checkedSubjectTags];
    //       if (this.state.checkedSubjectTags.includes(event.target.id)) {
    //         newTagsArray = newTagsArray.filter(tag => tag !== event.target.id);
    //       }
    //     };
    //     let updatedRenders = async () => {
    //       let tempArrayOne = [];
    //       if (newTagsArray.length != 0) {
    //         newTagsArray.map(checkedSubjectTag => {
    //           self.props.data.forEach(element => {
    //             if (element.compiledTags.includes(checkedSubjectTag)) {
    //               tempArrayOne.push(element);
    //             }
    //           });
    //         });
    //       }
    //       let uniqueChars = [...new Set(tempArrayOne)];
    //       console.log(uniqueChars);
    //       // console.log(tempArray)
    //       self.setState({
    //         checkedSubjectTags: newTagsArray,
    //         locationData: uniqueChars
    //       });
    //     };
    //     changeTags().then(updatedRenders());
    //     this.forceUpdate();
    //   } else {
    //     self.setState({
    //       checkedSubjectTags: [],
    //       locationData: this.props.data
    //     });
    //   }
    // }
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

        <FilteringComponent
          data={this.state.topics}
          filterLabel="topics"
          label="topic..."
          methodfromparent={this.tagChangeTypeAhead}
        />
        <FilteringComponent
          data={this.state.subjectTags}
          filterLabel="subjectTags"
          label="subjects..."
          methodfromparent={this.tagChangeTypeAhead}
        />
        <FilteringComponent
          data={this.state.locations}
          filterLabel="locations"
          label="locations..."
          methodfromparent={this.tagChangeTypeAhead}
        />
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

class FilteringComponent extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      topics: [],
      subjectTags: [],
      locations: []
    };
  }
  handleChange(event, type) {
    console.log(type);
    if (type == "topics") {
      this.setState(
        {
          topics: event
        },
        () => {
          this.props.methodfromparent(event, "topics");
        }
      );
    } else if (type == "subjectTags") {
      this.setState(
        {
          subjectTags: event
        },
        () => {
          this.props.methodfromparent(event, "subjectTags");
        }
      );
    } else if (type == "locations") {
      this.setState(
        {
          locations: event
        },
        () => {
          this.props.methodfromparent(event, "locations");
        }
      );
    }

    console.log(event);
  }
  render() {
    return (
      <Typeahead
        {...this.state}
        multiple
        labelKey={this.props.filterLabel}
        id="basic-example"
        onChange={selected => {
          this.setState({ selected });
          this.handleChange(selected, this.props.filterLabel);
        }}
        options={this.props.data}
        placeholder={"Choose a " + this.props.label}
      />
    );
  }
}

export default PageListItems;
