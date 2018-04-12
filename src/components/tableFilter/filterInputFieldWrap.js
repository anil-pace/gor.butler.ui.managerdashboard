import React  from 'react';
import FilterInputField from './filterInputField';

class FilterInputFieldWrap extends React.Component{
	
 
 _processInputField() {
  var totalInput=this.props.inputText, inputFieldWrap=[],  by2value=false,type="text";
  var textboxStatus=this.props.textboxStatus ||{};
  var length=totalInput.length;

  for (let i=0; i < length; i++) {
    let flag=false;
    let type="text";
    type=totalInput[i].type?totalInput[i].type:"text";
    by2value=totalInput[i].by2value?true:false;
    if(textboxStatus.name && (totalInput[i].value=="SPECIFIC SKU ID" || totalInput[i].value=="SPECIFIC LOCATION ID")){
     flag=((textboxStatus.name).indexOf(totalInput[i].value))!==-1?false:true;
   }
   var inputValue=(flag?"":this.props.inputValue[totalInput[i].value]);
   var inputField=<FilterInputField key={i} by2value={by2value} inputText={totalInput[i]} placeholder={this.props.placeholder} handleInputText={this.props.handleInputText} inputValue={inputValue} flag={flag}/>;
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

export default FilterInputFieldWrap;



