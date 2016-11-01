/**
 * Container for PickPutLineGraph 
 * This will be switched based on tab click
 */
import React  from 'react';
import MultiLineGraph from '../graphd3/multiLineGraph';



class PickPutLineGraph extends React.Component{
	constructor(props){
    	super(props);

    }	
   
	render(){
		return (
			<div>
				<MultiLineGraph inventoryData={this.props.inventoryData || []}/>
			</div>
			);
	}
};
PickPutLineGraph.propTypes={
	inventoryData: React.PropTypes.array
}

PickPutLineGraph.contextTypes = {
	intl: React.PropTypes.object.isRequired
}
export default PickPutLineGraph;
