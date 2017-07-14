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
    RECEIVE_TAGS, CANCEL_PROFILE_CHANGES
} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export function ppsConfiguration(state = {}, action) {
    let selected_pps, selected_profile, pps_list, selected_bin, selected_tag
    switch (action.type) {
        case PPS_CONFIGURATION_REFRESHED:
            return Object.assign({}, state, {
                "ppsConfigurationRefreshed": new Date()
            })
        case RECEIVE_PPS_PROFILES:
            pps_list = action.params.pps
            if (pps_list.length < 1 || pps_list[0].profiles.length < 1) {
                /**
                 * if empty list of pps or profile received, return with the original state
                 */
                return state
            }

            /**
             * Create a copy of First PPS and select
             * it by default.
             */
            selected_pps = JSON.parse(JSON.stringify(pps_list[0]))

            /**
             * Select the applied profile
             * by default for the first PPS.
             */
            selected_pps.profiles.map(function (prfl, index) {
                if (prfl.applied) {
                    prfl.selected = true
                    prfl.pps_bins = JSON.parse(JSON.stringify(selected_pps.pps_bins))
                    selected_profile = JSON.parse(JSON.stringify(prfl))
                }
                return prfl
            })

            return Object.assign({}, state, {
                ppsList: pps_list,
                selectedProfile: selected_profile,
                selectedPPS: selected_pps
            })

        case RECEIVE_TAGS:
            return Object.assign({}, state, {
                tags: action.params.tags
            })

        case SELECT_PPS_PROFILE_FOR_CONFIGURATION:
            /**
             * Select a PPS or pps with a profile
             */
            selected_pps = JSON.parse(JSON.stringify(action.data.pps || state.selectedPPS))
            selected_profile = action.data.profile
            if(!selected_profile){
                selected_profile=selected_pps.profiles.filter(function(profile){return profile.applied})[0]
                selected_profile.selected = true
                selected_profile.pps_bins = JSON.parse(JSON.stringify(selected_pps.pps_bins))
            }
            /**
             * Create a copy of selected PPS profile
             * and selects it.
             */
            selected_pps.profiles = selected_pps.profiles.map(function (prfl) {
                if (prfl.name === selected_profile.name) {
                    prfl = JSON.parse(JSON.stringify(selected_profile))
                    prfl.selected = true
                } else {
                    prfl.selected = false

                }
                return prfl
            })
            return Object.assign({}, state, {
                selectedProfile: selected_profile, //If no profile is selected, select the default profile
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
            if (selected_bin.tags.indexOf(selected_tag) > -1) {
                selected_bin.tags.splice(selected_bin.tags.indexOf(selected_tag), 1)
            } else {
                selected_bin.tags.push(selected_tag)
            }

            return Object.assign({}, state, {
                "selectedPPSBin": {"tags": selected_bin}
            })


        case CANCEL_PROFILE_CHANGES:
            /**
             * Pick the profile stored in selectedPPS.profiles
             * and selects that profile, discarding all the changes
             * done in the profile to be cancelled.
             * @type {*}
             */
            selected_pps = state.selectedPPS
            selected_profile = JSON.parse(JSON.stringify(selected_pps.profiles.filter(function (profile) {
                return profile.selected
            })[0]))
            return Object.assign({}, state, {
                selectedProfile: selected_profile, //If no profile is selected, select the default profile
                selectedPPSBin: selected_bin,
            })


        default:
            return state
    }
}