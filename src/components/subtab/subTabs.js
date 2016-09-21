/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import SubTab from './subTab';
import {Link}  from 'react-router';
class SystemTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		var item1=[{tabContent:"Notification"}];
		var item2=[{tabContent:"Butler Bots"}];
		var item3=[{tabContent:"PPS"}];
		var item4=[{tabContent:"Charging Station"}];
		/**
		 * Need to remove these hardcoded variables
		 * 
		 */
		
		return (
			<div>
				<div className="gorMainSubtab">
					<Link to="/notification">
						<SubTab item={item1}/> 
					</Link>
					<Link to="/butlerbots">
						<SubTab item={item2}/> 
					</Link>
					<Link to="/pps">
						<SubTab item={item3}/> 
					</Link>
					<Link to="/chargingstation">
						<SubTab item={item4}/> 
					</Link>
				</div>
			</div>
		);
	}
};

export default SystemTab ;

