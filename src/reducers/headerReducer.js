import {RECIEVE_HEADER,RECEIVE_SYSTEM_START_TIME} from '../constants/frontEndConstants.js';

export  function headerData(state={},action){
	switch (action.type) {
	  case RECIEVE_HEADER:
	    return Object.assign({}, state, {
        "headerInfo":action.data
      })
		break;
    	case RECEIVE_SYSTEM_START_TIME:
            return Object.assign({}, state, {

                "systemStartTime":new Date(action.data.data).toLocaleTimeString()
            })
	  default:
	    return state
  }
}