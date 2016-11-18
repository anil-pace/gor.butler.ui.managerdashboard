/**
 * Component for creating graph legend 
 */
import React  from 'react';
import {LEGEND_ROUND,LEGEND_RECT,LEGEND_DEFAULT} from '../../constants/appConstants'



class legendElement extends React.Component{
	constructor(props) 
	{
    	super(props);

    }	
    _processData(){
    	var type = this.props.legendType ,
    	structure;
    	var position =  "translate(" + this.props.xpos + "," + this.props.ypos + ")";
    	switch(type){
    		case LEGEND_ROUND:
    		structure =  <g transform={position}>
			    		<circle cx="20" cy="20" r="4" stroke={this.props.color}  fill={this.props.color} style={{"strokeWidth":5}}/>
						        <text x="25" y="25"  >
								    {this.props.name}
								  </text>
								  </g>
			break;
			case LEGEND_RECT:
			structure = <g transform={position}>
						<rect    fill={this.props.color} width="20" height="20"/>
				        <text x={this.props.xpos +15} y={this.props.ypos - 5}  >
						    {this.props.name}
						  </text>
						  </g>
			break;
			default:
			structure = <g transform={position}>
						<rect    fill={this.props.color} width="20" height="20"/>
				        <text x={this.props.xpos+25} y={this.props.ypos - 5}    >
						    {this.props.name}
						  </text>
						  </g>
    	}
    	return structure
    }
   
    
	render(){
		

		return (
			this._processData()
			      
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
