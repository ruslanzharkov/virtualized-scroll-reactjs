import React, { Component } from 'react';
import './ListView.css';

import loremIpsum from 'lorem-ipsum';

import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";

const rowCount = 1000;

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
          sentenceLowerBound: 10,
          sentenceUpperBound: 100 
        })
      }
    });
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100
    });
  }
  
  renderRow = ({ index, key, style, parent }) => {
    return (
      <CellMeasurer 
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}>
          <div style={style} className="row">
            <div className="image">
              <img src={this.list[index].image} alt="" className="icon"/>
            </div>
            <div className="content">
              <div className="author">{this.list[index].name}</div>
              <div>{this.list[index].text}</div>
              <div className="date">{this.list[index].date}</div>
            </div>
          </div>
      </CellMeasurer>
    );
  }
  
  render() {
    return (
      <div className="App">
        <div className="list">
          <AutoSizer>
          {
            ({ width, height }) => {
              return <List
                width={width}
                height={height}
                deferredMeasurementCache={this.cache}
                rowHeight={this.cache.rowHeight}
                rowRenderer={this.renderRow}
                rowCount={this.list.length}
                overscanRowCount={3} />
            }
          }
          </AutoSizer>
        </div>
      </div>
    );
  }
}

export default ListView;