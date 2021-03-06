import {setLoginSpinner} from '../actions/loginAction';
import {uploadMasterDataProcessing} from '../actions/utilityActions';
import {AUTH_LOGIN,MASTER_FILE_UPLOAD,DOWNLOAD_STOCK_LEDGER_REPORT,
	DOWNLOAD_STOCK_LEDGER_RAW_TRANSACTIONS_REPORT,
	PPS_PROFILE_REQUESTED,SELLER_RECALL} from '../constants/frontEndConstants';
import {ERR_CONNECT,ERR_400,ERR_401,ERR_403,ERR_405,ERR_408,ERR_409,ERR_500,ERR_502,NO_NET,ITEM_RECALL_FAILURE} from '../constants/messageConstants';
import {notifyFail,loginError} from '../actions/validationActions';
import {setStockLedgerSpinner,setStockLedgerRawTransactionsSpinner} from '../actions/spinnerAction'
import {profileRequested} from './../actions/ppsConfigurationActions'

export function ShowError(store,cause,status,response)
{
	console.log('In Error utility');
	switch(status)
	{
		case 400:
          	store.dispatch(notifyFail(ERR_400));
			break;
		case 401:
			if(cause=== AUTH_LOGIN)
			{
				store.dispatch(setLoginSpinner(false));
				store.dispatch(loginError(NO_NET));
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
	if(cause=== MASTER_FILE_UPLOAD){
		store.dispatch(uploadMasterDataProcessing(false));
	}
	else if(cause===DOWNLOAD_STOCK_LEDGER_REPORT){
		store.dispatch(setStockLedgerSpinner(false))
	}
	else if(cause===DOWNLOAD_STOCK_LEDGER_RAW_TRANSACTIONS_REPORT){
		store.dispatch(setStockLedgerRawTransactionsSpinner(false))
	}
	else if(cause===PPS_PROFILE_REQUESTED){
		store.dispatch(profileRequested({}))
	}
	else if(cause === SELLER_RECALL){
		store.dispatch(notifyFail((ITEM_RECALL_FAILURE[response.reason]) || ERR_400));
	}
}  