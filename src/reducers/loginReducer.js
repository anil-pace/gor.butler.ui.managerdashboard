import {LOGIN_REQUEST,SET_USERNAME,SET_TIME_OFFSET,LOGIN_REDIRECT,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */

export  function authLogin(state={},action){
	switch (action.type) {
	
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
          "loginAuthorized":true,
          "auth_token": sessionStorage.getItem('auth_token'),
          "username":sessionStorage.getItem('username')
      })    

	  case LOGIN_REDIRECT:
	
    case LOGIN_SUCCESS:
	   sessionStorage.setItem('auth_token', action.data.auth_token);
      return Object.assign({}, state, {
          "loginAuthorized":true,
        	"auth_token": action.data.auth_token
      })

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
          "loginAuthorized":false
      })

    case LOGOUT:
     //sessionStorage.removeItem('auth_token');      
      return Object.assign({}, state, {
          "loginAuthorized":null,
          "auth_token":null
      })
    case SET_USERNAME:
      sessionStorage.setItem('username', action.data);
      return Object.assign({}, state, {
          "username":action.data
      })
    case SET_TIME_OFFSET:
      sessionStorage.setItem('timeOffset', action.data.warehouse_time_zone || action.data);
      return Object.assign({}, state, {
          "timeOffset":action.data.warehouse_time_zone || action.data
      })
	  default:
	    return state
  }
}