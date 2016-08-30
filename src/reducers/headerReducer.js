import {REQUEST_HEADER,RECIEVE_HEADER,RECIEVE,RECIEVE_ITEM_TO_STOCK} from '../actions/headerAction';

function posts(state = {
  isFetching: false,
  data: []
}, action){
	switch (action.type) {
		case REQUEST_HEADER:
		return Object.assign({}, state, {
        isFetching: true,
        type: REQUEST_HEADER,
        data: action.data,
        
      })
		case RECIEVE_HEADER:
		return Object.assign({}, state, {
        isFetching: false,
        type: RECIEVE_HEADER,
        data: action.data,
        
      })
		case RECIEVE_ITEM_TO_STOCK:
		return Object.assign({}, state, {
        isFetching: false,
        type: RECIEVE_ITEM_TO_STOCK,
        data: action.data
        
      })

	default:
      return state
	}
}

export function selectedAction(sAction = 'FETCH', action) {
  switch (action.type) {
  case 'FETCH':
    return action.type
  default:
    return sAction
  }
}

export  function getData(state={},action){
	switch (action.type) {
	  case REQUEST_HEADER:
	  case RECIEVE_HEADER:
	  case RECIEVE_ITEM_TO_STOCK:
	    //state.selectedAction = action.type;
	    return Object.assign({}, state, {
        [action.type]: posts(state[action.type], action),
        "selectedAction":action.type
      })
	  default:
	    return state
  }
}