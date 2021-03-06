import React  from 'react';
import ReactDOM  from 'react-dom';
import UserDataTable from './userTab/userTabTable';
import { connect } from 'react-redux'; 
import { defineMessages } from 'react-intl';
import {stringConfig} from '../constants/backEndConstants'
import Spinner from '../../components/spinner/Spinner';
import { setUserSpinner } from  '../../actions/spinnerAction';
import {userHeaderSort,userHeaderSortOrder,userFilterDetail} from '../actions/sortHeaderActions';
import {INITIAL_HEADER_SORT,INITIAL_HEADER_ORDER} from '../constants/frontEndConstants';

//Mesages for internationalization
const messages=defineMessages({
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
      defaultMessage: "Audited"
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
  _processUserDetails() {
  var nProps=this,
  data=nProps.props.userdetails ||{};
  let operator=nProps.context.intl.formatMessage(messages.userOperator);
  let manager=nProps.context.intl.formatMessage(messages.userManager);
  let pick=nProps.context.intl.formatMessage(stringConfig.pick);
  let put=nProps.context.intl.formatMessage(stringConfig.put);
  let audit=nProps.context.intl.formatMessage(stringConfig.audit);
  let front=nProps.context.intl.formatMessage(messages.userFront);
  let back=nProps.context.intl.formatMessage(messages.userBack);
  let online=nProps.context.intl.formatMessage(stringConfig.online);
  let offline=nProps.context.intl.formatMessage(stringConfig.offline);
  var role={"butler_ui":operator, "butler_supervisor":manager};
  var work_mode={"pick":pick,"put": put,"audit": audit};
  var work_place={"front": front, "back":back};


  var userDetails=[], userData={};
  for (var i=data.length - 1; i >= 0; i--) {

    userData.id=(data[i].first_name || "--") + " " + (data[i].last_name || "--");
    if(data[i].logged_in){
      userData.status=online;
      userData.statusClass="online";
    if(data[i].pps.pps_mode && data[i].pps.seat_type) {  
      userData.workMode=work_mode[data[i].pps.pps_mode] + " " + work_place[data[i].pps.seat_type];
    }

    else if(data[i].pps.pps_mode) {
      userData.workMode=work_mode[data[i].pps.pps_mode];
    }

    userData.location=nProps.context.intl.formatMessage(messages.userLocation,{"ppsId":data[i].pps.pps_id});
    userData.logInTime=nProps.context.intl.formatTime(data[i].login_time,{hour: 'numeric',minute: 'numeric',hour12:false}) +
    " (" + nProps.context.intl.formatRelative(data[i].login_time) +")";;

    }

    else {
    userData.status=offline;
    userData.statusClass="offline";
    userData.workMode="--";
    userData.location="--" ;
    userData.logInTime="--";
    }


    userData.uid=data[i].user_id
    userData.userName= data[i].user_name;
    userData.first=data[i].first_name;
    userData.last=data[i].last_name;  
    userData.roleId=data[i].role;
    if(role.hasOwnProperty(data[i].role)){
      userData.role=role[data[i].role];      
    }
    else{
      userData.role=data[i].role;
    }
    userDetails.push(userData);
    userData={};
  }

  return userDetails;
}	
	render(){
		var itemNumber=7, userData;	
		if(this.props.userdetails !== undefined) {
			userData=this._processUserDetails();
		}	
		return (
			<div>
				<div>
					<div className="gor-User-Table">
          <Spinner isLoading={this.props.userSpinner} setSpinner={this.props.setUserSpinner}/>
						<UserDataTable items={userData} itemNumber={itemNumber} intlMessg={this.props.intlMessages} 
                           mid={this.props.manager.users?this.props.manager.users[0].id:''} 
                           sortHeaderState={this.props.userHeaderSort} sortHeaderOrder={this.props.userHeaderSortOrder} 
                           currentSortState={this.props.userSortHeader} currentHeaderOrder={this.props.userSortHeaderState}
                           setUserFilter={this.props.userFilterDetail}
                           getUserFilter={this.props.userFilter}/>
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
    userSpinner:state.spinner.userSpinner || false

  };
}

var mapDispatchToProps=function(dispatch){
  return{
    userFilterDetail: function(data){dispatch(userFilterDetail(data))},
    userHeaderSort: function(data){dispatch(userHeaderSort(data))},
    userHeaderSortOrder: function(data){dispatch(userHeaderSortOrder(data))},
    setUserSpinner:function(data){dispatch(setUserSpinner(data))}
  };
}


UsersTab.contextTypes={
 intl:React.PropTypes.object.isRequired
}

UsersTab.PropTypes={
userFilterDetail:React.PropTypes.func,
userHeaderSort: React.PropTypes.func,
userHeaderSortOrder:React.PropTypes.func,
setUserSpinner:React.PropTypes.func,
userFilter: React.PropTypes.string,
userdetails: React.PropTypes.array,
manager:React.PropTypes.array,
userSortHeader:React.PropTypes.string,
userSortHeaderState:React.PropTypes.string,
userSpinner:React.PropTypes.bool
};


export  default connect(mapStateToProps,mapDispatchToProps)(UsersTab);


