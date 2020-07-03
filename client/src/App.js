import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

// use axios to make http requests to the backend 
import axios from "axios";

class App extends Component{
  constructor(){
    super();
    this.state= {
      backend_greeting : "No greeting yet"
    }
  }
  // in here we will make a simple GET request to our backend to update the state variable above
  componentDidMount = () =>{
    axios.get("/hifrombackend").then( (response) => {
      console.log(response.data);
      this.setState({
        backend_greeting:response.data
      })
    })
  }




  render(){
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Testing a backend response that runs on Port 5000!</p>
            <h1>{this.state.backend_greeting}</h1>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }
}

export default App;
