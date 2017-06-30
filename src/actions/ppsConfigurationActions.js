/**
 * Created by gaurav.m on 6/27/17.
 */
import {
    RECEIVE_PPS_PROFILES,
    SELECT_PPS_PROFILE_FOR_CONFIGURATION,
    AJAX_CALL,
    SELECT_PPS_BIN_TO_TAG,ADD_TAG_TO_BIN
} from './../constants/frontEndConstants'
export function fetchPPSProfiles(params) {
    return {
        type: AJAX_CALL,
        params
    }
}
export function receivePPSProfiles(params) {
    return {
        type: RECEIVE_PPS_PROFILES,
        params
    }
}


export function selectPPSProfileForConfiguration(data) {
    return {
        type: SELECT_PPS_PROFILE_FOR_CONFIGURATION,
        data
    }
}

export function selectPPSBinToTag(data) {
    return {
        type: SELECT_PPS_BIN_TO_TAG,
        data
    }
}

export function addTagToBin(data) {
    return {
        type: ADD_TAG_TO_BIN,
        data
    }
}