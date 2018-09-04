import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import classNames from 'classnames';
import TextField from '../TextField/TextField';
import './AppBar.css';

const styles = {
  root: {
   flex: 1
  },
  flex: {
    flexGrow: 1,
  },
};

class ButtonAppBar extends Component {
  constructor(props) {
    super(props);
    const { classes } = props;
  }
  
  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );

  }

  render() {
    return (
      <div className={styles.root}>
        <AppBar>
          <Toolbar>
            <Icon className={classNames("fa fa-search")}></Icon>
            <input type="text" className="textField" placeholder="Поиск..."/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);