import {LOGIN_REQUEST,LOGIN_REDIRECT,LOGIN_SUCCESS} from '../actions/loginAction';


const initialAuthState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};


export  function authLogin(state={},action){
	switch (action.type) {
	  case LOGIN_REQUEST:
	  case LOGIN_REDIRECT:
	  case LOGIN_SUCCESS:
	    //state.selectedAction = action.type;
	    return Object.assign({}, state, {
        	"auth_token": action.data,
        	"username" :action.data
      })
	  default:
	    return state
  }
}