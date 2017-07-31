import {CONTROLLER_DATA} from '../constants/frontEndConstants';


/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */


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