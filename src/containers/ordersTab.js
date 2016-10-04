/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import OrdersSubTab from '../components/subtab/ordersTabs';


class OrdersTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
			<div >
				<div>
					<OrdersSubTab/>
				</div>
				{this.props.children}
			</div>
		);
	}
};

export default OrdersTab ;
