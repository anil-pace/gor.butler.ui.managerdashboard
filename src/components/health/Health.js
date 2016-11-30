import React  from 'react';
import { FormattedMessage } from 'react-intl';

class Health extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){

	
		return (
		<div className="health mainBlock">
		<div className="block attributes">
			<div className="upperText">
				{this.props.items[0].component.componentNumber}
			</div>
			<div className="subtext">
				{this.props.items[0].component.componentType}
			</div>
		</div>
		<div className="horizontal-line"> </div>
		<div className="block">
			<div className="block parameters">
			<div className="block paramPositionMiddle ">
					<div className="block onState" >
						<span>{this.props.items[0].states.onState}</span>
					</div>
					<div className="status"><FormattedMessage id="healthTab.status.on" description="on status for healthtab" defaultMessage ="On"/> </div>
				</div>
				<div className="block paramPositionMiddle ">
					<div className="block offState" >
						<span>{this.props.items[0].states.offState}</span>
					</div>
					<div className="status"><FormattedMessage id="healthTab.status.off" description="off status for healthtab" defaultMessage ="Off"/></div>
				</div>
				
				
			</div>
		</div>
	</div>
		);
	}
}

export default Health ;