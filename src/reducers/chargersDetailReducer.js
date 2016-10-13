import {CHARGERS_DETAIL,SYSTEM_CHARGERS_DETAILS} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */

function processChargersData(data) {
  var chargerData=[];
  var detail={"id": "","status": "","mode": ""};
  for (var i = data.length - 1; i >= 0; i--) {
    var detail = {};
    detail.id = "Charging Station " + data[i].charger_id;
    detail.status = data[i].charger_status;
    detail.mode = data[i].charger_mode;
    // if(data[i].docked_butler_id !== null) {
    //   detail.dockedBots = "Butler " + data[i].docked_butler_id;
    // }

    // else {
    //   detail.dockedBots = null;
    // }
    chargerData.push(detail); 
  }
  return chargerData;
}

export  function chargersDetail(state={},action) {
  switch (action.type) {
    case SYSTEM_CHARGERS_DETAILS:
         var res;
         res=action.data;
         var chargers;
         if(res.complete_data){
          chargers = processChargersData(res.aggregate_data);
          }
           return Object.assign({}, state, {
               "chargersDetail" : chargers
          })

    default:
      return state
  }

}