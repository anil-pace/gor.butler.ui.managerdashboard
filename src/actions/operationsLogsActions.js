import {OPERATION_LOG_FETCH,APPLY_OL_FILTER_FLAG,
WS_OPERATOR_LOG_SUBSCRIBE,WS_OPERATOR_LOG_UNSUBSCRIBE,SET_REPORTS_SPINNER} from './../constants/frontEndConstants'

export function recieveOLData(data){
    return {
        type: OPERATION_LOG_FETCH,
        data
    }
}

export function applyOLFilterFlag(data){
    return {
        type: APPLY_OL_FILTER_FLAG,
        data
    }
}

export function wsOLSubscribe(data){
    return {
        type: WS_OPERATOR_LOG_SUBSCRIBE,
        data
    }
}
export function wsOLUnSubscribe(data){
    return {
        type: WS_OPERATOR_LOG_UNSUBSCRIBE,
        data
    }
}
export function setReportsSpinner(data){
    return {
        type: SET_REPORTS_SPINNER,
        data
    }
}