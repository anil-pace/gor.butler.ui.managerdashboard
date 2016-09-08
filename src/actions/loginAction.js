import {utils} from '../utilities/ajax'
import { LOGIN_REQUEST, LOGIN_REDIRECT, LOGIN_SUCCESS,LOGIN_FAILURE} from '../constants/appConstants'



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

function receiveAuthData(data){
	if(!data.auth_token){
    	return{
    		type: LOGIN_FAILURE,
    		data
    	}
  }
  return{
        type: LOGIN_SUCCESS,
        data
      }
}
/**
 * function that sends ajax to authorize user
 */
 
function authData(params){
  return dispatch => {
    return fetch('../mock/loginJson.json',{
      method: 'GET'

    }).then(response => response.json())
      .then(json => dispatch(receiveAuthData(json)))
  }
}

export function authLoginData(params) {
  return (dispatch) => {
      return dispatch(authData(params))
    
  }
  
}

