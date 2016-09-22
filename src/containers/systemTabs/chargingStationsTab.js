
/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import ChargingStationsTable from './chargingStationsTable';
class ChargingStations extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
	
		var itemNumber = 3;
		 var temp_data=[{
  "id": "Charging station 001",
  "status": "Stopped",
  "dockedBots": "Butler 1005"
}, {
 "id": "Charging station 002",
  "status": "Error",
  "dockedBots": "Butler 1003"
}, {
  "id": "Charging station 003",
  "status": "Warning",
  "dockedBots": "Butler 1001"
}, {
  "id": "Charging station 004",
  "status": "On",
  "dockedBots": "Butler 1007"
}, {
  "id": "Charging station 005",
  "status": "Off",
  "dockedBots": "Butler 1007"
}, {
  "id": "Charging station 006",
  "status": "Stopped",
  "dockedBots": "Butler 1007"
}, {
  "id": "Charging station 007",
  "status": "Stopped",
  "dockedBots": "Butler 1007"
}, {
  "id": "Charging station 008",
  "status": "Stopped",
  "dockedBots": "Butler 1007"
}, {
  "id": "Charging station 009",
  "status": "Stopped",
  "dockedBots": "Butler 1007"
}, {
  "id": "Charging station 010",
  "status": "Stopped",
  "dockedBots": "Butler 1007"
}
];
    
		
		return (
			<div>
				<div>
					<div>
						<ChargingStationsTable items={temp_data} itemNumber={itemNumber}/>
					</div>
				</div>
			</div>
		);
	}
};

export default ChargingStations ;
