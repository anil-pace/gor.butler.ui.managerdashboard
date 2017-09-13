import {REPORTS_FETCH,GET_REPORT} from './../constants/frontEndConstants'

export function recieveReportsData(data){
    return {
        type: REPORTS_FETCH,
        data
    }
}
export function getReport(data){
    return {
        type: GET_REPORT,
        data
    }
}