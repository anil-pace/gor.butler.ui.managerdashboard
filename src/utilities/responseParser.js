
import {receivePpsData,receiveButlersData,receiveAuditData,receiveThroughputData,receivePutData,receiveChargersData,receiveOrdersData,initData,recieveHistogramData,recieveChargersDetail,recieveButlersDetail,recievePPSDetail,recievePPSperformance,recieveUserDetails,recievefireHazardDetails} from '../actions/responseAction';
import {HISTOGRAM_DATA} from '../constants/frontEndConstants';
import {SYSTEM_CHARGERS_DETAILS,USER_DATA,HISTOGRAM_DETAILS,PARSE_OVERVIEW,PARSE_SYSTEM,PARSE_STATUS,PPS_DETAIL,SYSTEM_PPS_DETAILS,SYSTEM_BUTLERS_DETAILS,PARSE_PPS,PARSE_BUTLERS,PARSE_CHARGERS,PARSE_INVENTORY_HISTORY,PARSE_INVENTORY_TODAY,PARSE_INVENTORY,PARSE_ORDERS,PARSE_PUT,PARSE_PICK,PARSE_PPA_THROUGHPUT,PARSE_AUDIT,PARSE_AUDIT_AGG,EMERGENCY} from '../constants/backEndConstants'
import {wsOnMessageAction} from '../actions/socketActions';
import {recieveOverviewStatus,recieveSystemStatus,recieveAuditStatus,recieveOrdersStatus,recieveUsersStatus,recieveInventoryStatus,recieveStatus,setFireHazrdFlag} from '../actions/tabActions';
import {userFilterApplySpinner} from '../actions/spinnerAction';
import {setInventorySpinner} from '../actions/inventoryActions';
import {setAuditSpinner} from '../actions/auditActions';
import {setButlerSpinner,setPpsSpinner,setCsSpinner,setWavesSpinner,setWavesFilterSpinner,setButlerFilterSpinner,setPpsFilterSpinner,setCsFilterSpinner} from '../actions/spinnerAction';
import {receiveInventoryTodayData,receiveInventoryHistoryData} from '../actions/inventoryActions';
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
				store.dispatch(setPpsFilterSpinner(false));
				break;
			case PARSE_BUTLERS:
				store.dispatch(setButlerSpinner(false));
				store.dispatch(setButlerFilterSpinner(false));
				store.dispatch(receiveButlersData(res));
				break;
			case PARSE_AUDIT:
					store.dispatch(recieveAuditStatus(res));
					break;
			case PARSE_AUDIT_AGG:
				 	store.dispatch(receiveAuditData(res));
				 	store.dispatch(setAuditSpinner(false));
				break;
			case PARSE_PUT:
				store.dispatch(receivePutData(res));
				break;
			case PARSE_CHARGERS:
				store.dispatch(receiveChargersData(res));
				store.dispatch(setCsSpinner(false));
				store.dispatch(setCsFilterSpinner(false));
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
					store.dispatch(setWavesFilterSpinner(false));	
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
					store.dispatch(userFilterApplySpinner(false));
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
			case 'orders':
				store.dispatch(setWavesFilterSpinner(false));
				break;	
				
			case 'emergency':
var	res={"complete_data": 
[
{"emergency_data": 
{"escape_path": "in_progress", 
"shutters": 
{
	"1": "cleared",
	"2": "failed",
	"3": "cleared",
	"4": "cleared",
	"5": "cleared",
	"6": "failed",
	"7": "cleared",
	"8": "cleared",
	"9": "failed",
	"10": "cleared",
	"11": "cleared",
	"12": "failed",
	"13": "cleared",
	"14": "failed",
	"5": "failed",
	"16": "cleared",
	"17": "failed",
	"18": "in_progress"
}
}, "emergency_start_time": "2017-06-28T22:22:48.259011", 
	"emergency_type": "fire_emergency"}
], "resource_type": "emergency"

}										    	   
				store.dispatch(recievefireHazardDetails(res));
				store.dispatch(setFireHazrdFlag(true));
				break;	   
			default:
				console.log("in Response Parser");
	    }
}  