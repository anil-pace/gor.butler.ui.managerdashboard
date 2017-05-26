import {
    AJAX_CALL,
    SEARCHED_NOTIFICATIONS_DATA,
    WS_NOTIFICATIONS_DATA,SEND_READ_INTIMATION,
    RESET_NOTIFICATION_DATA
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





