import {receiveAuthData,setLoginLoader} from '../actions/loginAction';
import {recieveOrdersData} from '../actions/paginationAction';
import {recieveAuditData} from '../actions/auditActions';
import {assignRole} from '../actions/userActions';
import {recieveHeaderInfo} from '../actions/headerAction';
import {getPPSAudit} from '../actions/auditActions';
import {codeToString} from './codeToString';
import {notifySuccess, notifyFail,validateID} from '../actions/validationActions';
import {ERROR,AUTH_LOGIN, ADD_USER, CHECK_ID,DELETE_USER,GET_ROLES,ORDERS_RETRIEVE,PPS_MODE_CHANGE,EDIT_USER,BUTLER_UI,CODE_US001,CODE_US002,CODE_US004,CODE_UE001,CODE_UE002,CODE_UE003,CODE_UE004,CODE_UE005,CODE_UE006,RECIEVE_HEADER,SUCCESS,CREATE_AUDIT,AUDIT_RETRIEVE,CODE_E025,CODE_G015,GET_PPSLIST,START_AUDIT,CODE_AE001,CODE_AE002,CODE_AE006,DELETE_AUDIT,CODE_AS002,CODE_AS003,CODE_G016,CODE_AE004,CODE_AE005} from '../constants/appConstants';
import {US001,US002,US004,UE001,UE002,UE003,UE004,UE005,UE006,E028,E029,MODE_REQUESTED,TYPE_SUCCESS,E025,AS001,ERR_API,ERR_USR,ERR_RES,ERR_AUDIT,AE001,AE002,AE006,AS00A,AS002,AS003,G016,AE004,AE005} from '../constants/messageConstants';

export function AjaxParse(store,res,cause)
{
	let stringInfo={};
	switch(cause)
	{
		case AUTH_LOGIN:
			
			store.dispatch(receiveAuthData(res));
			store.dispatch(setLoginLoader(false));
			break;


		case ORDERS_RETRIEVE:
			store.dispatch(recieveOrdersData(res));
			break;


		case AUDIT_RETRIEVE:
			store.dispatch(recieveAuditData(res));
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

		case ADD_USER:

		case DELETE_USER:

		case EDIT_USER:
		
		case DELETE_AUDIT:
			try
		    {	
		    	stringInfo=codeToString(res.alert_data[0].code);
		    	if(stringInfo.type)
		    	{
		    		store.dispatch(notifySuccess(stringInfo.msg));
		    	}
		    	else
		    	{
		    		store.dispatch(notifyFail(stringInfo.msg));				    		
		    	}
		    }
			catch(e)
			{
		    			store.dispatch(notifyFail(ERR_RES));
		    			throw e;		
			}
			break;
		case CREATE_AUDIT:
			if(res.alert_data)								//Can't use try-catch here
		    {	
		    	stringInfo=codeToString(res.alert_data[0].code);
		    	store.dispatch(notifyFail(stringInfo.msg));
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
		    		store.dispatch(notifySuccess(AS00A));				   		
			}
			else
			{
				try
				{
					stringInfo=codeToString(res.unsuccessful[0].alert_data[0].code);
					store.dispatch(notifyFail(stringInfo.msg));
				}
				catch(e)
				{
		    			store.dispatch(notifyFail(ERR_RES));
		    			throw e;		
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