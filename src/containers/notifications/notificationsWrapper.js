/**
 * Container for Notifications
 * 
 */
import React  from 'react';
import Notification from '../../components/notifications/notifications';
import {modal} from 'react-redux-modal';
import ViewAllNotifications from '../../components/notifications/viewAllNotificationModal'


class NotificationsWrapper extends React.Component{
	

	_viewAllLinkClick(){
		 
		 modal.add(ViewAllNotifications, {
            title: '',
            size: 'large', 
            closeOnOutsideClick: true, 
            hideCloseButton: true 
        });
	}	
	render(){
		
		return (
			<div className="notificationWrap">
				<Notification handleViewAllLink = {this._viewAllLinkClick.bind(this)}/>
				
			</div>
		);
	}
}

export default NotificationsWrapper ;
