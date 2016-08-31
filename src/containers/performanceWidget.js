import React  from 'react';
import ReactDOM  from 'react-dom';
import Health from '../components/health/healthTabs.js'
class PerformanceWidget extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="gorPerformanceWidget">
			<Health/>
		</div> 
		);
	}
};

export default PerformanceWidget ;

