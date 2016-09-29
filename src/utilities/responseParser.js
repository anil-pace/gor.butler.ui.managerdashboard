import {receivePpsData,receiveButlersData,receiveAuditData,receiveThroughputData,receivePutData,receiveChargersData,receiveInventoryData,receiveOrdersData,initData,recieveHistogramData,recieveChargersDetail,recieveButlersDetail,recievePPSDetail,recievePPSperformance, recieveUserDetails} from '../actions/responseAction';
import {wsOnMessageAction} from '../actions/socketActions'
import {PARSE_PPS,PARSE_PUT,PARSE_PICK,PARSE_PPA_THROUGHPUT,PARSE_AUDIT,HISTOGRAM_DATA,SYSTEM_CHARGERS_DETAILS,PPS_DETAIL,SYSTEM_PPS_DETAILS,SYSTEM_BUTLERS_DETAILS,HISTOGRAM_DETAILS, USER_DATA} from '../constants/appConstants'



export function ResponseParse(store,res)
{

	
	if (!res.resource_type) {
		store.dispatch(wsOnMessageAction(res));
		return;
	}
	

		switch(res.resource_type)
		{
			case PARSE_PPS:
				store.dispatch(receivePpsData(res));
				break;
			case "butlers":
				store.dispatch(receiveButlersData(res));
				break;
			case PARSE_AUDIT:
				store.dispatch(receiveAuditData(res));
				break;
			case PARSE_PUT:
				store.dispatch(receivePutData(res));
				break;
			case "chargers":
				store.dispatch(receiveChargersData(res));
				break;
			case "inventory":		
				store.dispatch(receiveInventoryData(res));
				break;
			case "order_details":		
				store.dispatch(receiveOrdersData(res));
				break;
		    case "put_pick_audit_throughput":
				store.dispatch(receiveThroughputData(res));
				break;	
			case HISTOGRAM_DETAILS:
				store.dispatch(recieveHistogramData(res));
				break;
			case SYSTEM_CHARGERS_DETAILS:
				store.dispatch(recieveChargersDetail(res));
				break;	
			case SYSTEM_BUTLERS_DETAILS:
				store.dispatch(recieveButlersDetail(res));
				break;
			case SYSTEM_PPS_DETAILS:
				store.dispatch(recievePPSDetail(res));
				break;	
			case PPS_DETAIL:
				store.dispatch(recievePPSperformance(res));
				break;
			case USER_DATA:
				store.dispatch(recieveUserDetails(res));	
				break;	 			    
			default:
				store.dispatch(initData(res));          //Default action
			break;			
	}
}  