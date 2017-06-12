import React, { Component } from 'react';

class List extends Component {
  constructor(props){
    super(props);
  }
  _processOptions(){
    var optionList=[], data = this.props.data,
    optionsLen=data.length;
    for(let index=0;index<optionsLen;index++){
      optionList.push(<span className={data[index].disabled?"disabled gor-dropdown-option" : "gor-dropdown-option"}  key={index} onClick={!data[index].disabled ? this.props.optionAction.bind(null,index) : null} >
                        <span >{data[index].label}</span>
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

export default List;
