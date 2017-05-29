/**
 * Created by gaurav.m on 5/22/17.
 */
import {REPORTS_TAB_REFRESHED,REPORT_GENERATED,CLEAR_GENERATED_REPORT,REPORT_GENERATION_PARAMS} from '../constants/frontEndConstants';

/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */


export  function reportsDetail(state={},action){
    switch (action.type) {
        case REPORTS_TAB_REFRESHED:
            return Object.assign({}, state, {
                "reportsRefreshed": new Date()
            })

        case REPORT_GENERATED:
            return Object.assign({},state,{
                //TODO: Will be changed
                stockLedgerReport:new Date()
            })

        case CLEAR_GENERATED_REPORT:
            return Object.assign({},state,{
                "stockLedgerReport":null
            })

        case REPORT_GENERATION_PARAMS:              //This reducer will update the the userfilterState value with latest applied filter
            return Object.assign({}, state, {
                "reportGenerationParams" : action.data
            })
        default:
            return state
    }
}

