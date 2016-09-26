/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import ButlerBotTable from './butlerbotTable';

class ButlerBot extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
	console.log("call")
		/**
		 * Need to remove these hardcoded variables
		 * 
		 */
     var itemNumber = 6;
		 var temp_data=[{
  "id": "bot 1001",
  "status": "Stopped",
  "current": "pick moving",
  "msu": "msu007",
  "location": "002.00",
  "direction": "up"
}, {
  "id": "bot 1002",
  "status": "Error",
  "current": "put moving",
  "msu": "msu008",
  "location": "004.00",
  "direction": "down"
}, {
  "id": "bot 1003",
  "status": "Warning",
  "current": "audit moving",
  "msu": "msu005",
  "location": "044.00",
  "direction": "right"
}, {
  "id": "bot 1009",
  "status": "On",
  "current": "put moving",
  "msu": "msu008",
  "location": "004.00",
  "direction": "down"
}, {
  "id": "bot 1001",
  "status": "Off",
  "current": "put moving",
  "msu": "msu008",
  "location": "004.00",
  "direction": "down"
}, {
  "id": "bot 1001",
  "status": "Stopped",
  "current": "pick moving",
  "msu": "msu007",
  "location": "002.00",
  "direction": "up"
}, {
  "id": "bot 1002",
  "status": "Error",
  "current": "put moving",
  "msu": "msu008",
  "location": "004.00",
  "direction": "down"
}, {
  "id": "bot 1003",
  "status": "Warning",
  "current": "audit moving",
  "msu": "msu005",
  "location": "044.00",
  "direction": "right"
}, {
  "id": "bot 1009",
  "status": "On",
  "current": "put moving",
  "msu": "msu008",
  "location": "004.00",
  "direction": "down"
}, {
  "id": "bot 1001",
  "status": "Off",
  "current": "put moving",
  "msu": "msu008",
  "location": "004.00",
  "direction": "down"
}
];
		
		return (
			<div>
				<div>
					<div className="gorTesting">
						<ButlerBotTable items={temp_data} itemNumber={itemNumber}/>
					</div>
				</div>
			</div>
		);
	}
};

export default ButlerBot ;
