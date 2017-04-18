import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux'; 
import { FormattedMessage } from 'react-intl';
import FilterInputField from './filterInputField';

class FilterInputFieldWrap extends React.Component{
	constructor(props) 
	{
       super(props);
   }
   _textSubmit(e) {
       this.props.handleInputText(this.pageNum.value,this.props.inputText.value);
   }
   _processInputField() {
    var totalInput = this.props.inputText, inputFieldWrap =[], flag=false;
    var textboxStatus=this.props.textboxStatus ||{};
    for (var i = totalInput.length - 1; i >= 0; i--) {
        if(textboxStatus.name){
        flag=((textboxStatus.name).indexOf(totalInput[i].value))!==-1?false:true;
    }
    var inputValue =(flag?"":this.props.inputValue[totalInput[i].value]);
        var inputField = <FilterInputField key={i} inputText={totalInput[i]} handleInputText={this.props.handleInputText} inputValue={inputValue} flag={flag}/>;
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

export default FilterInputFieldWrap;



