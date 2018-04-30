
import {BUTLERS_DATA,PPS_DATA, MSU_DATA, PUT_DATA,AUDIT_DATA,INVENTORY_DATA_TODAY,INVENTORY_DATA,
	INVENTORY_DATA_HISTORY,ORDERS_DATA,CHARGERS_DATA,THROUGHPUT_DATA,
	HISTOGRAM_DATA,CHARGERS_DETAIL,BUTLERS_DETAIL,PPS_PERFORMANCE, 
	USER_DETAILS,FIRE_EMERGENCY,WS_ORDERS_PLATFORM_UNSUBSCRIBE,WS_ORDERS_PLATFORM_SUBSCRIBE} from '../constants/frontEndConstants'
import {PPS_DETAIL,PARSE_PPS} from '../constants/backEndConstants'


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
		type: PARSE_PPS,
		data
	}
}

export function recieveUserDetails(data){
	return {
		type: USER_DETAILS,
		data
	}
}

export function recieveInventoryDetails(data){
	return {
		type:INVENTORY_DATA,
		data
	}
}

export function recievefireHazardDetails(data){
	return {
		type: FIRE_EMERGENCY,
		data
	}
}

/*Actions for orders from platform*/
export function wsOrdersUnSubscribe(data){
	return {
		type: WS_ORDERS_PLATFORM_UNSUBSCRIBE,
		data
	}
}
export function wsOrdersSubscribe(data){
	return {
		type: WS_ORDERS_PLATFORM_SUBSCRIBE,
		data
	}
}

export function receiveMsuData(data){
	return{
		type:MSU_DATA,
		data
	}
}

 

