import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import data from '../data/data.json';
import '../App.css';
import axios from "axios";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class MapClass extends Component {
    constructor() {
        super();
        this.state= {
            // backend_greeting : "No greeting yet"
            markerData: []
        }
    }
    
        // in here we will make a simple GET request to our backend to update the state variable above
        // componentDidMount = () =>{
        //   axios.get("/hifrombackend").then( (response) => {
        //     console.log(response.data);
        //     this.setState({
        //       backend_greeting:response.data
        //     })
        //   })
        // }
    componentDidMount() {
        console.log("hw!")
        this.setState({
            markerData: data
        });    
    }
    
  render() {
    const markerInfo = data;
    const position = [24.482, 52.28];

    return (
      <div>
        <Map id="leafletMap" center={position} zoom={13}>
            <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            />
            {
                markerInfo.map((datapoint) =>
                <Marker position={[datapoint.longitude, datapoint.latitude]} key={datapoint.id}>
                <Popup>
                    {datapoint.locationName}<br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit, est sed vulputate tempus, mi tellus convallis risus, nec ultricies magna magna aliquam dui. Cras eget enim ex. In vulputate pharetra urna, et molestie magna. In vitae massa nisl. Nulla eget turpis vitae felis iaculis facilisis nec ut magna. Ut eget dui eu risus ornare vestibulum. Vivamus vitae sollicitudin leo. Sed fringilla ex at nisl efficitur, non pharetra ligula fermentum.<br/>
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

export default MapClass
