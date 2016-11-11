
import {receivePpsData,receiveButlersData,receiveAuditData,receiveThroughputData,receivePutData,receiveChargersData,receiveInventoryTodayData,receiveInventoryHistoryData,receiveOrdersData,initData,recieveHistogramData,recieveChargersDetail,recieveButlersDetail,recievePPSDetail,recievePPSperformance,recieveUserDetails} from '../actions/responseAction';
import {displayLoader} from '../actions/loaderAction';
import {wsOnMessageAction} from '../actions/socketActions';
import {recieveOverviewStatus,recieveSystemStatus,recieveAuditStatus,recieveOrdersStatus,recieveUsersStatus,recieveInventoryStatus,recieveStatus} from '../actions/tabActions';
import {PARSE_PPS,PARSE_BUTLERS,PARSE_CHARGERS,PARSE_INVENTORY_HISTORY,PARSE_INVENTORY_TODAY,PARSE_INVENTORY,PARSE_ORDERS,PARSE_PUT,PARSE_PICK,PARSE_PPA_THROUGHPUT,PARSE_AUDIT,HISTOGRAM_DATA,SYSTEM_CHARGERS_DETAILS,PPS_DETAIL,SYSTEM_PPS_DETAILS,SYSTEM_BUTLERS_DETAILS,HISTOGRAM_DETAILS,USER_DATA,PARSE_OVERVIEW,PARSE_SYSTEM,PARSE_STATUS} from '../constants/appConstants';
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
				if(res.header_data)
				{
					store.dispatch(recieveAuditStatus(res));
				}
				else
				{
				 	store.dispatch(receiveAuditData(res));
				}
				break;
			case PARSE_PUT:
				store.dispatch(receivePutData(res));
				break;
			case PARSE_CHARGERS:
				store.dispatch(receiveChargersData(res));
				break;
			case PARSE_INVENTORY_HISTORY:
				store.dispatch(receiveInventoryHistoryData(res));
				break;

			case PARSE_INVENTORY_TODAY:		
				store.dispatch(receiveInventoryTodayData(res));
				break;
			case PARSE_ORDERS:	
				if(res.header_data)
				{
					store.dispatch(recieveOrdersStatus(res));
				}
				else
				{
					store.dispatch(receiveOrdersData(res));
					store.dispatch(receiveInventoryTodayData(resTypeSnapShotToday));
				}
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
				if(res.header_data)
				{
					store.dispatch(recieveUsersStatus(res));
				}
				else
				{
					store.dispatch(recieveUserDetails(res));	
					store.dispatch(displayLoader(false));
				}
				//store.dispatch(recieveUserDetails(res));	  
				break;
			case PARSE_OVERVIEW:
				store.dispatch(recieveOverviewStatus(res));
				break;		    
			case PARSE_SYSTEM:
				store.dispatch(recieveSystemStatus(res));
				break;		    
			case PARSE_INVENTORY:
				store.dispatch(recieveInventoryStatus(res));
				break;	
			case PARSE_STATUS:
				store.dispatch(recieveStatus(res));	    
			default:
				//store.dispatch(initData(res));          //Default action
			break;			
	}
}  