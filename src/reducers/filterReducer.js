import {SHOW_FILTER} from '../constants/frontEndConstants'; 
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
    
    default:
      return state
  }
}