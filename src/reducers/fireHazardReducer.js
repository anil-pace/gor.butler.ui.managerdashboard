import {FIRE_EMERGENCY} from '../constants/frontEndConstants';
import React  from 'react';
import {FormattedMessage} from 'react-intl';


export function fireHazardDetail(state={}, action) {

    switch (action.type) {
        case FIRE_EMERGENCY:
          var res;
            res=action.data;
              var data,shutters,escapePath,emergencyStartTime,notifyTime;
               data=res.complete_data[0].emergency_data ||{};
               shutters=data.shutters || {};
               escapePath=data.escape_path|| '';
               emergencyStartTime=res.complete_data[0].emergency_start_time || null;
               notifyTime=(!Object.keys(data).length)? new Date():null;
                return Object.assign({}, state, {
                    "shutters":shutters,
                    "escapePath":escapePath,
                    "emergencyStartTime":emergencyStartTime,
                    "emergency_type": res.complete_data[0].emergency_type,
                    "notifyTime":notifyTime
                })
            break; 
        default:
            return state
    }
}