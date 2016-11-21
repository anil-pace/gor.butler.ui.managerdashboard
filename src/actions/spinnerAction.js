import { DISPLAY_SPINNER} from '../constants/frontEndConstants'

/**
 * [showLoader Action function for showing loader]
 * @param  {[Boolean]} data [true]
 * @return {[type]}      [description]
 */
export function displaySpinner(data){
	
	return {
		type: DISPLAY_SPINNER,
		data
  	}
}

