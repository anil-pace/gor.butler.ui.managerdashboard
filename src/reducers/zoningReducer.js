import {RECIEVE_ZONE_DATA} from '../constants/frontEndConstants';

//import {resTypeZones} from '../../mock/mockDBData.js';//To be removed
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
/*const resTypeZones = {
    "header_data": {
          "zones_data": {
            "total_zones": 20,
            "active_zones": 0
          },
          "emergency_data": {
            "emergency_on": true,
            "emergency_type": "stop"
          }
    },
    "resource_type": "zones"
}*/
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