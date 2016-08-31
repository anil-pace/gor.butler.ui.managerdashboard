import React  from 'react';
import ReactDOM  from 'react-dom';
import Dropdown from '../components/dropdown/dropdown.js';


class OrderStatsWidget extends React.Component{
	
	render(){
		return (
		<div className="gorOrderStatsWidget">
		<div className="gorDrop">
			 <Dropdown/>
			 </div>
		</div> 
		);
	}
};

export default OrderStatsWidget ;

