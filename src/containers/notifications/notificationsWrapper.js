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
import {wsNotificationInit,wsNotificationSubscribe} from '../../actions/notificationSocketActions';



class NotificationsWrapper extends React.Component{
	
    constructor(props) {
        super(props);
       
        this.state = {
            page:0,
            size:15,
            sort:"createTime",
            order:"DESC",
            value:"",
            subscriptionSent:false
             
        }
    }
	_viewAllLinkClick(){
		 
		 modal.add(ViewAllNotificationWrapper, {
            title: '',
            size: 'large', 
            closeOnOutsideClick: true, 
            hideCloseButton: true 
        });
	}
	_onPaneSearch(value){
		this.setState({
            value,
            page: value ? this.state.page : 0
        },function(){
            if(this.state.value){
            let params={
                'url':NOTIFICATIONS_URL+"?page="+this.state.page+"&size="+this.state.size+
                "&searchTerm="+this.state.value+"&sort="+this.state.sort+"&order="+this.state.order,
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
        
            })
    
	}
    _onScrollHandler(event){
        if(this.props.searchApplied && (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight)){
            let page = this.props.searchDataFound === false ? this.state.page: this.state.page + 1;
            this.setState({
                    page
                },function(){
                    this._onPaneSearch(this.state.value);
                })
                
                
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
        if(nextProps.notificationSocketConnected && !this.state.subscriptionSent){
            this.setState({
                subscriptionSent:true
            },function(){
                this.props.wsNotificationSubscribe('/dashboard/notification');
            })
            
        }
    }
		
	render(){
		var notificationData = this.props.searchApplied ? this.props.searchedNotificationData : this.props.wsNotificationData ;
		return (
			<div className="notificationWrap">
				<Notification onScrollHandler={this._onScrollHandler.bind(this)} 
                unreadCount={this.props.unreadCount} 
                onNotificationCountClick={this._onNotificationCountClick.bind(this)} 
                notificationData={notificationData} 
                onPaneSearch={this._onPaneSearch.bind(this)} 
                handleViewAllLink = {this._viewAllLinkClick.bind(this)}
                searchApplied={this.props.searchApplied}
                />
               
				
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
        "readNotificationList":state.notificationReducer.readNotificationList,
        "isLoading":state.notificationReducer.isLoading,
        "searchDataFound":state.notificationReducer.searchDataFound
    }
}
function mapDispatchToProps(dispatch){
	return{
		getNotificationData:function(params){dispatch(getNotificationData(params));},
		wsNotificationInit:function(){dispatch(wsNotificationInit());},
		resetNotificationData:function(){dispatch(resetNotificationData());},
        wsNotificationSubscribe:function(){dispatch(wsNotificationSubscribe());}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(NotificationsWrapper);


