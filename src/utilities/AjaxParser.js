import {
    receiveAuthData,
    setLoginSpinner,
    setTimeOffSetData
} from "../actions/loginAction";
import {recieveOrdersData} from "../actions/paginationAction";
import {
    recieveAuditData,
    setAuditRefresh,
    setAuditSpinner,
    setPendingAuditLines,
    auditValidatedAttributes
} from "../actions/auditActions";
import {assignRole, recieveConfigurations} from "../actions/userActions";
import {
    recieveHeaderInfo,
    recieveShiftStartTime
} from "../actions/headerAction";
import {getPPSAudit,getAuditDetails,getAuditUserList} from "../actions/auditActions";
import {codeToString} from "./codeToString";
import {setOrderListSpinner} from "../actions/orderListActions";
import {
	notifySuccess,
	notifyFail,
	validateID,
	notifyDelete,
	validatePassword,
	loginError,
	validateSKU,
	validateSKUcodeSpinner,
	modalStatus,
	getSafetyList,
	getSafetyErrorList,
	getErrorBotList
} from "../actions/validationActions";
import {
    ERROR,
    AUTH_LOGIN,
    ADD_USER,
    RECIEVE_TIME_OFFSET,
    CHECK_ID,
    DELETE_USER,
    GET_ROLES,
    ORDERS_RETRIEVE,
    PPS_MODE_CHANGE,
    EDIT_USER,
    RECIEVE_HEADER,
    SUCCESS,
    CREATE_AUDIT,
    AUDIT_RETRIEVE,
    GET_PPSLIST,
    GET_AUDIT_DETAILS,
    START_AUDIT,
    DELETE_AUDIT,
    AUDIT_RESOLVE_LINES,
    AUDIT_RESOLVE_CONFIRMED,
    VALIDATE_SKU_ID,
    PAUSE_OPERATION,
    RESUME_OPERATION,
    CONFIRM_SAFETY,
    CHECK_SAFETY,
    RECEIVE_SHIFT_START_TIME,
    ITEM_RECALLED,
    GR_REPORT_RESPONSE,
    INVENTORY_REPORT_RESPONSE,
    ITEM_RECALLED_DATA,
    MASTER_FILE_UPLOAD,
    GET_MAX_FILE_SIZE,
    GET_CONFIGS,
    CANCEL_AUDIT,
    DOWNLOAD_STOCK_LEDGER_REPORT,
    DOWNLOAD_STOCK_LEDGER_RAW_TRANSACTIONS_REPORT,
    UPLOAD_HISTORY,
    REPORTS_HISTORY,
    GRN_HISTORY,
    PPS_STATUS_CHANGE,
    GET_PENDING_MSU,
    SEARCHED_NOTIFICATIONS_DATA,
    SEND_READ_INTIMATION,
    GET_ALL_NOTIFICATIONS,
    SEARCHED_NOTIFICATIONS_DATA_ALL,
    FETCH_PPS_PROFILES,
    FETCH_TAGS,
    FETCH_PROFILE_FOR_PPS,
    CREATE_NEW_PROFILE,
    SAVE_PPS_PROFILE,
    ADD_TAG_TO_LIST,CHANGE_PPS_PROFILE,
    OPERATION_LOG_FETCH,REPORTS_FETCH,GET_REPORT,
    DOWNLOAD_REPORT_REQUEST,
    STORAGE_SPACE_FETCH,
    WHITELISTED_ROLES,PAUSE_AUDIT,AUDIT_DUPLICATE,AUDIT_USERLIST
} from "../constants/frontEndConstants";
import {BUTLER_UI, CODE_E027} from "../constants/backEndConstants";
import {
    UE002,
    E028,
    E029,
    MODE_REQUESTED,
    TYPE_SUCCESS,
    AS001,
    AS00A,
    WRONG_CRED,
    ES,
    g020,
    g021,
    g023,
    g024,
    REQUEST_REPORT_SUCCESS,
    REQUEST_REPORT_FAILURE,
    INVALID_SKUID
} from "../constants/messageConstants";
import {ShowError} from "./showError";
import {endSession} from "./endSession";
import {
    setResolveAuditSpinner,
    setSafetySpinner,
    setInventoryReportSpinner,
    setStockLedgerSpinner,
    setStockLedgerRawTransactionsSpinner
} from "../actions/spinnerAction";
import {statusToString} from "./statusToString";
import {
    validateInvoiceID,
    uploadMasterDataProcessing,
    uploadMasterDataSuccess,
    uploadMasterDataHistory,
    updateMaxFileSize,
    validateStockLedgerSKU,
    uploadReportHistory,
    uploadGRNHistory
} from "../actions/utilityActions";
import {
    recievePendingMSU,
    resetCheckedPPSList
} from "../actions/ppsModeChangeAction";


import {
    resetaudit
} from "../actions/sortHeaderActions";
import {getFormattedMessages} from "../utilities/getFormattedMessages";
import {
    recieveNotificationData,
    notificationReadIntimation,
    recieveAllNotifications,
    recieveAllSearchedNotifications
} from "../actions/notificationAction";
import {
    receivePPSProfiles,
    receiveTags,
    selectPPSProfileForConfiguration,
    profileCreated,
    savedPPSProfile,
    tagAddedToList,
    setPPSConfigurationSpinner,profileRequested
} from './../actions/ppsConfigurationActions';

import {recieveOLData} from './../actions/operationsLogsActions';
import {recieveReportsData} from './../actions/downloadReportsActions';
import {recieveStorageSpaceData} from './../actions/storageSpaceActions';

export function AjaxParse(store, res, cause, status, saltParams) {
    let stringInfo = {};
    switch (cause) {
        case AUTH_LOGIN:
            if (res.auth_token) {
                store.dispatch(receiveAuthData(res));
            } else {
                store.dispatch(loginError(WRONG_CRED));
            }
            store.dispatch(setLoginSpinner(false));
            break;
        case ORDERS_RETRIEVE:
            store.dispatch(recieveOrdersData(res));
            store.dispatch(setOrderListSpinner(false));
            break;
        case AUDIT_RETRIEVE:
       //  debugger;
       // console.log(res);
         res=[{
        "audit_list": [{
            "actual_quantity": null,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "enable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "enable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "system",
            "audit_id": "b7ix4SUSfE",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["011.1.C.02"]
            },
            "audit_progress": {
                "completed": 0,
                "total": 0
            },
            "audit_status": "audit_created",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": null,
            "create_time": "Tue, 20 Feb 2018 03:11:51 GMT",
            "description": "undefined",
            "display_id": 126,
            "expected_quantity": 0,
            "pps_id": [2, 3],
            "resolved": 0,
            "start_actual_time": null,
            "start_request_time": null,
            "unresolved": 0
        }, {
            "actual_quantity": null,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "enable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "enable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "system",
            "audit_id": "UbcgKeZV3W",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "sku",
            "audit_param_value": {
                "attributes_list": [{
                    "attributes_sets": [],
                    "sku": "2002"
                }, {
                    "attributes_sets": [{
                        "product_color": ["Black"]
                    }],
                    "sku": "2003"
                }, {
                    "attributes_sets": [],
                    "sku": "2001"
                }, {
                    "attributes_sets": [{
                        "product_color": ["Red"],
                        "product_internal_memory": ["32GB"],
                        "product_region": ["China version"]
                    }, {
                        "product_internal_memory": ["32GB"],
                        "product_region": ["India version"]
                    }, {
                        "product_color": ["Red"],
                        "product_region": ["India version"]
                    }],
                    "sku": "2004"
                }],
                "uids_list": ["b556de49-8ccd-44f5-acef-0c896b2c161c", "9a8ebf04-fc62-41bd-9431-ef142ce785cd"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_created",
            "audit_type": "Multi Sku",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": null,
            "create_time": "Tue, 20 Feb 2018 03:40:35 GMT",
            "description": "undefined",
            "display_id": 127,
            "expected_quantity": 0,
            "pps_id": [4],
            "resolved": 0,
            "start_actual_time": null,
            "start_request_time": null,
            "unresolved": 0
        }, {
            "actual_quantity": 0,
            "audit_button_data": {
                "audit_cancel_button": "enable",
                "audit_delete_button": "disable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "disable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "system",
            "audit_id": "AZtqopTnRi",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["011.1.C.02"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_tasked",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": null,
            "create_time": "Wed, 21 Feb 2018 03:02:19 GMT",
            "description": "undefined",
            "display_id": 128,
            "expected_quantity": 0,
            "pps_id": [4],
            "resolved": 0,
            "start_actual_time": "2018-02-21T08:33:11.177466+05:30",
            "start_request_time": "2018-02-21T08:32:41.367061+05:30",
            "unresolved": 0
        }, {
            "actual_quantity": null,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "enable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "enable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "user",
            "audit_id": "b6K3tYdnY7",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["011.1.C.02"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_created",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": null,
            "create_time": "Wed, 21 Feb 2018 03:05:49 GMT",
            "description": "undefined",
            "display_id": 129,
            "expected_quantity": 0,
            "pps_id": [2, 3],
            "resolved": 0,
            "start_actual_time": null,
            "start_request_time": null,
            "unresolved": 0
        }, {
            "actual_quantity": null,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "enable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "enable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "user",
            "audit_id": "pjGymb4Pha",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["011.1.B.02"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_created",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": null,
            "create_time": "Wed, 21 Feb 2018 03:06:20 GMT",
            "description": "undefined",
            "display_id": 130,
            "expected_quantity": 0,
            "pps_id": [2, 3],
            "resolved": 0,
            "start_actual_time": null,
            "start_request_time": null,
            "unresolved": 0
        }, {
            "actual_quantity": null,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "enable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "enable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "user",
            "audit_id": "qmJ8LEwUQ5",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["011.1.B.02"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_created",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": null,
            "create_time": "Wed, 21 Feb 2018 03:08:04 GMT",
            "description": "undefined",
            "display_id": 131,
            "expected_quantity": 0,
            "pps_id": [4],
            "resolved": 0,
            "start_actual_time": null,
            "start_request_time": null,
            "unresolved": 0
        }, {
            "actual_quantity": 0,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "disable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "disable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "user",
            "audit_id": "w8q3V3JGdQ",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["012.1.B.02"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_completed",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": "2018-02-21T08:52:14.344776+05:30",
            "create_time": "Wed, 21 Feb 2018 03:18:04 GMT",
            "description": "undefined",
            "display_id": 132,
            "expected_quantity": 0,
            "pps_id": [4],
            "resolved": 0,
            "start_actual_time": "2018-02-21T09:14:16.939884+05:30",
            "start_request_time": "2018-02-21T09:13:59.587424+05:30",
            "unresolved": 0
        }, {
            "actual_quantity": 0,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "disable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "disable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "user",
            "audit_id": "xaKxjr6gYG",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["013.1.B.02"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_completed",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": "2018-02-21T13:57:35.236608+05:30",
            "create_time": "Wed, 21 Feb 2018 05:51:52 GMT",
            "description": "undefined",
            "display_id": 133,
            "expected_quantity": 0,
            "pps_id": [2, 3],
            "resolved": 0,
            "start_actual_time": "2018-02-21T11:22:57.734071+05:30",
            "start_request_time": "2018-02-21T11:22:21.406952+05:30",
            "unresolved": 0
        }, {
            "actual_quantity": 0,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "disable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "disable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "user",
            "audit_id": "BnUiTucF2p",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["014.1.B.02"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_completed",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": "2018-02-23T06:54:27.064430+05:30",
            "create_time": "Fri, 23 Feb 2018 01:20:37 GMT",
            "description": "undefined",
            "display_id": 134,
            "expected_quantity": 0,
            "pps_id": [2, 3],
            "resolved": 0,
            "start_actual_time": "2018-02-23T06:51:17.022443+05:30",
            "start_request_time": "2018-02-23T06:50:45.906180+05:30",
            "unresolved": 0
        }, {
            "actual_quantity": 0,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "disable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "disable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "user",
            "audit_id": "7KEApWvCTE",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["014.1.B.02"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_completed",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": "2018-02-23T06:58:26.841212+05:30",
            "create_time": "Fri, 23 Feb 2018 01:26:04 GMT",
            "description": "undefined",
            "display_id": 135,
            "expected_quantity": 0,
            "pps_id": [4],
            "resolved": 0,
            "start_actual_time": "2018-02-23T06:56:12.586794+05:30",
            "start_request_time": "2018-02-23T06:56:12.113354+05:30",
            "unresolved": 0
        }, {
            "actual_quantity": 0,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "disable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "disable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "user",
            "audit_id": "WpHptCYTMe",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["014.1.B.02"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_completed",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": "2018-02-23T07:03:10.186902+05:30",
            "create_time": "Fri, 23 Feb 2018 01:31:43 GMT",
            "description": "undefined",
            "display_id": 136,
            "expected_quantity": 0,
            "pps_id": [4],
            "resolved": 0,
            "start_actual_time": "2018-02-23T07:02:12.761684+05:30",
            "start_request_time": "2018-02-23T07:02:12.230187+05:30",
            "unresolved": 0
        }, {
            "actual_quantity": 0,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "disable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "disable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "user",
            "audit_id": "fhxPx37ecy",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["040.1.B.02"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_completed",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": "2018-02-23T07:05:31.813905+05:30",
            "create_time": "Fri, 23 Feb 2018 01:33:24 GMT",
            "description": "undefined",
            "display_id": 137,
            "expected_quantity": 0,
            "pps_id": [2, 3],
            "resolved": 0,
            "start_actual_time": "2018-02-23T07:04:10.629204+05:30",
            "start_request_time": "2018-02-23T07:04:10.227792+05:30",
            "unresolved": 0
        }, {
            "actual_quantity": 0,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "disable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "disable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "user",
            "audit_id": "B83GLdrq8b",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["040.1.B.02", "038.1.A.02"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_completed",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": "2018-02-23T08:00:49.624541+05:30",
            "create_time": "Fri, 23 Feb 2018 02:27:27 GMT",
            "description": "undefined",
            "display_id": 138,
            "expected_quantity": 0,
            "pps_id": [2, 3],
            "resolved": 0,
            "start_actual_time": "2018-02-23T08:00:15.533984+05:30",
            "start_request_time": "2018-02-23T07:57:34.806433+05:30",
            "unresolved": 0
        }, {
            "actual_quantity": 0,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "disable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "disable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "user",
            "audit_id": "Fydr4mMGAT",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["040.1.B.02", "038.1.A.02", "016.1.C.03"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_completed",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": "2018-02-23T08:07:46.643344+05:30",
            "create_time": "Fri, 23 Feb 2018 02:33:16 GMT",
            "description": "undefined",
            "display_id": 139,
            "expected_quantity": 0,
            "pps_id": [2, 3],
            "resolved": 0,
            "start_actual_time": "2018-02-23T08:06:01.469040+05:30",
            "start_request_time": "2018-02-23T08:03:25.603900+05:30",
            "unresolved": 0
        }, {
            "actual_quantity": 0,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "disable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "disable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "user",
            "audit_id": "zTqg77G68W",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["040.1.B.02", "038.1.A.02", "016.1.C.03"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_completed",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": "2018-02-23T08:20:17.432092+05:30",
            "create_time": "Fri, 23 Feb 2018 02:41:07 GMT",
            "description": "undefined",
            "display_id": 140,
            "expected_quantity": 0,
            "pps_id": [2, 3],
            "resolved": 0,
            "start_actual_time": "2018-02-23T08:19:49.554472+05:30",
            "start_request_time": "2018-02-23T08:11:30.912869+05:30",
            "unresolved": 0
        }, {
            "actual_quantity": 0,
            "audit_button_data": {
                "audit_cancel_button": "disable",
                "audit_delete_button": "disable",
                "audit_duplicate_button": "enable",
                "audit_resolve_button": "disable",
                "audit_start_button": "disable",
                "audit_view_issues_button": "disable"
            },
            "audit_created_by": "user",
            "audit_id": "kNfQkQ8aUS",
            "audit_info": [],
            "audit_name": "audit name",
            "audit_param_type": "location",
            "audit_param_value": {
                "locations_list": ["035.1.B.02"]
            },
            "audit_progress": {
                "completed": 22,
                "total": 45
            },
            "audit_status": "audit_completed",
            "audit_type": "Multi Location",
            "cancel_request": "undefined",
            "completed_quantity": 0,
            "completion_time": "2018-02-23T08:20:57.487495+05:30",
            "create_time": "Fri, 23 Feb 2018 02:47:51 GMT",
            "description": "undefined",
            "display_id": 141,
            "expected_quantity": 0,
            "pps_id": [4],
            "resolved": 0,
            "start_actual_time": "2018-02-23T08:18:19.585124+05:30",
            "start_request_time": "2018-02-23T08:17:59.788544+05:30",
            "unresolved": 0
        }],
        "create_time": "2018-1-24",
        "end_time": null,
        "next_page": "null",
        "page": 2,
        "page_results": 16,
        "total_pages": 2,
        "total_results": 36
    }];
            store.dispatch(recieveAuditData(res));
            store.dispatch(setAuditSpinner(false));
            break;
        case GET_ROLES:
            let rolesArr = [];
            if (res.roles) {
                rolesArr = res.roles;
            }
            store.dispatch(assignRole(rolesArr));
            break;
        case CHECK_ID:
            let idExist;
            if (res.users.length) {
                idExist = {
                    type: ERROR,
                    msg: UE002
                };
            } else {
                idExist = {
                    type: SUCCESS,
                    msg: TYPE_SUCCESS
                };
            }
            store.dispatch(validateID(idExist));
            break;
        case PPS_MODE_CHANGE:
            var successCount = res.successful.length,
                unsuccessfulCount = Object.keys(res.unsuccessful).length,
                values = {
                    unsuccessful: unsuccessfulCount,
                    totalCount: successCount + unsuccessfulCount
                },
                msg = getFormattedMessages("mode", values);
            store.dispatch(notifySuccess(msg));
            store.dispatch(resetCheckedPPSList(res.successful));
            break;
        case ADD_USER:
        case DELETE_USER:
        case EDIT_USER:
            stringInfo = codeToString(res.alert_data[0]);
            if (stringInfo.type) {
                store.dispatch(notifySuccess(stringInfo.msg));
            } else {
                store.dispatch(notifyFail(stringInfo.msg));
            }
            break;
        case CREATE_AUDIT:
            if (res.alert_data) {
                if (res.alert_data[0].code === CODE_E027) {
                    var skuInfo = {type: ERROR, msg: INVALID_SKUID};
                    store.dispatch(validateSKU(skuInfo));
                } else {
                    stringInfo = codeToString(res.alert_data[0]);
                    store.dispatch(notifyFail(stringInfo.msg));
                    store.dispatch(setAuditRefresh(false)); //reset refresh flag
                }
            } else {
                store.dispatch(notifySuccess(AS001));
                store.dispatch(setAuditRefresh(true)); //set refresh flag
            }
            break;
        case DELETE_AUDIT:
            stringInfo = codeToString(res.alert_data[0]);
            if (stringInfo.type) {
                store.dispatch(notifyDelete(stringInfo.msg));
                store.dispatch(setAuditRefresh(true)); //set refresh flag
            } else {
                store.dispatch(notifyFail(stringInfo.msg));
                store.dispatch(setAuditRefresh(false)); //reset refresh flag
            }
            break;
        case PAUSE_AUDIT:
            stringInfo = codeToString(res.alert_data[0]);
            if (stringInfo.type) {
                store.dispatch(notifyDelete(stringInfo.msg));
                store.dispatch(setAuditRefresh(true)); //set refresh flag
            } else {
                store.dispatch(notifyFail(stringInfo.msg));
                store.dispatch(setAuditRefresh(false)); //reset refresh flag
            }
            break;
            case AUDIT_DUPLICATE:
            stringInfo = codeToString(res.alert_data[0]);
            if (stringInfo.type) {
                store.dispatch(notifyDelete(stringInfo.msg));
                store.dispatch(setAuditRefresh(true)); //set refresh flag
            } else {
                store.dispatch(notifyFail(stringInfo.msg));
                store.dispatch(setAuditRefresh(false)); //reset refresh flag
            }
            break;
            
        case CANCEL_AUDIT:
            if (res.alert_data && res.alert_data.length > 0) {
                //ERROR
                switch (res.alert_data[0].code) {
                    case "g020":
                        store.dispatch(notifySuccess(g020));
                        break;

                    case "g021":
                        store.dispatch(notifySuccess(g021));
                        break;

                    case "g023":
                        store.dispatch(notifySuccess(g023));
                        break;

                    case "g024":
                        store.dispatch(notifySuccess(g024));
                        break;

                    default:
                        store.dispatch(
                            notifySuccess(res.alert_data[0].description)
                        );
                        break;
                }
            } else {
                //SUCCESS
                store.dispatch(notifySuccess(res.data));
            }
            store.dispatch(setAuditSpinner(false));
            store.dispatch(setAuditRefresh(true));
            break;

            case AUDIT_USERLIST:
            //let auditpps = [];
            if (res) {
               res=['raja','rohit','dsfdsg','ewrewr','hjhjhhj'] ;
            store.dispatch(getAuditUserList(res));
            }
            break;
            
        case GET_PPSLIST:
            let auditpps = [];
            if (res) {
                //auditpps = res.data.audit;
auditpps={
    "pps_list": [{
        "operator_assigned": "Raja Dey",
        "pps_id": "PPS 001",
        "pps_mode": "put"
    }, {
        "auditlines_pending": 321,
        "audits_pending": 4,
        "operator_assigned": "Gaurav M",
        "pps_id": "PPS 002",
        "pps_mode": "audit"
    }, {
        "auditlines_pending": 222,
        "audits_pending": 3,
        "operator_assigned": "not yet",
        "pps_id": "PPS 003",
        "pps_mode": "audit"
    }, {
        "operator_assigned": "not yet",
        "pps_id": "PPS 004",
        "pps_mode": "put"
    }, {
        "operator_assigned": "not yet",
        "pps_id": "PPS 005",
        "pps_mode": "put"
    }]
}
            }
            store.dispatch(getPPSAudit(auditpps));
            break;

                    case GET_AUDIT_DETAILS:
            let auditdetails = {};
            if (res.data) {
                //auditpps = res.data.audit;
// auditdetails={
//     "actual_quantity": 5,
//     "audit_created_by": "user",
//     "operator_name": "Raja Dey",
//     "audit_id": "PtAYcvUkjQ",
//     "audit_progress": {
//         "completed": 20,
//         "total": 89
//     },
//     "audit_param_type": "sku",
//     "audit_param_value": {
//         "attributes_list": [{
//             "attributes_sets": ["Black", "64GB", "32GB"],
//             "sku": "2002",
//             "name": "IPhone 8",
//             "audit_result": {
//                 "total": 16,
//                 "missing": 4
//             }
//         }, {
//             "attributes_sets": [],
//             "sku": "2003",
//             "name": "IPhone X",
//             "audit_result": {
//                 "total": 16,
//                 "missing": 4
//             }
//         }],
//         "uids_list": ["9a8ebf04-fc62-41bd-9431-ef142ce785cd", "9a45c477-b02e-44de-aaac-4bcffe941eef"]
//     },
//     "audit_status": "audit_created",
//     "kq": "true",
//     "reminder": "rocking audit",

//     "cancel_request": "undefined",
//     "completed_quantity": 0,
//     "completion_time": "2018-02-20 07:01:40.123477+05:30",
//     "create_time": "2018-02-20 07:01:40.123477+05:30",
//     "description": "undefined",
//     "display_id": 108,
//     "expected_quantity": 0,
//     "pps_id": [3, 4],
//     "resolved": 0,
//     "start_actual_time": "2018-02-20 07:01:40.123477+05:30",
//     "start_request_time": "2018-02-20 07:01:40.123477+05:30",
//     "unresolved": 0
// }
            }
            store.dispatch(getAuditDetails(res));
            break;



        case START_AUDIT:
        if(res.successful.length>1 || res.unsuccessful.length>1 || (res.successful.length===1 && res.unsuccessful.length===1))
        {
           var successCount = res.successful.length,
                unsuccessfulCount = Object.keys(res.unsuccessful).length,
                values = {
                    successful: successCount,
                    totalCount: successCount + unsuccessfulCount
                },
                msg = getFormattedMessages("BulkAudit", values);
                store.dispatch(notifySuccess(msg));
                store.dispatch(resetaudit(res.successful));
                store.dispatch(setAuditRefresh(true));
        }
        else
        {
            if (res.successful.length) {
                store.dispatch(notifySuccess(AS00A));
                store.dispatch(setAuditRefresh(true)); //set refresh flag
                store.dispatch(resetaudit(res.successful));
            } else {
                stringInfo = codeToString(res.unsuccessful[0].alert_data[0]);
                store.dispatch(notifyFail(stringInfo.msg));
                store.dispatch(setAuditRefresh(false)); //reset refresh flag
            } 
        }
            break;
        
        case RECIEVE_HEADER:
            if (!WHITELISTED_ROLES.hasOwnProperty(res.users[0].roles[0])){
                endSession(store);
            }
            store.dispatch(recieveHeaderInfo(res));
            break;
        case RECEIVE_SHIFT_START_TIME:
            store.dispatch(recieveShiftStartTime(res));
            break;
        case RECIEVE_TIME_OFFSET:
            store.dispatch(setTimeOffSetData(res));
            break;

        case AUDIT_RESOLVE_LINES:
            store.dispatch(setResolveAuditSpinner(false));
            store.dispatch(setPendingAuditLines(res));
            break;

        case AUDIT_RESOLVE_CONFIRMED:
            if (res.successful.status) {
                stringInfo = statusToString(res.successful);
                store.dispatch(notifySuccess(stringInfo.msg));
            } else {
                ShowError(store, cause, status);
            }
            break;

        case VALIDATE_SKU_ID:
            if (res.sku && res.audit_attributes_values) {
                store.dispatch(auditValidatedAttributes(res));
            }
            store.dispatch(validateSKUcodeSpinner(false));
            break;

		case PAUSE_OPERATION:
			var pausePwd;
			if (!res.auth_token) {
				pausePwd = {
					type: ERROR,
					msg: UE002
				};
			} else {
				pausePwd = {
					type: SUCCESS,
					msg: TYPE_SUCCESS
				};
				//hit next api
				store.dispatch(modalStatus(true));
			}
			store.dispatch(validatePassword(pausePwd));
			break;
		case RESUME_OPERATION:
			var resumePwd;
			if (!res.auth_token) {
				resumePwd = {
					type: ERROR,
					msg: UE002
				};
			} else {
				resumePwd = {
					type: SUCCESS,
					msg: TYPE_SUCCESS
				};
				//hit next api
				store.dispatch(modalStatus(true));
			}
			store.dispatch(validatePassword(resumePwd));
			break;
		case CHECK_SAFETY:
			store.dispatch(getSafetyList(res || {}));
			break;
		case CONFIRM_SAFETY:
			var rejectList = [],botErrorList=[],
				rejectResponse = res,
				modalFlag = true;

			 if(rejectResponse.successful){
				if(!rejectResponse.emergency_end_time)
				{
				store.dispatch(notifySuccess(ES));
				  }
			}
			else if (rejectResponse.alert_data) {

				if(rejectResponse.alert_data[0].details[0])
				{
				rejectList = rejectResponse.alert_data[0].details[0].failed_validations;
				botErrorList=rejectResponse.alert_data[0].details[0].displaced_bots||[];
				modalFlag = false;
				}
				else
				{
				stringInfo = codeToString(res.alert_data[0]);
				store.dispatch(notifyFail(stringInfo.msg));
				}
			}
			store.dispatch(modalStatus(modalFlag));
			store.dispatch(setSafetySpinner(false));
			store.dispatch(getErrorBotList(botErrorList));
			store.dispatch(getSafetyErrorList(rejectList));
			break;

        case ITEM_RECALLED:
            res.status = ITEM_RECALLED_DATA;
            stringInfo = statusToString(res);
            store.dispatch(notifySuccess(stringInfo.msg));
            break;

        case GR_REPORT_RESPONSE:
            store.dispatch(setInventoryReportSpinner(false));
            store.dispatch(validateInvoiceID(res));
            store.dispatch(notifySuccess(getFormattedMessages("grnGenerated", res.data)));
            break;
        case INVENTORY_REPORT_RESPONSE:
            store.dispatch(setInventoryReportSpinner(false));
            store.dispatch(validateInvoiceID(res));
            store.dispatch(notifySuccess(getFormattedMessages("invntryRptGenerated", res.data)));

            break;
        case DOWNLOAD_STOCK_LEDGER_REPORT:
            store.dispatch(setStockLedgerSpinner(false));
            store.dispatch(validateStockLedgerSKU(res));
            break;
        case DOWNLOAD_STOCK_LEDGER_RAW_TRANSACTIONS_REPORT:
            store.dispatch(setStockLedgerRawTransactionsSpinner(false));
            break;
        case MASTER_FILE_UPLOAD:
            store.dispatch(uploadMasterDataProcessing(false));
            store.dispatch(uploadMasterDataSuccess(res));
            break;
        case UPLOAD_HISTORY:
            store.dispatch(uploadMasterDataHistory(res));
            break;
        case REPORTS_HISTORY:
            store.dispatch(uploadReportHistory(res));
            store.dispatch(notifySuccess(getFormattedMessages("reprtsRefreshed", res.data)));
            break;
        case GRN_HISTORY:
            store.dispatch(uploadGRNHistory(res));
            store.dispatch(notifySuccess(getFormattedMessages("grnRefreshed", res.data)));
            break;
        case GET_MAX_FILE_SIZE:
            store.dispatch(updateMaxFileSize(res));
            break;

        case GET_CONFIGS:
            store.dispatch(recieveConfigurations(res));
            break;
        case PPS_STATUS_CHANGE:
            var successCount = res.successful.length,
                unsuccessfulCount = Object.keys(res.unsuccessful).length,
                values = {
                    unsuccessful: unsuccessfulCount,
                    totalCount: successCount + unsuccessfulCount
                },
                msg = getFormattedMessages("status", values);
            store.dispatch(notifySuccess(msg));
            store.dispatch(resetCheckedPPSList(res.successful));
            break;
        case GET_PENDING_MSU:
            store.dispatch(recievePendingMSU(res));
            break;
        case SEARCHED_NOTIFICATIONS_DATA:
            store.dispatch(recieveNotificationData(res));
            break;
        case SEND_READ_INTIMATION:
            store.dispatch(notificationReadIntimation(true));
            break;
        case GET_ALL_NOTIFICATIONS:
            store.dispatch(recieveAllNotifications(res, saltParams));
            break;
        case SEARCHED_NOTIFICATIONS_DATA_ALL:
            store.dispatch(recieveAllSearchedNotifications(res));
            break;
        case FETCH_PPS_PROFILES:
            store.dispatch(setPPSConfigurationSpinner(false))
            store.dispatch(receivePPSProfiles(res))
            break;

        case FETCH_PROFILE_FOR_PPS:
            store.dispatch(setPPSConfigurationSpinner(false))
            store.dispatch(selectPPSProfileForConfiguration(res))
            break;
        case FETCH_TAGS:
            store.dispatch(setPPSConfigurationSpinner(false))
            store.dispatch(receiveTags(res))
            break;
        case CREATE_NEW_PROFILE:
            store.dispatch(setPPSConfigurationSpinner(false))
            store.dispatch(profileCreated(res))
            break;

        case SAVE_PPS_PROFILE:
            store.dispatch(setPPSConfigurationSpinner(false))
            store.dispatch(profileRequested(res))
            store.dispatch(savedPPSProfile(res))
            break;

        case ADD_TAG_TO_LIST:
            store.dispatch(setPPSConfigurationSpinner(false))
            store.dispatch(tagAddedToList(res))
            break;

        case CHANGE_PPS_PROFILE:
            /**
             * Do nothing as the websocket
             * will update the UI
             * We just need to hide the modal
             */
            store.dispatch(profileRequested(res))
            break;
        case OPERATION_LOG_FETCH:
            store.dispatch(recieveOLData(res.hits))
            break;
        case REPORTS_FETCH:
            store.dispatch(recieveReportsData(res))
            break;
        case GET_REPORT:
            store.dispatch(recieveReportsData(res))
            break;
        case DOWNLOAD_REPORT_REQUEST:
            store.dispatch(notifySuccess(REQUEST_REPORT_SUCCESS));
            break;
        case STORAGE_SPACE_FETCH:
            store.dispatch(recieveStorageSpaceData(res));
            break;
        default:
            ShowError(store, cause, status);
            break;
    }
}
