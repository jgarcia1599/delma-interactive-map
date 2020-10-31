import React, { Component } from "react";
import "./App.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Nav from "./components/Nav";
import About from "./components/About";
import Page from "./components/Page";
import PageListPage from "./components/PageListItems";
import { MapClass } from "./components/MapClass";
import PlaceHolder from "./images/delma-placeholder.jpeg";
import ReactDOM from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

// use axios to make http requests to the backend

class App extends Component {
  constructor() {
    super();
    this.state = {
      markerData: [],
      rawData: [],
      data_received: false
    };
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    console.log("hw!");
    axios.get("/api/delmadata").then(response => {
      var clean_data = [];
      response.data.forEach((element, index) => {
        var keys = Object.keys(element);
        clean_data.push({
          id: parseInt(element[keys[0]]),
          locationName: element[keys[1]],
          latitude: parseFloat(element[keys[3]]),
          longitude: parseFloat(element[keys[2]]),
          description: element[keys[4]],
          topics: element[keys[5]].split(","),
          subjectTags: element[keys[6]].split(","),
          compiledTags: element[keys[7]].split(","),
          imagePaths: element[keys[10]].split(",")
        });
      });
      this.setState({
        rawData: clean_data,
        data_received: true
      });
    });
  }

  render() {
    if (this.state.data_received == false) {
      return <p>Loading ..... </p>;
    } else {
      return (
        <div className="appWrapper">
          <Router>
            <Route path="/" exact>
              <MapClass></MapClass>
            </Route>
            <Route path="/about" exact>
              <About></About>
            </Route>
            <Route exact path="/stories">
              <PageListPage data={this.state.rawData}></PageListPage>
            </Route>
            <Route exact path="/articles/:id" exact component={Page} />
          </Router>
        </div>
      );
    }
  }
}

export default App;
