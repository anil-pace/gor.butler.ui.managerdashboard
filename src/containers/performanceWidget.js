import React  from 'react';
import Health from '../components/health/healthTabs.js';
import Dropdown from '../components/dropdown/dropdown.js';
import ChartHorizontal from '../components/graphd3/graph_horizontal';
import { connect } from 'react-redux';
import {renderPerformanceWidget} from '../actions/performanceWidgetActions';
import { FormattedMessage } from 'react-intl';
import {GOR_ORDER_PICKED, GOR_ITEMS_PUT, GOR_ITEMS_AUDITED, PICK_PPS_PERFORMANCE, PUT_PPS_PERFORMANCE, AUDIT_PPS_PERFORMANCE} from '../constants/frontEndConstants';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
    performanceParam: {
        id: 'performanceParam.graph',
        description: 'Performance param graph',
        defaultMessage: "items/hr",
    }
});

function _getPPSdata(link) {
		
		let Component = <FormattedMessage id="health.pps" description="pps health" 
              defaultMessage ="PPS"/>
		let ppsOn = 0, ppsOff = 0, ppsTotal = 0;
		var pps_data = [
		{ component:{componentNumber: ppsTotal, componentType: Component}, states:{offState: ppsOff, onState: ppsOn} }
		]
		if(link.ppsPerformance) {
			link = link.ppsPerformance.aggregate_data;
			if(link !== undefined) {
		for (var i = link.length - 1; i >= 0; i--) {
			if(link[i].active === false) {
				ppsOff++;
			}

			else {
				ppsOn++;
			}
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
        let butlerTotal = 0, butlerOn = 0, butlerOff = 0;      
        var butler_data = [
		{ component:{componentNumber: butlerTotal, componentType: Component}, states:{offState: butlerOff, onState: butlerOn} }
		]      

		if(link.butlersData) {
		if(link.butlersData.active !== undefined && link.butlersData.inactive !== null) {
			butlerOn = link.butlersData.active;
		}
		
		if(link.butlersData.active !== undefined && link.butlersData.inactive !== null) {
			butlerOff = link.butlersData.inactive;
		}
		butlerTotal = butlerOn + butlerOff;
		butler_data = [
		{ component:{componentNumber: butlerTotal, componentType: Component}, states:{offState: butlerOff , onState: butlerOn} }
		]
	}

		return butler_data;
} 

function _getChargingdata(link) {
		let Component = <FormattedMessage id="health.ChargingStation" description="Charging Stations health" 
              defaultMessage ="Charging Stations"/>

        let connected = 0, disconnected = 0, totalChargers = 0;      
              
        var charging_data = [
		{ component:{componentNumber: totalChargers, componentType: Component}, states:{offState: disconnected , onState: connected} }
		]
		if(link.chargersData) {
		if(link.chargersData.Connected !== undefined && link.chargersData.Connected !== null) {
			connected = link.chargersData.Connected;
		}
		
		if(link.chargersData.Disconnected !== undefined && link.chargersData.Disconnected !== null) {
			disconnected = link.chargersData.Disconnected;
		}
		totalChargers = connected + disconnected;
		charging_data = [
		{ component:{componentNumber: totalChargers, componentType: Component}, states:{offState: disconnected , onState: connected} }
		]
	}

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
		var butler_data = _getButlerdata(this.props.butlersData);
		var charging_data=_getChargingdata(this.props.chargersData);
		
	var itemRender;	

	var noData = <FormattedMessage id="health.noData" description="pps graph nodata" defaultMessage ="No Data"/>
	if(this.props.widget === PICK_PPS_PERFORMANCE){
		if(this.props.ppsPerformance.ppsPerformance !== undefined && this.props.ppsPerformance.ppsPerformance.aggregate_data !== undefined) {
			itemRender = <ChartHorizontal data={this.props.ppsPerformance} type={GOR_ORDER_PICKED} performanceParam={this.context.intl.formatMessage(messages.performanceParam)}/>
		}

		else {
			itemRender = <div className="gor-performance-noData"> {noData} </div> ;
		}
	}

	else if(this.props.widget === PUT_PPS_PERFORMANCE){
		
		if(this.props.ppsPerformance.ppsPerformance !== undefined && this.props.ppsPerformance.ppsPerformance.aggregate_data !== undefined) {
			itemRender = <ChartHorizontal data={this.props.ppsPerformance} type={GOR_ITEMS_PUT} performanceParam={this.context.intl.formatMessage(messages.performanceParam)}/>
		}

		else {
			itemRender = <div className="gor-performance-noData"> {noData} </div> ;
		}
	}

	else if(this.props.widget === AUDIT_PPS_PERFORMANCE){
		if(this.props.ppsPerformance.ppsPerformance !== undefined && this.props.ppsPerformance.ppsPerformance.aggregate_data !== undefined) {
			itemRender = <ChartHorizontal data={this.props.ppsPerformance} type={GOR_ITEMS_AUDITED} performanceParam={this.context.intl.formatMessage(messages.performanceParam)}/>
		}

		else {
			itemRender = <div className="gor-performance-noData"> {noData} </div> ;
		}

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
		butlersData:state.butlersInfo || {},
		chargersData:state.chargerInfo || {},
		ppsPerformance: state.PPSperformance || {}
	};
}

var mapDispatchToProps = function(dispatch){
	return {
		renderPerformanceWidget: function(data){ dispatch(renderPerformanceWidget(data)); }
	}
};

PerformanceWidget.contextTypes ={
 intl:React.PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(PerformanceWidget) ;

