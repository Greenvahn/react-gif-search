import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
    };
  }

  componentDidMount() {
    // fetch ('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC') // trending end-point
    //   .then(response => response.json())
    //   .then(responData => {
    //     this.setState({gifs: responData.data });
    //   })
    //   .catch(error => {
    //     console.log('Error fetching and parsing data', error );
    //   })
  }

  performSearch = (query) => {
     //.get("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC") // trending end-point

     // ****** search end-point
     // http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC 
     // parameter q (funny+cat on the URL from above) --> needs to be updated dynamycally
     // we also limit the number of gifs to be displayed on every search to 24 --> &limit=24
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`) 
      .then((response) => {
        this.setState({
          gifs: response.data.data,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch}/>
          </div>
        </div>
        <div className="main-content">
          <GifList data={this.state.gifs} />
        </div>
      </div>
    );
  }
}
