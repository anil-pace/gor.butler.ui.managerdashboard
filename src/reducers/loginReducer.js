import {LOGIN_REQUEST,LOGIN_REDIRECT,LOGIN_SUCCESS,LOGOUT} from '../constants/appConstants';

export  function authLogin(state={},action){
	switch (action.type) {
	  case LOGIN_REQUEST:
	  case LOGIN_REDIRECT:
	  case LOGIN_SUCCESS:
	    //state.selectedAction = action.type;
	    //window.localStore.setItem('auth_token',action.data.auth_token)
      return Object.assign({}, state, {
        	"auth_token": action.data.auth_token,
        	"username" :action.data.username
      })
    case LOGOUT:
      //window.localStore.removeItem('auth_token');
      return Object.assign({}, state, {
          "auth_token": null,
          "username" :null
      })

	  default:
	    return state
  }
}