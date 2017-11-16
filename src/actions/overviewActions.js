/**
 * Created by gaurav.m on 4/24/17.
 */
import {OVERVIEW_REFRESHED,
	WS_ORDERS_HEADER_SUBSCRIBE,WS_ORDERS_HEADER_UNSUBSCRIBE} from './../constants/frontEndConstants'
export function overviewRefreshed(params){
    return {
        type: OVERVIEW_REFRESHED,
        params
    }
}

export function wsOrdersHeaderUnSubscribe(data){
    return {
        type: WS_ORDERS_HEADER_UNSUBSCRIBE,
        data
    }
} 

export function wsOrdersHeaderSubscribe(data){
    return {
        type: WS_ORDERS_HEADER_SUBSCRIBE,
        data
    }
} 