import {CONTROLLER_DATA} from '../constants/frontEndConstants';

//import {resTypeZones} from '../../mock/mockDBData.js';//To be removed
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
/*const resTypeControllers = {
  "complete_data": [{
      "controller_id": "10000",
      "zone_id": "1",
      "status": "connected",
      "ethernet_network": "disconnected",
      "zigbee_network": "disconnected",
      "sensor_activated": "latch_gate",
      "action_triggered": "zone_pause"
    },
    {
      "controller_id": "20000",
      "zone_id": "2",
      "status": "disconnected",
      "ethernet_network": "disconnected",
      "zigbee_network": "disconnected",
      "sensor_activated": "none",
      "action_triggered": "emergency_stop" ,
      "sensor": "emergency_pause_button_press"
    }
  ],
  "resource_type": "controllers"
}*/

export  function sysControllersReducer(state={},action){
  switch (action.type) {
    case CONTROLLER_DATA:
      var controllerData=action.data["complete_data"]
      return Object.assign({}, state, { 
            "controllers" : controllerData,
            "hasDataChanged":!state.hasDataChanged
          })
    break;
                     
    default:
      return state
  }
}