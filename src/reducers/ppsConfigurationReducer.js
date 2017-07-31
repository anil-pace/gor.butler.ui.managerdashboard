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
    RECEIVE_TAGS, CANCEL_PROFILE_CHANGES,CHANGE_PPS_BIN_GROUP_STATUS,SELECT_PPS_BIN_GROUP,PPS_PROFILE_CREATED,PPS_PROFILE_SAVED,TAG_ADDED_TO_LIST,DISPLAY_PPS_CONFIGURATION_SPINNER,PPS_PROFILE_REQUESTED
} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export function ppsConfiguration(state = {}, action) {
    let selected_pps, selected_profile, pps_list, selected_bin, selected_tag,selected_group
    switch (action.type) {
        case PPS_CONFIGURATION_REFRESHED:
            return Object.assign({}, state, {
                "ppsConfigurationRefreshed": new Date()
            })
        case RECEIVE_PPS_PROFILES:
            pps_list = action.params.pps
            if (pps_list.length < 1 || pps_list[0].pps_profiles.length < 1) {
                /**
                 * if empty list of pps or profile received, return with the original state
                 */
                return state
            }

            /**
             * Create a copy of First PPS and select
             * it by default.
             * v-2: Checks for selected PPS and if found
             * selects it, otherwise first PPS would be selected
             */
            if(state.selectedPPS && state.selectedPPS.pps_id){
                selected_pps=JSON.parse(JSON.stringify(pps_list.filter(function(pps){return pps.pps_id===state.selectedPPS.pps_id})[0]))
            }else{
                selected_pps = JSON.parse(JSON.stringify(pps_list[0]))
            }


            /**
             * v-2: If any selected PPS Profile is found.
             * Selects that, otherwise applied profile
             * will be selected for selected PPS.
             *
             * v-1: Select the applied profile
             * by default for the first PPS.
             */
            if(state.selectedProfile && state.selectedProfile.profile_name){
                selected_pps.pps_profiles.forEach(function (prfl, index) {
                    if(prfl.profile_name===state.selectedProfile.profile_name){
                        selected_profile=JSON.parse(JSON.stringify(prfl))
                    }
                })
            }else{
                selected_pps.pps_profiles.forEach(function (prfl, index) {
                    if(prfl.applied) {
                        selected_profile = JSON.parse(JSON.stringify(prfl))
                    }
                })
            }

            return Object.assign({}, state, {
                ppsList: pps_list,
                selectedProfile: selected_profile,
                selectedPPS: selected_pps
            })

        case RECEIVE_TAGS:
            return Object.assign({}, state, {
                tags: action.params.pps_bin_tags
            })

        case TAG_ADDED_TO_LIST:
            return Object.assign({}, state, {
                tags: state.tags.concat(action.data.pps_bin_tags)
            })

        case SELECT_PPS_PROFILE_FOR_CONFIGURATION:
            /**
             * Select a PPS or pps with a profile
             */
            selected_pps = JSON.parse(JSON.stringify(action.data.pps || state.selectedPPS))
            pps_list=state.ppsList
            if(action.data.pps_profiles){
                /**
                 * Create a copy of selected PPS profile
                 * and selects it.
                 */
                selected_profile = action.data.pps_profiles ? action.data.pps_profiles.filter(function(profile){ return profile.pps_bin_details})[0]:null
                selected_pps.pps_profiles = JSON.parse(JSON.stringify(action.data.pps_profiles))
                pps_list=state.ppsList.map(function(pps){
                    if(pps.pps_id===selected_pps.pps_id){
                        pps.pps_profiles=JSON.parse(JSON.stringify(action.data.pps_profiles))
                    }
                    return pps
                })
            }else{
                selected_profile=selected_pps.pps_profiles.filter(function(profile){return profile.pps_bin_details})[0]
            }

            return Object.assign({}, state, {
                selectedProfile: selected_profile, //If no profile is selected, select the default profile
                selectedPPS: selected_pps || {},
                selectedPPSBin: null,
                selectedPPSBinGroup: null,
                ppsList:pps_list
            })

        case SELECT_PPS_BIN:
            selected_bin = action.data.bin
            selected_bin.id = [state.selectedPPS.pps_id, selected_bin.pps_bin_id].join("-")
            return Object.assign({}, state, {
                "selectedPPSBin": {[action.data.currentView]: selected_bin}
            })


        case SELECT_PPS_BIN_GROUP:
            return Object.assign({}, state, {
                "selectedPPSBinGroup":action.data.group
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

        case CHANGE_PPS_BIN_GROUP_STATUS:
            selected_group = JSON.parse(JSON.stringify(state.selectedPPSBinGroup))
            selected_group.enabled = action.data.enabled
            selected_profile = JSON.parse(JSON.stringify(state.selectedProfile))
            selected_profile.bin_group_details=selected_profile.bin_group_details.map(function (group) {
                if (group.bin_group_id === selected_group.bin_group_id) {
                    group = selected_group
                }
                return group
            })
            return Object.assign({}, state, {
                "selectedPPSBinGroup": selected_group,
                "selectedProfile": selected_profile
            })

        case ADD_TAG_TO_BIN:
            selected_bin = action.data.bin
            selected_tag = action.data.tag
            if (!selected_bin.bin_tags) {
                selected_bin.bin_tags = []
            }
            if (selected_bin.bin_tags.indexOf(selected_tag) > -1) {
                selected_bin.bin_tags.splice(selected_bin.bin_tags.indexOf(selected_tag), 1)
            } else {
                /**
                 * Only one tag is supported as of now.
                 * @type {[*]}
                 */
                //  selected_bin.tags.push(selected_tag)
                    selected_bin.bin_tags=[selected_tag]
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
            selected_profile = JSON.parse(JSON.stringify(selected_pps.pps_profiles.filter(function (profile) {
                return profile.profile_name===state.selectedProfile.profile_name
            })[0]))
            return Object.assign({}, state, {
                selectedProfile: selected_profile, //If no profile is selected, select the default profile
                selectedPPSBin: selected_bin,
            })


        case PPS_PROFILE_CREATED:
            /**
             * The response need to be pushed into
             * the array of profiles that is stored
             * in PPS List and selected PPS.
             */
            /**
             * v-2: As soon as profile is created,
             * the pps list will be refreshed and we'll
             * have to retain the selected pps as well as
             * selected created profile.
             */
            selected_pps= JSON.parse(JSON.stringify(state.selectedPPS))
            pps_list=JSON.parse(JSON.stringify(state.ppsList))
            selected_profile=action.data
            pps_list=pps_list.map(function(pps){
                if(pps.pps_id===selected_pps.pps_id){
                    pps.pps_profiles.push(selected_profile)
                }
                return pps
            })
            selected_pps.pps_profiles.push(selected_profile)
            return Object.assign({}, state, {
                selectedProfile: selected_profile, //If no profile is selected, select the default profile
                selectedPPS: selected_pps,
                ppsList:pps_list,
                profileCreatedAt:new Date().getTime()
            })

        case PPS_PROFILE_SAVED:
            /**
             * The response need to replace
             * the existing profile
             * that is stored in PPS profile list
             * and PPS List model.
             */
            /**
             * v-2:As soon as the profile
             * is saved, we'll have to refresh
             * the pps list.
             */
            selected_pps= JSON.parse(JSON.stringify(state.selectedPPS))
            pps_list=JSON.parse(JSON.stringify(state.ppsList))
            selected_profile=action.data
            pps_list=pps_list.map(function(pps){
                if(pps.pps_id===selected_pps.pps_id){
                    pps.pps_profiles=pps.pps_profiles.map(function(profile){
                        if(profile.profile_name===selected_profile.profile_name){
                            profile=selected_profile
                        }
                        return profile
                    })
                }
                return pps
            })
            selected_pps.pps_profiles=selected_pps.pps_profiles.map(function(profile){
                if(profile.profile_name===selected_profile.profile_name){
                    profile=selected_profile
                }
                return profile
            })
            return Object.assign({}, state, {
                selectedProfile: selected_profile, //If no profile is selected, select the default profile
                selectedPPS: selected_pps,
                ppsList:pps_list,
                profileCreatedAt:new Date().getTime()
            })

        case DISPLAY_PPS_CONFIGURATION_SPINNER:
            return Object.assign({}, state, {
                ppsConfigurationSpinner: action.data

            })

        case PPS_PROFILE_REQUESTED:
            return Object.assign({},state,{
                profileRequestedAt:new Date().getTime()
            })

        default:
            return state
    }
}