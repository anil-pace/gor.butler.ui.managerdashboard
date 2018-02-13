import {ORDERS_FULFIL_FETCH, ORDERS_SUMMARY_FETCH} from './../constants/frontEndConstants'

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