import React  from 'react';
import FilterToken from './filterToken';

class FilterTokenWrap extends React.Component{
	
    _processTokenFields() {
    	var tokens=this.props.label, tokenWrap=[];
        var tokenSelected=this.props.selectedToken;
        var length= tokens.length;
    	for (let i=0; i < length; i++) {
    		var tokenComponent=<FilterToken key={tokens[i]+i} tokenCallBack={this.props.tokenCallBack}  
                                              tokenField={this.props.field.value} tokenLabel={tokens[i]} selection={this.props.selection}
                                              tokenSelected={tokenSelected} lastToken={i?false:true} />
    		tokenWrap.push(tokenComponent);
    	}
    	return tokenWrap;
    }
    
	render(){
		var tokenWrap=this._processTokenFields()
		return (
			<div>
				<div className="gor-filter-token-section-h1">
					{this.props.field.label}
				</div>
               	{tokenWrap}
            </div>
		);
	} 
};

export default FilterTokenWrap;
