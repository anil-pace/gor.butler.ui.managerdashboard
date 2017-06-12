import React, { Component } from 'react';
import List from './list';
//import './dropdown.css';

class Dropdown extends Component {
  constructor(props){
    super(props);
    this.state={dropDownVisible:false};
  }
  _toggleDropdown(){
    var currentVisibility = this.state.dropDownVisible;
    currentVisibility = !currentVisibility;
    this.setState({dropDownVisible:currentVisibility});
  }
  _onSelect(idx){
    this.props.onSelectHandler(this.props.options[idx].value);
  }

  render() {
    //var data=this._processOptions();
    return (
          <div>
            <span className={'col-lg-1 col-md-1 col-sm-1 gor-dropdown '+(this.state.dropDownVisible?'gor-white-background':'')}  onClick={this._toggleDropdown.bind(this)} >{this.props.placeholder}</span>
            <List data={this.props.options} optionAction={this._onSelect.bind(this)}
              dropDownVisible={this.state.dropDownVisible} />
          </div>
    );
  }
}

export default Dropdown;
