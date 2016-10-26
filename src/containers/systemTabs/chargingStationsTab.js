
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
	console.log("this props", this.props)
	var itemNumber = 4, connectedBots = 0, manualMode = 0, automaticMode = 0, chargersState = {"connectedBots": "--","manualMode": "--", "automaticMode":"--"};
    var chargersData =  this.props.chargersDetail.chargersDetail;
    if(chargersData && chargersData.length) {
    	for (var i = chargersData.length - 1; i >= 0; i--) {
        	if(chargersData[i].dockedBots !== "--") {
        		connectedBots++;
      		}

      		if(chargersData[i].mode.props.defaultMessage === "Manual") {
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
					<div className="gorTesting">
						<ChargingStationsTable items={this.props.chargersDetail.chargersDetail} itemNumber={itemNumber} chargersState={chargersState} intlMessg={this.props.intlMessages}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    chargersDetail: state.chargersDetail || [],
    intlMessages: state.intl.messages
  };
}

export default connect(mapStateToProps)(ChargingStations) ;
