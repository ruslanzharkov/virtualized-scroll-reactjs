import React, { Component } from 'react';
import './App.css';
import ListView from './components/ListView/ListView';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
class App extends Component {
  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
}

  render() {
    return (
        <div>
            <ListView/>
        </div>
    );
  }
}

export default App;
