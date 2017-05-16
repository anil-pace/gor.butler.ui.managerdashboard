import { AJAX_CALL,INVOICE_VALIDATION,MASTER_UPLOAD_PROCESSING,MASTER_UPLOAD_SUCCESS,
UPLOAD_HISTORY,UPDATE_FILE_SIZE} from '../constants/frontEndConstants'

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

export function uploadMasterData(data){
  return {
    type: AJAX_CALL,
    data
  }
}
export function getUploadHistory(params){
  return {
    type: AJAX_CALL,
    params
  }
}
export function uploadMasterDataProcessing(data){
  return {
    type: MASTER_UPLOAD_PROCESSING,
    data
  }
}
export function uploadMasterDataSuccess(data){
  return {
    type: MASTER_UPLOAD_SUCCESS,
    data
  }
}
export function uploadMasterDataHistory(data){
  return {
    type: UPLOAD_HISTORY,
    data
  }
}
export function updateMaxFileSize(data){
  return {
    type: UPDATE_FILE_SIZE,
    data
  }
}