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