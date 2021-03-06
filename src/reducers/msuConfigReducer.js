import { 
    FETCH_MSU_CONFIG_LIST, 
    FETCH_MSU_CONFIG_LIST_VIA_FILTER,
    FETCH_MSU_CONFIG_DEST_TYPE_LIST,
    FETCH_MSU_CONFIG_RACK_STRUCTURE,
    GET_PENDING_MSU, 
    MSU_CONFIGURATION_REFRESHED} 
from '../constants/frontEndConstants';

/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */



export  function msuInfo(state={},action){
  
  switch (action.type) {

    case FETCH_MSU_CONFIG_LIST:
        return Object.assign({}, state, {
            "msuList" : action.data
        });
        break; 

    case MSU_CONFIGURATION_REFRESHED:
        return Object.assign({}, state, {
            "msuConfigRefreshed": action.data
        });
        break;

    case FETCH_MSU_CONFIG_DEST_TYPE_LIST:
        return Object.assign({}, state, {
            "destType": action.data
        });
        break;

    case FETCH_MSU_CONFIG_LIST_VIA_FILTER:
        return Object.assign({}, state, {
            "msuList": action.data
        });
        break;

    case FETCH_MSU_CONFIG_RACK_STRUCTURE: 
        return Object.assign({}, state, {
            "rackStructure": action.data
        });
        break;

    default:
      return state
  }
}
