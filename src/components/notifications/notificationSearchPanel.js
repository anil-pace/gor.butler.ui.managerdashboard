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
				<div>
				<div className="paneHeader">
				<section className="paneHeader">
					<span className="headerText">Notifications</span>
					<span className="searchIcon" onClick={this._displaySearch.bind(this)}></span>
				</section>
				</div>
				<div className="searchBoxWrap" style={{"display":(this.state.displaySearch?"block":"none")}}>
				<form action="#" onSubmit={(e) => this._handleSubmit(e)}>
				<section className="searchBoxCnt">
					<input type="text" className="searchBox" ref={(searchInput) => this.searchInput = searchInput} placeholder="Search Notifications"/>
					<input type="submit" className="paneSearch" value="SEARCH" />
				</section>
				</form>
				</div>
				</div>
		);
	}
}

NotificationSearchPanel.propTypes={
	
}

export default NotificationSearchPanel ;
