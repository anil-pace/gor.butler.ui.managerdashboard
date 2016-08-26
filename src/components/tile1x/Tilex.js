import React  from 'react';
import ReactDOM  from 'react-dom';
class Tilex extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="gorTile gorSingle">
			<div className="gorUp-tile">
				<div className="gorTile-left">
					<span className="gorHeading">Items in stock</span>
					<p className="gorHeading-value">4,12,132</p>
				</div>
				<span className="gorTile-right iStock">
			 		
				</span>
			</div>
			<div className="gorLow-tile">
			 	<span>4 PPS stocking 3,456 items/hr</span>
			</div>
		</div> 
		);
	}
};

export default Tilex ;