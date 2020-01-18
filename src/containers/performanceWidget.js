import React from 'react';
import Health from '../components/health/healthTabs.js';
import Dropdown from '../components/dropdown/dropdown.js';
import ChartHorizontal from '../components/graphd3/graph_horizontal';
import { wsOverviewData } from './../constants/initData.js';
import { connect } from 'react-redux';
import { renderPerformanceWidget } from '../actions/performanceWidgetActions';
import { FormattedMessage } from 'react-intl';
import { GOR_ORDER_PICKED, GOR_ITEMS_PUT, GOR_ITEMS_AUDITED, PICK_PPS_PERFORMANCE, PUT_PPS_PERFORMANCE, AUDIT_PPS_PERFORMANCE, WS_ONSEND } from '../constants/frontEndConstants';
import { defineMessages } from 'react-intl';
import { graphql, withApollo, compose } from "react-apollo";
import gql from 'graphql-tag'
import { setWsAction } from '../actions/socketActions.js';

const messages = defineMessages({
	performanceParam: {
		id: 'performanceParam.graph',
		description: 'Performance param graph',
		defaultMessage: "items/hr",
	}
});

function _getPPSdata(data) {

	let Component = <FormattedMessage id="health.pps" description="pps health"
		defaultMessage="PPS" />
	let ppsOn = 0, ppsOff = 0, ppsTotal = 0;
	var pps_data = [
		{ component: { componentNumber: ppsTotal, componentType: Component }, states: { offState: ppsOff, onState: ppsOn } }
	]
	if (data && data.pps_data) {
		if (data.pps_data.active) {
			ppsOn = data.pps_data.active;
		}

		if (data.pps_data.inactive) {
			ppsOff = data.pps_data.inactive;
		}
		ppsTotal = ppsOn + ppsOff;
		pps_data = [
			{ component: { componentNumber: ppsTotal, componentType: Component }, states: { offState: ppsOff, onState: ppsOn } }
		]
	}
	return pps_data;
}


function _getButlerdata(data) {
	let Component = <FormattedMessage id="health.Butler" description="Butler bots health"
		defaultMessage="Butler bots" />
	let butlerTotal = 0, butlerOn = 0, butlerOff = 0;
	var butler_data = [
		{ component: { componentNumber: butlerTotal, componentType: Component }, states: { offState: butlerOff, onState: butlerOn } }
	]

	if (data && data.butler_data) {
		if (data.butler_data.active) {
			butlerOn = data.butler_data.active;
		}

		if (data.butler_data.inactive) {
			butlerOff = data.butler_data.inactive;
		}
		butlerTotal = butlerOn + butlerOff;
		butler_data = [
			{ component: { componentNumber: butlerTotal, componentType: Component }, states: { offState: butlerOff, onState: butlerOn } }
		]
	}

	return butler_data;
}

function _getChargingdata(data) {
	let Component = <FormattedMessage id="health.ChargingStation" description="Charging Stations health"
		defaultMessage="Charging Stations" />
	var connected = 0, disconnected = 0, totalChargers = 0;
	var charging_data = [
		{ component: { componentNumber: totalChargers, componentType: Component }, states: { offState: disconnected, onState: connected } }
	]
	if (data && data.charger_data) {
		if (data.charger_data.connected)
			connected = data.charger_data.connected
		if (data.charger_data.disconnected)
			disconnected = data.charger_data.disconnected
		totalChargers = connected + disconnected;
		charging_data = [
			{ component: { componentNumber: totalChargers, componentType: Component }, states: { offState: disconnected, onState: connected } }
		]
	}

	return charging_data;
}

class PerformanceWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = { formattedData: null, selectedData: null }
		this.subscription = null

	}

	updateValues(previousResult, newResult) {
		console.log(this.props.data)
	}

	updateSubscription(subscription, variables) {
		if (this.subscription) {
			this.subscription()
		}
		this.subscription = subscription({
			variables: variables,
			document: SUBSCRIPTION_QUERY,
			notifyOnNetworkStatusChange: true,
			updateQuery: (previousResult, newResult) => {
				console.log("pre", previousResult, 'next', newResult)
				console.log(this.props)
				return Object.assign({}, previousResult, {
					SystemHealthList: {
						data: newResult.subscriptionData.data.SystemHealthList.data
					}
				});
			},
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ renderState: nextProps.widget })
		if (!this.subscription) {
			// console.log("inside", this.props)
			this.updateSubscription(nextProps.subscribeToMore, {})
		}
	}


	render() {
		let systemHealth = <FormattedMessage id="systemHealth.dropdown" description="systemHealth dropdown label"
			defaultMessage="System Health" />

		let pickPerformance = <FormattedMessage id="PPSpickPerformance.dropdown" description="PPSpickPerformance dropdown label"
			defaultMessage="PPS Pick Performance" />

		let putPerformance = <FormattedMessage id="PPSputPerformance.dropdown" description="PPSputPerformance dropdown label"
			defaultMessage="PPS Put Performance" />

		let auditPerformance = <FormattedMessage id="PPSauditPerformance.dropdown" description="PPSauditPerformance dropdown label"
			defaultMessage="PPS Audit Performance" />

		const item = [
			{ value: 'RENDER_SYSTEM_HEALTH', label: systemHealth },
			{ value: 'PICK_PPS_PERFORMANCE', label: pickPerformance },
			{ value: 'PUT_PPS_PERFORMANCE', label: putPerformance },
			{ value: 'AUDIT_PPS_PERFORMANCE', label: auditPerformance }
		]
		var currentState = item[0], index = 0;
		if (this.props.widget !== undefined || this.props.widget !== null) {
			for (var i = 0; i < item.length; i++) {
				if (item[i].value === this.props.widget) {
					index = i;
				}
			}
		}
		var link = this;
		var pps_data = _getPPSdata(this.props.data);
		var butler_data = _getButlerdata(this.props.data);
		var charging_data = _getChargingdata(this.props.data);
		var itemRender;

		var noData = <FormattedMessage id="health.noData" description="pps graph nodata" defaultMessage="No Data" />
		if (this.props.widget === PICK_PPS_PERFORMANCE) {
			if (this.props.ppsPerformance.ppsPerformance !== undefined && this.props.ppsPerformance.ppsPerformance.aggregate_data !== undefined) {
				itemRender = <ChartHorizontal data={this.props.ppsPerformance} type={GOR_ORDER_PICKED} performanceParam={this.context.intl.formatMessage(messages.performanceParam)} />
			}

			else {
				itemRender = <div className="gor-performance-noData"> {noData} </div>;
			}
		}

		else if (this.props.widget === PUT_PPS_PERFORMANCE) {

			if (this.props.ppsPerformance.ppsPerformance !== undefined && this.props.ppsPerformance.ppsPerformance.aggregate_data !== undefined) {
				itemRender = <ChartHorizontal data={this.props.ppsPerformance} type={GOR_ITEMS_PUT} performanceParam={this.context.intl.formatMessage(messages.performanceParam)} />
			}

			else {
				itemRender = <div className="gor-performance-noData"> {noData} </div>;
			}
		}

		else if (this.props.widget === AUDIT_PPS_PERFORMANCE) {
			if (this.props.ppsPerformance.ppsPerformance !== undefined && this.props.ppsPerformance.ppsPerformance.aggregate_data !== undefined) {
				itemRender = <ChartHorizontal data={this.props.ppsPerformance} type={GOR_ITEMS_AUDITED} performanceParam={this.context.intl.formatMessage(messages.performanceParam)} />
			}

			else {
				itemRender = <div className="gor-performance-noData"> {noData} </div>;
			}

		}
		else {
			itemRender = <Health ppsData={pps_data} butlerData={butler_data} chargingData={charging_data} />
		}

		return (
			<div className="gorPerformanceWidget">
				<div className="gorDrop Performance-Widget-Drop">
					<Dropdown optionDispatch={this.props.renderPerformanceWidget} items={item} styleClass={'ddown'} currentState={item[index]} />
				</div>

				<div id="performanceGraph">
					{itemRender}
				</div>
			</div>
		);


	}
};

function mapStateToProps(state, ownProps) {
	return {
		socketAuthorized: state.recieveSocketActions.socketAuthorized,
		widget: state.performanceWidget.widget || {}
	};
}

var mapDispatchToProps = function (dispatch) {
	return {
		initDataSentCall: function (data) {
			dispatch(setWsAction({ type: WS_ONSEND, data: data }));
		},
		renderPerformanceWidget: function (data) { dispatch(renderPerformanceWidget(data)); }
	};
};

PerformanceWidget.contextTypes = {
	intl: React.PropTypes.object.isRequired
}
const SYSTEM_HEALTH_QUERY = gql`query SystemHealthList {
	SystemHealthList {
		data {
			charger_data {
				connected
				disconnected
			}
			pps_data {
				active
				inactive
			}
			butler_data {
				active
				inactive
			}
		}
	}
}
`;


const SUBSCRIPTION_QUERY = gql`subscription SystemHealthList{
SystemHealthList {
	data {
		charger_data {
			connected
			disconnected
			__typename
		}
		pps_data {
			active
			inactive
			__typename
		}
		butler_data {
			active
			inactive
			__typename
		}
		__typename
	}
	__typename
}
}
`


const withQuery = graphql(SYSTEM_HEALTH_QUERY, {
	props: function (result) {
		if (!result.data.SystemHealthList || !result.data.SystemHealthList.data) {
			return null
		}
		return {
			data: result.data.SystemHealthList.data,
			subscribeToMore: result.data.subscribeToMore
		}
	},
	options: ({ match, location }) => ({
		variables: {},
		fetchPolicy: 'network-only'
	}),
});

export default compose(withQuery)(connect(mapStateToProps, mapDispatchToProps)(PerformanceWidget))

