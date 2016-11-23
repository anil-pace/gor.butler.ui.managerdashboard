import { DISPLAY_SPINNER,DISPLAY_LOGIN_SPINNER,DISPLAY_INVENTORY_SPINNER,DISPLAY_AUDIT_SPINNER, DISPLAY_ORDER_LIST_SPINNER,DISPLAY_WAVES_SPINNER,DISPLAY_BUTLER_SPINNER,DISPLAY_PPS_SPINNER,DISPLAY_CHARGING_STATION_SPINNER} from '../constants/appConstants'
/**
 * [loader reducer function to set isLoading state]
 * @param  {Object} state  [state tree of the current reducer]
 * @param  {[type]} action [action that called the reducer]
 * @return {[object]}        [returns updated state object]
 */
export  function spinner(state={},action){
	switch (action.type) {
	  
	  case DISPLAY_SPINNER:
	    return Object.assign({}, state, {
	    	"isLoading":action.data
      })
	   case DISPLAY_LOGIN_SPINNER:
	    return Object.assign({}, state, {
	    	"loginSpinner":action.data
      })
	    case DISPLAY_INVENTORY_SPINNER:
	    return Object.assign({}, state, {
	    	"inventorySpinner":action.data
      })

	  case DISPLAY_AUDIT_SPINNER:
	  return Object.assign({}, state, {
	    	"auditSpinner":action.data
      })

      case DISPLAY_ORDER_LIST_SPINNER:
	  return Object.assign({}, state, {
	    	"orderListSpinner":action.data
      })

      case DISPLAY_WAVES_SPINNER:
	  return Object.assign({}, state, {
	    	"wavesSpinner":action.data
      })

      case DISPLAY_BUTLER_SPINNER:
	  return Object.assign({}, state, {
	    	"butlerSpinner":action.data
      })

      case DISPLAY_PPS_SPINNER:
      return Object.assign({}, state, {
	    	"ppsSpinner":action.data
      })

      case DISPLAY_CHARGING_STATION_SPINNER:
      return Object.assign({}, state, {
	    	"csSpinner":action.data
      })

	  default:
	    return state
  }
}