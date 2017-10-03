
import {recieveWSData} from '../actions/operationsLogsActions';


export function OLResponseParse(store,res)
{
		store.dispatch(recieveWSData(res));
} 