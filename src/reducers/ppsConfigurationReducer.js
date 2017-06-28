/**
 * Created by gaurav.m on 6/19/17.
 */
import {
    PPS_CONFIGURATION_REFRESHED,
    RECEIVE_PPS_PROFILES,
    SELECT_PPS_PROFILE_FOR_CONFIGURATION
} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export function ppsConfiguration(state = {}, action) {
    let selected_pps, selected_profile, current_profiles
    let mock_profiles=[{
        id: 1,
        name: "PPS-001",
        profiles: [{id: 1, name: "default"}, {id: 2, name: "express", applied: true}, {
            id: 3,
            name: "fast"
        }, {id: 4, name: "idle"}]
    }, {
        id: 2,
        name: "PPS-002",
        profiles: [{id: 5, name: "default"}, {id: 6, name: "express"}, {id: 7, name: "fast"}, {
            id: 8,
            name: "idle",
            applied: true
        }]
    }, {
        id: 3,
        name: "PPS-003",
        profiles: [{id: 9, name: "default", applied: true}, {id: 10, name: "express"}, {
            id: 11,
            name: "fast"
        }, {id: 11, name: "idle"}]
    }, {
        id: 4,
        name: "PPS-004",
        profiles: [{id: 12, name: "default", applied: true}, {id: 13, name: "express"}, {
            id: 14,
            name: "fast"
        }]
    }, {
        id: 5,
        name: "PPS-005",
        profiles: [{id: 15, name: "default", applied: true}, {id: 16, name: "express"}, {
            id: 17,
            name: "fast"
        }]
    }, {
        id: 6,
        name: "PPS-006",
        profiles: [{id: 18, name: "default", applied: true}, {id: 19, name: "express"}, {
            id: 20,
            name: "fast"
        }]
    }, {
        id: 7,
        name: "PPS-007",
        profiles: [{id: 21, name: "default", applied: true}, {id: 22, name: "express"}, {
            id: 23,
            name: "fast"
        }]
    }]
    switch (action.type) {
        case PPS_CONFIGURATION_REFRESHED:
            return Object.assign({}, state, {
                "ppsConfigurationRefreshed": new Date()
            })
        case RECEIVE_PPS_PROFILES:
            mock_profiles[0].selected=true
            return Object.assign({}, state, {
                /**
                 * The data need to be received from the server
                 */
                ppsProfiles: mock_profiles,
                selectedProfile:mock_profiles[0].profiles[0],
                selectedPPS:mock_profiles[0]
            })

        case SELECT_PPS_PROFILE_FOR_CONFIGURATION:
            selected_pps = action.data.pps
            selected_profile = action.data.profile
            current_profiles = state.ppsProfiles.slice()
            current_profiles.forEach(function (entry) {
                if (entry.id === selected_pps.id) {
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
                ppsProfiles: current_profiles,
                selectedProfile:selected_profile||selected_pps.profiles[0], //If no profile is selected, select the default profile
                selectedPPS:selected_pps||{}
            })


        default:
            return state
    }
}