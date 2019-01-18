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
            order : JSON.parse( localStorage.getItem("order"))
        };
    }
    removeItem(item) {
            //TODO: Implement
    }
    render() {
        return (

        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.order.map(item => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                Going to be ID
              </TableCell>
              <TableCell align="right"><img style={itemPhoto} src={require(`../../images/${item.imageFileName}`)} alt="burger"></img></TableCell>
              <TableCell align="right">{item.name}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right"><Button onClick={this.removeItem.bind(this, item)}>Remove</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        )
    }
}

export default (OrderList);