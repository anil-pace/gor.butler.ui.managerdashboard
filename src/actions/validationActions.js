import {SKU_DATA,LOC_DATA,ID_DATA,NAME_DATA,PASSWORD_DATA,INFO_RESET,ID_BACKEND,NOTIFY_PASS,NOTIFY_HIDE,NOTIFY_FAIL,NOTIFY_DELETE,NOTIFY_INFO,LOGIN_ERROR,AJAX_CALL,VALIDATE_SKU_SPINNER,VALIDATED_SKU_CODE} from '../constants/frontEndConstants';


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

export function validateSKUcode(params){
	return{
		type:AJAX_CALL,
		params
	}
}

export function validateSKUcodeSpinner(data) {
	return{
		type:VALIDATE_SKU_SPINNER,
		data
	}
}


export function validatedSKUcode(data) {
	return{
		type:VALIDATED_SKU_CODE,
		data
	}
}
