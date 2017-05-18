/**
 * Container for Notifications
 * 
 */
import React  from 'react';



class ResultPane extends React.Component{
	
	
	render(){
		return (
			<div className="resultOverlay" style={{"display":(this.props.display ? "block" : "none")}}>
				{this.props.children}

			</div>
		);
	}
}

export default ResultPane ;
