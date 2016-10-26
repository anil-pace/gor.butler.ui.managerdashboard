import {CHARGERS_DETAIL,CHARGERS_DATA} from '../constants/appConstants';
import React  from 'react';
import { FormattedMessage } from 'react-intl';

/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */

function processChargersData(data) {
  var chargerData=[],detail = {};
  let CS, csId, botId, BUTLER;
  let connected = <FormattedMessage id="chargersDetail.connected.status" description='connected status for chargersDetail' defaultMessage='Connected'/>;
  let disconnected = <FormattedMessage id="chargersDetail.disconnected.status" description='disconnected status for chargersDetail' defaultMessage='Disconnected'/>;
  let manual = <FormattedMessage id="chargersDetail.manual.mode" description='manual mode for chargersDetail' defaultMessage='Manual'/>;
  let auto = <FormattedMessage id="chargersDetail.auto.mode" description='Auto mode for chargersDetail' defaultMessage='Auto'/>;
  var status = {"connected":connected, "disconnected":disconnected}, mode = {"manual":manual, "auto":auto}
  for (var i = data.length - 1; i >= 0; i--) {
    detail = {}
    csId = data[i].charger_id;
    botId = data[i].docked_butler_id;
    CS = <FormattedMessage id="chargersDetail.name.prefix" description='prefix for cs id in chargersDetail' defaultMessage='Charging Stations - {csId}' values={{csId: csId}}/>;
    BUTLER = <FormattedMessage id="chargersDetail.butler.prefix" description='prefix for butler id in chargersDetail' defaultMessage='Butler - {botId}' values={{botId: botId}}/>;
    detail.id = CS;
    detail.status = status[data[i].charger_status];
    detail.statusClass = data[i].charger_status;
    detail.mode = mode[data[i].charger_mode];
    if(data[i].docked_butler_id !== null && data[i].docked_butler_id.length !== 0 ) {
       detail.dockedBots = BUTLER;
     }

     else {
       detail.dockedBots = "--";
     }
    chargerData.push(detail); 
  }
  return chargerData;
}

export  function chargersDetail(state={},action) {
  switch (action.type) {
    case CHARGERS_DATA:
         var res;
         res=action.data;
         var chargers;
         if(res.complete_data){
          chargers = processChargersData(res.complete_data);
          
           return Object.assign({}, state, {
               "chargersDetail" : chargers
          })
         }

    default:
      return state
  }

}