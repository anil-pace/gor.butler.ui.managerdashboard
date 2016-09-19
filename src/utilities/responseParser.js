import {receivePpsData,receiveButlersData,receiveAuditData,receiveThroughputData,receivePutData,receiveChargersData,receiveInventoryData,receiveOrdersData,initData} from '../actions/responseAction';
import {wsOnMessageAction} from '../actions/socketActions'

export function ResponseParse(store,res)
{

	console.log('In Message Parser');
	if (!res.resource_type) {
		store.dispatch(wsOnMessageAction(res));
	}
	

		switch(res.resource_type)
		{
			case "pps_details":
				store.dispatch(receivePpsData(res));
				break;
			case "butlers":
				store.dispatch(receiveButlersData(res));
				break;
			case "audit_details":
				store.dispatch(receiveAuditData(res));
				break;
			case "put_details":
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