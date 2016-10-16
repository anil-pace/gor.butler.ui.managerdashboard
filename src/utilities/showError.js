import {receiveAuthData} from '../actions/loginAction';
import {AUTH_LOGIN} from '../constants/appConstants';
import {notifyFail} from '../actions/validationActions';

export function ShowError(store,cause)
{
	switch(cause)
	{
		case AUTH_LOGIN:
			console.log('In Error utility');
			store.dispatch(receiveAuthData(''));
			break;
		default:
          store.dispatch(notifyFail('Connection refused'));
	}
}  