import {AJAX_CALL,RECIEVE_HEADER,RECEIVE_SHIFT_START_TIME} from '../constants/frontEndConstants.js';




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

export function recieveShiftStartTime(data){
  return {
    type: RECEIVE_SHIFT_START_TIME,
      data
    }
}

export function getShiftStartTime(params){
    return {
        type:AJAX_CALL,
        params
    }
}



