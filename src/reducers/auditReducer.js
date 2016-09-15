import {AUDIT_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function auditInfo(state={},action){
  switch (action.type) {
    case AUDIT_DATA:
          var count_complete=0,res;
          res=action.data;
          if(res.aggregate_data){
            if(res.aggregate_data.total_audited)
              count_complete=parseInt(res.aggregate_data.total_audited);
          }
          return Object.assign({}, state, {
            "auditData" : count_complete
          })

    default:
      return state
  }
}