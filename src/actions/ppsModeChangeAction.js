import {  AJAX_CALL} from '../constants/frontEndConstants'

export function changePPSmode(params){
	return {
    type: AJAX_CALL,
    params
  }
}




