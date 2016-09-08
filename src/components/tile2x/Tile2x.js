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
					<span className="gorHeading">{this.props.items.headingleft}</span>
					<p className="gorHeading-value"><span className={this.props.items.valueStatus}>{this.props.items.textleft}</span></p>
					<p className="gorStatus"><div className={this.props.items.statusLogo}></div><span className={this.props.items.statusClass}>{this.props.items.statusleft}</span></p>
			 	</div>
			 	<div className="gorLow-tile">
			  		<span>{this.props.items.lowleft}</span>
			 	</div>
			</div>
			<div className="gorTile-two">
				<div className="gorUp-tile">
			  		<div className="gorTile-left">
						<span className="gorHeading">{this.props.items.headingright}</span>
						<p className="gorHeading-value gorRisk">{this.props.items.textright}</p>
						<p className="gorStatus"><span>{this.props.items.statusright}</span></p>
			   		</div>
					<div className={"gorTile-right "+this.props.items.logo}>
			 			
					</div>
			 	</div>
				<div className="gorLow-tile">
			 		<span>{this.props.items.lowright}</span>
				</div>
		  	</div>
		  </div>
		);
	}
};

export default Tile2x;