import React  from 'react';
import ReactDOM  from 'react-dom';
class Tabs extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="gorTab container">
		<div className="mainBlock">
			<div >
				<div className="upperText">
					OVERVIEW
				</div>
			</div>
			<div className="offline"> 
				<div className="subText">
					Fulfilling orders
				</div>

				
			</div>	
		</div>
		<div className="mainBlock">
			<div className="inline">
				<div className="upperText system">
					SYSTEM
				</div>
				<span className="statusAl"></span>
			</div>
			<div className="online"> 
				<div className="subText">
					Online
				</div>

				
			</div>	
		</div>
		<div className="gorTab mainBlock">
			<div className="inline">
				<div className="upperText">
					ORDERS
				</div>
				<span className="statusAl"></span>
			</div>
			<div className="risk"> 
				<div className="subText">
					More PPS
				</div>

				
			</div>	
		</div>
		<div className="gorTab mainBlock">
			<div className="inline">
				<div className="upperText">
					INVENTORY
				</div>
			</div>
			<div className="offline"> 
				<div className="subText">
					78% space utilised
				</div>

				<div className="inline">
					<img src=""></img>
				</div>
			</div>	
		</div>
		<div className="gorTab mainBlock">
			<div className="inline">
				<div className="upperText">
					USERS
				</div>
			</div>
			<div className="offline"> 
				<div className="subText">
					35 users logged in
				</div>

				<div className="inline">
					<img src=""></img>
				</div>
			</div>	
		</div>
	</div>
		);
	}
};

export default Tabs ;