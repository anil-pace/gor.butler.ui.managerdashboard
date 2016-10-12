import {receiveAuthData} from '../actions/loginAction';
import {backendID,notifySuccess, notifyFail} from '../actions/validationActions';
import {AUTH_LOGIN, ADD_USER, CHECK_ID,DELETE_USER} from '../constants/appConstants';
import {US001,US002,UE001,UE002,UE003,UE004,UE005,UE006} from '../constants/messageConstants'; 

export function AjaxParse(store,res,cause)
{
	switch(cause)
	{
		case AUTH_LOGIN:
			store.dispatch(receiveAuthData(res));
			break;
		case CHECK_ID:
		case DELETE_USER:
		case ADD_USER:
			if(res.alert_data)
		    {	
		    	switch(res.alert_data[0].code)
		    	{
		    		case 'us001':
						store.dispatch(notifySuccess(US001));
		    			break;
		    		case 'us002':
						store.dispatch(notifySuccess(US002));
		    			break;
		    		case 'ue001':
						store.dispatch(notifyFail(UE001));
		    			break;
		    		case 'ue002':
						store.dispatch(notifyFail(UE002));		 
		    			break;
		    		case 'ue003':
						store.dispatch(notifyFail(UE003));		    		
		    			break;
		    		case 'ue004':
						store.dispatch(notifyFail(UE004));		    		
		    			break;
		    		case 'ue005':
						store.dispatch(notifyFail(UE005));		    				    		
		    			break;
		    		case 'ue006':
						store.dispatch(notifyFail(UE006));		    				    		
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