import {receivePpsData,receiveButlersData,receivePickData,receivePutData,receiveChargersData,receiveInventoryData,receiveOrdersData,initData} from '../actions/responseAction';
import {wsOnMessageAction} from '../actions/socketActions'

export function ResponseParse(store,res)
{
	console.log('In Message Parser');
	if(res.resource_type)
	{
		switch(res.resource_type)
		{
			case "pps":
				store.dispatch(receivePpsData(res));
				break;
			case "butlers":
				store.dispatch(receiveButlersData(res));
				break;
			case "pick":
				store.dispatch(receivePickData(res));
				break;
			case "put":
				store.dispatch(receivePutData(res));
				break;
			case "chargers":
				store.dispatch(receiveChargersData(res));
				break;
			case "inventory":		
				store.dispatch(receiveInventoryData(res));
				break;
			case "orders":		
				store.dispatch(receiveOrdersData(res));
				break;
			default:
				store.dispatch(initData(res));
				break;			
	}
  }
  else
  {
  	 store.dispatch(wsOnMessageAction(res));
  }
}  