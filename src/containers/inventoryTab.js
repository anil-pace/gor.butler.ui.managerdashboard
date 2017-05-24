/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';

import Inventory from '../components/inventory/inventory';
import Spinner from '../components/spinner/Spinner';
import { setInventorySpinner ,inventoryRefreshed} from '../actions/inventoryActions';
import { FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';
import {wsOverviewData} from './../constants/initData.js';
import {updateSubscriptionPacket,setWsAction} from './../actions/socketActions'
import {WS_ONSEND} from './../constants/frontEndConstants';


class InventoryTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    	this.state={subscribed:false}
    }

    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
        this.props.inventoryRefreshed()
    }

    _setSpinner(bShow) {
    	var _bShow=bShow ? bShow:false;
    	this.props.setInventorySpinner(_bShow);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.socketAuthorized && !this.state.subscribed) {
            this.setState({subscribed: true})
            this._subscribeData(nextProps)
        }
    }
    componentWillUnmount(){
        /**
		 * If a user navigates back to the inventory page,
		 * it should subscribe to the packet again.
		 */
		this.setState({subscribed: false})
	}

    _subscribeData(nextProps){
        let updatedWsSubscription=this.props.wsSubscriptionData;
        this.props.initDataSentCall(updatedWsSubscription["inventory"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
	}

	render(){
		/**
		 * Need to remove these hardcoded variables
		 * 
		 */
		var histogramLabel=<FormattedMessage id="inventory.histogram.header" description="Inventory Histogram Header Message" 
              			defaultMessage="Stock level history"/>  ,
		linechartLabel=<FormattedMessage id="inventory.linechart.header" description="Inventory Line Chart Header Message" 
              			defaultMessage="Item Movements"/>,
        dateTodayState=this.props.dateTodayState,
		snapshotData=this.props.recreatedData[dateTodayState] ? this.props.recreatedData[dateTodayState].otherInfo: {}
		return (
			<div className="gorInventory wrapper">
				<Spinner isLoading={this.props.inventorySpinner} setSpinner={this.props.setInventorySpinner}/>
				<Inventory noData={this.props.noData} 
				recreatedData={this.props.recreatedData} 
				currentDate={this.props.dateTodayState} 
				hasDataChanged={this.props.hasDataChanged} 
				histogramLabel={histogramLabel} 
				linechartLabel={linechartLabel} 
				isPrevDateSelected={this.props.isPrevDateSelected} 
				inventoryDataPrevious={this.props.inventoryDataPrevious} 
				snapshotData={snapshotData}/>
			</div>
		);
	}
};

InventoryTab.propTypes={
	inventorySpinner:React.PropTypes.bool,
	isPrevDateSelected:React.PropTypes.bool,
	inventoryDataPrevious:React.PropTypes.object ,
	hasDataChanged:React.PropTypes.bool,
	dateTodayState:React.PropTypes.number,
	recreatedData: React.PropTypes.object,
	noData:React.PropTypes.bool
}

function mapStateToProps(state, ownProps) {
    return {
        "inventoryData": state.inventoryInfo.inventoryDataHistory || [],
        "inventorySpinner": state.spinner.inventorySpinner || false,
        "isPrevDateSelected": state.inventoryInfo.isPrevDateSelected || false,
        "inventoryDataPrevious": state.inventoryInfo.inventoryDataPrevious || {},
        "hasDataChanged": state.inventoryInfo.hasDataChanged,
        "dateTodayState": state.inventoryInfo.dateTodayState,
        "recreatedData": state.inventoryInfo.recreatedData || {},
        "noData": state.inventoryInfo.noData,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        inventoryRefreshed:state.inventoryInfo.inventoryRefreshed
    }
}
    function mapDispatchToProps(dispatch){
    	return{
    		setInventorySpinner:function(data){dispatch(setInventorySpinner(data));},
            initDataSentCall: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); },
            updateSubscriptionPacket: function (data) {
                dispatch(updateSubscriptionPacket(data));
            },
            inventoryRefreshed:function(data){
            	dispatch(inventoryRefreshed(data))
			}
    	}
    };


export default connect(mapStateToProps,mapDispatchToProps)(InventoryTab);


