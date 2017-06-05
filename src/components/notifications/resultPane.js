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
ResultPane.propTypes={
	display: React.PropTypes.bool.isRequired,
	children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node
    ])
}
export default ResultPane ;
