import {receiveAuthData} from '../actions/loginAction';
import {recieveOrdersData} from '../actions/paginationAction';
import {backendID} from '../actions/validationActions';
import {AUTH_LOGIN, ADD_USER, CHECK_ID,DELETE_USER,ORDERS_RETRIEVE} from '../constants/appConstants';
import {US001,US002,UE001,UE002,UE003,UE004,UE005,UE006} from '../constants/messageConstants'; 

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
			
		case CHECK_ID:
		case DELETE_USER:
		case ADD_USER:
			if(res.alert_data)
		    {	
		    	switch(res.alert_data[0].code)
		    	{
		    		case 'us001':
		    			console.log(US001);
		    			break;
		    		case 'us002':
		    			console.log(US002);
		    			break;
		    		case 'ue001':
		    			console.log(UE001);
		    			break;
		    		case 'ue002':
		    			console.log(UE002);
		    			break;
		    		case 'ue003':
		    			console.log(UE003);
		    			break;
		    		case 'ue004':
		    			console.log(UE004);
		    			break;
		    		case 'ue005':
		    			console.log(UE005);
		    			break;
		    		case 'ue006':
		    			console.log(UE006);
		    			break;
		    		default:
		    			console.log('Error in adding user');

		    	}			
		    }
			else
			{
						console.log('Error in response');
			}

			break;
		default:
			console.log('Call cause unknown');
	}
}  