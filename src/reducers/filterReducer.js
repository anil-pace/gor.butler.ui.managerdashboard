import {SHOW_FILTER, IS_FILTER_APPLIED,BUTLER_FILTER_STATE,CHARGINGSTATION_FILTER_STATE,PPS_FILTER_STATE,WAVE_FILTER_STATE,USER_FILTER_STATE,TOGGLE_BUTTON,TOGGLE_BUTTON_BOT,PPS_FILTER_VALUE,CHARGING_FILTER_VALUE,WAVE_FILTER_VALUE,USER_FILTER_VALUE,SET_DEFAULT_RANGE} from '../constants/frontEndConstants'; 
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
 export  function filterInfo(state={},action){
  switch (action.type) {
    case SHOW_FILTER:
    console.log("raja"+action.data);    
    return Object.assign({}, state, { 
      "filterState" : action.data
    })     

    break;
    case IS_FILTER_APPLIED:              //This reducer will update the the isFilterApplied value with true/false
    return Object.assign({}, state, { 
      "isFilterApplied" : action.data
    })
    break;
case SET_DEFAULT_RANGE:              //This reducer will update the the isFilterApplied value with true/false
    return Object.assign({}, state, { 
      "deaultSliderRange" : action.data
    })
    break;


    case TOGGLE_BUTTON_BOT:              //This reducer will update the the botFilterStatus value with latest applied filter
    return Object.assign({}, state, { 
      "botFilterStatus" : action.data
    })
    break; 
    case CHARGING_FILTER_VALUE:          //This reducer will update the the chargingFilterStatus value with latest applied filter
    return Object.assign({}, state, { 
      "chargingFilterStatus" : action.data
    })
    break;     
    case WAVE_FILTER_VALUE:              //This reducer will update the the waveFilterStatus value with latest applied filter
    return Object.assign({}, state, { 
      "waveFilterStatus" : action.data
    })
    break;

    case PPS_FILTER_VALUE:               //This reducer will update the the ppsFilterState value with latest applied filter
    return Object.assign({}, state, { 
      "ppsFilterState" : action.data
    })
    break; 
    case USER_FILTER_VALUE:             //This reducer will update the the userFilterStatus value with latest applied filter
    return Object.assign({}, state, { 
      "userFilterStatus" : action.data
    })
    break;

    case BUTLER_FILTER_STATE:          //This reducer will update the the butlerFilterState value with latest applied filter
    return Object.assign({}, state, { 
      "butlerFilterState" : action.data
    })
    break;   
    case CHARGINGSTATION_FILTER_STATE:   //This reducer will update the the chargingstationfilterState value with latest applied filter
    return Object.assign({}, state, { 
      "chargingstationfilterState" : action.data
    })
    break; 
    case PPS_FILTER_STATE:                //This reducer will update the the ppsfilterState value with latest applied filter
    return Object.assign({}, state, { 
      "ppsfilterState" : action.data
    })
    break; 
    case WAVE_FILTER_STATE:               //This reducer will update the the wavefilterState value with latest applied filter
    return Object.assign({}, state, { 
      "wavefilterState" : action.data
    })
    break;  
    case USER_FILTER_STATE:              //This reducer will update the the userfilterState value with latest applied filter
    return Object.assign({}, state, { 
      "userfilterState" : action.data
    })
    break;

    default:
    return state
  }
}