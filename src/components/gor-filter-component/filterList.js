import React, { Component } from 'react';

class FilterList extends Component {
  constructor(props){
    super(props);
  }
  _processOptions(){
    var optionList=[], data = this.props.data || [],
    optionsLen=data.length;
    for(let index=0;index<optionsLen;index++){
      
      optionList.push(<span className={data[index].disabled?"disabled gor-dropdown-option" : "gor-dropdown-option"}  key={index} onClick={!data[index].disabled ? this.props.optionAction.bind(null,data[index].value,null) : null} >
                        <span >{data[index].label}</span>
                        <span className={this.props.listItemIcon && this.props.placeholder===data[index].label?this.props.listItemIcon:"gor-action-icon-none"}></span>
                      </span>);
    }
    return optionList;
  }

  render() {
    var optionList=this._processOptions();
    return (
        <span className={"gor-option-wrapper"}
         style={this.props.dropDownVisible?{display:'block'}:{display:'none'}} >
        {optionList}</span>  
    );
  }
}

export default FilterList;