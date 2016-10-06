import {ID_DATA,NAME_DATA,PASSWORD_DATA,INFO_RESET} from '../constants/appConstants'
//import {getFetchData} from 'headerAction'

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