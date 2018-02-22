import {AUDIT_DATA,SET_AUDIT,RESET_AUDIT,SETAUDIT_PPS,VALIDATE_SKU_SPINNER,VALIDATED_ATTIBUTES_DATA,TEXTBOX_STATUS,AUDIT_LIST_REFRESHED,SETAUDIT_CHECKED} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function auditInfo(state={},action){
  switch (action.type) {
    case AUDIT_DATA:

          var res,auditData={};
          res=action.data;
          if(res.aggregate_data){
            if(res.aggregate_data.total_audited)
              auditData.total_audited=Number(res.aggregate_data.total_audited);

          }
          return Object.assign({}, state, { 
            "auditData" : auditData
          })
          break;

    case SET_AUDIT:
          return Object.assign({}, state, { 
            "auditType" : action.data
          })
          break;

    case RESET_AUDIT:
          return Object.assign({}, state, { 
            "auditType" : null
          })
          break;
    case SETAUDIT_PPS:
          return Object.assign({}, state, { 
            "ppsList" : action.data
          })
          break; 
    case SETAUDIT_CHECKED:
          return Object.assign({}, state, { 
            "checkedAuditList" : action.data
          })
          break; 


    case VALIDATE_SKU_SPINNER:
            return Object.assign({}, state, { 
            "skuValidationSpinner" : action.data
          })
          break;  

    case VALIDATED_ATTIBUTES_DATA:
       return Object.assign({}, state, { 
            "skuAttributes" : action.data
          })
          break;  

    case TEXTBOX_STATUS:  
     return Object.assign({}, state, { 
            "textBoxStatus" : action.data
          })
          break;

      case AUDIT_LIST_REFRESHED:
          return Object.assign({}, state, {
              "auditListRefreshed": new Date()
          })
                     
    default:
      return state
  }
}