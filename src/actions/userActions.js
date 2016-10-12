import { AJAX_CALL} from '../constants/appConstants'

/**
 * Actions for users page
 */

export function userRequest(params){
  return {
    type: AJAX_CALL,
    params
    }
}