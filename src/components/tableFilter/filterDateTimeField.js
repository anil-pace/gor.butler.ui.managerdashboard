import React  from 'react';
class FilterDateTimeField extends React.Component{
	
    _textSubmit(e) {
    	this.props.handleInputText(this.pageNum.value,this.props.inputText.value);
  	}
    
	render(){
		return (
			<div>
                <div className="gor-filter-input-text"> {this.props.inputText.label} </div>
                <input 
                	type={this.props.inputType} 
                	className={!this.props.flag?"gor-filter-input-wrap":"gor-filter-input-wrap gor-filter-disable"} 
                	disabled={this.props.flag}    
                	onChange={this._textSubmit.bind(this)} 
                	ref={node=> { this.pageNum=node }} 
                	value={this.props.inputValue||""}/>
            </div>
		);    
	}
};

export default FilterDateTimeField ;