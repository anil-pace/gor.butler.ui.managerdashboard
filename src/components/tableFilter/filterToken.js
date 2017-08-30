import React  from 'react';
import {SINGLE,ADD_TOKEN, ADD_DEFAULT,REMOVE_TOKEN} from '../../constants/frontEndConstants';


class FilterToken extends React.Component{
	

   _handleTokenClick() {
    var selectedToken=this.props.tokenSelected ? this.props.tokenSelected[this.props.tokenField] : null,tokenFound=false;
    var selectedOption=this.props.selection;
    var tokenSelect=this.props.tokenLabel.value;
    var _this = this;

    switch(selectedOption)
    {
        case SINGLE:
        if(selectedToken){
            tokenFound=(tokenSelect===selectedToken[0])?true:false;
            this.props.tokenCallBack(this.props.tokenField, selectedToken[0],REMOVE_TOKEN);
        }
        setTimeout(function(){
            tokenFound?_this.props.tokenCallBack(_this.props.tokenField,selectedToken[0],ADD_TOKEN):_this.props.tokenCallBack(_this.props.tokenField,_this.props.tokenLabel.value,ADD_TOKEN);
        },0)
         
        break; 

        default:
        if(selectedToken){
            for (var i=selectedToken.length - 1; i >= 0; i--) {
                if(selectedToken[i]===this.props.tokenLabel.value) {
                    this.props.tokenCallBack(this.props.tokenField,this.props.tokenLabel.value,REMOVE_TOKEN);
                    tokenFound=true;
                    break;
                }
            }
        }   
        if(!tokenFound && !this.props.lastToken){
            this.props.tokenCallBack(this.props.tokenField,this.props.tokenLabel.value,ADD_TOKEN);
        }
        else if(!tokenFound && this.props.lastToken) {
            this.props.tokenCallBack(this.props.tokenField,this.props.tokenLabel.value,ADD_DEFAULT);
        }

    }

}


render(){
    var selectedToken= this.props.tokenSelected ? this.props.tokenSelected[this.props.tokenField] : null;
    var selectedState=(selectedToken?(selectedToken.indexOf(this.props.tokenLabel.value)>=0?true:false):false)
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