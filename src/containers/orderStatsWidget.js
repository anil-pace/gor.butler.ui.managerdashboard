import React  from 'react';
import ReactDOM  from 'react-dom';
import Dropdown from '../components/dropdown/dropdown.js';
import Chart from '../components/graphd3/graphd3';
import ChartHorizontal from '../components/graphd3/graph_horizontal';

class OrderStatsWidget extends React.Component{
	
	render(){

		const item = [
      { value: 'one', label: 'PPS - pick performance' },
      { value: 'three', label: 'PPS - pick performance' },
      { value: 'four', label: 'PPS - audit performance' },
      
    ]
	return (
			<div className="gorOrderStatsWidget">
				<div className="gorDrop">
				<Dropdown items={item}/>
				<div id="chart_att">
					
					</div>
				</div>
			</div> 
		);
	}
};

export default OrderStatsWidget ;

