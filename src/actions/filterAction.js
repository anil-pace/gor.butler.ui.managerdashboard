import { SHOW_FILTER ,IS_FILTER_APPLIED} from '../constants/frontEndConstants'

export function showTableFilter(data){
	return {
		type: SHOW_FILTER,
		data
  	}
}


export function filterApplied(data){
	return {
		type: IS_FILTER_APPLIED,
		data
  	}
}
