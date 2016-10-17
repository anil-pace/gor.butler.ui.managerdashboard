import { DISPLAY_LOADER,DISPLAY_LOGIN_LOADER} from '../constants/appConstants'
/**
 * [loader reducer function to set isLoading state]
 * @param  {Object} state  [state tree of the current reducer]
 * @param  {[type]} action [action that called the reducer]
 * @return {[object]}        [returns updated state object]
 */
export  function loader(state={},action){
	switch (action.type) {
	  
	  case DISPLAY_LOADER:
	    return Object.assign({}, state, {
	    	"isLoading":action.data
      })
	   case DISPLAY_LOGIN_LOADER:
	    return Object.assign({}, state, {
	    	"loginLoader":action.data
      })
	    
	  default:
	    return state
  }
}