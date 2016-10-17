import { STATUS_FILTER, TIME_FILTER ,GET_PAGE_SIZE,GET_CURRENT_PAGE,GET_LAST_REFRESH_TIME} from '../constants/appConstants'
export  function filterOptions(state={},action){
	switch (action.type) {
	  
	  case STATUS_FILTER:
	    return Object.assign({}, state, {
	    	"statusFilter":action.data
      })

	  case TIME_FILTER:
	    return Object.assign({}, state, {
	    	"timeFilter":action.data
      })  

	  case GET_PAGE_SIZE:
	  	return Object.assign({}, state, {
	    	"pageSize":action.data
      }) 

	  case GET_CURRENT_PAGE:
	  	return Object.assign({}, state, {
	    	"currentPage":action.data
      })

      case GET_LAST_REFRESH_TIME:
      	 return Object.assign({}, state, {
	    	"lastUpdatedOn":action.data
      })	
	    
	  default:
	    return state
  }
}
