import {AJAX_CALL,RECIEVE_HEADER,RECEIVE_SYSTEM_START_TIME} from '../constants/frontEndConstants.js';




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

export function recieveSystemStartTime(data){
  return {
    type: RECEIVE_SYSTEM_START_TIME,
      data
    }
}

export function getSystemStartTime(params){
    return {
        type:AJAX_CALL,
        params
    }
}



