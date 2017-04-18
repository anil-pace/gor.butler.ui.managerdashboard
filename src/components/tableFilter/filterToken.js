import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';

class FilterToken extends React.Component{
	constructor(props) 
	{
       super(props);
   }


_handleTokenClick() {
    var selectedToken = this.props.tokenSelected[this.props.tokenField],tokenFound = false;
    if(selectedToken){
        for (var i = selectedToken.length - 1; i >= 0; i--) {
            if(selectedToken[i]===this.props.tokenLabel.value) {
                this.props.tokenCallBack(this.props.tokenField,this.props.tokenLabel.value,"remove");
                tokenFound = true;
                break;
            }
        }
    }   
    if(!tokenFound && !this.props.lastToken){
        this.props.tokenCallBack(this.props.tokenField,this.props.tokenLabel.value,"add");
    }
    else if(!tokenFound && this.props.lastToken) {
        this.props.tokenCallBack(this.props.tokenField,this.props.tokenLabel.value,"addDefault");
    }
    

}


render(){
    var selectedToken = this.props.tokenSelected[this.props.tokenField];
    var selectedState = (selectedToken?(selectedToken.indexOf(this.props.tokenLabel.value)>=0?true:false):false)
    return (
     <div className="gor-filter-token-container">
     <span className={selectedState?"gor-filter-token-selected":"gor-filter-token-wrap"} onClick={this._handleTokenClick.bind(this)}>
     <span className="gor-filter-token-text">{this.props.tokenLabel.label}</span>
     <span className={selectedState?"gor-filter-checked-token":"gor-filter-add-token"}/>
     </span>
     </div>
     );
}
};


export default FilterToken ;