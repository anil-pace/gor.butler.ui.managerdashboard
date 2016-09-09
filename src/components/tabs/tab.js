import React  from 'react';
import ReactDOM  from 'react-dom';
import {Link}  from 'react-router';

class Tab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<Link to="/system">
		<div className="gorTab gorContainer">
		<div className="gorMainBlock">
			<div >
				<div className="gor-upperText">
					OVERVIEW
				</div>
			</div>
			<div className="gorOffline"> 
				<div className="gorSubText">
					Fulfilling orders
				</div>

				
			</div>	
		</div>
		
	</div>
	</Link>
		);
	}
};

export default Tab ;