import {SHOW_FILTER, IS_FILTER_APPLIED,BUTLER_FILTER_STATE,CHARGINGSTATION_FILTER_STATE,PPS_FILTER_STATE,WAVE_FILTER_STATE,USER_FILTER_STATE,TOGGLE_BUTTON,TOGGLE_BUTTON_BOT,PPS_FILTER_VALUE,CHARGING_FILTER_VALUE,WAVE_FILTER_VALUE,USER_FILTER_VALUE} from '../constants/frontEndConstants'; 
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
 export  function filterInfo(state={},action){
  switch (action.type) {
    case SHOW_FILTER:
    return Object.assign({}, state, { 
      "filterState" : action.data
    })
    break;
    
    case IS_FILTER_APPLIED:
    return Object.assign({}, state, { 
      "isFilterApplied" : action.data
    })
    break;

    case TOGGLE_BUTTON_BOT:
    return Object.assign({}, state, { 
      "botFilterStatus" : action.data
    })
    break; 
    case CHARGING_FILTER_VALUE:
    return Object.assign({}, state, { 
      "chargingFilterStatus" : action.data
    })
    break;     
    case WAVE_FILTER_VALUE:
    return Object.assign({}, state, { 
      "waveFilterStatus" : action.data
    })
    break;

    case PPS_FILTER_VALUE:
    return Object.assign({}, state, { 
      "ppsFilterState" : action.data
    })
    break; 
    case USER_FILTER_VALUE:
    return Object.assign({}, state, { 
      "userFilterStatus" : action.data
    })
    break;

    case BUTLER_FILTER_STATE:
    return Object.assign({}, state, { 
      "butlerFilterState" : action.data
    })
    break;   
    case CHARGINGSTATION_FILTER_STATE:
    return Object.assign({}, state, { 
      "chargingstationfilterState" : action.data
    })
    break; 
    case PPS_FILTER_STATE:
    return Object.assign({}, state, { 
      "ppsfilterState" : action.data
    })
    break; 
    case WAVE_FILTER_STATE:
    return Object.assign({}, state, { 
      "wavefilterState" : action.data
    })
    break;  
    case USER_FILTER_STATE:
    return Object.assign({}, state, { 
      "userfilterState" : action.data
    })
    break;

    default:
    return state
  }
}