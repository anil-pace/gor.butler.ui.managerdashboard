import { AJAX_CALL,AUDIT_RETRIEVE, RECIEVE_AUDIT_DATA,SET_AUDIT,RESET_AUDIT,SETAUDIT_PPS} from '../constants/appConstants'

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

export function setAuditType(data){
  return {
    type: SET_AUDIT,
    data
    }
}
export function resetAuditType(data){
  return {
    type: RESET_AUDIT,
    data
    }
}
export function getPPSAudit(data){
	return {
		type: SETAUDIT_PPS,
		data
	}
}
