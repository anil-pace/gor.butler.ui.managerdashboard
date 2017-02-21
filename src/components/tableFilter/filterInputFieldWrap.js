import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import FilterInputField from './filterInputField';
class FilterInputFieldWrap extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    _textSubmit(e) {
    	this.props.handleInputText(this.pageNum.value,this.props.inputText);
  	}
    _processInputField() {
        var totalInput = this.props.inputText, inputFieldWrap =[];
        for (var i = totalInput.length - 1; i >= 0; i--) {
            var inputField = <FilterInputField inputText={totalInput[i]} handleInputText={this.props.handleInputText}/>;
            inputFieldWrap.push(inputField)
        }
        return inputFieldWrap;
    }
	render(){
        var inputFields = this._processInputField()
		return (
			<div>
                {inputFields}
            </div>
		);
	}
};

export default FilterInputFieldWrap ;