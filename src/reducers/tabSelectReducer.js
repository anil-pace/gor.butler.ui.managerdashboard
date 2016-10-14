import { TAB_SELECTED ,PREV_TAB_SELECTED,SUB_TAB_SELECTED} from '../constants/appConstants'

export  function tabSelected(state={},action){
	switch (action.type) {
	  
	  case TAB_SELECTED:
	    return Object.assign({}, state, {
	    	"tab":action.data
      })
	  case PREV_TAB_SELECTED:
	    return Object.assign({}, state, {
	    	"prevTab":action.data
      })
	    case SUB_TAB_SELECTED:
	    return Object.assign({}, state, {
	    	"subTab":action.data
	  })
	    
	  default:
	    return state
  }
}
