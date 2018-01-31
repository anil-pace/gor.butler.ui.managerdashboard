import { AJAX_CALL,INVOICE_VALIDATION,MASTER_UPLOAD_PROCESSING,MASTER_UPLOAD_SUCCESS,REPORTS_HISTORY, GRN_HISTORY,
UPLOAD_HISTORY,UPDATE_FILE_SIZE,UTILITY_TAB_REFRESHED,STOCK_LEDGER_SKU_VALIDATION,CLEAR_STOCK_LEDGER_SKU_VALIDATION,ORDER_RECALL_VALIDATION,CLEAR_ORDER_RECALL_VALIDATION} from '../constants/frontEndConstants'


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

export function downloadStockLedgerReport(params){
	return {
    type: AJAX_CALL,
    params
  }
}
export function downloadStockLedgerRawTransactionsReport(params){
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

export function validateStockLedgerSKU(data){
	return {
    type: STOCK_LEDGER_SKU_VALIDATION,
    data
  }
}

export function validateRecallOrder(data){
  return {
    type: ORDER_RECALL_VALIDATION,
    data
  }
}


export function clearStockLedgerSKU(data){
	return {
    type: CLEAR_STOCK_LEDGER_SKU_VALIDATION,
    data
  }
}
export function clearOrderRecallValidation(){
  return {
    type: CLEAR_ORDER_RECALL_VALIDATION
    
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

export function uploadReportHistory(data){
  return {
    type: REPORTS_HISTORY,
    data
  }
}
export function uploadGRNHistory(data){
  return {
    type: GRN_HISTORY,
    data
  }
}
export function updateMaxFileSize(data){
  return {
    type: UPDATE_FILE_SIZE,
    data
  }
}

export function utilityTabRefreshed(params) {
    return {
        type: UTILITY_TAB_REFRESHED,
        params
    }
}