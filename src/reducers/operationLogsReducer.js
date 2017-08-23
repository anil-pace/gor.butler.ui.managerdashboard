import { OPERATION_LOG_FETCH } from '../constants/frontEndConstants'

export  function operationsLogsReducer(state={},action){
	

	switch (action.type) {
	  
	  case OPERATION_LOG_FETCH:
	  	
	    return Object.assign({}, state, {
	    	olData:action.data,
	    	hasDataChanged:!state.hasDataChanged
      })
	    
	  default:
	    return state
  }
}
