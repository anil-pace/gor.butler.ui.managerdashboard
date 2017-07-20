import {RECIEVE_ZONE_DATA} from '../constants/frontEndConstants';

//import {resTypeZones} from '../../mock/mockDBData.js';//To be removed
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
const resTypeZones = {
    "header_data": {
        "total_zones": 20,
        "active_zones": 13
    },
    "resource_type": "zones"
}
export  function zoningReducer(state={},action){
  switch (action.type) {
    case RECIEVE_ZONE_DATA:
      var zoneData=resTypeZones["header_data"]
      return Object.assign({}, state, { 
            "zoneHeader" : zoneData,
            "hasDataChanged":true
          })
    break;
                     
    default:
      return state
  }
}