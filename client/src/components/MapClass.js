import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import data from '../data/data.json';
import '../App.css';
import axios from "axios";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

var data = [];

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
            markerData: [],
            rawData:[],
            data_received :false
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
    componentWillMount() {
        this.setState({isLoading:true})
        console.log("hw!")
        this.setState({
            markerData: data
        });  
        axios.get("/delmadata").then( (response) => {
                // for(var i = 0;i<response.data.length;i++){
                //     console.log(response.data[i]);
                //     var location_entry = {
                        
                //     }
                // }
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
    
  render() {
    if(this.state.data_received == false){
        return <p>Loading ..... </p>
    }
    else{
        console.log("RAAAAW")
        console.log(this.state.rawData);
        console.log("MARKER");
        console.log(this.state.markerData);

        // this.setState({
        //     markerData:this.state.rawData
        // })
        const markerInfo = this.state.rawData;
        data = this.state.rawData;
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
                        {datapoint.description}<br/>
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
// export data;
// }
// export default MapClass
