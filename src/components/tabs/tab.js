import React  from 'react';


class Tab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		var icon={};
		if(this.props.subIcons === true && this.props.items[0].currentState === "gorError") {
			icon = <div className="tab-alert-icon"/>
		}
		else if(this.props.subIcons === true && this.props.items[0].currentState === "gorOnline" ) {
			icon = <div className="tab-online-icon"/>
		}
		else {
			icon = <div/>
		}
		return (
		<div className="gorTab gorContainer">
		<div className={this.props.changeClass + " gorMainBlock"} >
			<div className="gorInlineDisplay">
			<div>
				<div className="gor-upperText">
					{this.props.items[0].tab}
				</div>
			</div>
			<div className="gorOffline"> 
				<div className={this.props.items[0].currentState}>
					{this.props.items[0].Status}
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