import { DISPLAY_SPINNER,DISPLAY_LOGIN_SPINNER} from '../constants/appConstants'
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
	    
	  default:
	    return state
  }
}