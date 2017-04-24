/**
 * Created by gaurav.m on 4/24/17.
 */
import {BUTLERBOTS_REFRESHED} from './../constants/frontEndConstants'
export function butlerBotsRefreshed(params){
    return {
        type: BUTLERBOTS_REFRESHED,
        params
    }
}