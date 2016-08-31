import React  from 'react';
import ReactDOM  from 'react-dom';
import Dropdown from '../components/dropdown/dropdown.js';


class OrderStatsWidget extends React.Component{
	
	render(){
		return (
		<div className="gorOrderStatsWidget">
			 <Dropdown/>
		</div> 
		);
	}
};

export default OrderStatsWidget ;

