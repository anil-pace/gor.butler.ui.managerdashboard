import {REPORTS_FETCH,GET_REPORT,SET_DOWNLOAD_REPORT_SPINNER} from './../constants/frontEndConstants'

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
export function setDownloadReportSpinner(data){
    return {
        type: SET_DOWNLOAD_REPORT_SPINNER,
        data
    }
}