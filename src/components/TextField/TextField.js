import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'inline-block',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class MaterialTextField extends Component {
  state = {
    text: '',
  };

  handleChange = text => event => {
    this.setState({
      [text]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
        <TextField
          id="full-width"
          label={this.props.label}
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={this.props.placeholder}
          fullWidth={this.props.fullWidth}
          margin="normal"
          style={this.props.styles}
          onChange={this.props.onChange}
          value={this.props.value}
        />
    );
  }
}

MaterialTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialTextField);