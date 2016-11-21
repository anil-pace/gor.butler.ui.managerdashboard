import {ID_DATA,NAME_DATA,PASSWORD_DATA,INFO_RESET,ID_BACKEND,NOTIFY_PASS,NOTIFY_HIDE,NOTIFY_FAIL,NOTIFY_DELETE} from '../constants/frontEndConstants'


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
export function notifyHide(){	
	return{
		type:NOTIFY_HIDE
	}
}
