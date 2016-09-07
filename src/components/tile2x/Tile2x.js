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
					<span className="gorHeading">{this.props.heading}</span>
					<p className="gorHeading-value"><span className={this.props.valueStatus}>{this.props.items.count_pending}</span></p>
					<p className="gorStatus"><span className={this.props.statusClass}>{this.props.items.status}</span></p>
			 	</div>
			 	<div className="gorLow-tile">
			  		<span>{this.props.items.avg}</span>
			 	</div>
			</div>
			<div className="gorTile-two">
				<div className="gorUp-tile">
			  		<div className="gorTile-left">
						<span className="gorHeading">Remaining time</span>
						<p className="gorHeading-value gorRisk">23:51</p>
						<p className="gorStatus gorSuccess"><span><img src="../src/assets/images/pick.png" width={20} height={20} />{this.props.items.time_current}</span></p>
			   		</div>
					<div className="gorTile-right iStock">
			 			
					</div>
			 	</div>
				<div className="gorLow-tile">
			 		<span>Something pr/hr</span>
				</div>
		  	</div>
		  </div>
		);
	}
};

export default Tile2x;