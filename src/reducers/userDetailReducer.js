import {USER_DETAILS} from '../constants/appConstants';

function processUserDetails(data) {
  //var role = ["Operator", "Manager", "Supervisor"];
  var work_mode = ["Pick Back", "Pick Front", "Put Back", "Put Front", "Audit"];
  //var status = ["Offline", "Online"];
  var userDetails = [], userData = {};
  for (var i = data.length - 1; i >= 0; i--) {
    userData.name = data[i].user_name;
    if(data[i].status){
      userData.status = "Online";
    }

    else {
      userData.status = "Offline";
    }
    userData.role = data[i].role;
    userData.workMode = data[i].pps.pps_mode;
    userData.location = "PPS " + data[i].pps.pps_id ;
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
         if(res.data){
           userData = processUserDetails(res.data);
          }
           return Object.assign({}, state, {
               "userDetails" : userData
          })

	  default:
	    return state
  }
}