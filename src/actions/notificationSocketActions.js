import {WS_NOTIFICATION_CONNECT,
	WS_NOTIFICATION_DISCONNECT,
	WS_NOTIFICATION_CONNECTED,
	WS_NOTIFICATION_ONMESSAGE,
	WS_NOTIFICATION_ONSEND,
	WS_NOTIFICATION_END,
	DATA_SUBSCRIPTION_PACKET,
WS_NOTIFICATION_SUBSCRIBE} from '../constants/frontEndConstants'




export function wsNotificationOnMessageAction(data){
	
	return{
		type:WS_NOTIFICATION_ONMESSAGE,
		data
	}
}
export function wsNotificationResponseAction(data){
	
	return{
		type:WS_NOTIFICATION_CONNECTED,
		data
	}
}
export function wsNotificationInit(){
	return {
		type: WS_NOTIFICATION_CONNECT
	}
}

export function wsNotificationEndConnection()
{
	return {
		type:WS_NOTIFICATION_END
	}
}
export function wsNotificationSubscribe(data)
{
	return {
		type:WS_NOTIFICATION_SUBSCRIBE,
		data
	}
}



