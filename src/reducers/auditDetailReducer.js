import {RECIEVE_AUDIT_DATA} from '../constants/appConstants'; 
import React  from 'react';
import { FormattedMessage } from 'react-intl';


export  function recieveAuditDetail(state={},action){
  switch (action.type) {
    case RECIEVE_AUDIT_DATA:

          var res, auditDetail, totalPage;
          res=action.data;
          totalPage=res.total_pages;
          if(res.audit) {
          return Object.assign({}, state, { 
            "auditDetail" : res.audit,
            "totalPage" : totalPage
          })
          }


    default:
      return state
  }
}