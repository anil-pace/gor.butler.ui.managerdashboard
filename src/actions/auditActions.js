import { SET_AUDIT,RESET_AUDIT} from '../constants/appConstants'

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

