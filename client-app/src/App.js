import React, { Component } from 'react';

import burger1 from './images/burger-1.png'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import ItemList from '../src/component/item/itemlist'
import ItemForm from '../src/component/item/itemform'


class App extends Component {
  render() {
    //TODO: figure this out, Julio!
    //const imgSrc = `./images/${"burger-1"}.png`;

    return (
      

    


      <div className="App">
        <Router>  
          <div>
            <Link to="/">
              <h1>Burger World!</h1>
            </Link>
            <div>
                <Link to="/component/item">Go to Items</Link>
                <Route path="/component/item" component={ItemList} />
            </div>
            <div>
             
              <img src={burger1} alt="this is my fav"></img>
                <Link to="/component/items/new">Create Item</Link>
                <Route path="/component/items/new" component={ItemForm} />
              </div>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
