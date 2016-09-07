import {utils} from '../utilities/ajax'
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
  if(!data.auth_token)
  {
      console.log('Login Fail');
      return{
        type: LOGIN_FAILURE,
        data
      }
  }
  console.log('Login Pass');
  return{
        type: LOGIN_SUCCESS,
        data
      }
}
/**
 * function that sends ajax to authorize user
 */
 
// function authData(params){
//   return dispatch => {
//     return fetch('../mock/loginJson.json',{
//       method: 'GET'

//     }).then(response => response.json())
//       .then(json => dispatch(receiveAuthData(json)))
// >>>>>>> develop
//   }
// }

export function authLoginData(params) {
  return {
    type: AJAX_CALL,
    params
  }
 }


