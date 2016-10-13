
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
	
	var itemNumber = 4, connectedBots = 0;
    var chargersData =  this.props.chargersDetail.chargersDetail;
    if(chargersData) {
    	for (var i = chargersData.length - 1; i >= 0; i--) {
        	if(chargersData[i].dockedBots) {
        		connectedBots++;
      		}
    	}
	}
		return (
			<div>
				<div>
					<div>
						<ChargingStationsTable items={this.props.chargersDetail.chargersDetail} itemNumber={itemNumber} connectedBots={connectedBots}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    chargersDetail: state.chargersDetail || {}
  };
}

export default connect(mapStateToProps)(ChargingStations) ;
