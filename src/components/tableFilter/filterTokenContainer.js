import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import FilterToken from './filterToken';
class FilterTokenWrap extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    _processTokenFields() {
    	var tokens = this.props.label, tokenWrap=[];
    	for (var i = tokens.length - 1; i >= 0; i--) {
    		var tokenComponent = <FilterToken tokenCallBack={this.props.tokenCallBack} tokenField={this.props.field} tokenLabel={tokens[i]}/>
    		tokenWrap.push(tokenComponent);
    	}
    	return tokenWrap;
    }
    
	render(){
		var tokenWrap = this._processTokenFields()
		return (
			<div>
				<div className="gor-filter-token-section-h1">
					{this.props.field}
				</div>
               	{tokenWrap}
            </div>
		);
	}
};

export default FilterTokenWrap ;