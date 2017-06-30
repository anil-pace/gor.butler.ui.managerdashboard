/**
 * Created by gaurav.m on 6/19/17.
 */
import {
    PPS_CONFIGURATION_REFRESHED,
    RECEIVE_PPS_PROFILES,
    SELECT_PPS_PROFILE_FOR_CONFIGURATION, SELECT_PPS_BIN_TO_TAG, ADD_TAG_TO_BIN
} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export function ppsConfiguration(state = {}, action) {
    let selected_pps, selected_profile, current_list, pps_list, selected_bin, selected_tag
    switch (action.type) {
        case PPS_CONFIGURATION_REFRESHED:
            return Object.assign({}, state, {
                "ppsConfigurationRefreshed": new Date()
            })
        case RECEIVE_PPS_PROFILES:
            pps_list = action.params.pps
            pps_list[0].selected = true
            return Object.assign({}, state, {
                ppsList: pps_list,
                selectedProfile: pps_list[0].profiles[0],
                selectedPPS: pps_list[0]
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

        case SELECT_PPS_BIN_TO_TAG:
            selected_bin = action.data
            selected_bin.id = [state.selectedPPS.pps_id, selected_bin.pps_bin_id].join("-")
            return Object.assign({}, state, {
                "selectedPPSBin": state.selectedPPSBin !== selected_bin ? selected_bin : null
            })

        case ADD_TAG_TO_BIN:
            selected_bin = action.data.bin
            selected_tag = action.data.tag
            if (!selected_bin.tags) {
                selected_tag.tags = []
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
                "selectedPPSBin": selected_bin
            })


        default:
            return state
    }
}