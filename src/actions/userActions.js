import { AJAX_CALL, ID_MAP, SET_ROLE} from '../constants/frontEndConstants'

/**
 * Actions for users page
 */

export function userRequest(params){
  return {
    type: AJAX_CALL,
    params
    }
}

export function assignRole(data)
{
  return {
    type: ID_MAP,
    data
    }
}
export function setRole(data)
{
  return {
    type: SET_ROLE,
    data
    }
}
