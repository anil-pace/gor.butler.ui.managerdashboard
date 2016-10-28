import {RECIEVE_AUDIT_DATA} from '../constants/appConstants'; 
import React  from 'react';
import { FormattedMessage } from 'react-intl';

function processAuditData(data) {
  var auditStatus = {"audit_created":"Created", "audit_pending":"Pending", "audit_waiting":"Pending", "audit_conflicting":"Pending", "audit_started":"In progress", "audit_tasked":"In progress", "audit_aborted":"Completed", "audit_completed":"Completed"};
  var statusClass = {"Pending": "pending", "Completed":"completed", "In progress":"progress", "Created":"pending"}
  var auditType = {"sku":"SKU", "location":"Location"};
  var auditDetails = [], auditData = {};
  for (var i = data.length - 1; i >= 0; i--) {
    if(data[i].audit_id) {
      auditData.id = data[i].audit_id;
    }

    if(data[i].audit_param_type) {
      auditData.auditType = data[i].audit_param_type;
      if(data[i].audit_param_value) {
        auditData.auditValue = data[i].audit_param_value;
        auditData.auditTypeValue = auditType[data[i].audit_param_type] + "-" + data[i].audit_param_value;
      }
    }

    if(data[i].audit_status) {
      auditData.status = auditStatus[data[i].audit_status]; 
      auditData.statusClass = statusClass[auditData.status];
      if(data[i].audit_status === "audit_created") {
        auditData.startAudit = true;
      }

      else {
        auditData.startAudit = false;
      }
    }

    if(data[i].start_request_time) {
      auditData.startTime = data[i].start_request_time;
    }
    else {
      auditData.startTime = "--";
    }

    if(data[i].expected_quantity !== 0) {
      auditData.progress = (data[i].completed_quantity)/(data[i].expected_quantity);
    }
    else {
      auditData.progress = 50; //needs to be done
    }

    if(data[i].completion_time) {
      auditData.completedTime = data[i].completion_time;
    }
    else {
      auditData.completedTime = "--";
    }
    auditDetails.push(auditData);
    auditData = {};
  }
  return auditDetails;
}

export  function recieveAuditDetail(state={},action){
  switch (action.type) {
    case RECIEVE_AUDIT_DATA:

          var res, auditDetail;
          res=action.data;
          if(res.audit) {
              auditDetail = processAuditData(res.audit)
          return Object.assign({}, state, { 
            "auditDetail" : auditDetail
          })
          }


    default:
      return state
  }
}