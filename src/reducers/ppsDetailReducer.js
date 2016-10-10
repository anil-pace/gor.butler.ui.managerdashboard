import {PPS_DETAIL} from '../constants/appConstants';

function processPPSData(data) {
  //TODO: codes need to be replaced after checking with backend
  var PPSData=[];
  var ppsStatus = ["Off", "On"];
  var current_task = ["Pick", "Put", "Audit"];
  for (var i = data.length - 1; i >= 0; i--) {
    var detail = {};
    detail.id = "PPS " + data[i].pps_id;
    if(data[i].pps_status = "on") {
      detail.status = "On";
    }
    else {
      detail.status = "Off";
    }
    detail.operatingMode = data[i].current_task;
    detail.performance = data[i].performance + " orders/hr";
    if(detail.operatorAssigned === null) {
      detail.operatorAssigned = "--";
    }
    else {
      detail.operatorAssigned = data[i].operators_assigned;
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

          
          console.log("hsdcjhsdgjch")
          console.log(PPSDetail)
           return Object.assign({}, state, {
               "PPStypeDetail" : PPSDetail
          })
         }

    default:
      return state
  }

}