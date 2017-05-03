/**
 * Created by gaurav.m on 4/24/17.
 */
import {OVERVIEW_REFRESHED} from './../constants/frontEndConstants'
export function overviewRefreshed(params){
    return {
        type: OVERVIEW_REFRESHED,
        params
    }
}