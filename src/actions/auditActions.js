
import { AJAX_CALL,AUDIT_RETRIEVE, RECIEVE_AUDIT_DATA} from '../constants/appConstants'


export function getAuditData(params){
	return {
    type: AJAX_CALL,
    params
  }
}

export function recieveAuditData(data){
	return {
		type: RECIEVE_AUDIT_DATA,
		data
	}
}

import { SET_AUDIT} from '../constants/appConstants'

/**
 * Actions for users page
 */

export function setAuditType(data){
  return {
    type: SET_AUDIT,
    data
    }
}


