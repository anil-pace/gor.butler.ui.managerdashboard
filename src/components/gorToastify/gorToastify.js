/**
 * Container for Toastify
 * 
 */
import React  from 'react';



class GORToastify extends React.Component{
	
	
	render(){
		return (
		<div className="gor-toastify">
   			{this.props.children}
		</div>
		);
	}
}
GORToastify.propTypes={
	children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node
    ])
}
export default GORToastify ;