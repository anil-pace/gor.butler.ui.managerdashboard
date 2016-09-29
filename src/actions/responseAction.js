import {WS_INIT,BUTLERS_DATA,PPS_DATA,PUT_DATA,AUDIT_DATA,INVENTORY_DATA,ORDERS_DATA,CHARGERS_DATA,THROUGHPUT_DATA,HISTOGRAM_DATA,CHARGERS_DETAIL,BUTLERS_DETAIL,PPS_DETAIL,PPS_PERFORMANCE, USER_DETAILS} from '../constants/appConstants'
//import {getFetchData} from 'headerAction'

export function receivePpsData(data){
	
	return{
		type:PPS_DATA,
		data
	}
}
export function receiveButlersData(data){
	
	return{
		type:BUTLERS_DATA,
		data
	}
}
export function receiveInventoryData(data){
	return {
		type:INVENTORY_DATA,
		data
	}
}
export function receiveChargersData(data){
	
	return{
		type:CHARGERS_DATA,
		data
	}
}
export function receiveAuditData(data) {
	
	return{
		type:AUDIT_DATA,
		data
	}
}
export function receivePutData(data){
	
	return{
		type:PUT_DATA,
		data
	}
}

export function receiveOrdersData(data){

	return{
		type:ORDERS_DATA,
		data
	}
}
export function receiveThroughputData(data){

	return{
		type:THROUGHPUT_DATA,
		data
	}

}
export function initData(data){
	return {
		type: WS_INIT,
		data
	}
}

export function recieveHistogramData(data){
	return {
		type: HISTOGRAM_DATA,
		data
	}
}

export function recieveChargersDetail(data){
	return {
		type: CHARGERS_DETAIL,
		data
	}
}

export function recieveButlersDetail(data){
	return {
		type: BUTLERS_DETAIL,
		data
	}
}

export function recievePPSDetail(data){
	return {
		type: PPS_DETAIL,
		data
	}
}

export function recievePPSperformance(data){
	return {
		type: PPS_PERFORMANCE,
		data
	}
}

export function recieveUserDetails(data){
	return {
		type: USER_DETAILS,
		data
	}
}
