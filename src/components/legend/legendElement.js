/**
 * Component for creating graph legend 
 */
import React  from 'react';



class legendElement extends React.Component{
	constructor(props) 
	{
    	super(props);

    }	
    
   
    
	render(){
		var position =  "translate(" + this.props.xpos + "," + this.props.ypos + ")";
		return (
			  <g transform={position}>
			        <line x1="5" y1="5" x2="40" y2="5" stroke={this.props.color} stroke-width="5"  />
			        
			      </g>
		);
	}
};

export default legendElement ;
