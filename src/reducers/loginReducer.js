import {LOGIN_REQUEST,SET_USERNAME,SET_TIME_OFFSET,LOGIN_REDIRECT,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT,CONNECTION_FAILURE} from '../constants/frontEndConstants';
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
          "connectionActive":true,
          "auth_token": sessionStorage.getItem('auth_token'),
          "username":sessionStorage.getItem('username')
      })    

	  case LOGIN_REDIRECT:
    case LOGIN_SUCCESS:
	   sessionStorage.setItem('auth_token', action.data.auth_token);

      return Object.assign({}, state, {
          "loginAuthorized":true,
          "connectionActive":true,
        	"auth_token": action.data.auth_token,
          "timeOutDuration" : action.data.duration
      })

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
          "connectionActive":true,
          "loginAuthorized":false
      })

    case CONNECTION_FAILURE:
      return Object.assign({}, state, {
          "connectionActive":false,
          "loginAuthorized":null
      })    

    case LOGOUT:
     //sessionStorage.removeItem('auth_token');      
      return Object.assign({}, state, {
          "loginAuthorized":null,
          "connectionActive":null,
          "auth_token":null
      })
    case SET_USERNAME:
      sessionStorage.setItem('username', action.data);
      return Object.assign({}, state, {
          "username":action.data
      })
    case SET_TIME_OFFSET:
      sessionStorage.setItem('timeOffset', "America/Los_Angeles")//action.data.warehouse_time_zone || action.data);
      return Object.assign({}, state, {
          "timeOffset":"America/Los_Angeles"//action.data.warehouse_time_zone || action.data
      })
	  default:
	    return state
  }
}