import {RECIEVE_AUDIT_DATA,REFRESH_AUDIT,SET_AUDIT_ORDERLINES} from '../constants/frontEndConstants'; 
import React  from 'react';
import { FormattedMessage } from 'react-intl';


export  function recieveAuditDetail(state={},action){
  switch (action.type) {
    case RECIEVE_AUDIT_DATA:

          var res, auditDetail, totalPage, totalAudit;
          res=action.data.data[0];
          totalPage=Number(res.total_pages);
          totalAudit = Number(res.total_results);
          if(res.audit_list.length) {
          return Object.assign({}, state, { 
            "auditDetail" : res.audit_list,
            "totalPage" : totalPage,
            "totalAudits" : totalAudit, 
            "emptyResponse" :false
          })
          }
           else
          {
           return Object.assign({}, state, {
                 "emptyResponse" :true
          })
         }

          break;
    case REFRESH_AUDIT:
          return Object.assign({}, state, { 
            "auditRefresh" : action.data
          })
          break;

    case SET_AUDIT_ORDERLINES:
           return Object.assign({}, state, { 
            "auditPendingLines" : action.data
          })
          break; 
    default:
      return state
  }
}

