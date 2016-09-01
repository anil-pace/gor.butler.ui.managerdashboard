import {LOGIN_REQUEST,LOGIN_REDIRECT,LOGIN_SUCCESS,LOGOUT} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function authLogin(state={},action){
	switch (action.type) {
	  case LOGIN_REQUEST:
	  case LOGIN_REDIRECT:
	  case LOGIN_SUCCESS:
	    
      return Object.assign({}, state, {
        	"auth_token": action.data.auth_token,
        	"username" :action.data.username
      })
    case LOGOUT:
      
      return Object.assign({}, state, {
          "auth_token": null,
          "username" :null
      })

	  default:
	    return state
  }
}