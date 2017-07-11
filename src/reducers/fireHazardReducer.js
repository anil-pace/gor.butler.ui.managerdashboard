import {FIRE_EMERGENCY,NOTIFY_EMERGENCY_END} from '../constants/frontEndConstants';
import React  from 'react';
import {FormattedMessage} from 'react-intl';


export function fireHazardDetail(state={}, action) {

    switch (action.type) {
        case FIRE_EMERGENCY:
          var res;
            res=action.data;
              var data,shutters,escapePath,emergencyStartTime;
               data=res.complete_data[0].emergency_data ||{};
               shutters=data.shutters || {};
               escapePath=data.escape_path|| '';
               emergencyStartTime=res.complete_data[0].emergency_start_time || '';
                return Object.assign({}, state, {
                    "shutters":shutters,
                    "escapePath":escapePath,
                    "emergencyStartTime":emergencyStartTime,
                    "emergency_type": res.complete_data[0].emergency_type,
                    "notifyTime":'' 
                })
            break;

       case NOTIFY_EMERGENCY_END:
         let notifyTime=action.data;
         return Object.assign({}, state, { 
            "notifyTime":notifyTime
         })
          break;  
        default:
            return state
    }
}