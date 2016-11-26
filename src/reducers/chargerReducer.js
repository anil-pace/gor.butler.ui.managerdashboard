import {CHARGERS_DATA} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function chargerInfo(state={},action){
	switch (action.type) {
	  case CHARGERS_DATA:
              var chargersKey = {"Connected" : 0, "Disconnected": 0};
              var res = action.data;
            if(res.aggregate_data !== undefined){
              chargersKey = {
               "Connected" : action.data.aggregate_data.active_chargers,
               "Disconnected": action.data.aggregate_data.inactive_chargers
            }
             
           }
            return Object.assign({}, state, {
            "chargersData" : chargersKey
         })

	  default:
	    return state
  }
}