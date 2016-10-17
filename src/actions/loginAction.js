import { MOCK_LOGIN,LOGIN_REQUEST, SET_USERNAME,LOGIN_REDIRECT, LOGIN_SUCCESS,LOGIN_FAILURE, AJAX_CALL, LOGOUT, WS_DISCONNECT} from '../constants/appConstants'



/**
 * Actions for Login request
 */


export function loginRequest(){
  return {
      type: LOGIN_REQUEST
    }
}

export function logoutRequest(){

    return { type: LOGOUT }
  
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
 * Mock login module
 */
export function mockLoginAuth(params) {
  return {
    type: MOCK_LOGIN,
    params
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

 /**
  * Action to set username that will be used to get role data
  */
 
 export function setUsername(data){
  return {
    type: SET_USERNAME,
    data
  }
 }


