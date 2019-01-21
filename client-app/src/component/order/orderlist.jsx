import React from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const itemPhoto = {
  height: '75px',
  width: '75px'
};

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: JSON.parse(localStorage.getItem("order")),
      total: 0
    };
  }

  componentDidMount() {
    this.updateOrderTotal();
  }

  componentDidUpdate() {
    //TODO: We may need this when we implement the Remove
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
                <TableCell align="right"><Button onClick={this.removeItem.bind(this, item)}>Remove</Button></TableCell>
              </TableRow>
            ))
            }
          </TableBody>
        </Table>
        <span>Total: {this.state.total}</span>
      </div>
    )
  }
}

export default (OrderList);