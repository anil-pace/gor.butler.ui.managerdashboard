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
        var totalInput = this.props.inputText, inputFieldWrap =[];
        var textboxStatus=this.props.textboxStatus;
        for (var i = totalInput.length - 1; i >= 0; i--) {
            //We are checking the value of token according to thevakue we are enable and disbale the text box
            let flag=false
            if(textboxStatus.name && !(textboxStatus.name[0][0]==='any'))
            {
            if(textboxStatus.name[0].indexOf(totalInput[i].value)!==-1 || totalInput[i].value=="AUDIT TASK ID")
            {
                flag=false;
            }
            else
            {
                flag=true;
            }
        }
            var inputValue = (flag==true)?"":this.props.inputValue[totalInput[i].value];
            var inputField = <FilterInputField key={i} inputText={totalInput[i]} handleInputText={this.props.handleInputText} inputValue={inputValue} flag={flag} />;
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
function mapStateToProps(state, ownProps){
  return {
      textboxStatus:  state.auditInfo.textBoxStatus  || {}
  };
}
FilterInputFieldWrap.PropTypes={
  textboxStatus:React.PropTypes.object
};
export default connect(mapStateToProps)(FilterInputFieldWrap);



