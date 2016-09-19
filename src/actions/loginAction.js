import { LOGIN_REQUEST, LOGIN_REDIRECT, LOGIN_SUCCESS,LOGIN_FAILURE, AJAX_CALL} from '../constants/appConstants'



/**
 * Actions for Login request
 */


export function loginRequest(data){
  return {
    type: LOGIN_REQUEST,
      data
    }
}

export function loginRedirect(data){
  return {
    type: LOGIN_REDIRECT,
      data
    }
}

export function receiveAuthData(data){  
  if(data && data.auth_token)
  {
      console.log('Login Pass');
      return{
        type: LOGIN_SUCCESS,
        data
      }

  }
 else
  {
      console.log('Login Fail');
      return{
        type: LOGIN_FAILURE,
        data
      }
  }
}
/**
 * function that sends ajax to authorize user
 */

export function authLoginData(params) {
  return {
    type: AJAX_CALL,
    params
  }
 }


