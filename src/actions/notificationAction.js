import {
    AJAX_CALL,
    SEARCHED_NOTIFICATIONS_DATA,
    WS_NOTIFICATIONS_DATA,SEND_READ_INTIMATION,
    RESET_NOTIFICATION_DATA,
    GET_ALL_NOTIFICATIONS,
    RESET_NOTIFICATION_TABLE_DATA,
    SET_NOTIFICATION_SPINNER,
    SEARCHED_NOTIFICATIONS_DATA_ALL,
    SET_INFINITE_SPINNER,SET_NOTIFICATION,SET_NOTIFICATION_NULL
} from '../constants/frontEndConstants'



export function getNotificationData(params) {
    return {
        type: AJAX_CALL,
        params
    }
}

export function recieveNotificationData(data){
    return {
        type: SEARCHED_NOTIFICATIONS_DATA,
        data
    }
}

export function recieveWSNotification(data){
    return {
        type: WS_NOTIFICATIONS_DATA,
        data
    }
}

export function notificationReadIntimation(data){
    return {
        type: SEND_READ_INTIMATION,
        data
    }
}

export function resetNotificationData(){
    return{
        type: RESET_NOTIFICATION_DATA
    }
}

export function recieveAllNotifications(data,saltParams){
    return {
        type: GET_ALL_NOTIFICATIONS,
        data,
        saltParams
    }
}

export function resetNotificationTableData(data){
     return {
        type: RESET_NOTIFICATION_TABLE_DATA,
        data
    }
}

export function setNotificationSpinner(data){
    return {
        type: SET_NOTIFICATION_SPINNER,
        data
    }
}
export function setInfiniteSpinner(data){
    return {
        type: SET_INFINITE_SPINNER,
        data
    }
}

export function recieveAllSearchedNotifications(data){
    return {
        type: SEARCHED_NOTIFICATIONS_DATA_ALL,
        data
    }
}

export function setNotification(data){
    return {
        type: SET_NOTIFICATION,
        data
    }
}
export function setNotificationNull(data){
    return {
        type: SET_NOTIFICATION_NULL,
        data
    }
}
export function showNotificationFilter(data){
    return {
        type: "SET_NOTIFICATION_STATUS",
        data
    }
}





