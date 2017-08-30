import { OPERATION_LOG_FETCH,APPLY_OL_FILTER_FLAG,SET_REPORTS_SPINNER} from '../constants/frontEndConstants'

export  function operationsLogsReducer(state={},action){
	

	switch (action.type) {
	  
	  case OPERATION_LOG_FETCH:
	  	
	    return Object.assign({}, state, {
	    	olData:action.data,
	    	hasDataChanged:!state.hasDataChanged,
	    	reportsSpinner:false
      })
	  case APPLY_OL_FILTER_FLAG:
	  	 return Object.assign({}, state, {
	    	filtersApplied:action.data
      })
	  case SET_REPORTS_SPINNER:
	  	return Object.assign({}, state, {
	    	reportsSpinner:action.data
      })
	    
	  default:
	    return state
  }
}
