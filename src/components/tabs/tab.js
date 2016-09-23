import React  from 'react';
import ReactDOM  from 'react-dom';


class Tab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){

		return (
		<div className="gorTab gorContainer">
		<div className={this.props.changeClass}>
			<div >
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
		
	</div>
	);
	}
};

export default Tab ;