import { TAB_SELECTED } from '../actions/tabSelectAction'

export  function tabSelected(state={},action){
	switch (action.type) {
	  
	  case "TAB_SELECTED":
	    return Object.assign({}, state, {
	    	"tab":action.data
      })
	    
	  default:
	    return state
  }
}
