/**
 * Container for ShutterLocationTile
 * 
 */
import React  from 'react';



class ShutterLocationTile extends React.Component{	
	render(){
		return (
		 <div className="gor-shutter-status">
            <div className="gor-shutter-wrapper">
              <div className={"gor-shutter-image-status " + this.props.shutterStatus}></div>
              <div className="gor-shutter-text-status">{"Location"+this.props.shutterName}</div>
            </div>
         </div>
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