import {
	receiveAuthData,
	setLoginSpinner,
	setTimeOffSetData
} from "../actions/loginAction";
import { recieveOrdersData } from "../actions/paginationAction";
import {
	recieveAuditData,
	setAuditRefresh,
	setAuditSpinner,
	setPendingAuditLines,
	auditValidatedAttributes
} from "../actions/auditActions";
import { assignRole, recieveConfigurations } from "../actions/userActions";
import {
	recieveHeaderInfo,
	recieveShiftStartTime
} from "../actions/headerAction";
import { getPPSAudit } from "../actions/auditActions";
import { codeToString } from "./codeToString";
import { setOrderListSpinner } from "../actions/orderListActions";
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
	getSafetyErrorList
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
	SEARCHED_NOTIFICATIONS_DATA_ALL
} from "../constants/frontEndConstants";
import { BUTLER_UI, CODE_E027 } from "../constants/backEndConstants";
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
	g024
} from "../constants/messageConstants";
import { ShowError } from "./showError";
import { endSession } from "./endSession";
import {
	setResolveAuditSpinner,
	setSafetySpinner,
	setInventoryReportSpinner,
	setStockLedgerSpinner,
	setStockLedgerRawTransactionsSpinner
} from "../actions/spinnerAction";
import { statusToString } from "./statusToString";
import { INVALID_SKUID } from "../constants/messageConstants";
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
import { getFormattedMessages } from "../utilities/getFormattedMessages";
import {
	recieveNotificationData,
	notificationReadIntimation,
	recieveAllNotifications,
	recieveAllSearchedNotifications
} from "../actions/notificationAction";

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
				store.dispatch(notifySuccess(stringInfo.msg));
			} else {
				store.dispatch(notifyFail(stringInfo.msg));
			}
			break;
		case CREATE_AUDIT:
			if (res.alert_data) {
				if (res.alert_data[0].code === CODE_E027) {
					var skuInfo = { type: ERROR, msg: INVALID_SKUID };
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
		case GET_PPSLIST:
			let auditpps = [];
			if (res.data.audit) {
				auditpps = res.data.audit;
			}
			store.dispatch(getPPSAudit(auditpps));
			break;
		case START_AUDIT:
			if (res.successful.length) {
				store.dispatch(notifySuccess(AS00A));
				store.dispatch(setAuditRefresh(true)); //set refresh flag
			} else {
				stringInfo = codeToString(res.unsuccessful[0].alert_data[0]);
				store.dispatch(notifyFail(stringInfo.msg));
				store.dispatch(setAuditRefresh(false)); //reset refresh flag
			}
			break;
		case RECIEVE_HEADER:
			if (res.users[0].roles[0] == BUTLER_UI) {
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
			var safetyList = [],
				safetyResponse = res;
			if (safetyResponse.check_list) {
				safetyList = safetyResponse.check_list;
			}
			store.dispatch(getSafetyList(safetyList));
			break;
		case CONFIRM_SAFETY:
			var rejectList = [],
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
			store.dispatch(notifySuccess(getFormattedMessages("grnGenerated",res.data)));
			break;
		case INVENTORY_REPORT_RESPONSE:
			store.dispatch(setInventoryReportSpinner(false));
			store.dispatch(validateInvoiceID(res));
			store.dispatch(notifySuccess(getFormattedMessages("invntryRptGenerated",res.data)));

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
			store.dispatch(notifySuccess(getFormattedMessages("reprtsRefreshed",res.data)));
			break;
		case GRN_HISTORY:
			store.dispatch(uploadGRNHistory(res));
			store.dispatch(notifySuccess(getFormattedMessages("grnRefreshed",res.data)));
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

		default:
			ShowError(store, cause, status);
			break;
	}
}
