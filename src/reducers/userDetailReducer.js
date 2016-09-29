import {USER_DETAILS} from '../constants/appConstants';

function processUserDetails(data) {
  var role = ["Operator", "Manager", "Supervisor"];
  var work_mode = ["Pick Back", "Pick Front", "Put Back", "Put Front", "Audit"];
  var status = ["Offline", "Online"];
  var userDetails = [], userData = {};
  for (var i = data.length - 1; i >= 0; i--) {
    userData.name = data[i].name;
    userData.status = status[data[i].status];
    userData.role = role[data[i].role];
    userData.workMode = work_mode[data[i].work_mode];
    userData.location = data[i].location;
    userData.logInTime = data[i].login_time;
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
         if(res.aggregate_data){
           userData = processUserDetails(res.aggregate_data);
          }
           return Object.assign({}, state, {
               "userDetails" : userData
          })

	  default:
	    return state
  }
}