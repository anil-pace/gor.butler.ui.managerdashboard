/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';
import shallowCompare from 'react-addons-shallow-compare' ;
import Inventory from '../components/inventory/inventory';
import { connect } from 'react-redux'; 


class InventoryTab extends React.Component{
	constructor(props) 
	{
    	super(props);

    }	

   shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
	render(){
		/**
		 * Need to remove these hardcoded variables
		 * 
		 */
		
		var label = "Stock level history"
		return (
			<div className="gorInventory wrapper">
				<Inventory data={this.props.inventoryData.legendData || {}} label={label} stackData={this.props.stackData}/>
			</div>
		);
	}
};

InventoryTab.propTypes={
	inventoryData:React.PropTypes.object,
	stackData:React.PropTypes.array
}

function mapStateToProps(state,ownProps){
    return {
      "inventoryData": state.inventoryInfo.inventoryData || {},
      "stackData":state.inventoryInfo.inventoryDataToday || []
    }
};

export default connect(mapStateToProps)(InventoryTab);


