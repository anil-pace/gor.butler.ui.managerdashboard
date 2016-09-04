import React  from 'react';
import ReactDOM  from 'react-dom';
import Health from '../components/health/healthTabs.js';
import Dropdown from '../components/dropdown/dropdown.js';
import ChartHorizontal from '../components/graphd3/graph_horizontal';
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
		
		<div id="performanceGraph">
			<ChartHorizontal/>
		</div> 
		</div>
		);
	}
};

export default PerformanceWidget ;

