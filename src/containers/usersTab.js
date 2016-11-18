import React  from 'react';
import ReactDOM  from 'react-dom';
import UserDataTable from './userTab/userTabTable';
import { connect } from 'react-redux'; 
function processUserDetails(data, nProps) {
  let operator  = nProps.context.intl.formatMessage({id:"userDetails.operator", defaultMessage: "Operator"});
  let manager  = nProps.context.intl.formatMessage({id:"userDetails.manager", defaultMessage: "Manager"});
  let pick  = nProps.context.intl.formatMessage({id:"userDetails.pick.status", defaultMessage: "Pick"});
  let put  = nProps.context.intl.formatMessage({id:"userDetails.put.status", defaultMessage: "Put"});
  let audit  = nProps.context.intl.formatMessage({id:"userDetails.audit.status", defaultMessage: "Audit"});
  let front  = nProps.context.intl.formatMessage({id:"userDetails.front.status", defaultMessage: "Front"});
  let back  = nProps.context.intl.formatMessage({id:"userDetails.back.status", defaultMessage: "Back"});
  let online  = nProps.context.intl.formatMessage({id:"userDetails.online.status", defaultMessage: "Online"});
  let offline  = nProps.context.intl.formatMessage({id:"userDetails.offline.status", defaultMessage: "Offline"});
  var role = {"butler_ui":operator, "butler_supervisor":manager};
  var work_mode = {"pick":pick,"put": put,"audit": audit};
  var work_place = {"front": front, "back":back};
  var timeOffset=nProps.props.timeOffset;


  var userDetails = [], userData = {};
  for (var i = data.length - 1; i >= 0; i--) {

    userData.id = (data[i].first_name || null) + " " + (data[i].last_name || null);
    if(data[i].logged_in){
      userData.status = online;
      userData.statusClass = "online";
    if(data[i].pps.pps_mode && data[i].pps.seat_type) {  
      userData.workMode = work_mode[data[i].pps.pps_mode] + " " + work_place[data[i].pps.seat_type];
    }

    else if(data[i].pps.pps_mode) {
      userData.workMode = work_mode[data[i].pps.pps_mode];
    }
    userData.location = nProps.context.intl.formatMessage({id:"userDetails.location", defaultMessage: "PPS {ppsId}"},{"ppsId":data[i].pps.pps_id});
    userData.logInTime = nProps.context.intl.formatTime(data[i].login_time,{hour: 'numeric',minute: 'numeric'}) +
    "(" + nProps.context.intl.formatRelative(data[i].login_time) +")";
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

class UsersTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		var itemNumber = 7, userData;	
		if(this.props.userdetails !== undefined) {
			userData = processUserDetails(this.props.userdetails, this);
		}	
		return (
			<div>
				<div>
					<div className="gorUserTable">
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
    manager:state.headerData.headerInfo||[],
    timeOffset: state.authLogin.timeOffset

  };
}


UsersTab.contextTypes ={
 intl:React.PropTypes.object.isRequired
}




export  default connect(mapStateToProps)(UsersTab);


