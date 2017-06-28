/**
 * Created by gaurav.m on 6/27/17.
 */
import {FETCH_PPS_PROFILES,RECEIVE_PPS_PROFILES,SELECT_PPS_PROFILE_FOR_CONFIGURATION} from './../constants/frontEndConstants'
export function fetchPPSProfiles(params){
    return {
        type: FETCH_PPS_PROFILES,
        params
    }
}
export function receivePPSProfiles(params) {
    return {
        type:RECEIVE_PPS_PROFILES,
        params
    }
}


export function selectPPSProfileForConfiguration(data) {
    return {
        type:SELECT_PPS_PROFILE_FOR_CONFIGURATION,
        data
    }
}