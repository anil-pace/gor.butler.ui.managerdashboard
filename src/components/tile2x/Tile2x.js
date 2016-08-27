import React  from 'react';
import ReactDOM  from 'react-dom';
class Tile2x extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
	render(){
		return (
		<div className="gorTile gorDouble">
			<div className="gorTile-one">		 
				<div className="gorUp-tile">
					<span className="gorHeading">{this.props.items.heading1}</span>
					<p className="gorHeading-value">{this.props.items.value1}</p>
					<p className="gorStatus gorSuccess"><span><img src="../src/assets/images/pick.png" width={20} height={20} />{this.props.items.status1}</span></p>
			 	</div>
			 	<div className="gorLow-tile">
			  		<span>{this.props.items.low1}</span>
			 	</div>
			</div>
			<div className="gorTile-two">
				<div className="gorUp-tile">
			  		<div className="gorTile-left">
						<span className="gorHeading gorBreach">{this.props.items.heading2}</span>
						<p className="gorHeading-value gorRisk">{this.props.items.value2}</p>
						<p className="gorStatus gorSuccess"><span><img src="../src/assets/images/pick.png" width={20} height={20} />{this.props.items.status2}</span></p>
			   		</div>
					<div className="gorTile-right iStock">
			 			
					</div>
			 	</div>
				<div className="gorLow-tile">
			 		<span>{this.props.items.low2}</span>
				</div>
		  	</div>
		  </div>
		);
	}
};

export default Tile2x;