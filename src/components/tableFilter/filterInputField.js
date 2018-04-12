import React  from 'react';
class FilterInputField extends React.Component{
	
    _textSubmit(e) {
    	this.props.handleInputText(this.pageNum.value,this.props.inputText.value);
  	}
    
	render(){
		return (
			<div className={this.props.by2value?'dividebyTwo':""}>
                <div className="gor-filter-input-text"> {this.props.inputText.label} </div>
                <input className={!this.props.flag?"gor-filter-input-wrap":"gor-filter-input-wrap gor-filter-disable"} placeholder={this.props.placeholder} disabled={this.props.flag}   type="text" onChange={this._textSubmit.bind(this)} ref={node=> { this.pageNum=node }} value={this.props.inputValue||""}/>
            </div>
		);    
	}
};

export default FilterInputField ;




