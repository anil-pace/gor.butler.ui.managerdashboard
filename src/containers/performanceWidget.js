import React  from 'react';
import Health from '../components/health/healthTabs.js';
import Dropdown from '../components/dropdown/dropdown.js';
import ChartHorizontal from '../components/graphd3/graph_horizontal';
import { connect } from 'react-redux';
import {renderPerformanceWidget} from '../actions/performanceWidgetActions';
import { FormattedMessage } from 'react-intl';


function _getPPSdata(link) {
	console.log("link")
		console.log(link);
		
		let Component = <FormattedMessage id="health.pps" description="pps health" 
              defaultMessage ="PPS"/>
		let ppsOn = 0, ppsOff = 0, ppsTotal = 0;
		var pps_data = [
		{ component:{componentNumber: ppsTotal, componentType: Component}, states:{offState: ppsOff, onState: ppsOn} }
		]
		if(link.ppsPerformance) {
			link = link.ppsPerformance.aggregate_data;
		for (var i = link.length - 1; i >= 0; i--) {
			if(link[i].active === false) {
				ppsOff++;
			}

			else {
				ppsOn++;
			}
		}
		ppsTotal = ppsOn + ppsOff;
		pps_data = [
		{ component:{componentNumber: ppsTotal, componentType: Component}, states:{offState: ppsOff, onState: ppsOn} }
		]
	}
		return pps_data;
} 

function _getButlerdata(link) {

		let Component = <FormattedMessage id="health.Butler" description="Butler bots health" 
              defaultMessage ="Butler bots"/>

		let butlerAuditState = link.props.butlersData.Audit;
		if(butlerAuditState === undefined || butlerAuditState === null) {
			butlerAuditState = 0
		}
		let butlerChargingState = link.props.butlersData.Charging;
		if(butlerChargingState === undefined || butlerChargingState === null) {
			butlerChargingState = 0
		}
		let butlerIdleState = link.props.butlersData.Idle;
		if(butlerIdleState === undefined || butlerIdleState === null) {
			butlerIdleState = 0
		}
		let butlerInactiveState = link.props.butlersData.Inactive;
		if(butlerInactiveState === undefined || butlerInactiveState === null) {
			butlerInactiveState = 0
		}
		let butlerPickPutState = link.props.butlersData["Pick / Put"];
		if(butlerPickPutState === undefined || butlerPickPutState === null) {
			butlerPickPutState = 0
		}
		let butlerTotal = butlerAuditState + butlerChargingState + butlerIdleState + butlerInactiveState + butlerPickPutState;
		let butlerStopped = butlerInactiveState;
		let butlerError = 0;
		let butlerOn = butlerPickPutState + butlerIdleState +  butlerAuditState;
		const butler_data = [
		{ component:{componentNumber: butlerTotal, componentType: Component}, states:{offState: butlerStopped, onState: butlerOn, errorState: butlerError} }
		]
		return butler_data;
} 

function _getChargingdata(link) {

		let Component = <FormattedMessage id="health.ChargingStation" description="Charging Stations health" 
              defaultMessage ="Charging Stations"/>

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
		{ component:{componentNumber: totalChargers, componentType: Component}, states:{offState: chargersError , onState: connected, errorState: disconnected} }
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
		
		let systemHealth = <FormattedMessage id="systemHealth.dropdown" description="systemHealth dropdown label" 
              defaultMessage ="System Health"/>

        let pickPerformance = <FormattedMessage id="PPSpickPerformance.dropdown" description="PPSpickPerformance dropdown label" 
              defaultMessage ="PPS Pick Performance"/>

        let putPerformance = <FormattedMessage id="PPSputPerformance.dropdown" description="PPSputPerformance dropdown label" 
              defaultMessage ="PPS Put Performance"/>

        let auditPerformance = <FormattedMessage id="PPSauditPerformance.dropdown" description="PPSauditPerformance dropdown label" 
              defaultMessage ="PPS Audit Performance"/>      

		const item = [
		{ value: 'RENDER_SYSTEM_HEALTH', label: systemHealth },
		{ value: 'PICK_PPS_PERFORMANCE', label: pickPerformance },
		{ value: 'PUT_PPS_PERFORMANCE', label: putPerformance },
		{ value: 'AUDIT_PPS_PERFORMANCE', label: auditPerformance }
		]
		var currentState = item[0], index = 0;
		if(this.props.widget !== undefined || this.props.widget !== null) {
			for (var i = 0; i < item.length; i++) {
				if(item[i].value === this.props.widget) {
					index = i;
				}
			}
		}
		var link = this;
		var pps_data = _getPPSdata(this.props.ppsPerformance);
		var butler_data = _getButlerdata(link);
		var charging_data=_getChargingdata(link);
		
	var itemRender;	
	if(this.props.widget === "PICK_PPS_PERFORMANCE"){
		itemRender = <ChartHorizontal data={this.props.ppsPerformance} type="orders_picked"/>
	}

	else if(this.props.widget === "PUT_PPS_PERFORMANCE"){
		itemRender = <ChartHorizontal data={this.props.ppsPerformance} type="items_put"/>
	}

	else if(this.props.widget === "AUDIT_PPS_PERFORMANCE"){
		itemRender = <ChartHorizontal data={this.props.ppsPerformance} type="items_audited"/>
	}
	else {
		itemRender = <Health ppsData={pps_data} butlerData={butler_data} chargingData={charging_data}/>
	}
	
	return (
			<div className="gorPerformanceWidget">
				<div className="gorDrop Performance-Widget-Drop">
					<Dropdown optionDispatch={this.props.renderPerformanceWidget} items={item} styleClass={'ddown'} currentState={item[index]}/>
				</div>

				<div id="performanceGraph">
					{itemRender}
				</div> 
			</div> 
			);
	

}
};

function mapStateToProps(state, ownProps){
	return {
		widget: state.performanceWidget.widget || {},
		ppsData: state.recieveSocketActions.ppsData || {},
		butlersData:state.recieveSocketActions.butlersData || {},
		chargersData:state.recieveSocketActions.chargersData || {},
		ppsPerformance: state.PPSperformance || {}
	};
}

var mapDispatchToProps = function(dispatch){
	return {
		renderPerformanceWidget: function(data){ dispatch(renderPerformanceWidget(data)); }
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(PerformanceWidget) ;

