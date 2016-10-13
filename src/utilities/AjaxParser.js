import {receiveAuthData} from '../actions/loginAction';
import {assignRole} from '../actions/userActions';
import {backendID,notifySuccess, notifyFail} from '../actions/validationActions';
import {AUTH_LOGIN, ADD_USER, CHECK_ID,DELETE_USER,GET_ROLES,EDIT_USER} from '../constants/appConstants';
import {US001,US002,US004,UE001,UE002,UE003,UE004,UE005,UE006} from '../constants/messageConstants'; 

export function AjaxParse(store,res,cause)
{
	switch(cause)
	{
		case AUTH_LOGIN:
			store.dispatch(receiveAuthData(res));
			break;
		case GET_ROLES:
			let i,rolesArr,k={};
			rolesArr=res.roles;
			for(i=0;i<rolesArr.length;i++)
			{
				if(rolesArr[i].name==="butler_ui")
				{
					k.operator=rolesArr[i].id;
				}
				else
				{
					k.manager=rolesArr[i].id;					
				}
			}
			store.dispatch(assignRole(k));
			break;

		case CHECK_ID:
			let isAuth;
			if(res.status)
			{
				isAuth=true;
			}
			else
			{
				isAuth=false;
			}
			store.dispatch(backendID(isAuth));			
			break;
		case DELETE_USER:
		case EDIT_USER:
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
		    		case 'us004':
						store.dispatch(notifySuccess(US004));
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
		    			store.dispatch(notifyFail('Error in updating user'));		    				    		

		    	}			
		    }
			else
			{
		    			store.dispatch(notifyFail('Error in response'));		
			}
			break;
		default:
		    			store.dispatch(notifyFail('API response not registered'));	
	}
}  