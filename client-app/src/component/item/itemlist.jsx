import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 50,
    width: 400,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  }
});

const itemPhoto = {
  height: '75px',
  width: '75px'
};{/*TODO: share styles*/}

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.loadExistingOrder() ,
      items: []
    };
  }

  loadExistingOrder() {
    var existingOrder = [];
    if(localStorage.getItem("order") != null) {
      existingOrder = JSON.parse(localStorage.getItem("order"))
    }

    return existingOrder;
  }
  addItem(item) {
    this.state.order.push(item);
    this.setState({ order: this.state.order })
    localStorage.setItem("order", JSON.stringify(this.state.order));
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
              <TableCell align="right"></TableCell> {/*add button column*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.items.map(item => (
              <TableRow>
                <TableCell align="right"><img style={itemPhoto} src={require(`../../images/${item.imageFileName}`)} alt="burger"></img></TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right"><Button onClick={this.addItem.bind(this, item)}>Add</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <span><b>Items added thus far: </b></span>
          {this.state.order.map(item =>
            <span>{item.name} {item.price}, </span>
          )}
          {/*TODO: should persist in state for refresh*/}
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/v1/items")
      .then(res => {
        return res.json();
      })
      .then(result => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result
        });
      },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
}

export default withStyles(styles)(ItemList);