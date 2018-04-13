import React  from 'react';
import FilterDateTimeField from './filterDateTimeField';

class FilterDateTimeFieldWrap extends React.Component{
	
 _textSubmit(e) {
   this.props.handleInputText(this.pageNum.value,this.props.inputText.value);
 }
 _processInputField() {
  var totalInput=this.props.inputText, inputFieldWrap=[], flag=false;
  var textboxStatus=this.props.textboxStatus ||{};
  var length=totalInput.length;
  for (let i=0; i < length; i++) {
    if(textboxStatus.name){

     flag=((textboxStatus.name).indexOf(totalInput[i].value))!==-1?false:true;
   }
   var inputValue=(flag?"":this.props.inputValue[totalInput[i].value]);
   var inputField=<FilterDateTimeField inputType={this.props.inputType} key={i} inputText={totalInput[i]} handleInputText={this.props.handleInputText} inputValue={inputValue} flag={flag}/>;
   inputFieldWrap.push(inputField)
 }
 return inputFieldWrap;
}
render(){
  var inputFields=this._processInputField()
  return (
          <div>
          {inputFields}
          </div>
          );
}
}; 

export default FilterDateTimeFieldWrap;