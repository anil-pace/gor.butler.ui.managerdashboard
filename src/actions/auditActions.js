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

