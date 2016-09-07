import React  from 'react';
import ReactDOM  from 'react-dom';
import Health from './health';

class HealthTabs extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		const item = [
		{ value: 'RENDER_SYSTEM_HEALTH', label: 'System Health' },
		{ value: 'RENDER_SYSTEM_PERFORMANCE', label: 'System Performance' },
		]
		
		return (
			<div>
			<Health />
			<Health />
			<Health />
			</div>
		);
	}
};
export default HealthTabs ;