import {LOGIN_REQUEST,LOGIN_REDIRECT} from '../actions/loginAction';

export  function authLogin(state={},action){
	switch (action.type) {
	  case LOGIN_REQUEST:
	  case LOGIN_REDIRECT:
	 
	    //state.selectedAction = action.type;
	    return Object.assign({}, state, {
        	"auth_token": action.data,
        	"username" :action.data
      })
	  default:
	    return state
  }
}