/**
 * Created by gaurav.m on 6/27/17.
 */
import {
    RECEIVE_PPS_PROFILES,
    SELECT_PPS_PROFILE_FOR_CONFIGURATION,
    AJAX_CALL,
    SELECT_PPS_BIN,ADD_TAG_TO_BIN,CLEAR_SELECTION_PPS_BIN,CHANGE_PPS_BIN_STATUS,RECEIVE_TAGS,CANCEL_PROFILE_CHANGES,CHANGE_PPS_BIN_GROUP_STATUS,SELECT_PPS_BIN_GROUP,PPS_PROFILE_CREATED,PPS_PROFILE_SAVED,TAG_ADDED_TO_LIST,DISPLAY_PPS_CONFIGURATION_SPINNER,PPS_PROFILE_REQUESTED
} from './../constants/frontEndConstants'
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
export function selectPPSBinGroup(data) {
    return {
        type: SELECT_PPS_BIN_GROUP,
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
export function changePPSBinGroupStatus(data) {
    return {
        type: CHANGE_PPS_BIN_GROUP_STATUS,
        data
    }
}

export function addTagToBin(data) {
    return {
        type: ADD_TAG_TO_BIN,
        data
    }
}

export function receiveTags(params) {
    return {
        type: RECEIVE_TAGS,
        params
    }
}

export function cancelProfileChanges(data) {
    return {
        type: CANCEL_PROFILE_CHANGES,
        data
    }
}



export function setPPSConfigurationSpinner(data){
    return {
        type: DISPLAY_PPS_CONFIGURATION_SPINNER,
        data
    }
}

export function savedPPSProfile(data) {
    return {
        type: PPS_PROFILE_SAVED,
        data
    }
}

export function profileCreated(data) {
    return {
        type: PPS_PROFILE_CREATED,
        data
    }
}

export function profileRequested(data) {
    return {
        type: PPS_PROFILE_REQUESTED,
        data
    }
}


export function tagAddedToList(data) {
    return {
        type: TAG_ADDED_TO_LIST,
        data
    }
}
