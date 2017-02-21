import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
class FilterInputField extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    _textSubmit(e) {
    	this.props.handleInputText(this.pageNum.value,this.props.inputText);
  	}
    
	render(){
		return (
			<div>
                <div className="gor-filter-input-text"> {this.props.inputText} </div>
                <input className='gor-filter-input-wrap' type="text" onChange={this._textSubmit.bind(this)} ref={node => { this.pageNum = node }}/>
            </div>
		);
	}
};

export default FilterInputField ;