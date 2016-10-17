import {PPS_DETAIL} from '../constants/appConstants';

function processPPSData(data) {
  //TODO: codes need to be replaced after checking with backend
  var PPSData=[], detail = {};;
  var ppsStatus = ["Off", "On"];
  var currentTask = {"pick":"Pick", "put":"Put", "audit":"Audit"};
  detail.totalOperator = 0;
  for (var i = data.length - 1; i >= 0; i--) {
    detail = {};
    detail.id = "PPS " + data[i].pps_id;
    if(data[i].pps_status === "on") {
      detail.status = "On";
    }
    else {
      detail.status = "Off";
    }
    detail.statusClass = data[i].pps_status;
    detail.operatingMode = currentTask[data[i].current_task];
    detail.performance = data[i].performance + " orders/hr";///  orders /items
    if(data[i].operators_assigned === null) {
      detail.operatorAssigned = "--";
    }
    else {
      for (var j = data[i].operators_assigned.length - 1; j >= 0; j--) {
        if(detail.operatorAssigned) {
          detail.operatorAssigned = detail.operatorAssigned + ", " + data[i].operators_assigned[j];
        }
        else {
          detail.operatorAssigned =  data[i].operators_assigned[j];
        }
      }
      detail.totalOperator = detail.totalOperator + data[i].operators_assigned.length;
      
      console.log(data[i].operators_assigned)
    }
    PPSData.push(detail);
  }
  
  return PPSData;
}

export  function PPSDetail(state={},action) {
  switch (action.type) {
    case PPS_DETAIL:
         res=action.data;
         if(res.complete_data !== undefined){
          var res, PPSDetail;
           PPSDetail = processPPSData(res.complete_data)
           return Object.assign({}, state, {
               "PPStypeDetail" : PPSDetail
          })
         }

    default:
      return state
  }

}