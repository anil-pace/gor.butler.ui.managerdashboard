
import { BUTLER_HEADER_SORT ,BUTLER_HEADER_SORT_ORDER, PPS_HEADER_SORT, PPS_HEADER_SORT_ORDER, USER_HEADER_SORT, 
		 USER_HEADER_SORT_ORDER, WAVE_HEADER_SORT, WAVE_HEADER_SORT_ORDER, CS_HEADER_SORT_ORDER, CS_HEADER_SORT, 
		 PPS_CHECKED, DROP_RENDER_DISPLAY,SET_CHECK_ALL, SET_USER_FILTER, ORDER_HEADER_SORT_ORDER, ORDER_HEADER_SORT, 
		 AUDIT_HEADER_SORT_ORDER, AUDIT_HEADER_SORT, SET_ORDER_FILTER,SET_AUDIT_FILTER,SET_BUTLER_FILTER,SET_PPS_FILTER,
		 SET_CS_FILTER,SET_WAVE_FILTER} from '../constants/frontEndConstants'

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

export function butlerFilterDetail(data) {
	return {
		type: SET_BUTLER_FILTER,
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

export function ppsFilterDetail(data) {
	return {
		type: SET_PPS_FILTER,
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

export function waveFilterDetail(data) {
	return {
		type: SET_WAVE_FILTER,
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

export function csFilterDetail(data) {
	return {
		type: SET_CS_FILTER,
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

export function orderHeaderSortOrder(data){
	return {
		type: ORDER_HEADER_SORT_ORDER,
		data
	}
}

export function orderHeaderSort(data){
	return {
		type: ORDER_HEADER_SORT,
		data
	}
}

export function orderFilterDetail(data) {
	return {
		type: SET_ORDER_FILTER,
		data
	}
}

export function auditHeaderSortOrder(data){
	return {
		type: AUDIT_HEADER_SORT_ORDER,
		data
	}
}

export function auditHeaderSort(data){
	return {
		type: AUDIT_HEADER_SORT,
		data
	}
}

export function auditFilterDetail(data){
	return {
		type: SET_AUDIT_FILTER,
		data
	}
}

