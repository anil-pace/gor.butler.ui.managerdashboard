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
                if(selectedToken[i]===this.props.tokenLabel) {
                    this.props.tokenCallBack(this.props.tokenField,this.props.tokenLabel,"remove");
                    tokenFound = true;
                    break;
                }
            }
        }
        if(!tokenFound){
            this.props.tokenCallBack(this.props.tokenField,this.props.tokenLabel,"add");
        }
    	
    }

    
	render(){
        var selectedToken = this.props.tokenSelected[this.props.tokenField];
        var selectedState = (selectedToken?(selectedToken.indexOf(this.props.tokenLabel)>=0?true:false):false)
		return (
			<div className="gor-filter-token-container">
                <span className={selectedState?"gor-filter-token-selected":"gor-filter-token-wrap"} onClick={this._handleTokenClick.bind(this)}>
                        <span className="gor-filter-token-text">{this.props.tokenLabel}</span>
                        <span className={selectedState?"gor-close":"gor-verified-icon"}/>
                </span>
            </div>
		);
	}
};

export default FilterToken ;