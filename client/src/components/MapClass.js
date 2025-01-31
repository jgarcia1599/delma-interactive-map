import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import axios from "axios";
import Nav from "./Nav";
import { divIcon } from "leaflet";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import BeachImage from "../images/beach-placeholder.jpg";
import logo from "../images/logo/white_logo.png"; // with import

var data = [];

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("../images/beach-placeholder.jpg"),
  iconUrl: require("../images/beach-placeholder.jpg"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

var redIcon = L.divIcon({ className: "leaflet-div-red" });
var blueIcon = L.divIcon({ className: "leaflet-div-blue" });

class MapClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerData: [],
      rawData: [],
      data_received: false
    };
    this.collapseDetails = this.collapseDetails.bind(this);
    this.expandDetails = this.expandDetails.bind(this);
    this.updatePredicate = this.updatePredicate.bind(this);
    this.panMarker = this.panMarker.bind(this);
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
    // console.log("hw!")
    this.setState({
      markerData: data
    });
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
          audioPaths: element[keys[9]].split(","),
          imagePaths: element[keys[10]].split(","),
          videoPaths: element[keys[11]],
          transcriptText: element[keys[15]].split(",")
        });
      });
      this.setState({
        rawData: clean_data,
        data_received: true
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    if (window.innerWidth > 550 && this.state.data_received == true) {
      var contentLeft = document.getElementById("mapContentLeft");
      var infoCircle = document.getElementById("infoCircleBottomLeft");
      infoCircle.style.display = "none";

      contentLeft.style.display = "flex";
    }
  }

  collapseDetails() {
    var contentLeft = document.getElementById("mapContentLeft");
    var infoCircle = document.getElementById("infoCircleBottomLeft");

    contentLeft.style.display = "none";
    infoCircle.style.display = "block";
  }

  expandDetails() {
    var contentLeft = document.getElementById("mapContentLeft");
    var infoCircle = document.getElementById("infoCircleBottomLeft");
    contentLeft.style.display = "flex";
    infoCircle.style.display = "none";

    console.log(contentLeft);
  }

  panMarker(object) {}

  render() {
    if (this.state.data_received == false) {
      return <p>Loading ..... </p>;
    } else {
      const markerInfo = this.state.rawData;
      data = this.state.rawData;
      const position = [24.482, 52.28];
      console.log(markerInfo);
      return (
        <div>
          <Nav isHome={true} />
          <div id="mapContentLeft">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={this.collapseDetails}
              id="infoCloseTopLeft"
            />
            <h1>Delma Island</h1>
            <p>
              Along the Arabian and Indian Ocean trade routes, one hundred years
              ago, tiny Delma Island offered something more valuable than
              anything bartered and sold: fresh water wells. Its name is
              believed to have derived from the Arabic word for “bucket of
              water,” and along with Bahrain became a vital stop for ships, as
              the rare place to find fresh water in the Gulf. This would lead
              Delma in the 19th and early 20th century to become a hub for the
              pearl trade, with ships from throughout the region coming to
              negotiate prices at the Al Mehairi House, now the Delma Museum.
              <br></br>
              <br></br>The purpose of NYU Abu Dhabi’s Dhakira Center for
              Heritage Studies’ is to chronicle the life and memories of Delma
              Island after the collapse of the pearl industry in the 1930s. This
              is not a historical record but rather the preservation of heritage
              and memories in the age of modernity. We have done this through
              collecting personal stories, photos and videos, starting from when
              the island’s population became to disappear to the 1970s when
              Sheikh Zayed bin Sultan Al Nahyan, the father of the UAE, began
              efforts to repopulate the island to today, when its population is
              once again diminishing to less than 3,000 people as people move to
              Abu Dhabi for better job opportunities. These interviews include
              Emiratis and expats who have made this quiet fishing island their
              home. Most of the interviews were done by our resident researcher,
              whose family has been part of Delma Island for four generations.
            </p>
            <br></br>
            <hr></hr>
            <div id="mapContentLegend">
              <h6>Legend:</h6>
              <div class="flex-row-two-columns-legend">
                <div className="leaflet-div-red"></div>
                <div className="mediaAvailability">Media Available</div>
              </div>
              <div class="flex-row-two-columns-legend">
                <div className="leaflet-div-blue"></div>
                <div className="mediaAvailability">Media Unavailable</div>
              </div>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faInfoCircle}
            onClick={this.expandDetails}
            id="infoCircleBottomLeft"
          />
          <Map
            id="leafletMap"
            center={position}
            zoom={13}
            zoomControl={false}
            dragging={true}
          >
            <TileLayer
              attribution="attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              minZoom={12}
              maxZoom={17}
            />
            {markerInfo.map(datapoint => (
              <Marker
                position={[datapoint.longitude, datapoint.latitude]}
                key={datapoint.id}
                icon={
                  datapoint.audioPaths[0] != "" || datapoint.imagePaths[0] != ""
                    ? redIcon
                    : blueIcon
                }
                onClick={this.panMarker(this)}
              >
                <Popup>
                  <h1>{datapoint.locationName}</h1>
                  <p>{datapoint.description}</p>
                  <br />
                  <Link to={"/articles/" + datapoint.id}>Read More</Link>
                </Popup>
              </Marker>
            ))}
            ;
            <ZoomControl position="bottomright" />
          </Map>
          <img src={logo} id="dhakiraLogo" />
        </div>
      );
    }
  }
}

export { MapClass, data };
