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

function ItemForm(props) {
   const { classes } = props;

  return (
    <React.Fragment>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="orderId"
            name="orderId"
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
            label="Order price"
            fullWidth
            autoComplete="oprice"
          />
        </Grid>
      </Grid>
        <Button variant="contained" color="primary" className={classes.button}>
        Submit Order
      </Button>
    </React.Fragment>

  );
}

ItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemForm);