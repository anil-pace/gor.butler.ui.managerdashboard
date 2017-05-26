/**
 * Container for Notifications
 * 
 */
import React  from 'react';
import ResultPane from './resultPane';
import NotificationSearchPanel from './notificationSearchPanel';
import { FormattedRelative, FormattedDate , FormattedMessage} from 'react-intl';




class Notification extends React.Component{
	constructor(){
		super();
		this.state={
			displayResults:false
		}
	}	
	
	_displayResults(){
		var curState = !this.state.displayResults;
		this.setState({
			displayResults: curState
		})
		if(this.props.unreadCount){
			this.props.onNotificationCountClick();
		}
	}
	
	
	
	render(){
		return (
			<div>
			<div className="notificationBody" onClick={this._displayResults.bind(this)}>
				<div className="not-icon-wrap">
					<i className="not-bell"></i>
					<span className={this.props.unreadCount ? "not-count" : "not-count read"}>{this.props.unreadCount}</span>
				</div>
			</div>
			
			<ResultPane display={this.state.displayResults}>
				<NotificationSearchPanel onPaneSearch={this.props.onPaneSearch}/>
				<div className="searchResults" >
					{this.props.notificationData.length ? this.props.notificationData.map((tuple, index) => (
				        <section className="row" key={index}>
							<div className="content">
								<p className="message">{tuple.description}</p>
								<p><span className="time"><FormattedRelative updateInterval={10000} value={new Date(tuple.createTime)}/></span><span className="errorMsg">{tuple.title}</span></p>
							</div>
							<div className="status">
								
							</div>
						</section>
				    )):<section className="row" >
							<p> <FormattedMessage id="notifications.read.message" description='No unread notifications' defaultMessage='You have no unread Notifications'/> </p>
						</section>}
				</div>
				<div className="resultFooter">
					<section className="viewAllLink">
						<a href="javascript:void(0)" onClick={this.props.handleViewAllLink}>VIEW ALL NOTIFICATIONS </a>
					</section>
				</div>
					</ResultPane>
			</div>
		);
	}
}

export default Notification ;
