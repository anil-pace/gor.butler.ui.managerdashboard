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
				<Inventory data={this.props.inventoryData } label={label} snapshotData={this.props.snapshotData}/>
			</div>
		);
	}
};

InventoryTab.propTypes={
	inventoryData:React.PropTypes.array,
	snapshotData:React.PropTypes.array
}

function mapStateToProps(state,ownProps){
    return {
      "inventoryData": state.inventoryInfo.inventoryDataHistory || [],
      "snapshotData":state.inventoryInfo.inventoryDataToday || []
    }
};

export default connect(mapStateToProps)(InventoryTab);


