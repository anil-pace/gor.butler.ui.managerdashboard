/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import ChargingStationsTable from './chargingStationsTable';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import {setCsSpinner} from '../../actions/spinnerAction';
import {stringConfig} from '../../constants/backEndConstants';
import {defineMessages} from 'react-intl';
import {INITIAL_HEADER_SORT, INITIAL_HEADER_ORDER, GOR_CONNECTED_STATUS} from '../../constants/frontEndConstants';
import {csHeaderSort, csHeaderSortOrder, csFilterDetail} from '../../actions/sortHeaderActions';
import {
    CSFilterToggle,
    filterApplied,
    chargingstationfilterState,
    toggleChargingFilter
} from '../../actions/filterAction';
import {updateSubscriptionPacket} from './../../actions/socketActions'
import {wsOverviewData} from './../../constants/initData.js';

//Mesages for internationalization
const messages = defineMessages({
    cdPrefix: {
        id: "chargersDetail.name.prefix",
        description: "prefix for cs id in chargersDetail",
        defaultMessage: "Charging Stations - {csId}"
    },
    butlerPrefix: {
        id: "chargersDetail.butler.prefix",
        description: "prefix for butler id in chargersDetail",
        defaultMessage: "Butler - {botId}"
    }

});


class ChargingStations extends React.Component {
    constructor(props) {
        super(props);
    }

    _processChargersData(data, nProps) {
        var chargerData = [], detail = {}, count = 0,
            nProps = this,
            data = nProps.props.chargersDetail.chargersDetail,
            CS, csId, botId, BUTLER;

        var priStatus = {"connected": 1, "disconnected": 2};

        for (var i = data.length - 1; i >= 0; i--) {
            detail = {}
            csId = data[i].charger_id;
            botId = data[i].docked_butler_id;
            CS = nProps.context.intl.formatMessage(messages.cdPrefix, {"csId": csId});
            BUTLER = nProps.context.intl.formatMessage(messages.butlerPrefix, {"botId": botId});
            detail.id = CS;
            detail.status = nProps.context.intl.formatMessage((stringConfig[data[i].charger_status]));
            detail.statusClass = data[i].charger_status;
            detail.statusPriority = priStatus[data[i].charger_status];
            if (nProps.context.intl.formatMessage(stringConfig[data[i].charger_mode])) {
                detail.mode = nProps.context.intl.formatMessage(stringConfig[data[i].charger_mode]);
            }
            else {
                detail.mode = data[i].charger_mode;
            }
            detail.modeClass = data[i].charger_mode;
            if (data[i].docked_butler_id && data[i].docked_butler_id.length) {
                detail.dockedBots = BUTLER;
            }

            else {
                detail.dockedBots = "--";
            }
            chargerData.push(detail);
        }
        return chargerData;
    }

    /**
     * The method will update and send the subscription packet
     * to fetch the default list of users
     * @private
     */
    _refreshChargingStationList() {
        let updatedWsSubscription = this.props.wsSubscriptionData;
        delete updatedWsSubscription["chargingstation"].data[0].details["filter_params"];
        this.props.updateSubscriptionPacket(updatedWsSubscription);
        this.props.filterApplied(!this.props.isFilterApplied);
        this.props.CSFilterToggle(false);
        this.props.toggleChargingFilter(false);
        /**
         * It will reset the filter
         * fields already applied in
         * the Filter box
         */
        this.props.chargingstationfilterState({
            tokenSelected: {"DOCKING STATUS": ["all"], "OPERATING MODE": ["all"]}, searchQuery: {},
            defaultToken: {"DOCKING STATUS": ["all"], "OPERATING MODE": ["all"]}
        })
    }

    render() {
        let updateStatusIntl = "";
        var itemNumber = 4, connectedBots = 0, manualMode = 0, automaticMode = 0,
            chargersState = {"connectedBots": "--", "manualMode": "--", "automaticMode": "--", "csConnected": 0},
            chargersData, csConnected = 0;
        if (this.props.chargersDetail.chargersDetail !== undefined) {
            chargersData = this._processChargersData();
            if (chargersData && chargersData.length) {
                for (var i = chargersData.length - 1; i >= 0; i--) {
                    if (chargersData[i].dockedBots !== "--") {
                        connectedBots++;
                    }

                    if (chargersData[i].mode === "Manual") {
                        manualMode++;
                    }
                    else {
                        automaticMode++;
                    }
                    if (chargersData[i].status === GOR_CONNECTED_STATUS) {
                        csConnected++;
                    }

                }
                chargersState = {
                    "connectedBots": connectedBots,
                    "manualMode": manualMode,
                    "automaticMode": automaticMode,
                    "csConnected": csConnected
                };
            }
        }

        return (
            <div>
                <div>
                    <div className="gorTesting">
                        <Spinner isLoading={this.props.csSpinner} setSpinner={this.props.setCsSpinner}/>
                        <ChargingStationsTable items={chargersData} itemNumber={itemNumber}
                                               chargersState={chargersState} intlMessg={this.props.intlMessages}
                                               sortHeaderState={this.props.csHeaderSort}
                                               currentSortState={this.props.csSortHeader}
                                               sortHeaderOrder={this.props.csHeaderSortOrder}
                                               currentHeaderOrder={this.props.csSortHeaderState}
                                               setCsFilter={this.props.csFilterDetail}
                                               getCsFilter={this.props.csFilter}
                                               chargingFilterStatus={this.props.chargingFilterStatus}
                                               isFilterApplied={this.props.isFilterApplied}
                                               lastUpdatedText={updateStatusIntl}
                                               lastUpdated={updateStatusIntl}
                                               csToggleFilter={this.props.csToggleFilter}
                                               setFilter={this.props.CSFilterToggle}
                                               refreshList={this._refreshChargingStationList.bind(this)}/>


                    </div>
                </div>
            </div>
        );
    }
}
;

function mapStateToProps(state, ownProps) {

    return {
        csFilter: state.sortHeaderState.csFilter || "",
        csSortHeader: state.sortHeaderState.csHeaderSort || INITIAL_HEADER_SORT,
        csSortHeaderState: state.sortHeaderState.csHeaderSortOrder || INITIAL_HEADER_ORDER,
        csSpinner: state.spinner.csSpinner || false,
        chargersDetail: state.chargersDetail || [],
        intlMessages: state.intl.messages,
        csToggleFilter: state.filterInfo.csToggleFilter || false,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        chargingFilterStatus: state.filterInfo.chargingFilterStatus || false,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData
    };
}

var mapDispatchToProps = function (dispatch) {
    return {
        csFilterDetail: function (data) {
            dispatch(csFilterDetail(data))
        },
        setCsSpinner: function (data) {
            dispatch(setCsSpinner(data));
        },
        csHeaderSort: function (data) {
            dispatch(csHeaderSort(data))
        },
        csHeaderSortOrder: function (data) {
            dispatch(csHeaderSortOrder(data))
        },
        CSFilterToggle: function (data) {
            dispatch(CSFilterToggle(data));
        },
        filterApplied: function (data) {
            dispatch(filterApplied(data));
        },

        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        chargingstationfilterState: function (data) {
            dispatch(chargingstationfilterState(data));
        },
        toggleChargingFilter: function (data) {
            dispatch(toggleChargingFilter(data));
        },

    };
}

ChargingStations.contextTypes = {
    intl: React.PropTypes.object.isRequired
}
ChargingStations.PropTypes = {
    csFilter: React.PropTypes.string,
    csSortHeader: React.PropTypes.string,
    csSortHeaderState: React.PropTypes.string,
    csSpinner: React.PropTypes.bool,
    chargersDetail: React.PropTypes.array,
    csToggleFilter: React.PropTypes.bool,
    isFilterApplied: React.PropTypes.bool,
    chargingFilterStatus: React.PropTypes.bool,
    csFilterDetail: React.PropTypes.func,
    setCsSpinner: React.PropTypes.func,
    csHeaderSort: React.PropTypes.func,
    csHeaderSortOrder: React.PropTypes.func,
    CSFilterToggle: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    wsSubscriptionData: React.PropTypes.object

};

export default connect(mapStateToProps, mapDispatchToProps)(ChargingStations) ;

