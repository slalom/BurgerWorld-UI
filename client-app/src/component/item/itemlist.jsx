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

class ItemListGrid extends React.Component {
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
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value} );

    console.log(e);
    console.log(this.state);

    fetch("http://localhost:8080/api/v1/items/nameid", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.itemId,
        name: this.state.itemName,
        price: this.state.itemPrice
      })
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
    console.log(this.state.items);

  var objectToAssign = {}
  objectToAssign[e.target.name.split('--')[0]] = e.target.value;

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
                  id="standard-multiline-static"
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
                  id="standard-multiline-static"
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
                  id="standard-multiline-static"
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
                <Button variant="contained" color="secondary" className={classes.button}>
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

ItemListGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemListGrid);
