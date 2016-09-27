import {CHARGERS_DETAIL} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */

function processChargersData(data) {
  var chargerData=[];
  var detail={"id": "","status": "","dockedBots": ""};
  for (var i = data.length - 1; i >= 0; i--) {
    var detail = {};
    detail.id = "Charging Station " + data[i].charger_id;
    detail.status = "On";
    if(data[i].docked_butler_id !== null) {
      detail.dockedBots = "Butler " + data[i].docked_butler_id;
    }

    else {
      detail.dockedBots = null;
    }
    chargerData.push(detail); 
  }
  return chargerData;
}

export  function chargersDetail(state={},action) {
  switch (action.type) {
    case CHARGERS_DETAIL:
         var res;
         res=action.data;
         if(res.aggregate_data){
          var chargers = processChargersData(res.aggregate_data);
          }
           return Object.assign({}, state, {
               "chargersDetail" : chargers
          })

    default:
      return state
  }

}