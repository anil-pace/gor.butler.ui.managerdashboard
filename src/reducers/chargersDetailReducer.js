import {CHARGERS_DETAIL,CHARGERS_DATA} from '../constants/frontEndConstants';
import React  from 'react';
import { FormattedMessage } from 'react-intl';

/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */


export  function chargersDetail(state={},action) {
  switch (action.type) {
    case CHARGERS_DATA:
         var res;
         res=action.data;
         var chargers;
         if(res.complete_data && res.complete_data.length)
          {
              return Object.assign({}, state, {
                 "chargersDetail" : res.complete_data,
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
