import {OPERATION_LOG_FETCH,APPLY_OL_FILTER_FLAG,
WS_OPERATOR_LOG_SUBSCRIBE,
WS_OPERATOR_LOG_UNSUBSCRIBE,
SET_REPORTS_SPINNER,RECIEVE_WS_OL_DATA,WS_OPERATOR_LOG_FLUSH} from './../constants/frontEndConstants'

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
function wsUnsubscribe(data){
    return {
        type: WS_OPERATOR_LOG_UNSUBSCRIBE,
        data
    }
}
function flushWSData(){
    return {
            type: WS_OPERATOR_LOG_FLUSH
    }
}
export function wsOLUnSubscribe(data){
    return function(dispatch){
        dispatch(wsUnsubscribe(data))
        dispatch(flushWSData())
    }
    
}
export function setReportsSpinner(data){
    return {
        type: SET_REPORTS_SPINNER,
        data
    }
}

export function recieveWSData(data){
    return {
        type: RECIEVE_WS_OL_DATA,
        data
    }
}