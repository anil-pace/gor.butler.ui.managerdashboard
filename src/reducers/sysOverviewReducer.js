import {ZONE_DATA} from '../constants/frontEndConstants';


/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */


export  function sysOverviewReducer(state={},action){
  switch (action.type) {
    case ZONE_DATA:
      var zoneData=action.data["complete_data"];
      
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