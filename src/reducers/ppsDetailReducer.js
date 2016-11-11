import {PPS_DETAIL} from '../constants/appConstants';
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

    default:
      return state
  }

}