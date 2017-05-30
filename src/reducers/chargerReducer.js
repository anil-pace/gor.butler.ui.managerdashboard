import {CHARGERS_DATA,CHARGING_STATION_LIST_REFRESHED} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function chargerInfo(state={},action){
	switch (action.type) {
	  case CHARGERS_DATA:
              var chargersKey={"Connected" : 0, "Disconnected": 0};
              var res=action.data;
            if(res.aggregate_data !== undefined){
              chargersKey={
               "Connected" : Number(action.data.aggregate_data.active_chargers),
               "Disconnected": Number(action.data.aggregate_data.inactive_chargers)
            }
             
           }
            return Object.assign({}, state, {
            "chargersData" : chargersKey
         })

        case CHARGING_STATION_LIST_REFRESHED:
            return Object.assign({}, state, {
                "chargingStationListRefreshed": new Date()
            })

	  default:
	    return state
  }
}