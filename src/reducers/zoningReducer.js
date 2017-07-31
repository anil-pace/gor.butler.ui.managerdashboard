import {RECIEVE_ZONE_DATA} from '../constants/frontEndConstants';


/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */

export  function zoningReducer(state={},action){
  switch (action.type) {
    case RECIEVE_ZONE_DATA:
      var zoneHeader=action.data["header_data"] ? action.data["header_data"]["zones_data"] :{};
      var emergencyData = action.data["header_data"] ? action.data["header_data"]["emergency_data"] :{};
      return Object.assign({}, state, { 
            zoneHeader,
            emergencyData,
            "hasDataChanged":true
          })
    break;
                     
    default:
      return state
  }
}