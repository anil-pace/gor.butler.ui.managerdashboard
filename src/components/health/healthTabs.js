import React  from 'react';
import Health from './Health';

class HealthTabs extends React.Component{
		
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