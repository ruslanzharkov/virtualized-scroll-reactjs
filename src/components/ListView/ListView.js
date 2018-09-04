import React, { Component } from 'react';
import './ListView.css';
import loremIpsum from 'lorem-ipsum';

import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import AppBar from '../AppBar/AppBar';


const rowCount = 1000;

class ListView extends Component {
  constructor() {
    super();
  
    this.list = Array(rowCount).fill().map((val, idx) => {
      return {
        id: idx, 
        name: `Robot`, 
        icon: `https://robohash.org/${idx}`,
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

    this.state = {
      message: ''
    };
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
              <img src={this.list[index].icon} alt="" className="icon"/>
            </div>
            <div className="content">
              <div className="author">{this.list[index].name}</div>
              <div className="text">{this.list[index].text}</div>
            </div>
            <div className="date">{this.list[index].date}</div>
          </div>
      </CellMeasurer>
    );
  }

  changeText = (event) => {
    this.setState({message: event.target.value})
  };
  
  sendMessage = () => {
    this.list.push({
       id: this.list.length + 1,
       name: 'User', 
       icon: `https://robohash.org/1111`,
       date: new Date().toLocaleString(),
       text: this.state.message
    });
    this.setState({message: ''});
    this.forceUpdate();
  };

  render() {
    return (
      <div className="App">
        <div className="list">
          <AutoSizer>
          {
            ({ width, height }) => {
              return (
                <div>
                  <AppBar/>
                  <List
                  ref={ref => this.refs = ref}
                  width={width}
                  height={height}
                  deferredMeasurementCache={this.cache}
                  rowHeight={this.cache.rowHeight}
                  rowRenderer={this.renderRow}
                  rowCount={this.list.length}
                  scrollToIndex={this.list.length}
                  recomputeRowHeights={this.list.length}
                  overscanRowCount={3} />

                  <div className="elements">
                    <TextField
                      styles={{width: width}}
                      placeholder="Введите текст"
                      onChange={this.changeText}
                      value={this.state.message}
                      multiline={true}
                    />
                    <Button 
                      buttonText="Отправить"
                      styles={{display: 'inherit'}}
                      onClick={this.sendMessage}
                    />
                  </div>
                </div>)
            }
          }
          </AutoSizer>
        </div>
      </div>
    );
  }
}

export default ListView;