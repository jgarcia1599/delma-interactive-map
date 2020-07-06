import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data/data.json';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "axios";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Nav from "./components/Nav"
import PageListItem from "./components/PageListItems";
import Page from "./components/Pages";
import MapClass from "./components/MapClass";
import PlaceHolder from "./images/delma-placeholder.jpeg"
import ReactDOM from "react-dom";


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// use axios to make http requests to the backend 

class App extends Component{
  constructor(){
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
    console.log('mount');
    this.setState({
      markerData: data
    });    
  }

  render(){
      const position = [24.482, 52.28];
      const markerInfo = data;
      return (
        <div className="appWrapper">
          <Router>
            <Nav />
            <Switch>
            <Route path="/" exact>
              <MapClass></MapClass>
              {/* <div> */}
                <ul id="articleList">
                  {data.map(hero => (
                    <Link to={'/articles/' + hero.id}>
                      <li className="articleListEntry">
                        <img src={PlaceHolder}/>
                        <div>
                          <h1>{hero.locationName}</h1>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit, est sed vulputate tempus, mi tellus convallis risus, nec ultricies magna magna aliquam dui. Cras eget enim ex. In vulputate pharetra urna, et molestie magna. In vitae massa nisl. Nulla eget turpis vitae felis iaculis facilisis nec ut magna. Ut eget dui eu risus ornare vestibulum. Vivamus vitae sollicitudin leo. Sed fringilla ex at nisl efficitur, non pharetra ligula fermentum.</p>
                        </div>
                      </li>
                    </Link>
                  ))} 
                </ul>           
              {/* </div> */}

            </Route>
              <Route path="/articles/:id" exact component={Page} />
            </Switch>
          </Router>
        </div>
      );
    }
}

export default App;
