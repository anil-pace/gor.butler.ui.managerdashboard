import {FIRE_EMERGENCY} from '../constants/frontEndConstants';
import React  from 'react';
import {FormattedMessage} from 'react-intl';



export function fireHazardDetail(state={}, action) {

    switch (action.type) {
        case FIRE_EMERGENCY:
            var res;
            res=action.data;
            if (!res.complete_data) {
                /**
                 * Error handling
                 */
                return state
            }

            if (res.complete_data) {
                var shutters,shuttersCleared,shuttersinprogress,shuttersfailed,escapePath,emergencyStartTime;
                shutters=res.emergency_data.shutters;
                shuttersCleared=shutters.cleared;
                shuttersinprogress=shutters.in_progress;
                shuttersfailed=shutters.failed;
                escapePath=res.emergency_data.escape_path;
                emergencyStartTime=res.emergency_start_time;
                return Object.assign({}, state, {
                    "shutters":shutters,
                    "shuttersCleared":shuttersCleared,
                    "shuttersinprogress":shuttersinprogress,
                    "shuttersfailed":shuttersfailed,
                    "escapePath":escapePath,
                    "emergencyStartTime":emergencyStartTime
                })
            }

        default:
            return state
    }
}