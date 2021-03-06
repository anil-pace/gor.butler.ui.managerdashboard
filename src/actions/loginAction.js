import { MOCK_LOGIN,LOGIN_REQUEST,DISPLAY_LOGIN_SPINNER, SET_TIME_OFFSET,SET_USERNAME,LOGIN_REDIRECT, LOGIN_SUCCESS,LOGIN_FAILURE, AJAX_CALL, LOGOUT, WS_DISCONNECT,CONNECTION_FAILURE} from '../constants/frontEndConstants'



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
      return{
        type: LOGIN_SUCCESS,
        data
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
 /**
  * Action to set login loader on/off
  */
 export function setLoginSpinner(data){
  return{
    type:DISPLAY_LOGIN_SPINNER,
    data
  }
 }
 /**
  * Get time offset
  */
 export function getTimeOffSetData(params){
  return{
    type:AJAX_CALL,
    params
  }
 }
 
 /**
  * [setTimeOffSetData Sets the timeoffset value]
  * @param {[type]} data [description]
  */
 export function setTimeOffSetData(data){
  return{
    type:SET_TIME_OFFSET,
    data
  }
 }

