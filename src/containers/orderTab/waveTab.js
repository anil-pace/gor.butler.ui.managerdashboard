/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import WavesTable from './waveTable';

class WaveTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		var itemNumber = 7;
		var temp_data=[{
  "waves": "Wave-009",
  "status": "Online",
  "startTime": "Today, 09:15",
  "cutOffTime": "Today, 14:15",
  "ordersToFulfill": "3415",
  "progress": 30,
  "totalOrders": "4324"
}, {
  "waves": "Wave-009",
  "status": "Online",
  "startTime": "Today, 09:15",
  "cutOffTime": "Today, 14:15",
  "ordersToFulfill": "2344",
  "progress": 40,
  "totalOrders": "2342"
}, {
  "waves": "Wave-009",
  "status": "Online",
  "startTime": "Today, 09:15",
  "cutOffTime": "Today, 14:15",
  "ordersToFulfill": "5345",
  "progress": 70,
  "totalOrders": "3453"
}, {
  "waves": "Wave-009",
  "status": "Offline",
  "startTime": "Today, 09:15",
  "cutOffTime": "Today, 14:15",
  "ordersToFulfill": "5433",
  "progress": 10,
  "totalOrders": "2345"
}, {
  "waves": "Wave-009",
  "status": "Offline",
  "startTime": "Today, 09:15",
  "cutOffTime": "Today, 14:15",
  "ordersToFulfill": "7665",
  "progress": 50,
  "totalOrders": "5645"
}, {
  "waves": "Wave-009",
  "status": "Online",
  "startTime": "Today, 09:15",
  "cutOffTime": "Today, 14:15",
  "ordersToFulfill": "1254",
  "progress": 90,
  "totalOrders": "6565"
}, {
  "waves": "Wave-009",
  "status": "Online",
  "startTime": "Today, 09:15",
  "cutOffTime": "Today, 14:15",
  "ordersToFulfill": "5345",
  "progress": 20,
  "totalOrders": "6546"
}, {
  "waves": "Wave-009",
  "status": "Online",
  "startTime": "Today, 09:15",
  "cutOffTime": "Today, 14:15",
  "ordersToFulfill": "2323",
  "progress": 60,
  "totalOrders": "3324"
}, {
  "waves": "Wave-009",
  "status": "Offline",
  "startTime": "Today, 09:15",
  "cutOffTime": "Today, 14:15",
  "ordersToFulfill": "3454",
  "progress": 70,
  "totalOrders": "7653"
}, {
  "waves": "Wave-009",
  "status": "Offline",
  "startTime": "Today, 09:15",
  "cutOffTime": "Today, 14:15",
  "ordersToFulfill": "3415",
  "progress": 40,
  "totalOrders": "3444"
}
];
		
		return (
			<div >
				<WavesTable items={temp_data} itemNumber={itemNumber}/>
			</div>
		);
	}
};

export default WaveTab ;
