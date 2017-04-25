import {PPS_DETAIL} from '../constants/backEndConstants';
import {PPS_LIST_REFRESHED} from './../constants/frontEndConstants'
import React  from 'react';
import { FormattedMessage } from 'react-intl';




export  function PPSDetail(state={},action) {
  switch (action.type) {
    case PPS_DETAIL:
         res=action.data;
         if(res.complete_data !== undefined){
          var res, PPSDetail;
           //PPSDetail = processPPSData(res.complete_data)
           return Object.assign({}, state, {
               "PPStypeDetail" : res.complete_data
          })
         }

      case PPS_LIST_REFRESHED:
          return Object.assign({}, state, {
              "ppsListRefreshed": new Date()
          })

    default:
      return state
  }

}