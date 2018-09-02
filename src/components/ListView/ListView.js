import React, { Component } from 'react';
import './ListView.css';

import loremIpsum from 'lorem-ipsum';

import { List } from "react-virtualized";

const rowCount = 1000;
const listHeight = 800;
const rowHeight = 50;
const rowWidth = 1000;

class ListView extends Component {
  constructor() {
    super();
    this.list = Array(rowCount).fill().map((val, idx) => {
      return {
        id: idx, 
        name: `Robot - ${idx}`,
        image: `https://robohash.org/${idx}`,
        date: new Date().toLocaleString(), 
        text: loremIpsum({
          count: 2, 
          units: 'sentences',
          sentenceLowerBound: 4,
          sentenceUpperBound: 8 
        })
      }
    });
  }
  
  renderRow = ({ index, key, style }) => {
    return (
      <div key={key} style={style} className="row">
        <div className="image">
          <img src={this.list[index].image} alt="" className="icon"/>
        </div>
        <div className="content">
          <div>{this.list[index].name}</div>
          <div>{this.list[index].text}</div>
        </div>
        <div className="date">{this.list[index].date}</div>
      </div>
    );
  }
  
  render() {
    return (
        <div className="list">
          <List
            width={rowWidth}
            height={listHeight}
            rowHeight={rowHeight}
            rowRenderer={this.renderRow}
            rowCount={this.list.length}
            overscanRowCount={3} />
        </div>
    );
  }
}

export default ListView;