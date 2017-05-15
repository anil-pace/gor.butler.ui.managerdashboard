/**
 * Container for Notifications
 * 
 */
import React  from 'react';
import ResultPane from './resultPane';
import NotificationSearchPanel from './notificationSearchPanel';



class Notification extends React.Component{
	constructor(){
		super();
		this.state={
			displayResults:false
		}
	}	
	
	_displayResults(){
		var curState = !this.state.displayResults;
		this.setState({displayResults: curState})
	}
	
	render(){
		return (
			<div>
			<div className="notificationBody" onClick={this._displayResults.bind(this)}>
				<div className="not-icon-wrap">
					<i className="not-bell"></i>
					<span className="not-count">12</span>
				</div>
			</div>
			
			<ResultPane display={this.state.displayResults}>
				<NotificationSearchPanel />
				<div className="searchResults">
						<section className="row">
							<div className="content">
								<p className="message">{"Butler 007 stopped under charging station"}</p>
								<p><span className="time">{"1 min ago"}</span><span className="errorMsg">{"System Error [Butler]"}</span></p>
							</div>
							<div className="status">
								<i className="not-statusIcon"></i>
							</div>
						</section>
						
				</div>
					</ResultPane>
			</div>
		);
	}
}

export default Notification ;
