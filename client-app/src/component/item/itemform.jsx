import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class ItemForm extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
    itemId: '',
    itemName: '',
    itemPrice: ''
  };

  this.saveItem = this.saveItem.bind(this);

 }

  saveItem(e) {
    e.preventDefault();
    console.log(e);
    console.log(this.state);

    fetch("http://localhost:8080/api/v1/items", {
      method: 'POST',
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

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value} );
  }

  render() {
    const { classes } = this.props;
    const { itemId, itemName, itemPrice } = this.state;

    return (
      <React.Fragment>
      <form onSubmit={this.saveItem}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="itemId"
              name="itemId"
              value={itemId}
              onChange={this.onChange}
              label="Item id"
              fullWidth
              autoComplete="iid"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="itemName"
              name="itemName"
              value={itemName}
              onChange={this.onChange}
              label="Item name"
              fullWidth
              autoComplete="iname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="itemPrice"
              name="itemPrice"
              value={itemPrice}
              onChange={this.onChange}
              label="Item price"
              fullWidth
              autoComplete="iprice"
            />
          </Grid>
        </Grid>
         <Button variant="contained" color="primary" className={classes.button} type="submit">
          Submit Item
        </Button>
      </form>
      </React.Fragment>
    );
  }
}

ItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemForm);