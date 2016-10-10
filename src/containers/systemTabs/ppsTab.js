
/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import PPStable from './PPStable';
import { connect } from 'react-redux';



class PPS extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){	
    var data = this.props.PPSDetail.PPStypeDetail, operatorNum = 0, itemNumber = 5;
    if(data.length) {
    	for (var i = data.length - 1; i >= 0; i--) {
    		if(data[i].operatorAssigned !== null) {
    		operatorNum = data[i].operatorAssigned.length + operatorNum;
 	   }
 	}
	}
		return (
			<div>
				<div>
					<div>
						<PPStable items={this.props.PPSDetail.PPStypeDetail} itemNumber={itemNumber} operatorNum={operatorNum}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    PPSDetail: state.PPSDetail || {}
  };
}

export default connect(mapStateToProps)(PPS) ;
