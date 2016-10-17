import {RECIEVE_HEADER} from '../constants/appConstants.js';

export  function headerData(state={},action){
	switch (action.type) {
	  case RECIEVE_HEADER:
	    return Object.assign({}, state, {
        "headerInfo":action.data
      })
      break;
	  default:
	    return state
  }
}