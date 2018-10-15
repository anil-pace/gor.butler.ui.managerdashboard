import { REPORTS_FETCH,GET_REPORT,SET_DOWNLOAD_REPORT_SPINNER} from '../constants/frontEndConstants'

export  function downloadReportsReducer(state={},action){
	

	switch (action.type) {
	  
	  case REPORTS_FETCH:
	    return Object.assign({}, state, {
	    	reportsData:action.data.content,
            totalElements:action.data.totalElements,
	    	hasDataChanged:!state.hasDataChanged,
	    	downloadReportsSpinner:false
      })
	  
	  case SET_DOWNLOAD_REPORT_SPINNER:
	  	return Object.assign({}, state, {
	    	downloadReportsSpinner:action.data
      })
	    
	  default:
	    return state
  }
}
