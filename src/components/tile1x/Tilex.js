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
					<span className="gorHeading">{this.props.items.heading}</span>
					<p className="gorHeading-value">{this.props.items.value}</p>
				</div>
				<span className="gorTile-right iStock">
			 		
				</span>
			</div>
			<div className="gorLow-tile">
			 	<span>{this.props.items.low}</span>
			</div>
		</div> 
		);
	}
};

export default Tilex ;