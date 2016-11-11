/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';
import shallowCompare from 'react-addons-shallow-compare' ;
import Inventory from '../components/inventory/inventory';
import Spinner from '../components/spinner/Spinner';

import { connect } from 'react-redux'; 


class InventoryTab extends React.Component{
	constructor(props) 
	{
    	super(props);

    }	

  

	render(){
		/**
		 * Need to remove these hardcoded variables
		 * 
		 */
		
		var label = "Stock level history",
		snapshotData = this.props.isPrevDateSelected ? this.props.inventoryDataPrevious : this.props.snapshotData
		return (
			<div className="gorInventory wrapper">
				<Spinner isLoading={this.props.inventorySpinner} />
				<Inventory  hasDataChanged = {this.props.hasDataChanged} inventoryData={this.props.inventoryData} label={label} isPrevDateSelected = {this.props.isPrevDateSelected} inventoryDataPrevious = {this.props.inventoryDataPrevious} snapshotData={this.props.snapshotData}/>
			</div>
		);
	}
};

InventoryTab.propTypes={

	inventoryData:React.PropTypes.array,
	snapshotData:React.PropTypes.array,
	inventorySpinner:React.PropTypes.bool,
	isPrevDateSelected:React.PropTypes.bool,
	inventoryDataPrevious:React.PropTypes.array ,
	hasDataChanged:React.PropTypes.number
}

function mapStateToProps(state,ownProps){
    return {

      "inventoryData": state.inventoryInfo.inventoryDataHistory || [],
      "snapshotData":state.inventoryInfo.inventoryDataToday || [],
      "inventorySpinner":state.spinner.inventorySpinner || false,
      "isPrevDateSelected":state.inventoryInfo.isPrevDateSelected || false,
      "inventoryDataPrevious":state.inventoryInfo.inventoryDataPrevious || [],
      "hasDataChanged":state.inventoryInfo.hasDataChanged 
    }
};

export default connect(mapStateToProps)(InventoryTab);


