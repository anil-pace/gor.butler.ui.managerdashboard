import React  from 'react';
import ReactDOM  from 'react-dom';
import Health from '../components/health/healthTabs.js';
import Dropdown from '../components/dropdown/dropdown.js';
class PerformanceWidget extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="gorPerformanceWidget">
		<div className="gorDrop">
			 <Dropdown/>
			 </div>
		
		<div>
			<Health/>
		</div> 
		</div>
		);
	}
};

export default PerformanceWidget ;

