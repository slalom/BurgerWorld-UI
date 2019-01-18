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
};

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      items: []
    };

   // this.addItem = this.addItem.bind(this);
 }
  

  addItem(item) {
    this.state.order.push(item);
    localStorage.setItem("order", JSON.stringify(this.state.order));
    //this.forceUpdate();
  }

  render() {
  
    const { items } = this.state;

    return (

      <div>
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
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                Going to be ID
              </TableCell>
              <TableCell align="right"><img style={itemPhoto} src={require(`../../images/${item.imageFileName}`)} alt="burger"></img></TableCell>
              <TableCell align="right">{item.name}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right"><Button onClick={this.addItem.bind(this, item)}>Add</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
              {this.state.order.map(item =>
                <div>{item.name}</div>
                )}
      </div>
    </div>

   
    );
  }
  //() => this.handleSort(column)}

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

ItemList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemList);


/*

              <TextField
                  id="imageFileName"
                  label="imageFileName"
                  multiline
                  rows="4"
                  name={item.imageFileName}
                  value={item.imageFileName}
                  defaultValue={item.imageFileName}
                  onChange={this.onChange}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  id="ItemId"
                  label="Item Id"
                  multiline
                  rows="4"
                  name={item.id + "--id"}
                  value={item.id}
                  defaultValue={item.id}
                  onChange={this.onChange}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  id="ItemName"
                  label="Item name"
                  multiline
                  name={item.id + "--name"}
                  value={item.name}
                  rows="4"
                  defaultValue={item.name}
                  onChange={this.onChange}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  id="ItemPrice"
                  label="Item price"
                  multiline
                  rows="4"
                  name={item.id + "--price"}
                  value={item.price}
                  defaultValue={item.price}
                  onChange={this.onChange}
                  className={classes.textField}
                  margin="normal"
                />
                <Button variant="outlined" color="primary" className={classes.button} type="submit">
                  Add
                </Button>

*/