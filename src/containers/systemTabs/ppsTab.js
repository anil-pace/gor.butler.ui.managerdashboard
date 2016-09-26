
/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import PPStable from './PPStable';
class PPS extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
	var itemNumber = 5;
		 var temp_data=[{
  "id": "PPS 001",
  "status": "Stopped",
  "operatingMode": "Pick",
  "performance": "MSU007",
  "operatorAssigned": "Adnan F."
}, {
  "id": "PPS 002",
  "status": "Error",
  "operatingMode": "Put",
  "performance": "MSU008",
  "operatorAssigned": "Adnan F."
}, {
  "id": "PPS 003",
  "status": "Warning",
  "operatingMode": "Audit",
  "performance": "MSU009",
  "operatorAssigned": "Adnan F."
}, {
  "id": "PPS 004",
  "status": "On",
  "operatingMode": "Pick",
  "performance": "MSU001",
  "operatorAssigned": "Adnan F."
}, {
  "id": "PPS 005",
  "status": "Off",
  "operatingMode": "Pick",
  "performance": "MSU007",
  "operatorAssigned": "Adnan F."
}, {
  "id": "PPS 001",
  "status": "Stopped",
  "operatingMode": "Pick",
  "performance": "MSU007",
  "operatorAssigned": "Adnan F."
}, {
  "id": "PPS 001",
  "status": "Stopped",
  "operatingMode": "Pick",
  "performance": "MSU007",
  "operatorAssigned": "Adnan F."
}, {
  "id": "PPS 001",
  "status": "Stopped",
  "operatingMode": "Pick",
  "performance": "MSU007",
  "operatorAssigned": "Adnan F."
}, {
  "id": "PPS 001",
  "status": "Stopped",
  "operatingMode": "Pick",
  "performance": "MSU007",
  "operatorAssigned": "Adnan F."
}, {
  "id": "PPS 001",
  "status": "Stopped",
  "operatingMode": "Pick",
  "performance": "MSU007",
  "operatorAssigned": "Adnan F."
}
];
    
		
		return (
			<div>
				<div>
					<div>
						<PPStable items={temp_data} itemNumber={itemNumber}/>
					</div>
				</div>
			</div>
		);
	}
};

export default PPS ;
