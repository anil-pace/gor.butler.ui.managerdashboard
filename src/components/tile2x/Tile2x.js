import React  from 'react';
class Tile2x extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
	render(){
		const pageId = this.props.items.pageId;
		let renderThisDiv = null;
		if(pageId === "orders"){
			renderThisDiv = (
				<div className="gor-up-tile">
					<span className="gor-heading">{this.props.items.headingleft}</span>
					<div className="gor-footer-status"> 
						<p className="gor-footer-left"><span>{this.props.items.textleft}</span></p>
						<p className="gor-footer-right"><span>{this.props.items.statusleft}</span></p>
					</div>
			 	</div>
			)
		}
		else{
			renderThisDiv = (
				<div className="gor-up-tile">
					<span className="gor-heading">{this.props.items.headingleft}</span>
					<p className="gor-heading-value"><span className={this.props.items.valueLeftStatus}>{this.props.items.textleft}</span></p>
					<p className="gor-status"><span className={this.props.items.statusLogo}></span><span className={this.props.items.statusClass}>{  this.props.items.statusleft}</span></p>
			 	</div>
			)
		}
		return (
		<div className="gor-tile gor-double">
			<div className="gor-tile-one">		 
				{renderThisDiv}
			 	<div className="gor-low-tile">
			  		<span>{this.props.items.lowleft}</span>
			 	</div>
			</div>
			<div className="gor-tile-two">
				<div className="gor-up-tile">
			  		<div className="gor-tile-left">
						<span className="gor-heading">{this.props.items.headingright}</span>
						<p className={"gor-heading-value "+this.props.items.valueRightStatus}>{this.props.items.textright}</p>
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