import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';

class FilterToken extends React.Component{
	constructor(props) 
	{
    	super(props);
    }

    _handleTokenClick() {
    	this.props.tokenCallBack(this.props.tokenField,this.props.tokenLabel);
    }

    
	render(){
		return (
			<div className="gor-filter-token-container">
                <span className="gor-filter-token-wrap" onClick={this._handleTokenClick.bind(this)}>
                        <span className="gor-filter-token-text">{this.props.tokenLabel}</span>
                        <span className="gor-verified-icon"/>
                </span>
            </div>
		);
	}
};

export default FilterToken ;