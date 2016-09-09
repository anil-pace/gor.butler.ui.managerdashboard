import React  from 'react';
import ReactDOM  from 'react-dom';
import Health from './health';

class HealthTabs extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		const item1 = [
		{ component:{componentNumber: '16', componentType: 'PPS'}, states:{stoppedState:'3', onState:'12', errorState:'1'} }
		]

		const item2 = [
		{ component:{componentNumber: '360', componentType: 'Butler bots'}, states:{stoppedState:'2', onState:'358', errorState:'0'} }
		]

		const item3 = [
		{ component:{componentNumber: '20', componentType: ' Charging Stations '}, states:{stoppedState:'1', onState:'16', errorState:'3'} }
		]
		
		return (
			<div>
			<Health items={item1} />
			<Health items={item2} />
			<Health items={item3} />
			</div>
		);
	}
};
export default HealthTabs ;