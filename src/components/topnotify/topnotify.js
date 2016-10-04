import React  from 'react';
import ReactDOM  from 'react-dom';
class TopNotifications extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="gor-notify-top">
			<span className=''></span><span>{this.props.items.text}</span>
		</div> 
		);
	}
};

export default TopNotifications ;