/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';

import Inventory from '../components/inventory/inventory';
import Spinner from '../components/spinner/Spinner';
import { FormattedMessage} from 'react-intl';
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
		
		var histogramLabel =<FormattedMessage id="inventory.histogram.header" description="Inventory Histogram Header Message" 
              			defaultMessage ="Stock level history"/>  ,
		linechartLabel = <FormattedMessage id="inventory.linechart.header" description="Inventory Line Chart Header Message" 
              			defaultMessage ="Item Movements"/>,
		snapshotData = this.props.isPrevDateSelected ? this.props.inventoryDataPrevious : this.props.snapshotData
		return (
			<div className="gorInventory wrapper">
				<Spinner isLoading={this.props.inventorySpinner} />
				<Inventory  currentDate = {this.props.currentDate} hasDataChanged = {this.props.hasDataChanged} inventoryData={this.props.inventoryData} histogramLabel={histogramLabel} linechartLabel={linechartLabel} isPrevDateSelected = {this.props.isPrevDateSelected} inventoryDataPrevious = {this.props.inventoryDataPrevious} snapshotData={this.props.snapshotData}/>
			</div>
		);
	}
};

InventoryTab.propTypes={

	inventoryData:React.PropTypes.array,
	snapshotData:React.PropTypes.array,
	inventorySpinner:React.PropTypes.bool,
	isPrevDateSelected:React.PropTypes.bool,
	inventoryDataPrevious:React.PropTypes.object ,
	hasDataChanged:React.PropTypes.number,
	currentDate:React.PropTypes.number
}

function mapStateToProps(state,ownProps){
    return {

      "inventoryData": state.inventoryInfo.inventoryDataHistory || [],
      "snapshotData":state.inventoryInfo.inventoryDataToday || [],
      "inventorySpinner":state.spinner.inventorySpinner || false,
      "isPrevDateSelected":state.inventoryInfo.isPrevDateSelected || false,
      "inventoryDataPrevious":state.inventoryInfo.inventoryDataPrevious || [],
      "hasDataChanged":state.inventoryInfo.hasDataChanged ,
      "currentDate":state.inventoryInfo.currentDate
    }
};

export default connect(mapStateToProps)(InventoryTab);


