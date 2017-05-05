import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
class FilterInputField extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    _textSubmit(e) {
    	this.props.handleInputText(this.pageNum.value,this.props.inputText.value);
  	}
    
	render(){
		return (
			<div>
                <div className="gor-filter-input-text"> {this.props.inputText.label} </div>
                <input className={!this.props.flag?"gor-filter-input-wrap":"gor-filter-input-wrap gor-filter-disable"} disabled={this.props.flag}   type="text" onChange={this._textSubmit.bind(this)} ref={node => { this.pageNum = node }} value={this.props.inputValue||""}/>
            </div>
		);    
	}
};

export default FilterInputField ;




