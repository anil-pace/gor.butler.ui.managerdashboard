/**
 * Component for creating graph legend 
 */
import React  from 'react';
import {LEGEND_ROUND,LEGEND_RECT} from '../../constants/frontEndConstants'



class legendElement extends React.Component{
	
    _processData(){
    	var type=this.props.legendType ,
    	structure,name;
    	var position= "translate(" + this.props.xpos + "," + this.props.ypos + ")";
    	switch(type){
    		case LEGEND_ROUND:
    		name=this.props.name;
    		structure= <g transform={position}>
			    		<circle cx="20" cy="20" r="4" stroke={this.props.color}  fill={this.props.color} style={{"strokeWidth":5}}/>
						        <text x="30" y="25"  >
								    {name}
								  </text>
								  </g>
			break;
			case LEGEND_RECT:
			name=name=this.props.name;
			structure=<g transform={position}>
						<rect    fill={this.props.color} width="20" height="20"/>
				        <text x={this.props.xpos +15} y={this.props.ypos - 5}  >
						   <foreignobject> {name}</foreignobject>
						  </text>
						  </g>
			break;
			default:
			name=name=this.props.name;
			structure=<g transform={position}>
						<rect    fill={this.props.color} width="20" height="20"/>
				        <text x={this.props.xpos+25} y={this.props.ypos - 5}    >
						    {name}
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
	name:React.PropTypes.object
}
legendElement.contextTypes={
  intl: React.PropTypes.object.isRequired
}

export default legendElement ;
