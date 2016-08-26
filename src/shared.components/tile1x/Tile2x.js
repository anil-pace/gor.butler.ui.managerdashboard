import React  from 'react';
import ReactDOM  from 'react-dom';
class Tile2x extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
	render(){
		return (
		<div className ="col span_2_of_4 gorNoML">
		<div className="gorTile gorDouble">
			<div className="gorTile-one">		 
				<div className="gorUp-tile">
					<span className="gorHeading">Items in stock</span>
					<p className="gorHeading-value">4,12,132</p>
					<p className="gorStatus gorSuccess"><span><img src="pick.png" width={20} height={20} />On Schedule</span></p>
			 	</div>
			 	<div className="gorLow-tile">
			  		<span>4 PPS stocking 3,456 items/hr</span>
			 	</div>
			</div>
			<div className="gorTile-two">
				<div className="gorUp-tile">
			  		<div className="gorTile-left">
						<span className="gorHeading gorBreach">Items in stock</span>
						<p className="gorHeading-value gorRisk">4,12,132</p>
						<p className="gorStatus gorSuccess"><span><img src="pick.png" width={20} height={20} />On Schedule</span></p>
			   		</div>
					<div className="gorTile-right">
			 			<img src="https://s15.postimg.org/nthl9w0q3/pick.png" width={50} height={50} />
					</div>
			 	</div>
				<div className="gorLow-tile">
			 		<span>4 PPS stocking 3,456 items/hr</span>
				</div>
		  	</div>
		  </div>
		  </div>
		);
	}
};

export default Tile2x;