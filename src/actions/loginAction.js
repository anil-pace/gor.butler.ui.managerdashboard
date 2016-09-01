import {utils} from '../utilities/ajax'
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REDIRECT = "LOGIN_REDIRECT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

/**
 * Action for Login request
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

function receiveAuthData(data){
  
  return {
    type: LOGIN_SUCCESS,
    data
  }
}

function authData(params) {

  var obj = utils.ajax(params)
  var oDisp = dispatch(obj);

  return oDisp
}

export function authLoginData(params) {
  return (dispatch, getState) => {
      return dispatch(authData(params))
    
  }
}