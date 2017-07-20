import {ZONE_DATA} from '../constants/frontEndConstants';

//import {resTypeZones} from '../../mock/mockDBData.js';//To be removed
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
const resTypeZones = {
  "complete_data": {
    "zones_data":{
    "1": {
      "zone_status": "zone_pause_activated" 
    },
    "2": {
      "zone_status": "emergency_pause"
    },
    "3":{
      "zone_status": "zone_pause_initiated"
    }
  },
    "emergency_data":{
      "emergency_on": true,
      "emergency_type":"stop"
    }
  },
  "resource_type": "zones"
}
export  function sysOverviewReducer(state={},action){
  switch (action.type) {
    case ZONE_DATA:
      var zoneData=resTypeZones["complete_data"]
      return Object.assign({}, state, { 
            "zones" : zoneData,
            "hasDataChanged":!state.hasDataChanged,
            "zoneSubscriptionInitiated":true
          })
    break;
                     
    default:
      return state
  }
}