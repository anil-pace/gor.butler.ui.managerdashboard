/**
 * Container for Notifications
 * 
 */
import React  from 'react';
import { connect } from 'react-redux';
import Notification from '../../components/notifications/notifications';
import {modal} from 'react-redux-modal';
import ViewAllNotificationWrapper from './viewAllNotificationWrapper';
import {NOTIFICATIONS_URL,READ_MSG_URL} from '../../constants/configConstants';
import {GET,POST,APP_JSON,SEARCHED_NOTIFICATIONS_DATA} from '../../constants/frontEndConstants';
import {getNotificationData,resetNotificationData} from '../../actions/notificationAction';
import {wsNotificationInit} from '../../actions/notificationSocketActions';



class NotificationsWrapper extends React.Component{
	

	_viewAllLinkClick(){
		 
		 modal.add(ViewAllNotificationWrapper, {
            title: '',
            size: 'large', 
            closeOnOutsideClick: true, 
            hideCloseButton: true 
        });
	}
	_onPaneSearch(value){
		if(value){
		let params={
                'url':NOTIFICATIONS_URL+"?page=0&size=10&searchTerm="+value,
                'method':GET,
                'cause':SEARCHED_NOTIFICATIONS_DATA,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'withCredentials':true
            }
        this.props.getNotificationData(params);
    }
    else{
    	this.props.resetNotificationData();
    }
	}
	_onNotificationCountClick(){
		
		let params={
                'url':READ_MSG_URL,
                'method':POST,
                'cause':"SEND_READ_INTIMATION",
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'formdata':JSON.parse(JSON.stringify(this.props.readNotificationList))
            }
        this.props.getNotificationData(params);
    
	}
	componentDidMount(){
		this.props.wsNotificationInit();
	}
	componentWillReceiveProps(nextProps){
		console.log(nextProps.notificationSocketConnected);
	}	
	render(){
		var notificationData = this.props.searchApplied ? this.props.searchedNotificationData : this.props.wsNotificationData ;
		return (
			<div className="notificationWrap">
				<Notification unreadCount={this.props.unreadCount} onNotificationCountClick={this._onNotificationCountClick.bind(this)} notificationData={notificationData} onPaneSearch={this._onPaneSearch.bind(this)} handleViewAllLink = {this._viewAllLinkClick.bind(this)}/>
				
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
    return {
        "searchedNotificationData": state.notificationReducer.searchedNotificationData || [],
        "searchApplied":state.notificationReducer.searchApplied,
        "notificationSocketConnected":state.notificationSocketReducer.notificationSocketConnected,
        "wsNotificationData":state.notificationReducer.wsNotificationData || [],
        "unreadCount":state.notificationReducer.unreadCount,
        "readNotificationList":state.notificationReducer.readNotificationList
    }
}
function mapDispatchToProps(dispatch){
	return{
		getNotificationData:function(params){dispatch(getNotificationData(params));},
		wsNotificationInit:function(){dispatch(wsNotificationInit());},
		resetNotificationData:function(){dispatch(resetNotificationData());}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(NotificationsWrapper);


