import React, { Component } from 'react';
import './ListView.css';
import loremIpsum from 'lorem-ipsum';
import Fuse from 'fuse.js';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import AppBar from '../AppBar/AppBar';
import {searchOptions} from '../../etc/searchOptions'

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
      message: '',
      searchText: '',
      searchedItems: [],
      showAngles: false
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
    let message = event.target.value
    this.setState({message});

    let searchedItems = this.searchMessages(message);
    console.log(searchedItems);
    this.setState({searchedItems})
  };

  changeSearchText = (event) => {
    event.target.value.length > 0 ? this.setState({showAngles: true}) : this.setState({showAngles: false});
  };

  searchMessages = (messageForSearch) => {
    let fuse = new Fuse(this.list, searchOptions);
    return fuse.search(messageForSearch);
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
                  <AppBar onChangeInput={this.changeSearchText} showAngles={this.state.showAngles}/>
                  <List
                    ref='List'
                    width={width}
                    height={height}
                    deferredMeasurementCache={this.cache}
                    rowHeight={this.cache.rowHeight}
                    rowRenderer={this.renderRow}
                    rowCount={this.list.length}
                    scrollToIndex={this.list.length}
                    recomputeRowHeights={this.list.length}
                    overscanRowCount={3} 
                  />

                  <div className="elements">
                    <TextField
                      styles={{width: width}}
                      placeholder="Write a message..."
                      onChange={this.changeText}
                      value={this.state.message}
                      multiline={true}
                    />
                    <Button 
                      buttonText="Send"
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