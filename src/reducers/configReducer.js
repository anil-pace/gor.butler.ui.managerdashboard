/**
 * Created by gaurav.m on 5/17/17.
 */
import {RECEIVE_CONFIGS} from '../constants/frontEndConstants.js';

export  function configReducer(state={},action){
    switch (action.type) {
        case RECEIVE_CONFIGS:
            return Object.assign({}, state, action.data)
        default:
            return state
    }
}