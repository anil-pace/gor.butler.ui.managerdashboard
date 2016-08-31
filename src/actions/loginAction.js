import {utils} from '../utilities/ajax'
import { routerMiddleware, push } from 'react-router-redux'

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
	
	return{
		type: LOGIN_SUCCESS,
		data
	}
}

function authData(params){
  return dispatch => {
    return fetch('./dummy.json',{
      method: 'post',
      body: JSON.stringify({
        text
      })

    }).then(response => response.json())
      .then(json => dispatch(receiveAuthData(json)))
  }
}

export function authLoginData(params) {
  return (dispatch) => {
      return dispatch(push('/md'))
    
  }
  
}

