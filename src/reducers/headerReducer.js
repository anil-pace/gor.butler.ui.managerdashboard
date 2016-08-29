import {REQUEST_HEADER} from '../actions/headerAction';

function posts(state = {
  isFetching: false,
  data: []
}, action){
	switch (action.type) {
		case REQUEST_HEADER:
		return Object.assign({}, state, {
        isFetching: false,
        type: REQUEST_HEADER,
        data: action.data,
        
      })
	default:
      return state
	}
}
export default function getData(state={},action){
	switch (action.type) {
	  case REQUEST_HEADER:
	    return Object.assign({}, state, {
        [action.type]: posts(state[action.type], action)
      })
	  default:
	    return state
  }
}