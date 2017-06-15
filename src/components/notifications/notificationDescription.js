/**
 * Container for Notifications
 * 
 */
import React  from 'react';



class NotificationDescription extends React.Component{
	
	
	render(){
		return (
			<div className="notification-desc" >
				{this.props.children}

			</div>
		);
	}
}

export default NotificationDescription ;
