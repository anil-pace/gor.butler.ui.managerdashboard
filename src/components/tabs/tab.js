import React  from 'react';
import ReactDOM  from 'react-dom';
class Tab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="gorTab gorContainer">
		<div className="gorMainBlock">
			<div >
				<div className="gorUpperText">
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
		);
	}
};

export default Tab ;