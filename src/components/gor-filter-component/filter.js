import React, { Component } from 'react';
import FilterList from './filterList';
import ReactDOM from 'react-dom';

class Filter extends Component {
  constructor(props){
    super(props);
    this._getInitialState = this._getInitialState.bind(this);
    this._handleDocumentClick =  this._handleDocumentClick.bind(this);
    this._onCheckSelection= this._onCheckSelection.bind(this);
    this.state=this._getInitialState()
  }

  _getInitialState(){
    var state = {
      dropDownVisible:false,
      checkState:this.props.checkState
    };
    return state;
  }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checkState && nextProps.checkState !== this.state.checkState) {
            this.setState({
                checkState:nextProps.checkState
            })
        }
    }

  _toggleDropdown(){
    var currentVisibility = this.state.dropDownVisible;
    currentVisibility = !currentVisibility;
    this.setState({dropDownVisible:currentVisibility});
  }

  _onCheckSelection(type){
    event.stopImmediatePropagation();
    var {checkState} = this.state
    if(checkState === "all"){
      this.setState({
        checkState:"none"
      },function(){
        this._onSelect(null,"deselect_all")
      })
    }
    else if(checkState === "none" || checkState === "partial"){
      this.setState({
        checkState:"all"
      },function(){
        this._onSelect(null,"select_all")
      })
    }
  }

  _onSelect(value,type){
    var options = this.props.options,
    selectedOption = {},
    matched = false,
    len = options.length;
    if(!type){
    for(let i = 0 ; i < len ; i++){
      if(value.constructor ===String && value === options[i].value){
        selectedOption = Object.assign({},options[i]);
        break;
      }
      
    }
  }
  else{
    selectedOption.value=type
  }
    
    this.setState({
      dropDownVisible: !type ? !this.state.dropDownVisible : this.state.dropDownVisible
    },function(){
        if(selectedOption.value){
          this.props.onSelectHandler(selectedOption.value);
      }
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
          <div className="gor-filter-wrapper" onClick={!this.props.disabled ? this._toggleDropdown.bind(this) : null}>
            <div className="gor-filter-upper-wrap">
            <span className={"gor-filter-checkbox "+this.state.checkState} onClick={(e)=>{this._onCheckSelection(e,this.state.checkState)}}  />
            <span className={this.state.dropDownVisible ? "gor-filter-arrow up" : "gor-filter-arrow"}></span>
            </div>
            <FilterList data={this.props.options} selectedOption={this.props.selectedOption} optionAction={this._onSelect.bind(this)}
              dropDownVisible={this.state.dropDownVisible} />
          </div>
    );
  }


}

export default Filter;