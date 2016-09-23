import {PPS_DETAIL} from '../constants/appConstants';

function processPPSData(data) {
  var PPSData=[];
  var ppsStatus = ["Off", "On"];
  var current_task = ["Pick", "Put", "Audit"];
  for (var i = data.length - 1; i >= 0; i--) {
    var detail = {};
    detail.id = "PPS " + data[i].pps_id;
    detail.status = ppsStatus[data[i].pps_status];
    detail.operatingMode = current_task[data[i].current_task];
    detail.performance = data[i].performance + " orders/hr";
    detail.operatorAssigned = data[i].operators_assigned;
    PPSData.push(detail);
  }
  return PPSData;
}

export  function PPSDetail(state={},action) {
  switch (action.type) {
    case PPS_DETAIL:
         var res;
         res=action.data;
         if(res.aggregate_data){
           var PPSDetail = processPPSData(res.aggregate_data)
          }
           return Object.assign({}, state, {
               "PPStypeDetail" : PPSDetail
          })

    default:
      return state
  }

}