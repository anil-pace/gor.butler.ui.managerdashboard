import {connectionFault,setLoginSpinner} from '../actions/loginAction';
import {AUTH_LOGIN} from '../constants/appConstants';
import {ERR_CONNECT} from '../constants/messageConstants';
import {notifyFail} from '../actions/validationActions';

export function ShowError(store,cause)
{
	switch(cause)
	{
		case AUTH_LOGIN:
			console.log('In Error utility');
			store.dispatch(setLoginSpinner(false));
			store.dispatch(connectionFault());
			break;
		default:
          store.dispatch(notifyFail(ERR_CONNECT));
	}
}  