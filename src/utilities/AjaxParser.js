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
    auditValidatedAttributesSKU,
    auditValidatedAttributesLocation,
    auditValidatedAttributesLocationCsv,
    createAuditAction,
    setAuditEditData,
    attributeValidationItemRecall
} from "../actions/auditActions";
import {assignRole, recieveConfigurations} from "../actions/userActions";
import {
    recieveHeaderInfo,
    recieveShiftStartTime
} from "../actions/headerAction";
import {getPPSAudit,getAuditDetails,getAuditUserList,setValidationAuditSpinner} from "../actions/auditActions";
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
    validateLocationcodeSpinner,
    validateLocationcodeSpinnerCsv,
	modalStatus,
	getSafetyList,
	getSafetyErrorList,
    getErrorBotList,
    notifyfeedback
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
    VALIDATE_LOCATION_ID,
    CREATE_AUDIT_REQUEST,
    VALIDATE_LOCATION_ID_CSV,
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
    WHITELISTED_ROLES,PAUSE_AUDIT,AUDIT_DUPLICATE,AUDIT_USERLIST,
    AUDIT_EDIT,START_AUDIT_TASK,CHANGE_PPS_TASK,CREATE_DUPLICATE_REQUEST,AUDIT_EDIT_REQUEST,SELLER_RECALL,VALIDATE_SKU_ITEM_RECALL,
    FETCH_MSU_CONFIG_LIST,
    FETCH_MSU_CONFIG_DEST_TYPE_LIST,
    FETCH_MSU_CONFIG_LIST_VIA_FILTER,
    FETCH_MSU_CONFIG_RACK_STRUCTURE
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
    ITEM_RECALL_SUCCESS,
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
    recieveAllSearchedNotifications,
    setNotification
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
import { receiveMsuConfigList, 
        receiveMsuConfigDestTypesList,
        receiveMsuConfigListViaFilter,
        receiveMsuConfigRackStructure 
    }from './../actions/msuConfigAction';


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
                store.dispatch(notifyfeedback(stringInfo.msg));
            } else {
                store.dispatch(setNotification(stringInfo));
            }
            break;
        case CREATE_AUDIT_REQUEST:
                    if (res.audit_id) {
                        values={id:res.audit_id}
                        msg = getFormattedMessages("CREATEAUDIT", values);  
                        store.dispatch(notifyfeedback(msg));
                        store.dispatch(setValidationAuditSpinner(false));
                        store.dispatch(setAuditRefresh(true)); //set refresh flag
                 
                } 
             else {
               stringInfo = codeToString(res.alert_data[0]);
            store.dispatch(setNotification(stringInfo));
            store.dispatch(setValidationAuditSpinner(false));
            store.dispatch(setAuditRefresh(true)); //set refresh flag
            }
            break;
            //feedback notification
       
        case DELETE_AUDIT:
       
        if(res.alert_data[0].code!=="as002")
        {
                values={id:res.alert_data[0].details.audit_id},
                stringInfo = codeToString(res.alert_data[0]);
                store.dispatch(setNotification(stringInfo));
                store.dispatch(setAuditRefresh(true));
            }
            else{
                values={id:res.alert_data[0].details.audit_id};
                msg = getFormattedMessages("DELETEAUDIT", values);
                store.dispatch(notifyfeedback(msg));
                store.dispatch(setAuditRefresh(true)); //reset refresh flag
            }
            break;

        case PAUSE_AUDIT:
        if (res.alert_data[0].code=="as006") {
            values={id:res.alert_data[0].details.audit_id},
            msg = getFormattedMessages("PAUSEAUDIT", values);
            store.dispatch(notifyfeedback(msg));
            store.dispatch(setAuditRefresh(false)); //reset refresh flag
            }
            else{
                values={id:res.alert_data[0].details.audit_id},
                stringInfo = codeToString(res.alert_data[0]);
                store.dispatch(setNotification(stringInfo));
                store.dispatch(setAuditRefresh(true)); //set refresh flag
            }
            break;

          
            
        case CANCEL_AUDIT:
        if (res.alert_data[0].code=="g027") {
            values={id:res.alert_data[0].details.audit_id};
            stringInfo = codeToString(res.alert_data[0]);
            store.dispatch(setNotification(stringInfo));
            store.dispatch(setAuditRefresh(true)); //set refresh flag
        }
        else{
            values={id:res.alert_data[0].details.audit_id},
            msg = getFormattedMessages("CANCELLED", values);
            store.dispatch(notifyfeedback(msg));
            store.dispatch(setAuditRefresh(false)); //reset refresh flag
        }

            case AUDIT_USERLIST:
            //let auditpps = [];
            if (res) {
            store.dispatch(getAuditUserList(res.users));
            }
            break;
            
        case GET_PPSLIST:
            let auditpps = [];
            if (res) {
            store.dispatch(getPPSAudit(res));
            }
            break;
        case CHANGE_PPS_TASK:
        if(res){
        store.dispatch(
            notifyfeedback(res.alert_data[0].description)
        );
    }
            break;
        case GET_AUDIT_DETAILS:
            let auditdetails = {};
            if (res) {
                auditdetails = res;
                store.dispatch(getAuditDetails(auditdetails));
            }
            else{
                stringInfo = codeToString(res.alert_data[0].code);
				store.dispatch(notifyfeedback(stringInfo.msg));
            }//put it in notification
            
            break;
           
        case START_AUDIT_TASK:
        if(res.successful.length>=1 || res.unsuccessful.length>=1 || (res.successful.length===1 && res.unsuccessful.length===1))
        {
           var successCount = res.successful.length,
                unsuccessfulCount = Object.keys(res.unsuccessful).length,
                values = {
                    successful: successCount,
                    totalCount: successCount + unsuccessfulCount,
                    fail:unsuccessfulCount
                   
                };
                if(successCount>=1){
                msg = getFormattedMessages("BulkAudit", values);
                store.dispatch(notifyfeedback(msg));
                store.dispatch(resetaudit(res.successful));
                }
                if(res.unsuccessful.length>=1){
                    stringInfo = getFormattedMessages("STARTFAIL", values);
                    store.dispatch(setNotification(stringInfo));
                }

                store.dispatch(setAuditRefresh(true));
        }
        else if(res.alert_data[0].code== "as007"){//to do
                stringInfo = codeToString(res.alert_data[0]);
				store.dispatch(notifyfeedback(stringInfo.msg)); 
        }
        else if(res.alert_data[0].code== "g028"){
            stringInfo = codeToString(res.alert_data[0]);
            store.dispatch(setNotification(stringInfo));
        }
        else
        {
            stringInfo = getFormattedMessages("STARTFAILALL", values);
            store.dispatch(setNotification(stringInfo));
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
            store.dispatch(auditValidatedAttributesSKU(res));
            break;
        case VALIDATE_SKU_ITEM_RECALL:
            store.dispatch(attributeValidationItemRecall(res));
            break;
        case VALIDATE_LOCATION_ID:
            store.dispatch(auditValidatedAttributesLocation(res));
            store.dispatch(validateLocationcodeSpinner(false));
            break;

        case AUDIT_EDIT:    
        if(res){
            store.dispatch(setAuditEditData(res));
        }else{
                stringInfo = codeToString(res.alert_data[0].code);
				store.dispatch(notifyfeedback(stringInfo.msg));
        }//put it in notification
            break; 

            case AUDIT_EDIT_REQUEST:    
            if (res.audit_id) {
                values={id:res.audit_id},
                msg = getFormattedMessages("EDITED", values);  
                store.dispatch(notifyfeedback(msg));
                store.dispatch(setValidationAuditSpinner(false));
                store.dispatch(setAuditRefresh(true)); //set refresh flag
             } 
          else {
            stringInfo = codeToString(res.alert_data[0]);
            store.dispatch(setNotification(stringInfo));
            store.dispatch(setValidationAuditSpinner(false));
            store.dispatch(setAuditRefresh(true)); //set refresh flag
         }
         break; 

      case CREATE_DUPLICATE_REQUEST:
      if (res.audit_id) {
        values={id:res.audit_id},
        msg = getFormattedMessages("DUPLICATED", values);
        store.dispatch(notifyfeedback(msg));
        store.dispatch(setValidationAuditSpinner(false));
        store.dispatch(setAuditRefresh(false)); //reset refresh flag
      }
      else{
        stringInfo = codeToString(res.alert_data[0]);
        store.dispatch(setNotification(stringInfo));
        store.dispatch(setValidationAuditSpinner(false));
        store.dispatch(setAuditRefresh(true)); //set refresh flag
      }
      break;
               
        case VALIDATE_LOCATION_ID_CSV:
            if (res.ordered_msus && res.ordered_slots && res.status && res.ordered_relations) {
                store.dispatch(auditValidatedAttributesLocationCsv(res));
            }
            store.dispatch(validateLocationcodeSpinnerCsv(false));
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
        case SELLER_RECALL:
            if(status !== 202){
                ShowError(store, cause, status);
            }
            else{
                store.dispatch(notifySuccess(ITEM_RECALL_SUCCESS));
            }
            break;
        case FETCH_MSU_CONFIG_LIST:
            let res_1 = [{"rack_id":"021","source_type":"11","destination_type":"19","status":"progress"},{"rack_id":"022","source_type":"11","destination_type":"19","status":"progress"},{"rack_id":"025","source_type":"11","destination_type":"19","status":"put_blocked"}];
            store.dispatch(receiveMsuConfigList(res_1));
            break;

        case FETCH_MSU_CONFIG_DEST_TYPE_LIST: 
            let res_2 = ["33","15","24","16","12","27","26","14","11","22","19","17","21","MSU-KERRY-D","23","20","MSU-H","100","25","28","18","13"];
            store.dispatch(receiveMsuConfigDestTypesList(res_2));
            break;

        case FETCH_MSU_CONFIG_LIST_VIA_FILTER:
            let res_3 = [{"id":"041","direction":2,"position":"023.033","last_store_position":"023.033","is_stored":true,"reserved_store_position":"undefined","lifted_butler_id":null,"racktype":"11","upcoming_pps_list":[],"type":"msu"}];
            store.dispatch(receiveMsuConfigListViaFilter(res_3));
            break;

        case FETCH_MSU_CONFIG_RACK_STRUCTURE:
            store.dispatch(receiveMsuConfigRackStructure(res));
            break;

        default:
            ShowError(store, cause, status);
            break;
    }
}
