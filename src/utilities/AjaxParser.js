import {receiveAuthData} from '../actions/loginAction';
import {AUTH_LOGIN} from '../constants/appConstants';

export function AjaxParse(store,res,cause)
{
	switch(cause)
	{
		case AUTH_LOGIN:
			store.dispatch(receiveAuthData(res));
			break;
		default:
			console.log('Call cause unknown');
	}
}  