
import {receiveOrdersData} from '../actions/responseAction';
import {recieveOrdersStatus} from '../actions/tabActions';


export function ordersPlatformResponseParse(store,res,type)
{
		if(type !== "header"){
			store.dispatch(receiveOrdersData(res));
		}
		else{
			store.dispatch(recieveOrdersStatus(res));
		}
} 