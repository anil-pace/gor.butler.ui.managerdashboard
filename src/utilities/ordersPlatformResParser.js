
import {receiveOrdersData} from '../actions/responseAction';


export function ordersPlatformResponseParse(store,res)
{
		store.dispatch(receiveOrdersData(res));
} 