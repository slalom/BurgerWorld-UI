import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import ItemList from '../src/component/item/itemlist'
import ItemForm from '../src/component/item/itemform'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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

        <Router>
        <div>
          <div>
              <Link to="/component/item">Go to Links</Link>
              <Route path="/component/item" component={ItemList} />
          </div>
          <div>
               <Link to="/component/item">Create Item</Link>
              <Route path="/component/item" component={ItemForm} />
            </div>
        </div>
        </Router>

      </div>
    );
  }
}

export default App;
