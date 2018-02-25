import React, { Component } from 'react';
import './App.css';
import {Map} from './Map';
import {Header} from './Header';
//import {SearchBar} from './SearchBar';
//import {GraphOne} from './GraphOne';
//import {GraphTwo} from './GraphTwo';

class App extends Component {
  render() {
    return (
      <div className="App"> 
      <Header />
      <Map />
      </div>
    );
  }
}

export default App;
