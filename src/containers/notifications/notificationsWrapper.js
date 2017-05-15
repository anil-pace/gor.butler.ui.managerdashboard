/**
 * Container for Notifications
 * 
 */
import React  from 'react';
import Notification from '../../components/notifications/notifications'


class NotificationsWrapper extends React.Component{
		
	render(){
		return (
			<div className="notificationWrap">
				<Notification />
				
			</div>
		);
	}
}

export default NotificationsWrapper ;
