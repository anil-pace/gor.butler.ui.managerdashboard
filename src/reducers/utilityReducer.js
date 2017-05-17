import {INVOICE_VALIDATION,MASTER_UPLOAD_PROCESSING,MASTER_UPLOAD_SUCCESS,UPLOAD_HISTORY,UTILITY_TAB_REFRESHED} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
//Name to be corrected
export  function utilityValidations(state={},action){
  switch (action.type) {
    case INVOICE_VALIDATION:
          var res = action.data;
          if(res.alert_data){
            return Object.assign({}, state, {
              "invalidInvoice" : true
            })
          }

          else {
            return Object.assign({}, state, {
              "invalidInvoice" : false
            })
          }
    case MASTER_UPLOAD_PROCESSING:
          return Object.assign({}, state, {
              "isMasterUploadProcessing" : action.data
            })
    case MASTER_UPLOAD_SUCCESS:
          var newFileUploaded = !state.newFileUploaded;
          return Object.assign({}, state, {
              "masterDataUploadSuccess" : action.data.data ? true : false,
              "newFileUploaded":newFileUploaded
            })
    case UPLOAD_HISTORY:
          var dataRefreshed = !state.dataRefreshed;
          return Object.assign({}, state, {
              "uploadHistoryData" : action.data.mdm_upload_info || [],
              "dataRefreshed":dataRefreshed
            })

      case UTILITY_TAB_REFRESHED:
          return Object.assign({}, state, {
              "utilityTabRefreshed": new Date()
          })
    default:
      return state;
  }
}