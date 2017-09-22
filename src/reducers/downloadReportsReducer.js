import { REPORTS_FETCH,GET_REPORT} from '../constants/frontEndConstants'
const dummyData = [{
id: 1,
fileName : "abc.csv",
type : "OPERATOR_LOGS",
requestedBy : "himanshu.s",
requestedTime : "Dec 24, 2016 12:38",
completionTime :"Dec 24, 2016 12:38",
lastDownloaded : "Dec 24, 2016 12:38",
status : "COMPLETED"
}
]
export  function downloadReportsReducer(state={},action){
	

	switch (action.type) {
	  
	  case REPORTS_FETCH:
	  	
	    return Object.assign({}, state, {
	    	reportsData:action.data,
	    	hasDataChanged:!state.hasDataChanged,
	    	reportsSpinner:false
      })
	  case GET_REPORT:
	  	console.log(action.data);
	  	break
	  
	    
	  default:
	    return state
  }
}
