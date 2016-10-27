import {ORDERS_DATA} from '../constants/appConstants';
import React  from 'react';
import { FormattedMessage } from 'react-intl';

/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */

function processWaveData(data) {
  var waveData = [], waveDetail = {};
  let WAVE, waveId;
   let progress = <FormattedMessage id="waveDetail.progress.status" description='progress status for wave' defaultMessage='In Progress'/>;
  let completed = <FormattedMessage id="waveDetail.completed.status" description='completed status for wave' defaultMessage='Completed'/>;
  let breached = <FormattedMessage id="waveDetail.breached.status" description='breached status for wave' defaultMessage='Breached'/>;
  let pending = <FormattedMessage id="waveDetail.pending.status" description='pending status for wave' defaultMessage='Pending'/>;
  var intlStatus = {"In progress":progress, "Completed":completed, "Breached":breached, "Pending":pending };
  var status = {"In progress":"progress", "Completed":"completed", "Breached":"breached", "Pending":"pending" };
  if(data) {
     for (var i =data.length - 1; i >= 0; i--) {
      waveId = data[i].wave_id;
      WAVE = <FormattedMessage id="waveDetail.id.prefix" description='waveDetail id prefix' defaultMessage='WAVE-{waveId}' values={{waveId: waveId}}/>;
      waveDetail = {};
      waveDetail.id = WAVE ;
      waveDetail.statusClass = status[data[i].status];
      waveDetail.status = intlStatus[data[i].status];
      
      if(data[i].start_time === "") {
        waveDetail.startTime = "--";
      }
      else {
        waveDetail.startTime = data[i].start_time;
      }

      if(data[i].cut_off_time === "") {
        waveDetail.cutOffTime = "--";
      }
      else {
        waveDetail.cutOffTime = data[i].cut_off_time;
      }
      waveDetail.cutOffTime = data[i].cut_off_time;
      waveDetail.ordersToFulfill = data[i].orders_to_fulfill;
      waveDetail.totalOrders = data[i].total_orders;
      if(waveDetail.totalOrders) {
        waveDetail.progress = parseInt(((waveDetail.totalOrders-waveDetail.ordersToFulfill)/waveDetail.totalOrders)*100);
      }
      else {
        waveDetail.progress = 0;
      }
      waveData.push(waveDetail);
     }
  }
  return waveData;
}

export  function waveInfo(state={},action){
  switch (action.type) {
    case ORDERS_DATA:
          var res=action.data, waveData;
          if(res.complete_data){
            waveData = processWaveData(res.complete_data)
            return Object.assign({}, state, {
            "waveData" : waveData
            })
          }

    default:
      return state
  }
} 


