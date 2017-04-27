import {ORDERS_DATA} from '../constants/frontEndConstants';
import React  from 'react';
import { FormattedMessage } from 'react-intl';

/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */


export  function waveInfo(state={},action){
  switch (action.type) {
    case ORDERS_DATA:
          var res=action.data, waveData;
          if(res.complete_data && res.complete_data.length)
          {
              return Object.assign({}, state, {
                 "waveData" : res.complete_data,
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


