import React, { Component } from 'react';
import Ddown from 'react-dropdown';
import {SHOW_ALL_ENTRIES, SHOW_SELECTED_ENTRIES} from '../../constants/frontEndConstants';

class SearchDropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {selected:"Search and select", showList:false, currentQuery:"", currentList:"", checkedIndex:"", totalChecked:0, tabSelected:SHOW_ALL_ENTRIES}
    this._showList = this._showList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var listLength = (nextProps.list && nextProps.list.length?nextProps.list.length:0);
    var initialIndex = Array.from(Array(listLength).keys());
    var checkedIndex  = new Array(listLength).fill(false);
    this.state = {selected:"Search and select", showList:false, currentQuery:"", currentList:initialIndex, checkedIndex:checkedIndex, totalChecked:0, tabSelected:SHOW_ALL_ENTRIES}
    this._showList = this._showList.bind(this);
  }

  _querySubmit(e) {
    var list = this.props.list;
    var searchQuery = this.pageNum.value, filtered=[];
    for(var i = 0; i < list.length; i++) {
        if (list[i].value.indexOf(searchQuery) > -1) {
            filtered.push(i);
        }
    }
    this.setState({currentList:filtered, currentQuery:this.pageNum.value})
  }

  _selectThis(i) {
    var currentOption = this.props.list[i].value, placeholderList="", totalChecked=0;
    var checkedState = this.state.checkedIndex, listToDispatch=[];
    checkedState[i] = !checkedState[i];
    for (var i = this.props.list.length - 1; i >= 0; i--) {
      if(checkedState[i]) {
        placeholderList = (placeholderList===""?this.props.list[i].value:placeholderList + ", " + this.props.list[i].value);
        listToDispatch.push(this.props.list[i].value)
        totalChecked++;
      }
    }
    this.props.selectedItems(listToDispatch);
    this.setState({checkedIndex:checkedState, selected:placeholderList, totalChecked:totalChecked});
    this._hideList();
  }

  _showList() { 
    this.setState({showList: true});
  }

   _hideList() {
    this.setState({showList: false});
  }

  _selectTab(tabSelected) {
    this.setState({tabSelected:tabSelected})
  }

  _clearQuery() {
    this.pageNum.value="";
    this._querySubmit();
    this.setState({currentQuery:""});
  }

  _renderList() {
    
    var items = [];
    var list = this.state.currentList;
    var totalList = this.props.list;

    
      for (var i = 0; i < list.length; i++) {
      var item = totalList[list[i]];
      var checkedState = this.state.checkedIndex;
      if(checkedState[list[i]] || this.state.tabSelected === SHOW_ALL_ENTRIES) {
      items.push(<div>
                      <div className="gor-inline">
                        <input type="checkbox" checked={checkedState[list[i]]} onChange={this._selectThis.bind(this,list[i])}/> 
                      </div>
                      <div className="gor-inline">
                        {item.value}
                      </div>
                  </div>);
       }
      }
    return items;
  }

  render () {
    var dropdownOptions = this._renderList();
    return (
      <div style={{width:'100%'}}>
        <div className={this.state.showList?"gor-searchDropdown-input-wrap-open":"gor-searchDropdown-input-wrap"} onClick={() => {this._showList()}}>
          <div className="gor-searchDropdown-icon-wrap">
            <div className="searchbox-magnifying-glass-icon"/>
          </div>
          <input type="text" onChange={this._querySubmit.bind(this)} 
                  style={{border:'none', height:'18px', width:"67%"}}
                  placeholder={this.state.selected} 
                  ref={node => { this.pageNum = node }}
                  value={this.state.currentQuery} />
           {
            this.state.currentQuery?
              <div className="gor-searchDropdown-icon-wrap">
                <div className="gor-close" onClick={this._clearQuery.bind(this)}/>
              </div>
              :""}       
        </div>
        <div className={this.state.showList?"gor-dropdown-list":"gor-display-none"} >
          <div className="gor-searchDropdown-tab-wrap">
            <div className={this.state.tabSelected===SHOW_ALL_ENTRIES?"gor-searchDropdown-tab-selected":"gor-searchDropdown-tab"} onClick={this._selectTab.bind(this,SHOW_ALL_ENTRIES)}>
              <div className="gor-searchDropdown-tab-block"> 
                Available
              </div> 
            </div>
            <div className={this.state.tabSelected===SHOW_SELECTED_ENTRIES?"gor-searchDropdown-tab-selected":"gor-searchDropdown-tab"} onClick={this._selectTab.bind(this,SHOW_SELECTED_ENTRIES)}>
              <div className="gor-searchDropdown-tab-block"> 
                {this.state.totalChecked} Selected
              </div>
            </div>
          </div>
          <div className="gor-searchDropdown-list">
            {dropdownOptions.length?dropdownOptions:<div className="gor-searchDropdown-noData">No Data</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default SearchDropdown;
