/**
 * Component for creating graph legend 
 */
import React  from 'react';
import LegendElement  from './legendElement';



class Legend extends React.Component{
	constructor(props) 
	{
    	super(props);

    }	
    
    _processData(){
    	var data = this.props.legendData
    	var elements = data.map(function(item, i){
	      return (
	        <LegendElement color={item.color} xpos="0" ypos={100+i*20} data={item.name} key={i} ikey={i}/>
	      )
	    })
    return elements;
    }
    
	render(){
		var elements = this._processData();
		return (
			<div className="histogram">
				 <svg className="legend" width={this.props.width} >
				 	{elements}
				 </svg>
			</div>
		);
	}
};

export default Legend ;
