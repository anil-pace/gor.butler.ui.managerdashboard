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
    	var data = this.props.legendData.data || [];
    	var config = this.props.legendData.config || {};
    	var elements = data.map(function(item, i){
	      return (
	        <LegendElement color={item.color} xpos={config.xpos+i*config.xIncrement} ypos={config.ypos} name={item.name} key={i}/>
	      )
	    })
    return elements;
    }
    
	render(){
		var elements = this._processData();
		return (
				 <svg className="legend" width="100%" height="60" style={{"float":"right"}}>
				 	{elements}
				 </svg>
		);
	}
};
Legend.propTypes={
	legendData:React.PropTypes.object
}
export default Legend ;
