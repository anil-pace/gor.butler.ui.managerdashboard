import {PPS_DETAIL} from '../constants/backEndConstants';
import React  from 'react';
import { FormattedMessage } from 'react-intl';


export  function PPSDetail(state={},action) {
  switch (action.type) {
    case PPS_DETAIL:
         res=action.data;      
          var res, PPSDetail;
          if(res.complete_data && res.complete_data.length)
          {
              return Object.assign({}, state, {
                 "PPStypeDetail" : res.complete_data,
                "emptyResponse" :false //This flag will update base on response data
               })
          }
          else
          {
           return Object.assign({}, state, {
                 "emptyResponse" :true //This flag will update base on response data
          })
         }     

    default:
      return state
  }

}