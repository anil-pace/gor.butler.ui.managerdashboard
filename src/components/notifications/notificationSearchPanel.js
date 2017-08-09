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
	_handleSubmit(e){
		e.preventDefault();
		this.props.onPaneSearch(this.searchInput.value.trim());
	}
	render(){
		return (
				<div className="paneWrap">
				<span className="calloutArr"></span>
				<div className="paneHeader">
				<section className="paneHeader">
					<span className="headerText">{this.props.headerText}</span>
					<span className="searchIcon" onClick={this._displaySearch.bind(this)}></span>
				</section>
				</div>
				<div className="searchBoxWrap" style={{"display":(this.state.displaySearch?"block":"none")}}>
				<form action="#" onSubmit={(e) => this._handleSubmit(e)}>
				<section className="searchBoxCnt">
					<input type="text" className="searchBox" ref={(searchInput) => this.searchInput = searchInput} placeholder={this.props.notificationPlaceholder}/>
					<input type="submit" className="paneSearch" value={this.props.notificationButtonText} />
				</section>
				</form>
				</div>
				</div>
		);
	}
}



export default NotificationSearchPanel ;
