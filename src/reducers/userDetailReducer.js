import {USER_DETAILS} from '../constants/appConstants';
import React  from 'react';
import { FormattedMessage } from 'react-intl';

function processUserDetails(data) {
  let operator = <FormattedMessage id="userDetails.operator" description='operator user' defaultMessage='Operator'/>;
  let manager = <FormattedMessage id="userDetails.manager" description='manager user' defaultMessage='Manager'/>;
  let pick = <FormattedMessage id="userDetails.pick.status" description='pick status for userDetails' defaultMessage='Pick'/>;
  let put = <FormattedMessage id="userDetails.put.status" description='put status for userDetails' defaultMessage='Put'/>;
  let audit = <FormattedMessage id="userDetails.audit.status" description='audit status for userDetails' defaultMessage='Audit'/>;
  let front = <FormattedMessage id="userDetails.front.status" description='front status for userDetails' defaultMessage='Front'/>;
  let back = <FormattedMessage id="userDetails.back.status" description='back status for userDetails' defaultMessage='Back'/>;
  let online = <FormattedMessage id="userDetails.online.status" description='online status for userDetails' defaultMessage='Online'/>;
  let offline = <FormattedMessage id="userDetails.Offline.status" description='Offline status for userDetails' defaultMessage='Offline'/>;
  
  var role = {"butler_ui":operator, "butler_supervisor":manager};
  var work_mode = {"pick":pick,"put": put,"audit": audit};
  var work_place = {"front": front, "back":back};


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
    userData.location = "PPS " + data[i].pps.pps_id ;
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

export  function userDetails(state={},action){
	switch (action.type) {
	  case USER_DETAILS:

         var res, userData;
         res=action.data;
         if(res.complete_data){
           userData = processUserDetails(res.complete_data);
          
           return Object.assign({}, state, {
               "userDetails" : userData
          })
         }

	  default:
	    return state
  }
}