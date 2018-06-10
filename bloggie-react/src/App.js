import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ArticlesStream from "./components/ArticlesStream";
import {Route, BrowserRouter as Router} from "react-router-dom";
import Article from "./components/Article";

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="App-title">Bloggie React Frontend mit Apollo</h1>
            </header>
            <Route path="/articles" exact component={ArticlesStream}/>
            <Route path="/articles/:articleId" component={Article}/>
          </div>
        </Router>
    );
  }
}

export default App;
