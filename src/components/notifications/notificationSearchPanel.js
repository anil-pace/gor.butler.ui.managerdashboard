/**
 * Container for Notifications
 * 
 */
import React  from 'react';



class NotificationSearchPanel extends React.Component{
	
	constructor(){
		super();
		this.state={
			displaySearch:false
		}
	}		
	
	_displaySearch(){
		var curState = !this.state.displaySearch;
		this.setState({displaySearch: curState})
	}
	render(){
		return (
				<div>
				<div className="paneHeader">
				<section className="paneHeader">
					<span className="headerText">Notifications</span>
					<span className="searchIcon" onClick={this._displaySearch.bind(this)}></span>
				</section>
				</div>
				<div className="searchBoxWrap" style={{"display":(this.state.displaySearch?"block":"none")}}>
				<section className="searchBoxCnt">
					<input type="text" className="searchBox" />
				</section>
				</div>
				</div>
		);
	}
}

export default NotificationSearchPanel ;
