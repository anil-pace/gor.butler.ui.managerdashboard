import { OPERATION_LOG_FETCH,
	APPLY_OL_FILTER_FLAG,
	SET_REPORTS_SPINNER,
	RECIEVE_WS_OL_DATA,WS_OPERATOR_LOG_FLUSH} from '../constants/frontEndConstants';
import {removeDuplicates} from '../utilities/utils'

export  function operationsLogsReducer(state={},action){
	

	switch (action.type) {
	  
	  case OPERATION_LOG_FETCH:
	  	
	    return Object.assign({}, state, {
	    	olData:action.data.hits || [],
	    	hasDataChanged:!state.hasDataChanged,
	    	reportsSpinner:false,
	    	totalSize:action.data.total
      })
	  case APPLY_OL_FILTER_FLAG:
	  	 return Object.assign({}, state, {
	    	filtersApplied:action.data,
	    	filtersModified: !state.filtersModified
      })
	  case SET_REPORTS_SPINNER:
	  	return Object.assign({}, state, {
	    	reportsSpinner:action.data
      })
	  case RECIEVE_WS_OL_DATA:
	  	 let oldData = JSON.parse(JSON.stringify(state.olWsData || []));
	  	 let latestData = JSON.parse(JSON.stringify(action.data.hits ? action.data.hits.hits : []));
	  	 
	  	 return Object.assign({}, state, {
	    	olWsData:removeDuplicates(latestData.concat(oldData),"_id"),
	    	hasDataChanged:!state.hasDataChanged,
	    	reportsSpinner:false
      })
	  case WS_OPERATOR_LOG_FLUSH:
	 	return Object.assign({}, state, {
	    	olWsData:[],
	    	olData:[],
	    	hasDataChanged:!state.hasDataChanged,
	    	reportsSpinner:false
      })
	    
	  default:
	    return state
  }
}