import {TABLE_STATE} from '../constants/frontEndConstants.js';

export  function currentTableState(state={},action){
	switch (action.type) {
	  case TABLE_STATE:
	    return Object.assign({}, state, {
        "currentTableState":action.data
      })
      break;
	  default:
	    return state
  }
}