import { SHOW_FILTER ,IS_FILTER_APPLIED,BUTLER_FILTER_STATE} from '../constants/frontEndConstants'

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

export function butlerfilterState(data){
	return {
		type: BUTLER_FILTER_STATE,
		data
  	}
}


