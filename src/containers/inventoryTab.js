/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';

import Inventory from '../components/inventory/inventory';
import Spinner from '../components/spinner/Spinner';
import { setInventorySpinner } from '../actions/inventoryActions';
import { FormattedMessage} from 'react-intl';
import { connect } from 'react-redux'; 


class InventoryTab extends React.Component{
	constructor(props) 
	{
    	super(props);

    }	

    _setSpinner(bShow) {
    	var _bShow = bShow ? bShow:false;
    	this.props.setInventorySpinner(_bShow);
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
        dateTodayState = Date.parse(this.props.dateTodayState),
		snapshotData = this.props.recreatedData[dateTodayState] ? this.props.recreatedData[dateTodayState].otherInfo: {}
		return (
			<div className="gorInventory wrapper">
				<Spinner isLoading={this.props.inventorySpinner} setSpinner={this.props.setInventorySpinner}/>
				<Inventory recreatedData={this.props.recreatedData} currentDate = {this.props.dateTodayState} 
				hasDataChanged = {this.props.hasDataChanged} 
				histogramLabel={histogramLabel} 
				linechartLabel={linechartLabel} 
				isPrevDateSelected = {this.props.isPrevDateSelected} 
				inventoryDataPrevious = {this.props.inventoryDataPrevious} 
				snapshotData={snapshotData}/>
			</div>
		);
	}
};

InventoryTab.propTypes={
	inventorySpinner:React.PropTypes.bool,
	isPrevDateSelected:React.PropTypes.bool,
	inventoryDataPrevious:React.PropTypes.object ,
	hasDataChanged:React.PropTypes.number,
	dateTodayState:React.PropTypes.object,
	recreatedData: React.PropTypes.object
}

function mapStateToProps(state,ownProps){
    return {
      "inventoryData": state.inventoryInfo.inventoryDataHistory || [],
      "inventorySpinner":state.spinner.inventorySpinner || false,
      "isPrevDateSelected":state.inventoryInfo.isPrevDateSelected || false,
      "inventoryDataPrevious":state.inventoryInfo.inventoryDataPrevious || {},
      "hasDataChanged":state.inventoryInfo.hasDataChanged ,
      "dateTodayState":state.inventoryInfo.dateTodayState,
      "recreatedData":state.inventoryInfo.recreatedData || {}
    }
};
    function mapDispatchToProps(dispatch){
    	return{
    		setInventorySpinner:function(data){dispatch(setInventorySpinner(data));}
    	}
    };


export default connect(mapStateToProps,mapDispatchToProps)(InventoryTab);


