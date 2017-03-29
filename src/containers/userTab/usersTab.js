import React  from 'react';
import ReactDOM  from 'react-dom';
import UserDataTable from './userTabTable';
import { connect } from 'react-redux'; 
import { defineMessages } from 'react-intl';
import {userRequest} from '../../actions/userActions';
import {stringConfig} from '../../constants/backEndConstants'
import {userHeaderSort,userHeaderSortOrder,userFilterDetail} from '../../actions/sortHeaderActions';
import {INITIAL_HEADER_SORT,INITIAL_HEADER_ORDER,GET_ROLES,GET,APP_JSON} from '../../constants/frontEndConstants';
import {showTableFilter,filterApplied} from '../../actions/filterAction';
import {ROLE_URL} from '../../constants/configConstants';
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
      componentDidMount(){
        let userData={
                'url':ROLE_URL,
                'method':GET,
                'cause':GET_ROLES,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
            }
        this.props.userRequest(userData);
  }
  _processUserDetails() {
  var nProps = this,
  data = nProps.props.userdetails
  let operator  = nProps.context.intl.formatMessage(messages.userOperator);
  let manager  = nProps.context.intl.formatMessage(messages.userManager);
  let pick  = nProps.context.intl.formatMessage(stringConfig.pick);
  let put  = nProps.context.intl.formatMessage(stringConfig.put);
  let audit  = nProps.context.intl.formatMessage(stringConfig.audit);
  let front  = nProps.context.intl.formatMessage(messages.userFront);
  let back  = nProps.context.intl.formatMessage(messages.userBack);
  let online  = nProps.context.intl.formatMessage(stringConfig.online);
  let offline  = nProps.context.intl.formatMessage(stringConfig.offline);
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
    userData.logInTime = nProps.context.intl.formatTime(data[i].login_time,{hour: 'numeric',minute: 'numeric'}) +
    " (" + nProps.context.intl.formatRelative(data[i].login_time) +")";;

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
    if(role.hasOwnProperty(data[i].role)){
      userData.role = role[data[i].role];      
    }
    else{
      userData.role = data[i].role;
    }
    userDetails.push(userData);
    userData = {};
  }

  return userDetails;
}	
	render(){
    let updateStatusIntl="";
		var itemNumber = 7, userData;	
		if(this.props.userdetails !== undefined) {
			userData = this._processUserDetails();
		}	
		return (
			<div>
				<div>
					<div className="gor-User-Table">
						<UserDataTable items={userData} itemNumber={itemNumber} intlMessg={this.props.intlMessages} 
                           mid={this.props.manager.users?this.props.manager.users[0].id:''} 
                           sortHeaderState={this.props.userHeaderSort} sortHeaderOrder={this.props.userHeaderSortOrder} 
                           currentSortState={this.props.userSortHeader} currentHeaderOrder={this.props.userSortHeaderState}
                           setUserFilter={this.props.userFilterDetail}
                           getUserFilter = {this.props.userFilter}

                            userFilterStatus={this.props.userFilterStatus}
                            isFilterApplied={this.props.isFilterApplied}
                            lastUpdatedText={updateStatusIntl}
                            lastUpdated={updateStatusIntl}
                            showFilter={this.props.showFilter}
                            setFilter={this.props.showTableFilter}/>
					</div>
				</div>
			</div>
		);
	}
};


function mapStateToProps(state, ownProps){
  
  return {
    userFilter: state.sortHeaderState.userFilter|| "",
    userdetails: state.userDetails.userDetails || [],
    intlMessages: state.intl.messages,
    manager:state.headerData.headerInfo||[],
    userSortHeader: state.sortHeaderState.userHeaderSort || "role" ,
    userSortHeaderState: state.sortHeaderState.userHeaderSortOrder || INITIAL_HEADER_ORDER,
    showFilter: state.filterInfo.filterState || false,
    isFilterApplied: state.filterInfo.isFilterApplied || false,
    userFilterStatus:state.filterInfo.userFilterStatus|| false,
    roleInfo: state.appInfo.roleInfo || null,
    auth_token: state.authLogin.auth_token  

  };
}

var mapDispatchToProps = function(dispatch){
  return{
    userRequest: function(data){ dispatch(userRequest(data)); },
    userFilterDetail: function(data){dispatch(userFilterDetail(data))},
    userHeaderSort: function(data){dispatch(userHeaderSort(data))},
    userHeaderSortOrder: function(data){dispatch(userHeaderSortOrder(data))},
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));}
  };
}


UsersTab.contextTypes ={
 intl:React.PropTypes.object.isRequired
}




export  default connect(mapStateToProps,mapDispatchToProps)(UsersTab);


