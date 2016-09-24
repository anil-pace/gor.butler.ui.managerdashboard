import {AUDIT_DATA} from '../constants/appConstants'; 
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
            if(res.aggregate_data.total_audited){
              auditData.value=parseInt(res.aggregate_data.total_audited);
            }
          }
          auditData.heading = "Items to Audit";
          auditData.logo = "iAudit";
          return Object.assign({}, state, {
            "auditData" : auditData
          })

    default:
      return state
  }
}