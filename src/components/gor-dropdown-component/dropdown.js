import React, { Component } from 'react';
import List from './list';
//import './dropdown.css';

class Dropdown extends Component {
  constructor(props){
    super(props);
    this.state={
      dropDownVisible:false,
      placeholder:this.props.placeholder,
      defaultPlaceHolder:this.props.placeholder
    };
  }
  _toggleDropdown(){
    var currentVisibility = this.state.dropDownVisible;
    currentVisibility = !currentVisibility;
    this.setState({dropDownVisible:currentVisibility});
  }
  _onSelect(idx){
    this.setState({
      dropDownVisible:!this.state.dropDownVisible,
      placeholder:this.props.options[idx].label
    },function(){
      this.props.onSelectHandler(this.props.options[idx]);
    })
    
  }

  render() {
    //var data=this._processOptions();
    return (
          <div className="gor-dropdown-wrapper">
            <span className={'gor-dropdown '+(this.state.dropDownVisible?'gor-white-background':'')}  onClick={!this.props.disabled ? this._toggleDropdown.bind(this) : null} >{!this.props.resetOnSelect ? this.state.placeholder : this.state.defaultPlaceHolder}</span>
            <span className={this.state.dropDownVisible ? "gor-dropdown-arrow up" : "gor-dropdown-arrow"}></span>
            <List data={this.props.options} optionAction={this._onSelect.bind(this)}
              dropDownVisible={this.state.dropDownVisible} />
          </div>
    );
  }
}

export default Dropdown;
