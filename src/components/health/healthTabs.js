import React  from 'react';
import ReactDOM  from 'react-dom';
import Health from './health';

class HealthTabs extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
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