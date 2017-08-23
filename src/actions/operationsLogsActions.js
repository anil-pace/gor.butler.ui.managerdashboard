import {OPERATION_LOG_FETCH} from './../constants/frontEndConstants'

export function recieveOLData(data){
    return {
        type: OPERATION_LOG_FETCH,
        data
    }
}