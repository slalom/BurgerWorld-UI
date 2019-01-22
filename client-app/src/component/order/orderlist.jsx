import React from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import productorder from './model/productorder';
//import orderLineItem from './model/orderLineItem';
import { array } from 'prop-types';

class orderLineItem {
  constructor(id, name, price, quantity) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.quantity = quantity;
  }
}

class productOrder {
  constructor(id, poNumber, customerName, orderDate, orderLineItems) {
      this.id = id;
      this.poNumber = poNumber;
      this.customerName = customerName;
      this.orderDate = orderDate;
      this.orderLineItems = orderLineItems;
  }
}

const itemPhoto = {
  height: '75px',
  width: '75px'
};

const placeOrderButton = {
  float: 'right'
};

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: JSON.parse(localStorage.getItem("order")),
      total: 0
    };
    this.placeOrder = this.placeOrder(this);
  }

  componentDidMount() {
    this.updateOrderTotal();
  }
  
  updateOrderTotal() {
    var totalPrice = 0;
    this.state.order.map(item => totalPrice+=item.price);
    localStorage.setItem("order", JSON.stringify(this.state.order));
    this.setState({total:totalPrice});
  }

  removeItem(item) {
    var indexOfItem = this.state.order.map(function(e) { return e.id; }).indexOf(item.id);
    this.state.order.splice(indexOfItem, 1);
    this.setState({order: this.state.order});
    this.updateOrderTotal();
  }

  placeOrder(){
    var id = "";
    var poNumber = "";
    var customerName = "Hard-coded CustomerName";
    var orderDate = Date.now();
    var quantity = 1; //TODO: this is hard-coded for now, need to compute this
    var orderLineItems = array[orderLineItem];
    orderLineItems = this.state.order.map(item => new orderLineItem(item.id, item.name, item.price, quantity) );
    
    let po = new productOrder(id, poNumber, customerName, orderDate, orderLineItems);

    fetch("http://localhost:8080/api/v1/productorder", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        po
      })
    });
  }

  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell align="right"></TableCell> {/*image column*/}
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right"></TableCell> {/*remove button column*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.order.map(item => (
              <TableRow>
                <TableCell align="right"><img style={itemPhoto} src={require(`../../images/${item.imageFileName}`)} alt="burger"></img></TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right"><Button onClick={() => this.removeItem(item)}>Remove</Button></TableCell>
              </TableRow>
            ))
            }
          </TableBody>
        </Table>
        <span>Total: {this.state.total}</span><span><Button onClick={this.placeOrder} style={placeOrderButton}>Place Order</Button></span>
      </div>
    )
  }
}

export default (OrderList);