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
import GridListTile from '@material-ui/core/GridListTile'

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
    
      items: []
    };
 }


  render() {
  
    const { items } = this.state;

    return (
      <Grid container direction="row"
      justify="center"
      alignItems="center">
     
        {items.map( item => (
        <Grid container>
            <Grid item xs={3}>
              <img style={itemPhoto} src={require(`../../images/${item.imageFileName}`)} alt="burger"></img>
            </Grid>
          <Grid item xs={3}>{item.name}</Grid>
          <Grid item xs={3}>{item.price}</Grid>
          <Grid item xs={3}><Button>Add</Button></Grid>
         </Grid>
        ))}

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