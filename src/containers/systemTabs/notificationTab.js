/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import NotificationTable from './notificationTable';
import { connect } from 'react-redux';
class Notification extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		

		var butlerData=[{
  "component": "BOT 119",
  "status": "Stopped",
  "description": "Manager",
  "remark": "Management",
  "time": "09:30:12"
}, {
  "component": "PPS 123",
  "status": "Error",
  "description": "Supevisor",
  "remark": "Management",
  "time": "10:31:32"
}, {
  "component": "BOT 120",
  "status": "Warning",
  "description": "Operator",
  "remark": "Pick Back",
  "time": "09:40:12"
}, {
  "component": "MSU 002",
  "status": "Offline",
  "description": "Operator",
  "remark": "Pick back",
  "time": "09:50:52"
}, {
  "component": "BOT 212",
  "status": "Offline",
  "description": "Operator",
  "remark": "Pick back",
  "time": "09:40:12"
}, {
  "component": "MSU 316",
  "status": "Online",
  "description": "Manager",
  "remark": "Management",
  "time": "09:30:12"
}, {
  "component": "BOT 020",
  "status": "Online",
  "description": "Supevisor",
  "remark": "Management",
  "time": "09:50:52"
}, {
  "component": "BOT 213",
  "status": "Online",
  "description": "Operator",
  "remark": "Pick Back",
  "time": "11:30:12"
}, {
  "component": "MSU 556",
  "status": "Offline",
  "description": "Operator",
  "remark": "Pick back",
  "time": "09:30:12"
}, {
  "component": "BOT 110",
  "status": "Online",
  "description": "Operator",
  "remark": "Pick back",
  "time": "09:50:52"
}, {
  "component": "BOT 119",
  "status": "Stopped",
  "description": "Manager",
  "remark": "Management",
  "time": "09:30:12"
}, {
  "component": "PPS 123",
  "status": "Error",
  "description": "Supevisor",
  "remark": "Management",
  "time": "10:31:32"
}, {
  "component": "BOT 120",
  "status": "Warning",
  "description": "Operator",
  "remark": "Pick Back",
  "time": "09:40:12"
}, {
  "component": "MSU 002",
  "status": "Offline",
  "description": "Operator",
  "remark": "Pick back",
  "time": "09:50:52"
}, {
  "component": "BOT 212",
  "status": "Offline",
  "description": "Operator",
  "remark": "Pick back",
  "time": "09:40:12"
}, {
  "component": "MSU 316",
  "status": "Online",
  "description": "Manager",
  "remark": "Management",
  "time": "09:30:12"
}, {
  "component": "BOT 020",
  "status": "Online",
  "description": "Supevisor",
  "remark": "Management",
  "time": "09:50:52"
}, {
  "component": "BOT 213",
  "status": "Online",
  "description": "Operator",
  "remark": "Pick Back",
  "time": "11:30:12"
}, {
  "component": "MSU 556",
  "status": "Offline",
  "description": "Operator",
  "remark": "Pick back",
  "time": "09:30:12"
}, {
  "component": "BOT 110",
  "status": "Online",
  "description": "Operator",
  "remark": "Pick back",
  "time": "09:50:52"
}, {
  "component": "BOT 119",
  "status": "Stopped",
  "description": "Manager",
  "remark": "Management",
  "time": "09:30:12"
}, {
  "component": "PPS 123",
  "status": "Error",
  "description": "Supevisor",
  "remark": "Management",
  "time": "10:31:32"
}, {
  "component": "BOT 120",
  "status": "Warning",
  "description": "Operator",
  "remark": "Pick Back",
  "time": "09:40:12"
}, {
  "component": "MSU 002",
  "status": "Offline",
  "description": "Operator",
  "remark": "Pick back",
  "time": "09:50:52"
}, {
  "component": "BOT 212",
  "status": "Offline",
  "description": "Operator",
  "remark": "Pick back",
  "time": "09:40:12"
}, {
  "component": "MSU 316",
  "status": "Online",
  "description": "Manager",
  "remark": "Management",
  "time": "09:30:12"
}, {
  "component": "BOT 020",
  "status": "Online",
  "description": "Supevisor",
  "remark": "Management",
  "time": "09:50:52"
}, {
  "component": "BOT 213",
  "status": "Online",
  "description": "Operator",
  "remark": "Pick Back",
  "time": "11:30:12"
}, {
  "component": "MSU 556",
  "status": "Offline",
  "description": "Operator",
  "remark": "Pick back",
  "time": "09:30:12"
}, {
  "component": "BOT 110",
  "status": "Online",
  "description": "Operator",
  "remark": "Pick back",
  "time": "09:50:52"
}
];
  var itemNumber = 5;
  
		return (
			<div>
				<div>
					<div className="gorTesting">
						<NotificationTable items={butlerData} itemNumber={itemNumber} />
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    butlerDetail: state.butlerDetail || {},
  };
}

export default connect(mapStateToProps)(Notification) ;


