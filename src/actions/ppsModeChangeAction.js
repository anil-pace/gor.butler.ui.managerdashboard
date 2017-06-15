import {  AJAX_CALL,GET_PENDING_MSU,RESET_CHECKED_PPS} from '../constants/frontEndConstants'

export function changePPSmode(params){
	return {
    type: AJAX_CALL,
    params
  }
}

export function recievePendingMSU(data){
	return {
		type:GET_PENDING_MSU,
		data
	}
}

export function resetCheckedPPSList(data){
	return {
		type:RESET_CHECKED_PPS,
		data
	}
}




