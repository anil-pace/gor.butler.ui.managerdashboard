import React  from 'react';
import ReactDOM  from 'react-dom';
import UserDataTable from './userTab/userTabTable';
import Loader from '../components/loader/Loader';
import { connect } from 'react-redux'; 

class UsersTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		var itemNumber = 8;
		var temp_data=[{
  "name": "xyz",
  "status": "Online",
  "role": "Manager",
  "workMode": "Management",
  "location": "PPS 001",
  "productivity": "300 packet/hr",
  "logInTime": "09:00:25(4h 10m)"
}, {
  "name": "xyz",
  "status": "Online",
  "role": "Supevisor",
  "workMode": "Management",
  "location": "PPS 001",
  "productivity": "300 packet/hr",
  "logInTime": "09:00:25(4h 10m)"
}, {
  "name": "xyz",
  "status": "Online",
  "role": "Operator",
  "workMode": "Pick Back",
  "location": "PPS 001",
  "productivity": "300 packet/hr",
  "logInTime": "09:00:25(4h 10m)"
}, {
  "name": "xyz",
  "status": "Offline",
  "role": "Operator",
  "workMode": "Pick back",
  "location": "PPS 001",
  "productivity": "300 packet/hr",
  "logInTime": "09:00:25(4h 10m)"
}, {
  "name": "xyz",
  "status": "Offline",
  "role": "Operator",
  "workMode": "Pick back",
  "location": "PPS 001",
  "productivity": "300 packet/hr",
  "logInTime": "09:00:25(4h 10m)"
}, {
  "name": "xyz",
  "status": "Online",
  "role": "Manager",
  "workMode": "Management",
  "location": "PPS 001",
  "productivity": "300 packet/hr",
  "logInTime": "09:00:25(4h 10m)"
}, {
  "name": "xyz",
  "status": "Online",
  "role": "Supevisor",
  "workMode": "Management",
  "location": "PPS 001",
  "productivity": "300 packet/hr",
  "logInTime": "09:00:25(4h 10m)"
}, {
  "name": "xyz",
  "status": "Online",
  "role": "Operator",
  "workMode": "Pick Back",
  "location": "PPS 001",
  "productivity": "300 packet/hr",
  "logInTime": "09:00:25(4h 10m)"
}, {
  "name": "xyz",
  "status": "Offline",
  "role": "Operator",
  "workMode": "Pick back",
  "location": "PPS 001",
  "productivity": "300 packet/hr",
  "logInTime": "09:00:25(4h 10m)"
}, {
  "name": "xyz",
  "status": "Offline",
  "role": "Operator",
  "workMode": "Pick back",
  "location": "PPS 001",
  "productivity": "300 packet/hr",
  "logInTime": "09:00:25(4h 10m)"
}
];
		/**
		 * Need to remove these hardcoded variables
		 * 
		 */
		
		return (
					<div className="gorTesting">
          <Loader isLoading={this.props.isLoading} />
						<UserDataTable items={temp_data} itemNumber={itemNumber}/>
					</div>
		);
	}
};

function mapStateToProps(state,ownProps) {
 return {
  isLoading:state.loader.isLoading
 }
} 

export  default connect(mapStateToProps)(UsersTab);

