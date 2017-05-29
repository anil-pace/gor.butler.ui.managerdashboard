/**
 * Created by gaurav.m on 5/22/17.
 */
import { REPORTS_TAB_REFRESHED,AJAX_CALL,REPORT_GENERATED,CLEAR_GENERATED_REPORT,REPORT_GENERATION_PARAMS} from '../constants/frontEndConstants'

export function reportsTabRefreshed(params) {
    return {
        type: REPORTS_TAB_REFRESHED,
        params
    }
}

export function generateReport(params){
    return{
        type:AJAX_CALL,
        params
    }
}

export function reportGenerated(data){
    return{
        type:REPORT_GENERATED,
        data
    }
}

export function clearGeneratedReport(data){
    return {
        type:CLEAR_GENERATED_REPORT,
        data
    }

}

export function reportGenerationParamsState(data){
    return {
        type: REPORT_GENERATION_PARAMS,
        data
    }

}