import {AJAX_CALL,RECIEVE_HEADER} from '../constants/appConstants.js';




export function getHeaderInfo(params){
	return {
		type: AJAX_CALL,
    	params
  	}
}

export function recieveHeaderInfo(data){
  return {
    type: RECIEVE_HEADER,
      data
    }
}



