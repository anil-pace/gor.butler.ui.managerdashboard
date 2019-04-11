/**
 * Created by gaurav.m on 5/17/17.
 */
import { RECEIVE_CONFIGS } from '../constants/frontEndConstants.js';

export function configReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CONFIGS:
            let config = action.data;
            console.log("action.data------------>", action.data)
            config.utility_tab.widgets.scripts.item_recall = true;
            // config.item_search_enabled = false;

            return Object.assign({}, state, config)
        default:
            return state
    }
}
