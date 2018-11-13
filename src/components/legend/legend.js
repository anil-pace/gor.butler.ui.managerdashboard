/**
 * Component for creating graph legend 
 */
 import React  from 'react';
 import LegendElement  from './legendElement';



 class Legend extends React.Component{
 	
 	_processData(){
 		var _this=this;
 		var data=_this.props.legendData.data || [];
 		var config=_this.props.legendData.config || {};
 		var elements=data.map(function(item, i){
 			return (
 			        <LegendElement legendType={_this.props.legendType} color={item.color} xpos={config.xpos+i*config.xIncrement} ypos={config.ypos} name={item.name} key={i}/>
 			        )
 		})
 		return elements;
 	}
 	
 	render(){
 		var elements=this._processData();
 		return (
 		        <svg className="legend" width={this.props.legendData.config.containerWidth} height={this.props.legendData.config.containerHeight} style={{"float":"right"}}>
 		        {elements}
 		        </svg>
 		        );
 	}
 };
 Legend.propTypes={
 	legendData:React.PropTypes.object
 }
 Legend.contextTypes={
 	intl:React.PropTypes.object.isRequired
 }
 export default Legend ;
