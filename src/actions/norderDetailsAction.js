import {ORDERS_FULFIL_FETCH, 
		ORDERS_SUMMARY_FETCH, 
		ORDERS_CUT_OFF_TIME_FETCH, 
		ORDERS_PER_PBT_FETCH,
		ORDERLINES_PER_ORDER_FETCH,
		SET_ACTIVE_PBT_INDEX
	} from './../constants/frontEndConstants'

export function receiveOrderFulfilmentData(data){
    return {
        type: ORDERS_FULFIL_FETCH,
        data
    }
}

export function receiveOrderSummaryData(data){
	return {
		type: ORDERS_SUMMARY_FETCH,
		data
	}
}

export function receiveCufOffTimeData(data){
	return {
		type: ORDERS_CUT_OFF_TIME_FETCH,
		data
	}
}

export function receiveOrdersPerPbtData(data, saltParams){
	return {
		type: ORDERS_PER_PBT_FETCH,
		data,
		saltParams
	}
}

export function setActivePbtIndex(data){
	return {
		type: SET_ACTIVE_PBT_INDEX,
		data,
	}
}

export function receiveOrdersLinesData(data){
	return {
		type: ORDERLINES_PER_ORDER_FETCH,
		data
	}
}