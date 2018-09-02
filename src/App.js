import React, { Component } from 'react';
import './App.css';
import ListView from './components/ListView/ListView';

class App extends Component {
  render() {
    return (
    
        <div className="Parent">
          <div>
            <ListView/>
          </div>
        </div>
    
    );
  }
}

export default App;
