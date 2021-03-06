/**
 * Container for Notifications
 * 
 */
import React  from 'react';
import ResultPane from './resultPane';
import ReactDOM  from 'react-dom';
import NotificationSearchPanel from './notificationSearchPanel';
import { FormattedRelative , FormattedMessage} from 'react-intl';
import { connect } from 'react-redux'; 




class Notification extends React.Component{
	constructor(){
		super();
		this.state={
			displayResults:false
		}
		this._handleDocumentClick=this._handleDocumentClick.bind(this);
	}	
	
	_displayResults(forceClose){
		var curState = forceClose ? false : !this.state.displayResults;
		this.setState({
			displayResults: curState
		})
		if(this.props.unreadCount){
			this.props.onNotificationCountClick();
		}
	}
	/*methods to bind and unbind handlers for document click*/
  	componentDidMount(){
  		document.addEventListener('click', this._handleDocumentClick, false);
    	document.addEventListener('touchend', this._handleDocumentClick, false);
  	}
  	componentWillUnmount() {
	    document.removeEventListener('click', this._handleDocumentClick, false);
	    document.removeEventListener('touchend', this._handleDocumentClick, false);
  	} 
	
	_handleDocumentClick() {
    	if (!ReactDOM.findDOMNode(this).contains(event.target)) {
          this._displayResults(true);
    	}
  	} 
	
	render(){
		return (
			<div>
			<div className="notificationBody" onClick={this._displayResults.bind(this,false)}>
				<div className="not-icon-wrap">
					<i className="not-bell"></i>
					<span className={this.props.unreadCount ? "not-count" : "not-count read"}>{this.props.unreadCount}</span>
				</div>
			</div>
			
			<ResultPane display={this.state.displayResults}>
				<NotificationSearchPanel onPaneSearch={this.props.onPaneSearch}/>
				<div className="searchResults" onScroll={(event) => this.props.onScrollHandler(event)}>
				
					{this.props.notificationData.length ? this.props.notificationData.map((tuple, index) => (
				        <section className="row" key={index}>
							<div className="content">
								<span className={tuple.type+'-icon'}></span>
								<div className="containerText">
								<div className="title">{tuple.title.toUpperCase()}</div>
								<div className="message">{tuple.description}</div>
								<div className="time"><FormattedRelative updateInterval={10000} value={new Date(tuple.createTime)}/></div>
								</div>
							</div>
						</section>
				    )):<section className="row" >
							<p className="no-notification"> {!this.props.searchApplied ? 
								<FormattedMessage id="notifications.read.message" 
								description='No unread notifications' 
								defaultMessage='You have no unread Notifications'
								/> :<FormattedMessage id="notifications.read.noresult" 
								description='No Result Found' 
								defaultMessage='No Result Found'/>} </p>
						</section>}
				</div>
				<div className="resultFooter">
					<section className="viewAllLink">
						<a href="javascript:void(0)" onClick={this.props.handleViewAllLink}><FormattedMessage id="notification.all.link" description='View all notifications link' defaultMessage='VIEW ALL NOTIFICATIONS'/> </a>
					</section>
				</div>
					</ResultPane>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
    return {
         "timeOffset":state.authLogin.timeOffset,
     }
 }
Notification.propTypes={
	unreadCount: React.PropTypes.number,
	onPaneSearch: React.PropTypes.func.isRequired,
	notificationData:React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
	handleViewAllLink:React.PropTypes.func.isRequired,
	isLoading:React.PropTypes.bool,
	searchApplied:React.PropTypes.bool
}

export default connect(mapStateToProps)(Notification);
