import React  from 'react';
import ReactDOM  from 'react-dom';


class SubTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="gorSubTab gorContainer">
			<div className={this.props.changeClass}>
			<div className="gor-upperText">
				{this.props.item}
				</div>
			</div>
		</div>
	);
	}
};

export default SubTab ;