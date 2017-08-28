import { OPERATION_LOG_FETCH,APPLY_OL_FILTER_FLAG } from '../constants/frontEndConstants'

export  function operationsLogsReducer(state={},action){
	

	switch (action.type) {
	  
	  case OPERATION_LOG_FETCH:
	  	
	    return Object.assign({}, state, {
	    	olData:action.data,
	    	hasDataChanged:!state.hasDataChanged
      })
	  case APPLY_OL_FILTER_FLAG:
	  	 return Object.assign({}, state, {
	    	filtersApplied:action.data
      })
	    
	  default:
	    return state
  }
}
