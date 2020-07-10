import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../App.css';
import axios from "axios";
import Nav from "./Nav";

import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import ReactDOM from "react-dom";

var data = [];

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class MapClass extends Component {
    constructor(props) {
        super(props);
        this.state= {
            markerData: [],
            rawData:[],
            data_received :false
        }
        this.collapseDetails = this.collapseDetails.bind(this);
        this.expandDetails = this.expandDetails.bind(this);
        this.updatePredicate = this.updatePredicate.bind(this);
    }

    componentWillMount() {
        this.setState({isLoading:true})
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);

        // console.log("hw!")
        this.setState({
            markerData: data
        });  
        axios.get("/delmadata").then( (response) => {
                var clean_data = []
                response.data.forEach((element,index) =>{
                    var keys = Object.keys(element);
                    clean_data.push({
                        id:parseInt(element[keys[0]]),
                        locationName:element[keys[1]],
                        latitude:parseFloat(element[keys[3]]),
                        longitude:parseFloat(element[keys[2]]),
                        description:element[keys[4]],
                    })

                })
                this.setState({
                    rawData: clean_data,
                    data_received:true
                })
        })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
      }

    updatePredicate() {
        if (window.innerWidth > 550 && this.state.data_received ==true) {
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

        console.log(contentLeft)
    }
    
    
  render() {
    if(this.state.data_received == false){
        return <p>Loading ..... </p>
    }
    else{
        const markerInfo = this.state.rawData;
        data = this.state.rawData;
        const position = [24.482, 52.28];

        return (
          <div>
            <Nav isHome={true}/>  
            <div id="mapContentLeft">
            <FontAwesomeIcon icon={faTimes} onClick={this.collapseDetails} id="infoCloseTopLeft"/>
                <h1>Delma Island</h1>
                <p>Dalma (IATA: ZDY) is an Emirati island located in the Persian Gulf approximately 42 kilometres (26 mi) off the coast of Abu Dhabi and 116 kilometres (72 mi) from Doha. The Abu Dhabi Islands Archaeological Survey ADIAS carried out an initial archaeological survey of Dalma island in 1992. A total of more than 20 archaeological sites were identified on the island, ranging in time from the Neolithic (Late Stone Age). The population consists of around 4,811 inhabitants, most of whom are Qatari who have been granted United Arab Emirates (UAE) nationality.</p>
                <br></br><br></br><br></br><hr></hr>
                <div id="mapContentLegend">
                    <h6>LEGEND</h6>
                </div>
            </div>
            <FontAwesomeIcon icon={faInfoCircle} onClick={this.expandDetails} id="infoCircleBottomLeft"/>
            <Map id="leafletMap" center={position} zoom={13} zoomControl={false} dragging={true}>
            <TileLayer attribution="attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community" 
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" 
                minZoom={12}
                />
                {
                    markerInfo.map((datapoint) =>
                    <Marker position={[datapoint.longitude, datapoint.latitude]} key={datapoint.id}>
                    <Popup>
                        <h1>{datapoint.locationName}</h1>
                        <p>{datapoint.description}</p><br/>
                        <Link to={'/articles/' + datapoint.id}>Read More</Link>
                    </Popup>
                    </Marker>
                    )
                };
            </Map>
            </div>
        )
    }

  }
}

export {MapClass,data}
