import {RECIEVE_AUDIT_DATA,REFRESH_AUDIT} from '../constants/frontEndConstants'; 
import React  from 'react';
import { FormattedMessage } from 'react-intl';


export  function recieveAuditDetail(state={},action){
  switch (action.type) {
    case RECIEVE_AUDIT_DATA:

          var res, auditDetail, totalPage;
          res=action.data.data[0];
          totalPage=res.total_pages;
          if(res.audit_list) {
          return Object.assign({}, state, { 
            "auditDetail" : res.audit_list,
            "totalPage" : totalPage
          })
          }
          break;
    case REFRESH_AUDIT:
          return Object.assign({}, state, { 
            "auditRefresh" : action.data
          })
          break;
    default:
      return state
  }
}