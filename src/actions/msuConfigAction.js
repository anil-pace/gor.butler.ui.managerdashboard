import { FETCH_MSU_CONFIG_LIST
	} from './../constants/frontEndConstants'

export function receiveMsuConfigList(data){
	console.log("coming inside msuConfigAction => receiveMsuConfigList => FETCH_MSU_CONFIG_LIST");
    return {
        type: FETCH_MSU_CONFIG_LIST,
        data
    }
}

// export function receiveOrderSummaryData(data){
// 	console.log("coming inside norderDetailsAction => receiveOrderSummaryData => ORDERS_SUMMARY_FETCH");
// 	return {
// 		type: ORDERS_SUMMARY_FETCH,
// 		data
// 	}
// }

// export function receiveCufOffTimeData(data){
// 	console.log("coming inside norderDetailsAction => receiveOrderSummaryData => ORDERS_CUT_OFF_TIME_FETCH");
// 	return {
// 		type: ORDERS_CUT_OFF_TIME_FETCH,
// 		data
// 	}
// }

// export function receiveOrdersPerPbtData(data){
// 	console.log("coming inside norderDetailsAction => receiveOrderSummaryData => ORDERS_PER_PBT_FETCH");
// 	return {
// 		type: ORDERS_PER_PBT_FETCH,
// 		data
// 	}
// }

// export function receiveOrdersLinesData(data){
// 	console.log("coming inside norderDetailsAction => receiveOrdersLinesData => ORDERLINES_PER_ORDER_FETCH");
// 	return {
// 		type: ORDERLINES_PER_ORDER_FETCH,
// 		data
// 	}
// }