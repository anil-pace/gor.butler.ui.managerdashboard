import {utils} from '../utilities/ajax'
import { routerMiddleware, push } from 'react-router-redux'
import { LOGIN_REQUEST, LOGIN_REDIRECT, LOGIN_SUCCESS,LOGIN_FAILURE} from '../constants/appConstants'



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
<<<<<<< HEAD
  
  return {
    type: LOGIN_SUCCESS,
    data
  }
}

function authData(params) {

  var obj = utils.ajax(params)
  var oDisp = dispatch(obj);

  return oDisp
=======
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

function authData(params){
  return dispatch => {
    return fetch('./mock/loginJson.json',{
      method: 'GET'

    }).then(response => response.json())
      .then(json => dispatch(receiveAuthData(json)))
  }
>>>>>>> d9d669e562a493eafbab05b6a65009786157b8e3
}

export function authLoginData(params) {
  return (dispatch) => {
      return dispatch(authData(params))
    
  }
<<<<<<< HEAD
}
=======
  
}

>>>>>>> d9d669e562a493eafbab05b6a65009786157b8e3
