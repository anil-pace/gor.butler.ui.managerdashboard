import { STORAGE_SPACE_FETCH} from '../constants/frontEndConstants';
import {removeDuplicates} from '../utilities/utils'

export  function storageSpaceReducer(state={},action){
	
	
	switch (action.type) {
	  
	  	case STORAGE_SPACE_FETCH:
		  	return Object.assign({}, state, {
		    	storageSpaceData:action.data || [],
		    	hasDataChanged:!state.hasDataChanged,
		    	reportsSpinner:false,
		    	totalSize:action.data.total
	      	});
	    
	  	default:
	    	return state
  }
}