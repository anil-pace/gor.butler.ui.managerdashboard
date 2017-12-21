import { REPORTS_FETCH,GET_REPORT,SET_DOWNLOAD_REPORT_SPINNER} from '../constants/frontEndConstants'

export  function downloadReportsReducer(state={},action){
	

	switch (action.type) {
	  
	  case REPORTS_FETCH:
	    return Object.assign({}, state, {
	    	reportsData:action.data,
	    	hasDataChanged:!state.hasDataChanged,
	    	downloadReportsSpinner:false
      })
	  case GET_REPORT:
	  	console.log(action.data);
	  	break
	  case SET_DOWNLOAD_REPORT_SPINNER:
	  	return Object.assign({}, state, {
	    	downloadReportsSpinner:action.data
      })
	    
	  default:
	    return state
  }
}
