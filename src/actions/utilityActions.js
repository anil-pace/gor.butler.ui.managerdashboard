import { AJAX_CALL,INVOICE_VALIDATION} from '../constants/frontEndConstants'

export function getItemRecall(params){
	return {
    type: AJAX_CALL,
    params
  }
}

export function getGRdata(params){
	return {
    type: AJAX_CALL,
    params
  }
}

export function validateInvoiceID(data){
	return {
    type: INVOICE_VALIDATION,
    data
  }
}