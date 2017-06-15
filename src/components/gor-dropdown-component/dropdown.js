import React, { Component } from 'react';
import List from './list';
import ReactDOM from 'react-dom';

class Dropdown extends Component {
  constructor(props){
    super(props);
    this.state={
      dropDownVisible:false,
      placeholder:this.props.placeholder,
      defaultPlaceHolder:this.props.placeholder
    };
    this._handleDocumentClick =  this._handleDocumentClick.bind(this);
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

  _handleDocumentClick() {
     if (!ReactDOM.findDOMNode(this).contains(event.target)) {
       this.setState({dropDownVisible: false});
     }
 }


  componentDidMount(){
      document.addEventListener('click',this._handleDocumentClick,false);
  }

  componentWillUnmount() {
      document.removeEventListener("click", this._handleDocumentClick,false)
  }

  render() {
    
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
