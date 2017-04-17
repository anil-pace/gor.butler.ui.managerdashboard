import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import {SPECIFIC_SKU_ID,SPECIFIC_LOCATION_ID} from '../../constants/frontEndConstants';

class FilterToken extends React.Component{
	constructor(props) 
	{
       super(props);
   }

   _mappingArray(selectedToken){
    var mappingArray=[];
    mappingArray.push(selectedToken.map(function(value) {
      switch(value){
        case "sku":
        return SPECIFIC_SKU_ID;
        case "location":
        return SPECIFIC_LOCATION_ID;  
        default:
        return "any";
    }}));
    return mappingArray;
}
_handleTokenClick() {
    var obj={};
    var selectedToken = this.props.tokenSelected[this.props.tokenField],tokenFound = false;
    if(selectedToken){
        for (var i = selectedToken.length - 1; i >= 0; i--) {
            if(selectedToken[i]===this.props.tokenLabel.value) {
                this.props.tokenCallBack(this.props.tokenField,this.props.tokenLabel.value,"remove");
                 //This part will execute for Audit filter we are searching through the id 
                 if((this.props.tokenLabel.label.props.id).search('audit')!==-1)
                 {
                    obj.name=this._mappingArray(selectedToken);
                    this.props.setTextBoxStatus(obj);
                }
                
                tokenFound = true;
                break;
            }
        }
    }   
    if(!tokenFound && !this.props.lastToken){
        this.props.tokenCallBack(this.props.tokenField,this.props.tokenLabel.value,"add");
        //This part will execute for Audit filter we are searching through the id 
        if((this.props.tokenLabel.label.props.id).search('audit')!==-1)
        {
            obj.name=this._mappingArray(selectedToken);
            this.props.setTextBoxStatus(obj);
        }
        
    }
    else if(!tokenFound && this.props.lastToken) {
        this.props.tokenCallBack(this.props.tokenField,this.props.tokenLabel.value,"addDefault");
         //This part will execute for Audit filter we are searching through the id 
         if((this.props.tokenLabel.label.props.id).search('audit')!==-1)
         {
            obj={};
            this.props.setTextBoxStatus(obj);
        }
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