import {WS_CONNECT,WS_DISCONNECT,WS_CONNECTED,WS_ONMESSAGE,WS_ONSEND,WS_URL,WS_END} from '../constants/appConstants'
import {REQUEST_HEADER,RECIEVE_HEADER,RECIEVE_ITEM_TO_STOCK} from '../constants/appConstants.js';
import {socketMiddleware} from '../middleware/socketMiddleware';
//import {getFetchData} from 'headerAction'


export function wsOnMessageAction(data){
	
	return{
		type:WS_ONMESSAGE,
		data
	}
}
export function wsResponseAction(data){
	
	return{
		type:WS_CONNECTED,
		data
	}
}
export function setWsAction(params){
	return {
		type: params.type,
		data: params.data
	}
}
export function endWsAction()
{
	return { type: WS_DISCONNECT }
}
export function wsEndConnection()
{
	return {
		type:WS_END
	}
}
export function setMockAction(params){
	return {
		type: params.type,
		data: params.data
	}
}


