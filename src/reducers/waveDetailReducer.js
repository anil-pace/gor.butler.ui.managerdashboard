import {ORDERS_DATA} from '../constants/appConstants';
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
          if(res.complete_data){

            return Object.assign({}, state, {
            "waveData" : res.complete_data
            })
          }

    default:
      return state
  }
} 


