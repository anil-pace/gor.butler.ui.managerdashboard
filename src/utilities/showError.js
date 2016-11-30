import {connectionFault,setLoginSpinner} from '../actions/loginAction';
import {AUTH_LOGIN} from '../constants/frontEndConstants';
import {ERR_CONNECT,ERR_400,ERR_401,ERR_403,ERR_405,ERR_408,ERR_409,ERR_500,ERR_502} from '../constants/messageConstants';
import {notifyFail} from '../actions/validationActions';

export function ShowError(store,cause,status)
{
	console.log('In Error utility');
	switch(status)
	{
		case 400:
          	store.dispatch(notifyFail(ERR_400));
			break;
		case 401:
			if(cause === AUTH_LOGIN)
			{
				store.dispatch(setLoginSpinner(false));
				store.dispatch(connectionFault());
			}
			else
			{
          		store.dispatch(notifyFail(ERR_401));
			}
			break;
		case 403:
          	store.dispatch(notifyFail(ERR_403));
			break;
		case 405:
          	store.dispatch(notifyFail(ERR_405));
			break;
		case 408:
          	store.dispatch(notifyFail(ERR_408));
			break;
		case 409:
          	store.dispatch(notifyFail(ERR_409));
			break;
		case 500:
          	store.dispatch(notifyFail(ERR_500));		
			break;
		case 502:
          	store.dispatch(notifyFail(ERR_502));		
			break;
		default:
          	store.dispatch(notifyFail(ERR_CONNECT));
	}
}  