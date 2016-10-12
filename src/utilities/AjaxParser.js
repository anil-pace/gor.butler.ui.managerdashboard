import {receiveAuthData} from '../actions/loginAction';
import {recieveOrdersData} from '../actions/paginationAction';
import {AUTH_LOGIN,ORDERS_RETRIEVE} from '../constants/appConstants';

export function AjaxParse(store,res,cause)
{
	switch(cause)
	{
		case AUTH_LOGIN:
			store.dispatch(receiveAuthData(res));
			break;
		case ORDERS_RETRIEVE:
			store.dispatch(recieveOrdersData(res));
			break;
		default:
			console.log('Call cause unknown');
	}
}  