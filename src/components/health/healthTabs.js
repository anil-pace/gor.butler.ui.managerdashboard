import React  from 'react';
import Health from './health';

class HealthTabs extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
			<div>
			<Health items={this.props.ppsData} />
			<Health items={this.props.butlerData} />
			<Health items={this.props.chargingData} />
			</div>
		);
	}
}
export default HealthTabs ;