
import { BUTLER_HEADER_SORT ,BUTLER_HEADER_SORT_ORDER, PPS_HEADER_SORT, PPS_HEADER_SORT_ORDER, USER_HEADER_SORT, USER_HEADER_SORT_ORDER, WAVE_HEADER_SORT, WAVE_HEADER_SORT_ORDER, CS_HEADER_SORT_ORDER, CS_HEADER_SORT, PPS_CHECKED, DROP_RENDER_DISPLAY,SET_CHECK_ALL, SET_USER_FILTER} from '../constants/frontEndConstants'

export function butlerHeaderSort(data){
	return {
		type: BUTLER_HEADER_SORT,
		data
  	}
}

export function butlerHeaderSortOrder(data){
	return {
		type: BUTLER_HEADER_SORT_ORDER,
		data
	}
}

export function setCheckedPps(data){
	return {
		type: PPS_CHECKED,
		data
  	}
}

export function ppsHeaderSort(data){
	return {
		type: PPS_HEADER_SORT,
		data
  	}
}

export function ppsHeaderSortOrder(data){
	return {
		type: PPS_HEADER_SORT_ORDER,
		data
	}
}

export function userHeaderSort(data){
	return {
		type: USER_HEADER_SORT,
		data
  	}
}

export function userHeaderSortOrder(data){
	return {
		type: USER_HEADER_SORT_ORDER,
		data
	}
}

export function waveHeaderSort(data){
	return {
		type: WAVE_HEADER_SORT,
		data
  	}
}

export function waveHeaderSortOrder(data){
	return {
		type: WAVE_HEADER_SORT_ORDER,
		data
	}
}

export function csHeaderSort(data){
	return {
		type: CS_HEADER_SORT,
		data
  	}
}

export function csHeaderSortOrder(data){
	return {
		type: CS_HEADER_SORT_ORDER,
		data
	}
}

export function setDropDisplay(data){
	return {
		type: DROP_RENDER_DISPLAY,
		data
	}
}

export function setCheckAll(data){
	return {
		type: SET_CHECK_ALL,
		data
	}
}

export function userFilterDetail(data){
	return {
		type: SET_USER_FILTER,
		data
	}
}
