import {receiveAuthData} from '../actions/loginAction';
import {recieveOrdersData} from '../actions/paginationAction';
import {assignRole} from '../actions/userActions';
import {backendID,notifySuccess, notifyFail} from '../actions/validationActions';
import {AUTH_LOGIN, ADD_USER, CHECK_ID,DELETE_USER,GET_ROLES,ORDERS_RETRIEVE,PPS_MODE_CHANGE,EDIT_USER,BUTLER_UI,CODE_US001,CODE_US002,CODE_US004,CODE_UE001,CODE_UE002,CODE_UE003,CODE_UE004,CODE_UE005,CODE_UE006} from '../constants/appConstants';
import {US001,US002,UE001,UE002,UE003,UE004,UE005,UE006,E028,E029,MODE_REQUESTED} from '../constants/messageConstants'; 


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
			
			if(res.alert_data)
			{

			}
		case GET_ROLES:
			let i,rolesArr,k={};
			rolesArr=res.roles;
			for(i=0;i<rolesArr.length;i++)
			{
				if(rolesArr[i].name===BUTLER_UI)
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
			if(res.users.length)
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


		case PPS_MODE_CHANGE:
			if(res.alert_data) {
				switch(res.alert_data[0].code) {
					case 'e028':
					store.dispatch(notifySuccess(E028));
		    		break;

		    		case 'e029':
		    		store.dispatch(notifyFail(E029));
		    		break;	
				}
			}
			else{
					store.dispatch(notifySuccess(MODE_REQUESTED));
			}
			break;


		case EDIT_USER:

		case ADD_USER:
			if(res.alert_data)
		    {	
		    	switch(res.alert_data[0].code)
		    	{
		    		case CODE_US001:
						store.dispatch(notifySuccess(US001));
		    			break;
		    		case CODE_US002:
						store.dispatch(notifySuccess(US002));
		    			break;
		    		case CODE_US004:
						store.dispatch(notifySuccess(US004));
		    			break;
		    		case CODE_UE001:
						store.dispatch(notifyFail(UE001));
		    			break;
		    		case CODE_UE002:
						store.dispatch(notifyFail(UE002));		 
		    			break;
		    		case CODE_UE003:
						store.dispatch(notifyFail(UE003));		    		
		    			break;
		    		case CODE_UE004:
						store.dispatch(notifyFail(UE004));		    		
		    			break;
		    		case CODE_UE005:
						store.dispatch(notifyFail(UE005));		    				    		
		    			break;
		    		case CODE_UE006:
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