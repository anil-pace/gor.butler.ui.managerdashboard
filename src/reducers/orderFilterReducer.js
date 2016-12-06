import { STATUS_FILTER, TIME_FILTER ,GET_PAGE_SIZE_ORDERS,GET_CURRENT_PAGE_ORDERS,GET_LAST_REFRESH_TIME, SET_CURRENT_PAGE} from '../constants/frontEndConstants'
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

	  case GET_PAGE_SIZE_ORDERS:
	  	return Object.assign({}, state, {
	    	"pageSize":action.data
      }) 

	  case GET_CURRENT_PAGE_ORDERS:
	  	return Object.assign({}, state, {
	    	"currentPage":action.data
      })

      case GET_LAST_REFRESH_TIME:
      	 return Object.assign({}, state, {
	    	"lastUpdatedOn":action.data
      })

      case SET_CURRENT_PAGE:
      	 return Object.assign({}, state, {
	    	"currentPageUrl":action.data
      })
	    
	  default:
	    return state
  }
}
