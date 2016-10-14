import {  AJAX_CALL} from '../constants/appConstants'

export function changePPSmode(params){
	return {
    type: AJAX_CALL,
    params
  }
}




