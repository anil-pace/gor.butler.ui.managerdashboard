import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';

class UploadDownBar extends React.Component{
	constructor(props)  
	{
    	super(props);
    }	
	render(){
		return (
			<div className="gor-utility-updown-bar">
					<div className="gor-utility-updown-wrap">
						<div className="gor-utility-updown-h1">
							{this.props.barData.h1}
						</div>
						<div className="gor-utility-updown-h2">
							{this.props.barData.h2}
						</div>
					</div> 
					<div className="gor-utility-updown-button">
						RECALL
					</div>
			</div>
		);
	}
};

export default UploadDownBar ;