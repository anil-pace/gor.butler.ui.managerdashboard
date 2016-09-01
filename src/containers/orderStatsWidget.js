import React  from 'react';
import ReactDOM  from 'react-dom';
import Dropdown from '../components/dropdown/dropdown.js';
import Chart from '../components/graphd3/graphd3';

class OrderStatsWidget extends React.Component{
	
	render(){
		return (
		<div className="gorOrderStatsWidget">
		<div className="gorDrop">
			 <Dropdown/>
			 <Chart/>
			 </div>
		</div> 
		);
	}
};

export default OrderStatsWidget ;

