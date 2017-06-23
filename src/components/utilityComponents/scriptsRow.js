import React  from 'react';
import { FormattedMessage } from 'react-intl';

class ScriptsRow extends React.Component{
	
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
					<div className="gor-utility-updown-button" onClick={this.props.barAction}>
						{this.props.barData.buttonText}
					</div>
			</div>
		);
	}
};

export default ScriptsRow ;