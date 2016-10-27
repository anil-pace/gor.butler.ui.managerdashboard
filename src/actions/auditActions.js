import { SET_AUDIT,RESET_AUDIT,SETAUDIT_PPS} from '../constants/appConstants'

/**
 * Actions for users page
 */

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
