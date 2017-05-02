import { AJAX_CALL} from '../constants/frontEndConstants'

export function getItemRecall(params){
	return {
    type: AJAX_CALL,
    params
  }
}