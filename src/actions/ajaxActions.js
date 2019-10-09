/**
 * Created by gaurav.m on 7/28/17.
 */
import { AJAX_CALL } from './../constants/frontEndConstants'
export function makeAjaxCall(params) {
    return {
        type: AJAX_CALL,
        params
    }
}