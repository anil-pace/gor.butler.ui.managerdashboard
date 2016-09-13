import React  from 'react';
import ReactDOM  from 'react-dom';
class Tile2x extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
	render(){
		return (
		<div className="gor-tile gor-double">
			<div className="gor-tile-one">		 
				<div className="gor-up-tile">
					<span className="gor-heading">{this.props.items.headingleft}</span>
					<p className="gor-heading-value"><span className={this.props.items.valueStatus}>{this.props.items.textleft}</span></p>
					<p className="gor-status"><div className={this.props.items.statusLogo}></div><span className={this.props.items.statusClass}>{this.props.items.statusleft}</span></p>
			 	</div>
			 	<div className="gor-low-tile">
			  		<span>{this.props.items.lowleft}</span>
			 	</div>
			</div>
			<div className="gor-tile-two">
				<div className="gor-up-tile">
			  		<div className="gor-tile-left">
						<span className="gor-heading">{this.props.items.headingright}</span>
						<p className="gor-heading-value gorRisk">{this.props.items.textright}</p>
						<p className="gor-status">{this.props.items.statusright}</p>
			   		</div>
					<div className={"gor-tile-right "+this.props.items.logo}>
			 			
					</div>
			 	</div>
				<div className="gor-low-tile">
			 		<span>{this.props.items.lowright}</span>
				</div>
		  	</div>
		  </div>
		);
	}
};

export default Tile2x;