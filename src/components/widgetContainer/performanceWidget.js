import React  from 'react';
import ReactDOM  from 'react-dom';
import Health from '../health/healthTabs.js'
class PerformanceWidget extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="performanceWidget">
			<Health/>
		</div> 
		);
	}
};

export default PerformanceWidget ;

