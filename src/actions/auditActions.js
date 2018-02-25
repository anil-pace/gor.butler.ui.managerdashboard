import {
    AJAX_CALL,
    AUDIT_RETRIEVE,
    RECIEVE_AUDIT_DATA,
    SET_AUDIT,
    RESET_AUDIT,
    SETAUDIT_PPS,
    SETAUDIT_DETAILS,
    REFRESH_AUDIT,
    DISPLAY_AUDIT_SPINNER,
    SET_AUDIT_ORDERLINES,
    VALIDATED_ATTIBUTES_DATA,
    TEXTBOX_STATUS,
    SETAUDIT_CHECKED,
    SETAUDIT_PPS_CHECKED,
    SETOTHER_PPS_CHECKED,
    UPDATE_STATUS,
    SETAUDIT_USER,
    AUDIT_LIST_REFRESHED,SET_AUDIT_QUERY
} from '../constants/frontEndConstants'

export function setCheckedAudit(data) {
    return {
        type: SETAUDIT_CHECKED,
        data
    }
}
export function setCheckedAuditpps(data) {
    return {
        type: SETAUDIT_PPS_CHECKED,
        data
    }
}
export function setCheckedOtherpps(data) {
    return {
        type: SETOTHER_PPS_CHECKED,
        data
    }
}

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
export function getAuditUserList(data) {
    return {
        type: SETAUDIT_USER,
        data
    }
}

export function getAuditDetails(data) {
    return {
        type: SETAUDIT_DETAILS,
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

export function setcheckedPPS(data){
    return {
        type:SET_AUDIT_QUERY,
        data
    }
}
//rajadey
// export function updateStatus(params) {
//     return {
//         type: UPDATE_STATUS,
//         params
//     }
// }


