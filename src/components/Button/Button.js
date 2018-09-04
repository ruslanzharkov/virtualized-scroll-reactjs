import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      display: 'inherit',
    },
    input: {
      display: 'none',
    },
  });

  function MaterialButton(props) {
    const { classes } = props;
    return (
      <div style={props.styles}>
        <Button 
          variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={props.onClick}
          >
          {props.buttonText}
        </Button>
      </div>
    );
  }
  
  MaterialButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(MaterialButton);