import {AUDIT_DATA,SET_AUDIT} from '../constants/appConstants'; 
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
    default:
      return state
  }
}