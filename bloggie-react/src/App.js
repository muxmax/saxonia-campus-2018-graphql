import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ArticlesStream from "./components/ArticlesStream";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bloggie React Frontend mit Apollo</h1>
        </header>
        <ArticlesStream/>
      </div>
    );
  }
}

export default App;
