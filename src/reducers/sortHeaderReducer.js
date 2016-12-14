
import {BUTLER_HEADER_SORT,BUTLER_HEADER_SORT_ORDER, PPS_HEADER_SORT, PPS_HEADER_SORT_ORDER, USER_HEADER_SORT, USER_HEADER_SORT_ORDER, WAVE_HEADER_SORT, WAVE_HEADER_SORT_ORDER, CS_HEADER_SORT_ORDER ,CS_HEADER_SORT,PPS_CHECKED, DROP_RENDER_DISPLAY,SET_CHECK_ALL} from '../constants/frontEndConstants'

export  function sortHeaderState(state={},action){
	switch (action.type) {
	  
	  case BUTLER_HEADER_SORT:
	    return Object.assign({}, state, {
	    	"butlerHeaderSort":action.data
      })

	  case BUTLER_HEADER_SORT_ORDER:
	    return Object.assign({}, state, {
	    	"butlerHeaderSortOrder":action.data
      })

	  case PPS_CHECKED:
	    return Object.assign({}, state, {
	    	"checkedPps":action.data
      })  

	  case PPS_HEADER_SORT:
	    return Object.assign({}, state, {
	    	"ppsHeaderSort":action.data
      })

	  case PPS_HEADER_SORT_ORDER:
	    return Object.assign({}, state, {
	    	"ppsHeaderSortOrder":action.data
      }) 

	   case DROP_RENDER_DISPLAY:
	    return Object.assign({}, state, {
	    	"renderDropD":action.data
      }) 

      case SET_CHECK_ALL:
	    return Object.assign({}, state, {
	    	"checkAll":action.data
      }) 
	    
      case USER_HEADER_SORT:
	    return Object.assign({}, state, {
	    	"userHeaderSort":action.data
      })

	  case USER_HEADER_SORT_ORDER:
	    return Object.assign({}, state, {
	    	"userHeaderSortOrder":action.data
      })

      case WAVE_HEADER_SORT:
	    return Object.assign({}, state, {
	    	"waveHeaderSort":action.data
      })

	  case WAVE_HEADER_SORT_ORDER:
	    return Object.assign({}, state, {
	    	"waveHeaderSortOrder":action.data
      }) 

      case CS_HEADER_SORT:
	    return Object.assign({}, state, {
	    	"csHeaderSort":action.data
      })

	  case CS_HEADER_SORT_ORDER:
	    return Object.assign({}, state, {
	    	"csHeaderSortOrder":action.data
      })    
	   
	  default:
	    return state
  }
}
