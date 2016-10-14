
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
	var operationMode = {"pick":0, "put":0, "audit":0};
    var data = this.props.PPSDetail.PPStypeDetail, operatorNum = 0, itemNumber = 5;
    if(data && data.length) {
    	for (var i = data.length - 1; i >= 0; i--) {
    		if(data[i].operatorAssigned !== null) {
    		operatorNum = data[i].operatorAssigned.length + operatorNum;
 	  	 }
 		}
 		for (var i = data.length - 1; i >= 0; i--) {
    		if(data[i].operatingMode !== null) {
    		operationMode[data[i].operatingMode] = operationMode[data[i].operatingMode] +1;
 	   }
 	}
	}
		return (
			<div>
				<div>
					<div>
						<PPStable items={this.props.PPSDetail.PPStypeDetail} itemNumber={itemNumber} operatorNum={operatorNum} operationMode={operationMode} modeChange={this.props.changePPSmode}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    PPSDetail: state.PPSDetail || [],
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    changePPSmode: function(data){ dispatch(changePPSmode(data)); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(PPS) ;
