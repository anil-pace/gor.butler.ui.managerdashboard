import { STATUS_FILTER, TIME_FILTER } from '../constants/appConstants'
export  function filterOptions(state={},action){
	switch (action.type) {
	  
	  case STATUS_FILTER:
	  console.log("in status filter")
	    return Object.assign({}, state, {
	    	"statusFilter":action.data
      })

	  case TIME_FILTER:
	  console.log("in time filter")
	    return Object.assign({}, state, {
	    	"timeFilter":action.data
      })  
	  default:
	    return state
  }
}
