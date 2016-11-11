
import {receivePpsData,receiveButlersData,receiveAuditData,receiveThroughputData,receivePutData,receiveChargersData,receiveOrdersData,initData,recieveHistogramData,recieveChargersDetail,recieveButlersDetail,recievePPSDetail,recievePPSperformance,recieveUserDetails} from '../actions/responseAction';
import {displaySpinner} from '../actions/spinnerAction';
import {setInventorySpinner} from '../actions/inventoryActions';
import {wsOnMessageAction} from '../actions/socketActions'
import {receiveInventoryTodayData,receiveInventoryHistoryData} from '../actions/inventoryActions';
import {PARSE_PPS,PARSE_BUTLERS,PARSE_CHARGERS,PARSE_INVENTORY_HISTORY,PARSE_INVENTORY_TODAY,PARSE_INVENTORY,PARSE_ORDERS,PARSE_PUT,PARSE_PICK,PARSE_PPA_THROUGHPUT,PARSE_AUDIT,HISTOGRAM_DATA,SYSTEM_CHARGERS_DETAILS,PPS_DETAIL,SYSTEM_PPS_DETAILS,SYSTEM_BUTLERS_DETAILS,HISTOGRAM_DETAILS,USER_DATA} from '../constants/appConstants'
import {resTypeSnapShotToday,resTypeSnapShotHistory} from '../../mock/mockDBData';


export function ResponseParse(store,res)
{

	
	if (!res.resource_type) {
		store.dispatch(wsOnMessageAction(res));
		return;
	}
		switch(res.resource_type)
		{
			case PARSE_PPS:
				store.dispatch(recievePPSperformance(res));
				break;
			case PARSE_BUTLERS:
				store.dispatch(receiveButlersData(res));
				break;
			case PARSE_AUDIT:
				store.dispatch(receiveAuditData(res));
				break;
			case PARSE_PUT:
				store.dispatch(receivePutData(res));
				break;
			case PARSE_CHARGERS:
				store.dispatch(receiveChargersData(res));
				break;
			case PARSE_INVENTORY_HISTORY:
				store.dispatch(receiveInventoryHistoryData(res));
				store.dispatch(setInventorySpinner(false));
				break;
			case PARSE_INVENTORY_TODAY:		
				store.dispatch(receiveInventoryTodayData(res));
				store.dispatch(setInventorySpinner(false));
				break;
			case PARSE_ORDERS:		
				store.dispatch(receiveOrdersData(res));
				break;
		    case PARSE_PPA_THROUGHPUT:
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
				store.dispatch(displaySpinner(false));
				//store.dispatch(recieveUserDetails(res));	  
				break;
			 			    
			default:
				//store.dispatch(initData(res));          //Default action
			break;			
	}
}  