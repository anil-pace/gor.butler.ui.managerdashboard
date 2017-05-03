import {RECIEVE_HEADER,RECEIVE_SHIFT_START_TIME} from '../constants/frontEndConstants.js';

export  function headerData(state={},action){
	switch (action.type) {
	  case RECIEVE_HEADER:
	    return Object.assign({}, state, {
        "headerInfo":action.data
      })
		break;
    	case RECEIVE_SHIFT_START_TIME:
            return Object.assign({}, state, {

                "shiftStartTime":new Date(action.data.data)
            })
	  default:
	    return state
  }
}