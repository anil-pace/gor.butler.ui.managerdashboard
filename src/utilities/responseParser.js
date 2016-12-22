
import {receivePpsData,receiveButlersData,receiveAuditData,receiveThroughputData,receivePutData,receiveChargersData,receiveOrdersData,initData,recieveHistogramData,recieveChargersDetail,recieveButlersDetail,recievePPSDetail,recievePPSperformance,recieveUserDetails} from '../actions/responseAction';
import {HISTOGRAM_DATA} from '../constants/frontEndConstants';
import {SYSTEM_CHARGERS_DETAILS,USER_DATA,HISTOGRAM_DETAILS,PARSE_OVERVIEW,PARSE_SYSTEM,PARSE_STATUS,PPS_DETAIL,SYSTEM_PPS_DETAILS,SYSTEM_BUTLERS_DETAILS,PARSE_PPS,PARSE_BUTLERS,PARSE_CHARGERS,PARSE_INVENTORY_HISTORY,PARSE_INVENTORY_TODAY,PARSE_INVENTORY,PARSE_ORDERS,PARSE_PUT,PARSE_PICK,PARSE_PPA_THROUGHPUT,PARSE_AUDIT,} from '../constants/backEndConstants'
import {wsOnMessageAction} from '../actions/socketActions';
import {recieveOverviewStatus,recieveSystemStatus,recieveAuditStatus,recieveOrdersStatus,recieveUsersStatus,recieveInventoryStatus,recieveStatus} from '../actions/tabActions';
import {displaySpinner} from '../actions/spinnerAction';
import {setInventorySpinner} from '../actions/inventoryActions';
import {setAuditSpinner} from '../actions/auditActions';
import {setButlerSpinner,setPpsSpinner,setCsSpinner,setWavesSpinner} from '../actions/spinnerAction';
import {receiveInventoryTodayData,receiveInventoryHistoryData} from '../actions/inventoryActions';
import {resTypeSnapShotToday,resTypeSnapShotHistory} from '../../mock/mockDBData';
import {endSession} from './endSession';

export function ResponseParse(store,res)
{

		if(res.alert_data)
		{
			endSession(store);
			return;
		}
		if (!res.resource_type) {
			store.dispatch(wsOnMessageAction(res));
			return;
		}
		switch(res.resource_type)
		{
			case PARSE_PPS:
				store.dispatch(recievePPSperformance(res));
				store.dispatch(setPpsSpinner(false));
				break;
			case PARSE_BUTLERS:
				store.dispatch(setButlerSpinner(false));
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
				 	store.dispatch(setAuditSpinner(false));
				}
				break;
			case PARSE_PUT:
				store.dispatch(receivePutData(res));
				break;
			case PARSE_CHARGERS:
				store.dispatch(receiveChargersData(res));
				store.dispatch(setCsSpinner(false));
				break;
			case PARSE_INVENTORY_HISTORY:
				if(res.header_data)
				{
					store.dispatch(recieveInventoryStatus(res));
				}
				else
				{
					store.dispatch(receiveInventoryHistoryData(res));
					store.dispatch(setInventorySpinner(false));
					
				}
				break;
			case PARSE_INVENTORY_TODAY:		
				if(res.header_data)
				{
					store.dispatch(recieveInventoryStatus(res));
				}
				else
				{
					store.dispatch(receiveInventoryTodayData(res));
					store.dispatch(setInventorySpinner(false));
					
				}
				break;
			case PARSE_ORDERS:	
				if(res.header_data)
				{
					store.dispatch(recieveOrdersStatus(res));
				}
				else
				{
					store.dispatch(setWavesSpinner(false));
					store.dispatch(receiveOrdersData(res));	
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
					store.dispatch(displaySpinner(false));
				}
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
				break;				   
			default:
	    }
}  