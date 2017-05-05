import {ORDERS_DATA,WAVES_REFRESHED} from '../constants/frontEndConstants';
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
          return state
      case WAVES_REFRESHED:
          return Object.assign({}, state, {
              "wavesRefreshed": new Date()
          })

    default:
      return state
  }
} 


