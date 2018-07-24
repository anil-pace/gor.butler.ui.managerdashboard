import {RECIEVE_AUDIT_DATA,REFRESH_AUDIT,SET_AUDIT_ORDERLINES,SET_AUDIT_QUERY} from '../constants/frontEndConstants';
import { FormattedMessage } from 'react-intl';


export  function recieveAuditDetail(state={},action){
    
    switch (action.type) {
        
        case RECIEVE_AUDIT_DATA:
            
            var res, auditDetail, totalPage, totalAudit;
            res=action.data;
            totalPage=Number(res.total_pages);
            totalAudit=Number(res.total_results);
            if(res.audit_list) {
                let auditDetailData = action.saltParams.lazyData ? (state.auditDetail || []) : [];
                return Object.assign({}, state, {
                    "auditDetail" : auditDetailData.concat(res.audit_list),
                    "totalPage" : res.audit_list.length>0?totalPage:state.totalPage,
                    "totalAudits" : res.audit_list.length>0?totalAudit:state.totalAudits,
                    "successQuery":res.audit_list.length>0?state.query:state.successQuery,
                    "noResultFound":res.audit_list.length<1
                })
            }
            break;

        case REFRESH_AUDIT:
            return Object.assign({}, state, {
                "auditRefresh" : new Date()
            })
            break;

        case SET_AUDIT_ORDERLINES:
            return Object.assign({}, state, {
                "auditPendingLines" : action.data
            })
            break;

        case SET_AUDIT_QUERY:
            return Object.assign({},state,{
                "query":JSON.parse(JSON.stringify(action.data.query))
            })
        break;
        default:
            return state
    }
}