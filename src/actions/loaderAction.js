import { DISPLAY_LOADER} from '../constants/appConstants'

/**
 * [showLoader Action function for showing loader]
 * @param  {[Boolean]} data [true]
 * @return {[type]}      [description]
 */
export function displayLoader(data){
	
	return {
		type: DISPLAY_LOADER,
		data
  	}
}

