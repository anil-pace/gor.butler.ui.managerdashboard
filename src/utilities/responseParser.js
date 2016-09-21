import {receivePpsData,receiveButlersData,receiveAuditData,receiveThroughputData,receivePutData,receiveChargersData,receiveInventoryData,receiveOrdersData,initData} from '../actions/responseAction';
import {wsOnMessageAction} from '../actions/socketActions'
import {PARSE_PPS,PARSE_PUT,PARSE_PICK,PARSE_PPA_THROUGHPUT,PARSE_AUDIT} from '../constants/appConstants'



export function ResponseParse(store,res)
{

	console.log('In Message Parser');
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
			default:
				store.dispatch(initData(res));
			break;			
	}
}  