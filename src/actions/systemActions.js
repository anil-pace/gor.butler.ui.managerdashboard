/**
 * Created by gaurav.m on 4/24/17.
 */
import {BUTLERBOTS_REFRESHED,PPS_LIST_REFRESHED,CHARGING_STATION_LIST_REFRESHED} from './../constants/frontEndConstants'
export function butlerBotsRefreshed(params){
    return {
        type: BUTLERBOTS_REFRESHED,
        params
    }
}
export function ppsListRefreshed(params){
    return {
        type: PPS_LIST_REFRESHED,
        params
    }
}
export function chargingStationListRefreshed(params){
    return {
        type: CHARGING_STATION_LIST_REFRESHED,
        params
    }
}