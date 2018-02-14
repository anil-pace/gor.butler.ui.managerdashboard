import {ORDERS_FULFIL_FETCH, 
		ORDERS_SUMMARY_FETCH, 
		ORDERS_CUT_OFF_TIME_FETCH, 
		ORDERS_PER_PBT_FETCH,
		ORDERLINES_PER_ORDER_FETCH
	} from './../constants/frontEndConstants'

export function receiveOrderFulfilmentData(data){
	console.log("coming inside norderDetailsAction => receiveOrderFulfilmentData => ORDERS_FULFIL_FETCH");
    return {
        type: ORDERS_FULFIL_FETCH,
        data
    }
}

export function receiveOrderSummaryData(data){
	console.log("coming inside norderDetailsAction => receiveOrderSummaryData => ORDERS_SUMMARY_FETCH");
	return {
		type: ORDERS_SUMMARY_FETCH,
		data
	}
}

export function receiveCufOffTimeData(data){
	console.log("coming inside norderDetailsAction => receiveOrderSummaryData => ORDERS_CUT_OFF_TIME_FETCH");
	return {
		type: ORDERS_CUT_OFF_TIME_FETCH,
		data
	}
}

export function receiveOrdersPerPbtData(data){
	console.log("coming inside norderDetailsAction => receiveOrderSummaryData => ORDERS_PER_PBT_FETCH");
	return {
		type: ORDERS_PER_PBT_FETCH,
		data
	}
}

export function receiveOrdersLinesData(data){
	console.log("coming inside norderDetailsAction => receiveOrdersLinesData => ORDERLINES_PER_ORDER_FETCH");
	return {
		type: ORDERLINES_PER_ORDER_FETCH,
		data
	}
}