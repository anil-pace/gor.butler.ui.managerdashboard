import {PPS_DETAIL} from '../constants/appConstants';
import React  from 'react';
import { FormattedMessage } from 'react-intl';


function processPPSData(data) {
  //TODO: codes need to be replaced after checking with backend
  var PPSData=[], detail = {}, ppsId, performance;
  var ppsStatus = ["Off", "On"];
  let PPS, ON, OFF, PERFORMANCE;
  let pick = <FormattedMessage id="ppsDetail.pick.status" description='pick status for pps' defaultMessage='Pick'/>;
  let put = <FormattedMessage id="ppsDetail.put.status" description='put status for pps' defaultMessage='Put'/>;
  let audit = <FormattedMessage id="ppsDetail.audit.status" description='audit status for pps' defaultMessage='Audit'/>;
  var currentTask = {"pick":pick, "put":put, "audit":audit};

  detail.totalOperator = 0;
  for (var i = data.length - 1; i >= 0; i--) {
    detail = {};
    ppsId = data[i].pps_id;
    performance = data[i].performance;
    PPS = <FormattedMessage id="ppsDetail.name.prefix" description='prefix for pps id in ppsDetail' defaultMessage='PPS - {ppsId}' values={{ppsId: ppsId}}/>;
    ON = <FormattedMessage id="ppsDetail.on.status" description='on status for pps' defaultMessage='On'/>;
    OFF = <FormattedMessage id="ppsDetail.off.prefix" description='off status for pps' defaultMessage='Off'/>;
    PERFORMANCE = <FormattedMessage id="ppsDetail.performance.prefix" description='performance for pps id in ppsDetail' defaultMessage='{performance} - orders/hr' values={{performance: performance}}/>;
    detail.id =  PPS;
    if(data[i].pps_status === "on") {
      detail.status = ON;
    }
    else {
      detail.status = OFF;
    }
    detail.statusClass = data[i].pps_status;
    detail.operatingMode = currentTask[data[i].current_task];
    detail.performance = PERFORMANCE;///  orders /items
    if(data[i].operators_assigned === null) {
      detail.operatorAssigned = "--";
    }
    else {
      for (var j = data[i].operators_assigned.length - 1; j >= 0; j--) {
        if(detail.operatorAssigned) {
          detail.operatorAssigned = detail.operatorAssigned + ", " + data[i].operators_assigned[j];
        }
        else {
          detail.operatorAssigned =  data[i].operators_assigned[j];
        }
      }
      detail.totalOperator = detail.totalOperator + data[i].operators_assigned.length;
      
    }
    PPSData.push(detail);
  }
  
  return PPSData;
}

export  function PPSDetail(state={},action) {
  switch (action.type) {
    case PPS_DETAIL:
         res=action.data;
         if(res.complete_data !== undefined){
          var res, PPSDetail;
           PPSDetail = processPPSData(res.complete_data)
           return Object.assign({}, state, {
               "PPStypeDetail" : PPSDetail
          })
         }

    default:
      return state
  }

}