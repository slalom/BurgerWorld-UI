import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import ItemList from './component/item/itemlist'
import OrderList from './component/order/orderlist'

class App extends Component {
  render() {
    return (
      
      <div className="App">
        <Router>  
          <div>
            <Link to="/">
              <h1>Burger world home</h1>
            </Link>
            <div>
                <Link to="/component/item">Items</Link>
                <span> | </span>
                <Link to="/component/order">Order</Link>
            </div>
            <div>
                <Route path="/component/item" component={ItemList} />
                <Route path="/component/order" component={OrderList} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
