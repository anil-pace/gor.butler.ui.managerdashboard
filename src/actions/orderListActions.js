import {DISPLAY_ORDER_LIST_SPINNER} from '../constants/appConstants'
import {ORDER_LIST_REFRESHED,WAVES_REFRESHED} from './../constants/frontEndConstants'

export function setOrderListSpinner(data) {
    return {
        type: DISPLAY_ORDER_LIST_SPINNER,
        data
    }
}

export function orderListRefreshed(data) {
    return {
        type: ORDER_LIST_REFRESHED,
        data
    }

}

export function wavesRefreshed(data) {
    return {
        type: WAVES_REFRESHED,
        data
    }

}