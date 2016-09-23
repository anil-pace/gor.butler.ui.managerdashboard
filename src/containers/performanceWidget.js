import React  from 'react';
import ReactDOM  from 'react-dom';
import Health from '../components/health/healthTabs.js';
import Dropdown from '../components/dropdown/dropdown.js';
import ChartHorizontal from '../components/graphd3/graph_horizontal';
import { connect } from 'react-redux';
import {renderPerformanceWidget} from '../actions/performanceWidgetActions'


function _getPPSdata(link) {
		let ppsPickState = link.props.ppsData.pick;
		if(ppsPickState === undefined || ppsPickState === null) {
			ppsPickState = 0;
		}
		let ppsPutState = link.props.ppsData.put;
		if(ppsPutState === undefined || ppsPutState === null) {
			ppsPutState = 0;
		}
		let ppsAuditState = link.props.ppsData.audit;
		if(ppsAuditState === undefined || ppsAuditState === null) {
			ppsAuditState = 0;
		}
		let ppsInactiveState = link.props.ppsData.inactive;
		if(ppsInactiveState === undefined || ppsInactiveState === null) {
			ppsInactiveState = 0;
		}
		let ppsTotal = ppsPickState + ppsPutState + ppsAuditState + ppsInactiveState;
		let ppsOn = ppsPickState + ppsPutState + ppsAuditState ;
		let ppsStopped = ppsInactiveState;
		let ppsError = 0;
		const pps_data = [
		{ component:{componentNumber: ppsTotal, componentType: 'PPS'}, states:{offState: ppsError, onState: ppsOn, errorState: ppsError} }
		]
		return pps_data;
} 

function _getButlerdata(link) {
		let butlerAuditState = link.props.butlersData.Audit;
		if(butlerAuditState === undefined || butlerAuditState === null) {
			butlerAuditState = 0;
		}
		let butlerChargingState = link.props.butlersData.Charging;
		if(butlerChargingState === undefined || butlerChargingState === null) {
			butlerChargingState = 0;
		}
		let butlerIdleState = link.props.butlersData.Idle;
		if(butlerIdleState === undefined || butlerIdleState === null) {
			butlerIdleState = 0;
		}
		let butlerInactiveState = link.props.butlersData.Inactive;
		if(butlerInactiveState === undefined || butlerInactiveState === null) {
			butlerInactiveState = 0;
		}
		let butlerPickPutState = link.props.butlersData["Pick / Put"];
		if(butlerPickPutState === undefined || butlerPickPutState === null) {
			butlerPickPutState = 0;
		}
		let butlerTotal = butlerAuditState + butlerChargingState + butlerIdleState + butlerInactiveState + butlerPickPutState;
		let butlerStopped = butlerInactiveState;
		let butlerError = 0;
		let butlerOn = butlerPickPutState + butlerIdleState +  butlerAuditState;
		const butler_data = [
		{ component:{componentNumber: butlerTotal, componentType: 'Butler bots'}, states:{offState: butlerStopped, onState: butlerOn, errorState: butlerError} }
		]
		return butler_data;
} 

function _getChargingdata(link) {
		let connected = link.props.chargersData.Connected;
		if(connected === undefined || connected === null) {
			connected = 0;
		}
		let disconnected = link.props.chargersData.Disconnected;
		if(disconnected === undefined || disconnected === null) {
			disconnected = 0;
		}
		let totalChargers = connected + disconnected;
		let chargersStopped = disconnected;
		let chargersError = 0;
		const charging_data = [
		{ component:{componentNumber: totalChargers, componentType: 'Charging Stations'}, states:{offState: chargersError , onState: connected, errorState: disconnected} }
		]
		return charging_data;
} 

class PerformanceWidget extends React.Component{
	constructor(props) 
	{
		super(props);
	}	

	componentWillReceiveProps(nextProps){
		this.setState({renderState: nextProps.widget})
	}

	render(){
		const item = [
		{ value: 'RENDER_SYSTEM_HEALTH', label: 'System Health' },
		{ value: 'RENDER_SYSTEM_PERFORMANCE', label: 'System Performance' },
		]
		
		
	if(this.props.widget === "RENDER_SYSTEM_PERFORMANCE"){
		return (
			<div className="gorPerformanceWidget">
				<div className="gorDrop">
					<Dropdown optionDispatch={this.props.renderPerformanceWidget} items={item} styleClass={'ddown'} currentState={item[1]}/>
				</div>

				<div id="performanceGraph">
					<ChartHorizontal/>
				</div> 
			</div>  
			);
	}

	else { 
		var link = this;
		var pps_data = _getPPSdata(link);
		var butler_data = _getButlerdata(link);
		var charging_data=_getChargingdata(link);
		return (
			<div className="gorPerformanceWidget">
				<div className="gorDrop">
					<Dropdown optionDispatch={this.props.renderPerformanceWidget} items={item} styleClass={'ddown'} currentState={item[0]}/>
				</div>

				<div id="performanceGraph">
					{<Health ppsData={pps_data} butlerData={butler_data} chargingData={charging_data}/>}
				</div> 
			</div> 
			);
	}

}
};

function mapStateToProps(state, ownProps){
	console.log(state)
	return {
		widget: state.performanceWidget.widget || {},
		ppsData: state.recieveSocketActions.ppsData || {},
		butlersData:state.recieveSocketActions.butlersData || {},
		chargersData:state.recieveSocketActions.chargersData || {}
	};
}

var mapDispatchToProps = function(dispatch){
	return {
		renderPerformanceWidget: function(data){ dispatch(renderPerformanceWidget(data)); }
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(PerformanceWidget) ;

