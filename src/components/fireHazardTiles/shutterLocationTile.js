/**
 * Container for ShutterLocationTile
 * 
 */
import React  from 'react';



class ShutterLocationTile extends React.Component{	
	render(){
		return (
		 <span className="gor-shutter-status">

              <span className={"gor-shutter-image-status " + this.props.shutterStatus}></span>
              <span title={this.props.shutterName} className="gor-shutter-text-status">{this.props.shutterName}</span>

         </span>
		);
	}
}
ShutterLocationTile.propTypes={
	children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node
    ])
}
export default ShutterLocationTile ;