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
			        <line x1="5" y1="15" x2="60" y2="15"  stroke={this.props.color} style={{"strokeWidth":5,"borderRadius":"2px","strokeLinecap":"round"}}  />
			        <circle cx="33" cy="15" r="8" stroke={this.props.color}  fill="#fff" style={{"strokeWidth":5}}/>
			        <text x="15" y="40" fontFamily="Verdana"  fontSize="18" >
					    {this.props.name}
					  </text>
			        </g>
			        
			      
		);
	}
};
legendElement.propTypes={
	color:React.PropTypes.string,
	xpos:React.PropTypes.number,
	ypos:React.PropTypes.number,
	name:React.PropTypes.string
}

export default legendElement ;
