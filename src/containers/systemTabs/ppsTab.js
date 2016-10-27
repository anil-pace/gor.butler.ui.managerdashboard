
/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import PPStable from './PPStable';
import { connect } from 'react-redux';
import {changePPSmode} from '../../actions/ppsModeChangeAction'



class PPS extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){	
	var operationMode = {"Pick":0, "Put":0, "Audit":0,"NotSet":0};
    var data = this.props.PPSDetail.PPStypeDetail, operatorNum = 0, itemNumber = 5;
    if(data && data.length) {
 		for (var i = data.length - 1; i >= 0; i--) {
    		if(data[i].operatingMode !== null) {

    		operationMode[data[i].operatingMode.props.defaultMessage] = operationMode[data[i].operatingMode.props.defaultMessage] +1;

 	   		}
 		}
	}
	else {
		operationMode = {"Pick":"--", "Put":"--", "Audit":"--","NotSet":"--"};
		operatorNum = "--";
	}
		return (
			<div>
				<div>
					<div className="gorTesting">
						<PPStable items={this.props.PPSDetail.PPStypeDetail} itemNumber={itemNumber} operatorNum={operatorNum} operationMode={operationMode} modeChange={this.props.changePPSmode} intlMessg={this.props.intlMessages}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
	console.log(state)
  return {
    PPSDetail: state.PPSDetail || [],
    intlMessages: state.intl.messages
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    changePPSmode: function(data){ dispatch(changePPSmode(data)); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(PPS) ;
