import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import FilterToken from './filterToken';
import {setTextBoxStatus}  from '../../actions/auditActions';
import { connect } from 'react-redux'; 

class FilterTokenWrap extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    _processTokenFields() {
    	var tokens = this.props.label, tokenWrap=[];
        var tokenSelected = this.props.selectedToken;
    	for (var i = tokens.length - 1; i >= 0; i--) {
    		var tokenComponent = <FilterToken key={tokens[i]+i} tokenCallBack={this.props.tokenCallBack} setTextBoxStatus={this.props.setTextBoxStatus.bind(this)} 
                                              tokenField={this.props.field.value} tokenLabel={tokens[i]} 
                                              tokenSelected={tokenSelected} lastToken={i?false:true} />
    		tokenWrap.push(tokenComponent);
    	}
    	return tokenWrap;
    }
    
	render(){
		var tokenWrap = this._processTokenFields()
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
function mapStateToProps(state, ownProps){
  return {

  }
}
var mapDispatchToProps = function(dispatch){
  return {
        setTextBoxStatus: function(data){dispatch(setTextBoxStatus(data));}
    }
}
FilterTokenWrap.PropTypes={
setTextBoxStatus:React.PropTypes.func
}

export default connect(mapStateToProps,mapDispatchToProps)(FilterTokenWrap);