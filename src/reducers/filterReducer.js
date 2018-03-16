import {SHOW_FILTER, IS_FILTER_APPLIED,BUTLER_FILTER_STATE,CHARGINGSTATION_FILTER_STATE,PPS_FILTER_STATE,
  WAVE_FILTER_STATE,USER_FILTER_STATE,TOGGLE_BUTTON,TOGGLE_BUTTON_BOT,PPS_FILTER_VALUE,CHARGING_FILTER_VALUE,
  WAVE_FILTER_VALUE,USER_FILTER_VALUE,SET_DEFAULT_RANGE,AUDIT_FILTER_STATE,AUDIT_FILTER_VALUE,ORDER_FILTER_STATE,
  ORDER_FILTER_VALUE,BOT_TOGGLE_FILTER,PPS_TOGGLE_FILTER,CS_TOGGLE_FILTER,AUDIT_TOGGLE_FILTER,ORDERS_TOGGLE_FILTER,
  USER_TOGGLE_FILTER,WAVES_TOGGLE_FILTER,FILTER_APPLY_FLAG} from '../constants/frontEndConstants'; 
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

    

case BOT_TOGGLE_FILTER:
    return Object.assign({}, state, { 
      "botToggleFilter" : action.data
    })     
    

    case PPS_TOGGLE_FILTER:
    return Object.assign({}, state, { 
      "ppsToggleFilter" : action.data
    })     
    

     case CS_TOGGLE_FILTER:
    return Object.assign({}, state, { 
      "csToggleFilter" : action.data
    })     
    

     case WAVES_TOGGLE_FILTER:
    return Object.assign({}, state, { 
      "wavesToggleFilter" : action.data
    })     
    

     case ORDERS_TOGGLE_FILTER:
    return Object.assign({}, state, { 
      "ordersToggleFilter" : action.data
    })     
    

     case AUDIT_TOGGLE_FILTER:
    return Object.assign({}, state, { 
      "auditToggleFilter" : action.data
    })     
    

     case USER_TOGGLE_FILTER:
    return Object.assign({}, state, { 
      "userToggleFilter" : action.data
    })     
    

    case IS_FILTER_APPLIED:              //This reducer will update the the isFilterApplied value with true/false
    return Object.assign({}, state, { 
      "isFilterApplied" : action.data
    })
    
case SET_DEFAULT_RANGE:              //This reducer will update the the isFilterApplied value with true/false
    return Object.assign({}, state, { 
      "deaultSliderRange" : action.data
    })
    


    case TOGGLE_BUTTON_BOT:              //This reducer will update the the botFilterStatus value with latest applied filter
    return Object.assign({}, state, { 
      "botFilterStatus" : action.data
    })
     
    case CHARGING_FILTER_VALUE:          //This reducer will update the the chargingFilterStatus value with latest applied filter
    return Object.assign({}, state, { 
      "chargingFilterStatus" : action.data
    })
         
    case WAVE_FILTER_VALUE:              //This reducer will update the the waveFilterStatus value with latest applied filter
    return Object.assign({}, state, { 
      "waveFilterStatus" : action.data
    })
    

    case PPS_FILTER_VALUE:               //This reducer will update the the ppsFilterState value with latest applied filter
    return Object.assign({}, state, { 
      "ppsFilterState" : action.data
    })
     

    case AUDIT_FILTER_VALUE:               //This reducer will update the the ppsFilterState value with latest applied filter
    return Object.assign({}, state, { 
      "auditFilterStatus" : action.data
    })
    

case ORDER_FILTER_VALUE:               //This reducer will update the the ppsFilterState value with latest applied filter
    return Object.assign({}, state, { 
      "orderFilterStatus" : action.data
    })
    

    case USER_FILTER_VALUE:             //This reducer will update the the userFilterStatus value with latest applied filter
    return Object.assign({}, state, { 
      "userFilterStatus" : action.data
    })
    

    case BUTLER_FILTER_STATE:          //This reducer will update the the butlerFilterState value with latest applied filter
    return Object.assign({}, state, { 
      "butlerFilterState" : action.data
    })
       

    case AUDIT_FILTER_STATE:          //This reducer will update the the butlerFilterState value with latest applied filter
    return Object.assign({}, state, { 
      "auditFilterState" : action.data
    })
      
    case ORDER_FILTER_STATE:          //This reducer will update the the butlerFilterState value with latest applied filter
    return Object.assign({}, state, { 
      "orderFilterState" : action.data
    })
     

    case CHARGINGSTATION_FILTER_STATE:   //This reducer will update the the chargingstationfilterState value with latest applied filter
    return Object.assign({}, state, { 
      "chargingstationfilterState" : action.data
    })
     
    case PPS_FILTER_STATE:                //This reducer will update the the ppsfilterState value with latest applied filter
    return Object.assign({}, state, { 
      "ppsfilterState" : action.data
    })
     
    case WAVE_FILTER_STATE:               //This reducer will update the the wavefilterState value with latest applied filter
    return Object.assign({}, state, { 
      "wavefilterState" : action.data
    })
      

    case USER_FILTER_STATE:              //This reducer will update the the userfilterState value with latest applied filter
    return Object.assign({}, state, { 
      "userfilterState" : action.data
    })
    

    case FILTER_APPLY_FLAG:              //This reducer will update the the Apply flag value true/false
    return Object.assign({}, state, { 
      "filterApplyFlag" : action.data
    })
    

    case "SET_CLEAR_INTERVAL_FLAG":              //This reducer will update the the Apply flag value true/false
        return Object.assign({}, state, { 
          "clearIntervalFlag" : action.data
        })
        
    default:
    return state
  }
}