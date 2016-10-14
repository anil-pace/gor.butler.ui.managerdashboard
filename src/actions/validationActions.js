import {ID_DATA,NAME_DATA,PASSWORD_DATA,INFO_RESET,ID_BACKEND,NOTIFY_PASS,NOTIFY_HIDE,NOTIFY_FAIL,PASS_DATA} from '../constants/appConstants'
//import {getFetchData} from 'headerAction'
export function backendID(data){

	return{
		type:ID_BACKEND,
		data
	}
}
export function validateID(data){
	
	return{
		type:ID_DATA,
		data
	}
}
export function validatePass(data){
	
	return{
		type:PASS_DATA,
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
export function notifyFail(data){	
	return{
		type:NOTIFY_FAIL,
		data
	}
}
export function notifyHide(){	
	console.log('notifyHide');
	return{
		type:NOTIFY_HIDE
	}
}
