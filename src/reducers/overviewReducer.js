/**
 * Created by gaurav.m on 4/24/17.
 */
import {OVERVIEW_REFRESHED} from '../constants/frontEndConstants';


export  function overviewDetails(state={},action){
    switch (action.type) {
        case OVERVIEW_REFRESHED:

            return Object.assign({}, state, {
                "overviewRefreshed" : new Date()
            })

        default:
            return state
    }
}