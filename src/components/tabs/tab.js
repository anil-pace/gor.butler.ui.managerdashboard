import React  from 'react';


class Tab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		var icon={};
		if(this.props.subIcons === true && this.props.items.currentState === "gorError") {
			icon = <div className="tab-alert-icon"/>
		}
		else if(this.props.subIcons === true && this.props.items.currentState === "gor-online" ) {
			icon = <div className="tab-online-icon"/>
		}
		else if(this.props.subIcons === true && this.props.items.currentState === "gor-offline" ) {
			icon = <div className="tab-offline-icon"/>
		}
		else if(this.props.subIcons === true && this.props.items.currentState === "gor-alert" ) {
			icon = <div className="gor-error-white"/>
		}
		else {
			icon = <div/>
		}
		return (
		<div className="gorTab gorContainer">
		<div className={this.props.changeClass + " gor-main-block"} >
			<div className="gorInlineDisplay">
			<div>
				<div className="gor-upperText">
					{this.props.items.tab}
				</div>
			</div>
			<div className="gor-offline"> 
				<div className={this.props.items.currentState}>
					{this.props.items.Status}
				</div>
			</div>
			</div>
			<div className="gorIconsInline">
					{icon}
			</div>
		</div>

	</div>
	);
	}
}

export default Tab ;