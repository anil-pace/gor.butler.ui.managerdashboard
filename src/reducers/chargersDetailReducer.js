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
         if(res.complete_data){
           return Object.assign({}, state, {
               "chargersDetail" : res.complete_data
          })
         }

    default:
      return state
  }

}