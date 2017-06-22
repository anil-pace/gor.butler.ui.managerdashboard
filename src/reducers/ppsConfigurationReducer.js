/**
 * Created by gaurav.m on 6/19/17.
 */
import {PPS_CONFIGURATION_REFRESHED} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function ppsConfiguration(state={},action){
    switch (action.type) {
        case PPS_CONFIGURATION_REFRESHED:
            return Object.assign({}, state, {
                "ppsConfigurationRefreshed": new Date()
            })

        default:
            return state
    }
}