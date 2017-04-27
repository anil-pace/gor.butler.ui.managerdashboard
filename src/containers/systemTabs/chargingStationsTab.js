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
import {
    INITIAL_HEADER_SORT,
    INITIAL_HEADER_ORDER,
    GOR_CONNECTED_STATUS,
    WS_ONSEND
} from '../../constants/frontEndConstants';
import {csHeaderSort, csHeaderSortOrder, csFilterDetail} from '../../actions/sortHeaderActions';
import {
    showTableFilter,
    filterApplied,
    chargingstationfilterState,
    toggleChargingFilter
} from '../../actions/filterAction';
import {updateSubscriptionPacket, setWsAction} from './../../actions/socketActions'
import {wsOverviewData} from './../../constants/initData.js';
import {chargingStationListRefreshed} from './../../actions/systemActions'
import {hashHistory} from 'react-router'

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
        this.state = {query: null}
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

    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
        this.props.chargingStationListRefreshed()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.socketAuthorized && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.setState({query: nextProps.location.query})
            this._refreshList(nextProps.location.query)
        }
    }

    /**
     * The method will update the subscription packet
     * and will fetch the data from the socket.
     * @private
     */
    _refreshList(query) {
        let filterSubsData = {}
        if (query.charger_id) {
            filterSubsData["charger_id"] = ['contains', query.charger_id]
        }
        if (query.charger_status) {
            filterSubsData["charger_status"] = ['in', query.charger_status.constructor === Array ? query.charger_status : [query.charger_status]]
        }
        if (query.charger_mode) {
            filterSubsData["charger_mode"] = ['in', query.charger_mode.constructor === Array ? query.charger_mode : [query.charger_mode]]
        }

        if (Object.keys(query).filter(function(el){return el!=='page'}).length !== 0) {
            this.props.toggleChargingFilter(true);
            this.props.filterApplied(true);
        } else {
            this.props.toggleChargingFilter(false);
            this.props.filterApplied(false);
        }

        let updatedWsSubscription = this.props.wsSubscriptionData;
        updatedWsSubscription["chargingstation"].data[0].details["filter_params"] = filterSubsData;
        this.props.initDataSentCall(updatedWsSubscription["chargingstation"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
        this.props.chargingstationfilterState({
            tokenSelected: {
                "DOCKING STATUS": query.charger_status ? query.charger_status.constructor === Array ? query.charger_status : [query.charger_status] : ["all"],
                "OPERATING MODE": query.charger_mode ? query.charger_mode.constructor === Array ? query.charger_mode : [query.charger_mode] : ["all"]
            }, searchQuery: {
                "CHARGING STATION ID": query.charger_id || ''
            }
        });
    }


    /**
     *
     */
    _clearFilter() {
        hashHistory.push({pathname: "/chargingstation", query: {}})
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
        this.props.showTableFilter(false);
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
                                               showFilter={this.props.showFilter}
                                               setFilter={this.props.showTableFilter}
                                               refreshList={this._clearFilter.bind(this)}/>


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
        showFilter: state.filterInfo.filterState || false,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        chargingFilterStatus: state.filterInfo.chargingFilterStatus || false,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        chargingStationListRefreshed: state.chargerInfo.chargingStationListRefreshed,
        socketAuthorized: state.recieveSocketActions.socketAuthorized
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
        showTableFilter: function (data) {
            dispatch(showTableFilter(data));
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
        chargingStationListRefreshed: function (data) {
            dispatch(chargingStationListRefreshed(data))
        },
        initDataSentCall: function (data) {
            dispatch(setWsAction({type: WS_ONSEND, data: data}));
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
    showFilter: React.PropTypes.bool,
    isFilterApplied: React.PropTypes.bool,
    chargingFilterStatus: React.PropTypes.bool,
    csFilterDetail: React.PropTypes.func,
    setCsSpinner: React.PropTypes.func,
    csHeaderSort: React.PropTypes.func,
    csHeaderSortOrder: React.PropTypes.func,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    wsSubscriptionData: React.PropTypes.object

};

export default connect(mapStateToProps, mapDispatchToProps)(ChargingStations) ;

