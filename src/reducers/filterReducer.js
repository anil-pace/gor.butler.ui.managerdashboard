import {SHOW_FILTER, IS_FILTER_APPLIED,BUTLER_FILTER_STATE} from '../constants/frontEndConstants'; 
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
    case BUTLER_FILTER_STATE:
          return Object.assign({}, state, { 
            "butlerFilterState" : action.data
          })
          break;      
    default:
      return state
  }
}