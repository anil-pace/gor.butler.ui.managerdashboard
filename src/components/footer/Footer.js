import React  from 'react';
import ReactDOM  from 'react-dom';
class Footer extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="gor-footer">
			Copyright @ 2016 GreyOrange Pte Ltd
		</div> 
		);
	}
};

export default Footer ;