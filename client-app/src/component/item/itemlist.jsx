import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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
  },
});

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: '',
      itemName: '',
      itemPrice: '',
      isLoaded: false,
      error: null,
      items: []
    };

  this.updateItem = this.updateItem.bind(this);
 }

  updateItem(e) {
    //e.preventDefault();

    //console.log(e);
    //console.log(this.state);

    let itemId = e.target.querySelector("#ItemId").innerHTML;
    let itemName = e.target.querySelector("#ItemName").innerHTML;
    let itemPrice = e.target.querySelector("#ItemPrice").innerHTML;

    fetch("http://localhost:8080/api/v1/items/" + itemId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: itemId,
        name: itemName,
        price: itemPrice
      })
    });
  }

deleteItem(e) {
    console.log(e.currentTarget);

    var itemToDelete = e.currentTarget.getAttribute('itemToDelete');
    console.log(itemToDelete);

    fetch("http://localhost:8080/api/v1/items/" + itemToDelete, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
  }


  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  onChange = (e) => {
    //this.setState({ [e.target.name]: e.target.value} );
    let elementItemId = e.target.name.split('--')[0];
    console.log(elementItemId);

    console.log(e.target.value);
    console.log(e.target.name);
    console.log(this.state.items);

  var objectToAssign = {}
  objectToAssign[e.target.name.split('--')[1]] = e.target.value;

  console.log(objectToAssign);

    this.setState((prevState, e) => ({
        items: prevState.items.map(
        obj => (obj.id == elementItemId ? Object.assign(obj, objectToAssign) : obj)
      )
    }));
  }


  render() {
    const { classes } = this.props;
    const { isLoaded, error, items } = this.state;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center">
            {items.map(item => (
              <Grid container key={item.id} direction='row'>
              <form onSubmit={this.updateItem} >
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
                <Button itemToDelete={item.id} variant="contained" color="secondary" className={classes.button} onClick={this.deleteItem}>
                  Delete
                </Button>
                <Button variant="outlined" color="primary" className={classes.button} type="submit">
                  Update
                </Button>
              </form>

              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
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

ItemList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemList);
