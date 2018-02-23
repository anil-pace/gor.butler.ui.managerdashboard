import {SKU_DATA,LOC_DATA,ID_DATA,NAME_DATA,PASSWORD_DATA,INFO_RESET,
	ID_BACKEND,NOTIFY_PASS,NOTIFY_HIDE,NOTIFY_FAIL,NOTIFY_DELETE,
	NOTIFY_INFO,LOGIN_ERROR,AJAX_CALL,VALIDATE_SKU_SPINNER,
	VALIDATE_LOCATION_SPINNER,VALIDATE_LOCATION_SPINNER_CSV,
	VALIDATED_SKU_CODE,MODAL_STATUS,SAFETY_MAP,
	SAFETY_ERROR_MAP,SAFETY_ERROR_BOT,SET_MODAL_KEY,CHECKLIST,MODAL_RESET,PASSWORD_BUTTON_RESET} from '../constants/frontEndConstants';


export function validateID(data){
	
	return{
		type:ID_DATA,
		data
	}
}
export function validateName(data){
	
	return{
		type:NAME_DATA,
		data
	}
}
export function validateSKU(data){
	
	return{
		type:SKU_DATA,
		data
	}
}
export function validateLOC(data){
	
	return{
		type:LOC_DATA,
		data
	}
}

export function validatePassword(data){
	return {
		type:PASSWORD_DATA,
		data
	}
}
export function resetForm(){	
	return{
		type:INFO_RESET,
	}
}

export function resetPasswordButton(){
	return{
		type:PASSWORD_BUTTON_RESET,
	}
}
export function notifySuccess(data){	
	return{
		type:NOTIFY_PASS,
		data
	}
}

export function notifyDelete(data){	
	return{
		type:NOTIFY_DELETE,
		data
	}
}
export function notifyFail(data){	
	return{
		type:NOTIFY_FAIL,
		data
	}
}
export function notifyInfo(data){	
	return{
		type:NOTIFY_INFO,
		data
	}
}
export function notifyHide(){	
	return{
		type:NOTIFY_HIDE
	}
}
export function loginError(data){
	return{
		type:LOGIN_ERROR,
		data
	}
}

export function validateSKUcodeSpinner(data) {
	return{
		type:VALIDATE_SKU_SPINNER,
		data
	}
}

export function validateLocationcodeSpinner(data) {
	return{
		type:VALIDATE_LOCATION_SPINNER,
		data
	}
}

export function validateLocationcodeSpinnerCsv(data) {
	return{
		type:VALIDATE_LOCATION_SPINNER_CSV,
		data
	}
}

export function validatedSKUcode(data) {
	return{
		type:VALIDATED_SKU_CODE,
		data
	}
}

export function modalStatus(data){
	return{
		type: MODAL_STATUS,
		data
	}
}

export function getSafetyList(data){
	return{
		type:SAFETY_MAP,
		data
	}
}

export function getSafetyErrorList(data){
	return{
		type:SAFETY_ERROR_MAP,
		data
	}
}

export function getErrorBotList(data){
	return{
		type:SAFETY_ERROR_BOT,
		data
	}
}

export function validatingList(data){
	return{
		type: CHECKLIST,
		data
	}
}

export function modalFormReset(){
	return{
		type: MODAL_RESET
	}
}