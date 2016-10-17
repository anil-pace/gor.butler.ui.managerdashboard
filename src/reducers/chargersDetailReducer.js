import {CHARGERS_DETAIL,CHARGERS_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */

function processChargersData(data) {
  var chargerData=[],detail = {};
  var status = {"connected":"Manual", "disconnected":"Disconnected"}, mode = {"manual":"Manual", "auto":"Auto"}
  for (var i = data.length - 1; i >= 0; i--) {
    detail = {}
    detail.id = "Charging Station " + data[i].charger_id;
    detail.status = status[data[i].charger_status];
    detail.mode = mode[data[i].charger_mode];
    if(data[i].docked_butler_id !== null && data[i].docked_butler_id.length !== 0 ) {
       detail.dockedBots = "Butler " + data[i].docked_butler_id;
     }

     else {
       detail.dockedBots = "--";
     }
    chargerData.push(detail); 
  }
  return chargerData;
}

export  function chargersDetail(state={},action) {
  switch (action.type) {
    case CHARGERS_DATA:
         var res;
         res=action.data;
         var chargers;
         if(res.complete_data){
          chargers = processChargersData(res.complete_data);
          
           return Object.assign({}, state, {
               "chargersDetail" : chargers
          })
         }

    default:
      return state
  }

}