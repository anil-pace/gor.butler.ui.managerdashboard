import React  from 'react';
import ReactDOM  from 'react-dom';
import Dropdown from '../components/dropdown/dropdown.js';
import Chart from '../components/graphd3/graphd3';
import ChartHorizontal from '../components/graphd3/graph_horizontal';

class OrderStatsWidget extends React.Component{
	
	render(){
		return (
			<div className="gorOrderStatsWidget">
				<div className="gorDrop">
				<Dropdown/>
				<div id="chart_att">
					<Chart/>
					</div>
				</div>
			</div> 
		);
	}
};

export default OrderStatsWidget ;

