import {receiveAuthData,setLoginLoader} from '../actions/loginAction';
import {recieveOrdersData} from '../actions/paginationAction';
import {recieveAuditData} from '../actions/auditActions';
import {assignRole} from '../actions/userActions';
import {recieveHeaderInfo} from '../actions/headerAction';
import {getPPSAudit} from '../actions/auditActions';
import {notifySuccess, notifyFail,validateID} from '../actions/validationActions';
<<<<<<< HEAD
import {ERROR,AUTH_LOGIN, ADD_USER, CHECK_ID,DELETE_USER,GET_ROLES,ORDERS_RETRIEVE,PPS_MODE_CHANGE,EDIT_USER,BUTLER_UI,CODE_US001,CODE_US002,CODE_US004,CODE_UE001,CODE_UE002,CODE_UE003,CODE_UE004,CODE_UE005,CODE_UE006,RECIEVE_HEADER,SUCCESS,CREATE_AUDIT,AUDIT_RETRIEVE,CODE_E025,CODE_G015,GET_PPSLIST,START_AUDIT,CODE_AE001,CODE_AE002,CODE_AE006} from '../constants/appConstants';
import {US001,US002,US004,UE001,UE002,UE003,UE004,UE005,UE006,E028,E029,MODE_REQUESTED,TYPE_SUCCESS,E025,G015,AS001,ERR_API,ERR_USR,ERR_RES,ERR_AUDIT,AE001,AE002,AE006,AS002} from '../constants/messageConstants'; 



export function AjaxParse(store,res,cause)
{
	switch(cause)
	{
		case AUTH_LOGIN:
			
			store.dispatch(receiveAuthData(res));
			store.dispatch(setLoginLoader(false));
			break;


		case ORDERS_RETRIEVE:
			store.dispatch(recieveOrdersData(res));
			break;
			
			if(res.alert_data)
			{

			}
			break;


		case AUDIT_RETRIEVE:
			store.dispatch(recieveAuditData(res));
			break;
			
			if(res.alert_data)
			{

			}
			break;	

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
			let idExist;
			if(res.users.length)
			{
	          idExist={
	              type:ERROR,
	              msg:UE002             
	            };                        
 	         }
	        else
            {
              idExist={
              	type:SUCCESS,
              	msg:TYPE_SUCCESS               
              };               
			}
			store.dispatch(validateID(idExist));			
			break;


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

		case DELETE_USER:

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
		    			store.dispatch(notifyFail(ERR_USR));		    				    		

		    	}			
		    }
			else
			{
		    			store.dispatch(notifyFail(ERR_RES));		
			}

			break;
		case CREATE_AUDIT:
			if(res.alert_data)
		    {	
		    	switch(res.alert_data[0].code)
		    	{
		    		case CODE_E025:
						store.dispatch(notifyFail(E025));		    		
		    			break;
		    		case CODE_G015:
						store.dispatch(notifyFail(G015));
					default:
		    			store.dispatch(notifyFail(ERR_AUDIT));		    				    									    				    				    		
		    	}
		   	}
		   	else
		   	{
		    			store.dispatch(notifySuccess(AS001));				   		
		   	}
			break;
		case GET_PPSLIST:
			let auditpps=[];
			if(res.data.audit)
			{
				auditpps=res.data.audit;
			}
			store.dispatch(getPPSAudit(auditpps));
			break;
		case START_AUDIT:
			if(res.successful.length)
			{
		    		store.dispatch(notifySuccess(AS002));				   		
			}
			else
			{
				switch(res.unsuccessful[0].alert_data[0].code)
				{
					case CODE_AE001:
		    				store.dispatch(notifyFail(AE001));		
							break;
					case CODE_AE002:
		    				store.dispatch(notifyFail(AE002));		
							break;
					case CODE_AE006:
		    				store.dispatch(notifyFail(AE006));		
							break;
					default:
		    				store.dispatch(notifyFail(ERR_RES));		
				}
			}
			break;
		case RECIEVE_HEADER:
						store.dispatch(recieveHeaderInfo(res));
						break;
		default:
		    			store.dispatch(notifyFail(ERR_API));	
	}
}  