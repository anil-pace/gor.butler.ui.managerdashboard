import {PPS_DETAIL} from '../constants/backEndConstants';
import {PPS_LIST_REFRESHED} from './../constants/frontEndConstants'
import { FormattedMessage } from 'react-intl';

export  function PPSDetail(state={},action) {
    switch (action.type) {
        case PPS_DETAIL:
        res=action.data;
        if(res.complete_data !== undefined){
            var res, PPSDetail;
            return Object.assign({}, state, {
                "PPStypeDetail" : res.complete_data.length>0?res.complete_data:state.PPStypeDetail,
                "noResultFound":res.complete_data.length<1,
            })
        }
    return state;
        case PPS_LIST_REFRESHED:
        return Object.assign({}, state, {
            "ppsListRefreshed": new Date()
        })
        default:
        return state;
    }
}