import {OPERATION_LOG_FETCH,APPLY_OL_FILTER_FLAG} from './../constants/frontEndConstants'

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