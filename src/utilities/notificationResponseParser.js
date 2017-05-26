
import {recieveWSNotification} from '../actions/notificationAction';


export function NotificationResponseParse(store,res)
{
		store.dispatch(recieveWSNotification(res));
}  