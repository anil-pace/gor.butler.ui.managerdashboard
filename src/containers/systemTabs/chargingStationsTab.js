
/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import ChargingStationsTable from './chargingStationsTable';
import { connect } from 'react-redux';
class ChargingStations extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
	
	var itemNumber = 4, connectedBots = 0, manualMode = 0, automaticMode = 0, chargersState = {"connectedBots": "--","manualMode": "--", "automaticMode":"--"};
    var chargersData =  this.props.chargersDetail.chargersDetail;

    if(chargersData && chargersData.length) {
    	for (var i = chargersData.length - 1; i >= 0; i--) {
        	if(chargersData[i].dockedBots) {
        		connectedBots++;
      		}

      		if(chargersData[i].mode === "Manual") {
      			manualMode++;
      		}
      		else{
      			automaticMode++;
      		}
    	}
    	chargersState = {"connectedBots": connectedBots,"manualMode": manualMode, "automaticMode":automaticMode};
	}
		return (
			<div>
				<div>
					<div>
						<ChargingStationsTable items={this.props.chargersDetail.chargersDetail} itemNumber={itemNumber} chargersState={chargersState}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    chargersDetail: state.chargersDetail || [],
  };
}

export default connect(mapStateToProps)(ChargingStations) ;
