import {ORDERS_FULFIL_FETCH, 
		ORDERS_SUMMARY_FETCH, 
		ORDERS_CUT_OFF_TIME_FETCH, 
		ORDERS_PER_PBT_FETCH,
		ORDERS_PER_PBT_FETCH_POST_FILTER,
		ORDERLINES_PER_ORDER_FETCH,
		TOGGLE_ACTIVE_PBT,UNSET_ALL_ACTIVE_PBT
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

export function receiveCutOffTimeData(data){
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

export function receiveOrdersPerPbtDataPostFilter(data){
	return {
		type: ORDERS_PER_PBT_FETCH_POST_FILTER,
		data
	}
}

export function setActivePbt(data){
	return {
		type: TOGGLE_ACTIVE_PBT,
		data,
	}
}

export function unSetAllActivePbts(data){
	return {
		type: UNSET_ALL_ACTIVE_PBT,
		data,
	}
}

export function receiveOrdersLinesData(data){
	return {
		type: ORDERLINES_PER_ORDER_FETCH,
		data
	}
}