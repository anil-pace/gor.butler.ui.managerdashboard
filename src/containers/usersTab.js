import React  from 'react';
import ReactDOM  from 'react-dom';
import UserDataTable from './userTab/userTabTable';
import { connect } from 'react-redux'; 
import { defineMessages } from 'react-intl';
import {stringConfig} from '../constants/backEndConstants'

//Mesages for internationalization
const messages = defineMessages({
    userOperator: {
      id:"userDetails.operator", 
      defaultMessage: "Operator"
    },
    userManager:{
      id:"userDetails.manager", 
      defaultMessage: "Manager"
    },
    userPick:{
      id:"userDetails.pick.status",
      defaultMessage: "Pick"
    },
    auditCompletedStatus: {
      id:"auditdetail.completed.status", 
      defaultMessage: "Completed"
    },
    userPut:{
      id:"userDetails.put.status", 
      defaultMessage: "Put"
    },
    userAudit:{
      id:"userDetails.audit.status", 
      defaultMessage: "Audit"
    },
    userFront:{
      id:"userDetails.front.status", 
      defaultMessage: "Front"
    },
    userBack:{
      id:"userDetails.back.status", 
      defaultMessage: "Back"
    },
    userOnline:{
      id:"userDetails.online.status", 
      defaultMessage: "Online"
    },
    userOffline:{
      id:"userDetails.offline.status", 
      defaultMessage: "Offline"
    },
    userLocation:{
      id:"userDetails.location",
      defaultMessage: "PPS {ppsId}"
    }


});


class UsersTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
  _processUserDetails(data, nProps) {
  var nProps = this,
  data = nProps.props.userdetails
  let operator  = nProps.context.intl.formatMessage(messages.userOperator);
  let manager  = nProps.context.intl.formatMessage(messages.userManager);
  let pick  = stringConfig.pick;
  let put  = stringConfig.put;
  let audit  = stringConfig.audit;
  let front  = nProps.context.intl.formatMessage(messages.userFront);
  let back  = nProps.context.intl.formatMessage(messages.userBack);
  let online  = stringConfig.online;
  let offline  = stringConfig.offline;
  var role = {"butler_ui":operator, "butler_supervisor":manager};
  var work_mode = {"pick":pick,"put": put,"audit": audit};
  var work_place = {"front": front, "back":back};


  var userDetails = [], userData = {};
  for (var i = data.length - 1; i >= 0; i--) {

    userData.id = (data[i].first_name || "--") + " " + (data[i].last_name || "--");
    if(data[i].logged_in){
      userData.status = online;
      userData.statusClass = "online";
    if(data[i].pps.pps_mode && data[i].pps.seat_type) {  
      userData.workMode = work_mode[data[i].pps.pps_mode] + " " + work_place[data[i].pps.seat_type];
    }

    else if(data[i].pps.pps_mode) {
      userData.workMode = work_mode[data[i].pps.pps_mode];
    }
    userData.location = nProps.context.intl.formatMessage(messages.userLocation,{"ppsId":data[i].pps.pps_id});
    userData.logInTime = data[i].login_time;
    }

    else {
    userData.status = offline;
    userData.statusClass = "offline";
    userData.workMode = "--";
    userData.location = "--" ;
    userData.logInTime = "--";
    }


    userData.uid = data[i].user_id
    userData.userName= data[i].user_name;
    userData.first=data[i].first_name;
    userData.last=data[i].last_name;  
    userData.roleId=data[i].role;
    userData.role = role[data[i].role];
    userDetails.push(userData);
    userData = {};
  }

  return userDetails;
}	
	render(){
		var itemNumber = 7, userData;	
		if(this.props.userdetails !== undefined) {
			userData = this._processUserDetails();
		}	
		return (
			<div>
				<div>
					<div className="gor-User-Table">
						<UserDataTable items={userData} itemNumber={itemNumber} intlMessg={this.props.intlMessages} mid={this.props.manager.users?this.props.manager.users[0].id:''}/>
					</div>
				</div>
			</div>
		);
	}
};


function mapStateToProps(state, ownProps){

  return {
    userdetails: state.userDetails.userDetails || [],
    intlMessages: state.intl.messages,
    manager:state.headerData.headerInfo||[]

  };
}


UsersTab.contextTypes ={
 intl:React.PropTypes.object.isRequired
}




export  default connect(mapStateToProps)(UsersTab);


