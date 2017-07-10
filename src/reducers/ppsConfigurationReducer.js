/**
 * Created by gaurav.m on 6/19/17.
 */
import {
    PPS_CONFIGURATION_REFRESHED,
    RECEIVE_PPS_PROFILES,
    SELECT_PPS_PROFILE_FOR_CONFIGURATION,
    SELECT_PPS_BIN,
    ADD_TAG_TO_BIN,
    CLEAR_SELECTION_PPS_BIN,
    CHANGE_PPS_BIN_STATUS,
    RECEIVE_TAGS,CANCEL_PROFILE_CHANGES
} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export function ppsConfiguration(state = {}, action) {
    let selected_pps, selected_profile, current_list, pps_list, selected_bin, selected_tag,immutable_pps_list,pps_index,profile_index
    switch (action.type) {
        case PPS_CONFIGURATION_REFRESHED:
            return Object.assign({}, state, {
                "ppsConfigurationRefreshed": new Date()
            })
        case RECEIVE_PPS_PROFILES:
            pps_list = action.params.pps
            immutable_pps_list=JSON.parse(JSON.stringify(pps_list))
            if (pps_list.length < 1 || pps_list[0].profiles.length < 1) {
                /**
                 * if empty list of pps or profile received, return with the original state
                 */
                return state
            }
            pps_list[0].selected = true                       // Mark the first PPS as selected by default.
            pps_list[0].profiles.filter(function (prfl) {    // Mark the applied profile as selected by default.
                return prfl.applied
            })[0].selected = true
            return Object.assign({}, state, {
                ppsList: pps_list,
                immutablePPSList:immutable_pps_list, //Deep cloning of an Array of objects
                selectedProfile: pps_list[0].profiles[0],
                selectedPPS: pps_list[0]
            })

        case RECEIVE_TAGS:
            return Object.assign({}, state, {
                tags: action.params.tags
            })

        case SELECT_PPS_PROFILE_FOR_CONFIGURATION:
            selected_pps = action.data.pps
            selected_profile = action.data.profile
            current_list = state.ppsList.slice()
            current_list.forEach(function (entry) {
                if (entry.pps_id === selected_pps.pps_id) {
                    entry.selected = true
                    if (selected_profile) {
                        entry.profiles.forEach(function (prfl) {
                            if (selected_profile.id === prfl.id) {
                                prfl.selected = true
                            } else {
                                prfl.selected = false
                            }
                        })
                    } else {
                        entry.profiles.filter(function (prfl) { // Mark the applied profile as selected by default.
                            return prfl.applied
                        })[0].selected = true

                    }
                } else {
                    entry.selected = false
                }
            })
            return Object.assign({}, state, {
                ppsList: current_list,
                selectedProfile: selected_profile || selected_pps.profiles[0], //If no profile is selected, select the default profile
                selectedPPS: selected_pps || {},
                selectedPPSBin: null
            })

        case SELECT_PPS_BIN:
            selected_bin = action.data.bin
            selected_bin.id = [state.selectedPPS.pps_id, selected_bin.pps_bin_id].join("-")
            return Object.assign({}, state, {
                "selectedPPSBin": {[action.data.currentView]: selected_bin}
            })

        case CLEAR_SELECTION_PPS_BIN:
            selected_bin = action.data.bin
            selected_bin.id = [state.selectedPPS.pps_id, selected_bin.pps_bin_id].join("-")
            return Object.assign({}, state, {
                "selectedPPSBin": {[action.data.currentView]: null}
            })

        case CHANGE_PPS_BIN_STATUS:
            selected_bin = action.data.bin
            selected_bin.enabled = action.data.enabled
            return Object.assign({}, state, {
                "selectedPPSBin": {[action.data.currentView]: selected_bin}
            })

        case ADD_TAG_TO_BIN:
            selected_bin = action.data.bin
            selected_tag = action.data.tag
            if (!selected_bin.tags) {
                selected_bin.tags = []
            }
            if (selected_bin.tags.map(function (tag) {
                    return tag.name
                }).indexOf(selected_tag.name) > -1) {
                selected_bin.tags.splice(selected_bin.tags.map(function (tag) {
                    return tag.name
                }).indexOf(selected_tag.name), 1)
            } else {
                selected_bin.tags.push(selected_tag)
            }

            return Object.assign({}, state, {
                "selectedPPSBin": {"tags": selected_bin}
            })


        case CANCEL_PROFILE_CHANGES:
            pps_list=state.immutablePPSList
            state.immutablePPSList.forEach(function(pps,index){
                if(pps.pps_id===action.data.pps.pps_id){
                    pps_index=index
                }
            })
            action.data.pps.profiles.forEach(function(profile,index){
                if(profile.selected){
                    profile_index=index
                }
            })
            selected_pps=state.immutablePPSList[pps_index]
            pps_list[pps_index].selected = true                       // Mark the first PPS as selected by default.
            pps_list[pps_index].profiles[profile_index].selected = true
            return Object.assign({}, state, {
                ppsList: pps_list,
                selectedProfile: selected_pps.profiles[profile_index], //If no profile is selected, select the default profile
                selectedPPS: selected_pps || {},
                selectedPPSBin: null
            })


        default:
            return state
    }
}