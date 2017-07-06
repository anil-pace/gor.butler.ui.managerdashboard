/**
 * Created by gaurav.m on 6/27/17.
 */
import {
    RECEIVE_PPS_PROFILES,
    SELECT_PPS_PROFILE_FOR_CONFIGURATION,
    AJAX_CALL,
    SELECT_PPS_BIN,ADD_TAG_TO_BIN,CLEAR_SELECTION_PPS_BIN,CHANGE_PPS_BIN_STATUS,RECEIVE_TAGS
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

export function selectPPSBin(data) {
    return {
        type: SELECT_PPS_BIN,
        data
    }
}
export function clearSelectionPPSBin(data) {
    return {
        type: CLEAR_SELECTION_PPS_BIN,
        data
    }
}
export function changePPSBinStatus(data) {
    return {
        type: CHANGE_PPS_BIN_STATUS,
        data
    }
}

export function addTagToBin(data) {
    return {
        type: ADD_TAG_TO_BIN,
        data
    }
}
export function fetchTags(params) {
    return {
        type: AJAX_CALL,
        params
    }
}

export function receiveTags(params) {
    return {
        type: RECEIVE_TAGS,
        params
    }
}