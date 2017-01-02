import {receiveAuthData,setLoginSpinner,setTimeOffSetData,loginFail} from '../actions/loginAction';
import {recieveOrdersData} from '../actions/paginationAction';
import {recieveAuditData,setAuditRefresh,setAuditSpinner} from '../actions/auditActions';
import {assignRole} from '../actions/userActions';
import {recieveHeaderInfo} from '../actions/headerAction';
import {getPPSAudit} from '../actions/auditActions';
import {codeToString} from './codeToString';
import {setOrderListSpinner} from '../actions/orderListActions';
import {notifySuccess, notifyFail,validateID,notifyDelete,loginError} from '../actions/validationActions';
import {ERROR,AUTH_LOGIN, ADD_USER, RECIEVE_TIME_OFFSET,CHECK_ID,DELETE_USER,GET_ROLES,ORDERS_RETRIEVE,PPS_MODE_CHANGE,EDIT_USER,RECIEVE_HEADER,SUCCESS,CREATE_AUDIT,AUDIT_RETRIEVE,GET_PPSLIST,START_AUDIT,DELETE_AUDIT} from '../constants/frontEndConstants';
import {BUTLER_UI,CODE_UE002,BUTLER_SUPERVISOR} from '../constants/backEndConstants'
import {UE002,E028,E029,MODE_REQUESTED,TYPE_SUCCESS,AS001,ERR_API,ERR_USR,ERR_RES,ERR_AUDIT,AS00A,WRONG_CRED} from '../constants/messageConstants';
import {ShowError} from './showError';
import {endSession} from './endSession';

export function AjaxParse(store,res,cause,status)
{
	let stringInfo={};

      switch(cause)
	  {
		case AUTH_LOGIN:	
			if(res.auth_token)
			{		
				store.dispatch(receiveAuthData(res));
			}
			else
			{
				store.dispatch(loginError(WRONG_CRED));
			}
			store.dispatch(setLoginSpinner(false));
			break;
		case ORDERS_RETRIEVE:
			store.dispatch(recieveOrdersData(res));
			store.dispatch(setOrderListSpinner(false));
			break;
		case AUDIT_RETRIEVE:
			store.dispatch(recieveAuditData(res));
			store.dispatch(setAuditSpinner(false));
			break;
		case GET_ROLES:
			let i,rolesArr,k={};
			rolesArr=res.roles;
			for(i=0;i<rolesArr.length;i++)
			{
				if(rolesArr[i].name===BUTLER_UI)
				{
					k.BUTLER_UI=rolesArr[i].id;
				}
				else
				{
					k.BUTLER_SUPERVISOR=rolesArr[i].id;					
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
		    stringInfo=codeToString(res.alert_data[0]);
		    if(stringInfo.type)
		    {
		    	store.dispatch(notifySuccess(stringInfo.msg));
		    }
		    else
		    {
		    	store.dispatch(notifyFail(stringInfo.msg));				    		
		    }
			break;
		case CREATE_AUDIT:
			if(res.alert_data)								
		    {	
		    	stringInfo=codeToString(res.alert_data[0]);
		    	store.dispatch(notifyFail(stringInfo.msg));
		    	store.dispatch(setAuditRefresh(false));//reset refresh flag			   		
		   	}
		   	else
		   	{
		    			store.dispatch(notifySuccess(AS001));	
		    			store.dispatch(setAuditRefresh(true));//set refresh flag			   		
		   	}
			break;
		case DELETE_AUDIT:
		    stringInfo=codeToString(res.alert_data[0]);
		    if(stringInfo.type)
		    {
		    	store.dispatch(notifyDelete(stringInfo.msg));
		    	store.dispatch(setAuditRefresh(true));//set refresh flag
		    }
		    else
		    {
		    	store.dispatch(notifyFail(stringInfo.msg));	
		    	store.dispatch(setAuditRefresh(false));//reset refresh flag			   			
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
		    		store.dispatch(setAuditRefresh(true));//set refresh flag				   		
			}
			else
			{
					stringInfo=codeToString(res.unsuccessful[0].alert_data[0]);
					store.dispatch(notifyFail(stringInfo.msg));
					store.dispatch(setAuditRefresh(false));//reset refresh flag			   		
			}
			break;
		case RECIEVE_HEADER:
			 if(res.users[0].roles[0]==BUTLER_UI)
			 {
			 	endSession(store);
			 }
			 store.dispatch(recieveHeaderInfo(res));
			 break;
		case RECIEVE_TIME_OFFSET:
			 store.dispatch(setTimeOffSetData(res));
			 break;

		default:
			ShowError(store,cause,status);
	 }
}  