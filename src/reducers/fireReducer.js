
import {
    FIRE_EMERGENCY_POPUP_FLAG
} from '../constants/frontEndConstants'

/**
 * [loader reducer function to set isLoading state]
 * @param  {Object} state  [state tree of the current reducer]
 * @param  {[type]} action [action that called the reducer]
 * @return {[object]}        [returns updated state object]
 */
export function fireReducer(state = {}, action) {
    switch (action.type) {

        case FIRE_EMERGENCY_POPUP_FLAG:
            return Object.assign({}, state, {
                "firehazadflag": action.data
            })
        default:
            return state
    }
}
