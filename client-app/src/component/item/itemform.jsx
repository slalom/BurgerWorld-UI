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
    orderId: '',
    orderName: '',
    orderPrice: ''
  };

  this.saveOrder = this.saveOrder.bind(this);

 }

  saveOrder(e) {
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
        id: this.state.orderId,
        name: this.state.orderName,
        price: this.state.orderPrice
      })
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value} );
  }

  render() {
    const { classes } = this.props;
    const { orderId, orderName, orderPrice } = this.state;

    return (
      <React.Fragment>
      <form onSubmit={this.saveOrder}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="orderId"
              name="orderId"
              value={orderId}
              onChange={this.onChange}
              label="Order id"
              fullWidth
              autoComplete="oid"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="orderName"
              name="orderName"
              value={orderName}
              onChange={this.onChange}
              label="Order name"
              fullWidth
              autoComplete="oname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="orderPrice"
              name="orderPrice"
              value={orderPrice}
              onChange={this.onChange}
              label="Order price"
              fullWidth
              autoComplete="oprice"
            />
          </Grid>
        </Grid>
          <Button variant="contained" color="primary" className={classes.button} type="submit">
          Submit Order
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