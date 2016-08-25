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
				<div className="gorTile-right">
			 		<img src="https://s15.postimg.org/nthl9w0q3/pick.png" width={50} height={50} ></img>
				</div>
			</div>
			<div className="gorLow-tile">
			 	<span>4 PPS stocking 3,456 items/hr</span>
			</div>
		</div> 
		);
	}
};

export default Tilex ;