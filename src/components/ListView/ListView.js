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
      showAngles: false,
      incrementForResultSearchItems: 0
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
  };

  changeSearchText = (event) => {
    let searchText = event.target.value;
    let searchedItems = this.searchMessages(searchText);
    this.setState({searchedItems});
    searchText.length > 0 ? this.setState({showAngles: true}) : this.setState({showAngles: false});
  };

  goToUpMessage = () => {
    let searchedItems = this.state.searchedItems;
    this._List.scrollToRow(searchedItems[this.state.incrementForResultSearchItems].id)
    this.setState({incrementForResultSearchItems: this.state.incrementForResultSearchItems + 1})
  };

  goToDownMessage = () => {
    let searchedItems = this.state.searchedItems;
    this._List.scrollToRow(searchedItems[this.state.incrementForResultSearchItems].id)
    this.setState({incrementForResultSearchItems: this.state.incrementForResultSearchItems - 1})
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

  getListRef = (node) => {
    this._List = node;
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
                  <AppBar 
                    onChangeInput={this.changeSearchText} 
                    showAngles={this.state.showAngles}
                    goToDownMessage={this.goToDownMessage}
                    goToUpMessage={this.goToUpMessage}
                  />
                  <List
                    ref={this.getListRef}
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