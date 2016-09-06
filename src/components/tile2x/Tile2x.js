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
					<span className="gorHeading">Orders to fulfill</span>
					<p className="gorHeading-value">{this.props.items.count_pending}</p>
					<p className="gorStatus gorSuccess"><span><img src="../src/assets/images/pick.png" width={20} height={20} />{this.props.items.status}</span></p>
			 	</div>
			 	<div className="gorLow-tile">
			  		<span>{this.props.items.avg}</span>
			 	</div>
			</div>
			<div className="gorTile-two">
				<div className="gorUp-tile">
			  		<div className="gorTile-left">
						<span className="gorHeading gorBreach">Remaining time</span>
						<p className="gorHeading-value gorRisk">{this.props.items.eta}</p>
						<p className="gorStatus gorSuccess"><span><img src="../src/assets/images/pick.png" width={20} height={20} />{this.props.items.time_current}</span></p>
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