
import {ERR_CONNECT,ERR_400,ERR_401,ERR_403,ERR_405,ERR_408,ERR_409,ERR_500,ERR_502,NO_NET,ITEM_RECALL_FAILURE} from '../constants/messageConstants';

export function ShowError(_this,status)
{
	console.log('In Error utility');
	switch(status)
	{
		case 400:
		_this.props.notifyFail(ERR_400);
			break;
		case 401:
		_this.props.notifyFail(ERR_401);
			break;
		case 403:
		_this.props.notifyFail(ERR_403);
			break;
		case 405:
		_this.props.notifyFail(ERR_405);
			break;
		case 408:
		_this.props.notifyFail(ERR_408);
			break;
		case 409:
		_this.props.notifyFail(ERR_409);
			break;
		case 500:
		_this.props.notifyFail(ERR_500);		
			break;
		case 502:
		_this.props.notifyFail(ERR_502);		
			break;
		default:
		_this.props.notifyFail(ERR_CONNECT);
	}

}  