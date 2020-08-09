import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import BeachImage from "../images/beach-placeholder.jpg"
import {data} from './MapClass';
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";

class Pages extends Component {
  constructor(){
    super();
    this.state= {
      markerData: [],
      rawData:[],
      data_received :false
      }
    }

    componentWillMount() {
      this.setState({isLoading:true})
      console.log("hw!")
      axios.get("/api/delmadata").then( (response) => {
              var clean_data = []
              response.data.forEach((element,index) =>{
                  var keys = Object.keys(element);
                  clean_data.push({
                      id:parseInt(element[keys[0]]),
                      locationName:element[keys[1]],
                      latitude:parseFloat(element[keys[3]]),
                      longitude:parseFloat(element[keys[2]]),
                      description:element[keys[4]],
                      topics:element[keys[5]].split(","),
                      subjectTags:element[keys[6]].split(","),
                      compiledTags:element[keys[7]].split(","),
                      audioPaths:element[keys[9]].split(","),
                      imagePaths:element[keys[10]].split(","),
                      videoPaths:element[keys[11]].split(","),
                      transcriptTextOne:element[keys[15]],
                      transcriptTextTwo:element[keys[16]]

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
    else {
      const filteredData = this.state.rawData.filter(entry => entry.id == this.props.match.params.id)
      console.log(filteredData[0].audioPaths.length)
      // var transcript =                     
      var transcriptOne = filteredData[0].transcriptTextOne;
      var transcriptTwo = filteredData[0].transcriptTextTwo;
      return (
          <div>
              <Nav isHome={false}/>
              <div id="verticalLine"></div>
              <div id="pageContentWrapper">
                <h1>
                    {filteredData[0].locationName}
                </h1>
                {filteredData[0].imagePaths.length >= 1 && filteredData[0].imagePaths[0] != ""
                  ? <img src={require('../images/' + filteredData[0].imagePaths[0])} alt="Place Holder Beach" className="bigImagePage"/> 
                  : <img src={BeachImage} alt="Place Holder Beach" className="bigImagePage"/>
                }              
                <p>
                  {filteredData[0].description}
                </p>
                {(function() {
                  if (filteredData[0].imagePaths.length == 2) {
                    return <div><img src={require('../images/' + filteredData[0].imagePaths[1])} alt="Place Holder Beach"  className="bigImagePage"/></div>;
                  } else if (filteredData[0].imagePaths.length == 3) {
                    return <div className="two-image-row"><img src={require('../images/' + filteredData[0].imagePaths[1])} alt="Place Holder Beach" /><img src={require('../images/' + filteredData[0].imagePaths[2])} alt="Place Holder Beach" /></div>;
                  } else if (filteredData[0].imagePaths.length == 4) {
                    return <div className="three-image-row"><img src={require('../images/' + filteredData[0].imagePaths[1])} alt="Place Holder Beach" /><img src={require('../images/' + filteredData[0].imagePaths[2])} alt="Place Holder Beach" /><img src={require('../images/' + filteredData[0].imagePaths[3])} alt="Place Holder Beach" /></div>;
                  }
                })()}              
                  {filteredData[0].audioPaths.length >= 1 && filteredData[0].audioPaths[0] != ""
                    ? <audio controls className="audio-custom"> <source src={require('../sound/' + filteredData[0].audioPaths[0])} type="audio/mp4"></source></audio>
                    : <div></div>
                  }
                  <div dangerouslySetInnerHTML={{ __html: transcriptOne }} />
                  {filteredData[0].audioPaths.length >= 2
                    ? <audio controls className="audio-custom"> <source src={require('../sound/' + filteredData[0].audioPaths[1])} type="audio/mp4"></source></audio>
                    : <div></div>
                  }
                  <div dangerouslySetInnerHTML={{ __html: transcriptTwo }} />
                  {filteredData[0].videoPaths.length > 1
                    ? <div class="video-container"><iframe frameborder="0" src={filteredData[0].videoPaths[0]} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                    : <div></div>
                  }
              </div>
        </div>
        
      )
    }
  }
}

export default Pages
