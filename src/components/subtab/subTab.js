import React  from 'react';
import ReactDOM  from 'react-dom';
import {Link}  from 'react-router';

class SubTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		console.log(this.props.item)
		return (
		<div className="gorSubTab gorContainer">
			<div className="gorMainBlock gor-upperText">
				{this.props.item[0].tabContent}
			</div>
		</div>
	);
	}
};

export default SubTab ;