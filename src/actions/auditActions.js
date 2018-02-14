import {
    AJAX_CALL,
    AUDIT_RETRIEVE,
    RECIEVE_AUDIT_DATA,
    SET_AUDIT,
    RESET_AUDIT,
    SETAUDIT_PPS,
    REFRESH_AUDIT,
    DISPLAY_AUDIT_SPINNER,
    SET_AUDIT_ORDERLINES,
    VALIDATED_ATTIBUTES_DATA,
    TEXTBOX_STATUS,
    AUDIT_LIST_REFRESHED,SET_AUDIT_QUERY
} from '../constants/frontEndConstants'

export function getAuditData(params) {
    return {
        type: AJAX_CALL,
        params
    }
}

export function recieveAuditData(data) {
    
    return {
        type: RECIEVE_AUDIT_DATA,
        data
    }
}

export function setAuditType(data) {
    return {
        type: SET_AUDIT,
        data
    }
}
export function resetAuditType(data) {
    return {
        type: RESET_AUDIT,
        data
    }
}
export function getPPSAudit(data) {
    return {
        type: SETAUDIT_PPS,
        data
    }
}
export function setAuditRefresh(data) {
    return {
        type: REFRESH_AUDIT,
        data
    }
}

export function setAuditSpinner(data) {
    return {
        type: DISPLAY_AUDIT_SPINNER,
        data
    }
}

export function getAuditOrderLines(params) {
    return {
        type: AJAX_CALL,
        params
    }
}


export function setPendingAuditLines(data) {
    return {
        type: SET_AUDIT_ORDERLINES,
        data
    }
}

export function resolveAuditLines(params) {
    return {
        type: AJAX_CALL,
        params
    }
}

export function auditValidatedAttributes(data) {
    return {
        type: VALIDATED_ATTIBUTES_DATA,
        data
    }
}
//Set the text box value enable or disable
export function setTextBoxStatus(data) {
    return {
        type: TEXTBOX_STATUS,
        data
    }
}
export function auditListRefreshed(params) {
    return {
        type: AUDIT_LIST_REFRESHED,
        params
    }
}
export function cancelAudit(params) {
    return {
        type: AJAX_CALL,
        params
    }
}

export function setAuditQuery(data){
    return {
        type:SET_AUDIT_QUERY,
        data
    }
}


