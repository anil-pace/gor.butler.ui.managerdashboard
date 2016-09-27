import { SUB_TAB_SELECTED } from '../actions/subTabSelectAction'

export  function subTabSelected(state={},action){
	switch (action.type) {
	  
	  case "SUB_TAB_SELECTED":
	    return Object.assign({}, state, {
	    	"subTab":action.data
      })
	    
	  default:
	    return state
  }
}
