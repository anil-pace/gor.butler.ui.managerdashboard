import React  from 'react';
import WavesTable from './waveTable';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import {setWavesSpinner} from '../../actions/spinnerAction';
import {GOR_PENDING, GOR_PROGRESS, GOR_BREACHED} from '../../constants/frontEndConstants';
import {stringConfig} from '../../constants/backEndConstants';
import {defineMessages} from 'react-intl';
import {waveHeaderSort, waveHeaderSortOrder, waveFilterDetail} from '../../actions/sortHeaderActions';
import {INITIAL_HEADER_SORT, INITIAL_HEADER_ORDER} from '../../constants/frontEndConstants';
import {getDaysDiff} from '../../utilities/getDaysDiff';
import {wavesFilterToggle, filterApplied, toggleWaveFilter, wavefilterState,setFilterApplyFlag} from '../../actions/filterAction';
import {updateSubscriptionPacket} from './../../actions/socketActions'
import {wsOverviewData} from './../../constants/initData.js';

//Mesages for internationalization
const messages = defineMessages({
    wavePrefix: {
        id: "waveDetail.id.prefix",
        defaultMessage: "WAVE-{waveId}"
    }


});


class WaveTab extends React.Component {

    _processWaveData(data, nProps) {
        var nProps = this,
            data = nProps.props.waveDetail.waveData;
        
        var waveData = [], waveDetail = {};
        let WAVE, waveId;


        var status = {
            "in_progress": "progress",
            "completed": "completed",
            "breached": "breached",
            "wave_pending": "pending"
        };
        var priStatus = {"in_progress": 2, "completed": 4, "breached": 1, "pending": 3};
        var timeOffset = this.props.timeOffset, alertNum = 0;
        if (data) {
            for (var i = data.length - 1; i >= 0; i--) {
                waveId = data[i].wave_id;
                WAVE = nProps.context.intl.formatMessage(messages.wavePrefix, {"waveId": waveId});
                waveDetail = {};
                waveDetail.id = WAVE;
                waveDetail.statusClass = status[data[i].status];
                waveDetail.statusPriority = priStatus[data[i].status];
                if (nProps.context.intl.formatMessage(stringConfig[data[i].status])) {
                    waveDetail.status = nProps.context.intl.formatMessage(stringConfig[data[i].status]);
                }
                else {
                    waveDetail.status = data[i].status;
                }
                if (!data[i].start_time) {
                    waveDetail.startTime = "--";
                }
                else {
                    if (getDaysDiff(data[i].start_time) < 2) {
                        waveDetail.startTime = nProps.context.intl.formatRelative(data[i].start_time, {
                                timeZone: timeOffset,
                                units: 'day'
                            }) +
                            ", " + nProps.context.intl.formatTime(data[i].start_time, {
                                timeZone: timeOffset,
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false
                            });
                    }
                    else {
                        waveDetail.startTime = nProps.context.intl.formatDate(data[i].start_time,
                            {
                                timeZone: timeOffset,
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false
                            });
                    }
                }

                if (!data[i].cut_off_time) {
                    waveDetail.cutOffTime = "--";
                }
                else {
                    if (getDaysDiff(data[i].cut_off_time) < 2) {
                        waveDetail.cutOffTime = nProps.context.intl.formatRelative(data[i].cut_off_time, {
                                timeZone: timeOffset,
                                units: 'day'
                            }) +
                            ", " + nProps.context.intl.formatTime(data[i].cut_off_time, {
                                timeZone: timeOffset,
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false
                            });
                    }
                    else {
                        waveDetail.cutOffTime = nProps.context.intl.formatDate(data[i].cut_off_time,
                            {
                                timeZone: timeOffset,
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false
                            });
                    }
                }
                waveDetail.ordersToFulfill = data[i].orders_to_fulfill;
                waveDetail.totalOrders = data[i].total_orders;
                if (waveDetail.totalOrders) {
                    waveDetail.progress = parseInt(((waveDetail.totalOrders - waveDetail.ordersToFulfill) / waveDetail.totalOrders) * 100);
                }
                else {
                    waveDetail.progress = 0;
                }
                waveData.push(waveDetail);
            }
        }
        return waveData;
    }

    refresh = () => {
        console.log('Refresh');
    }

    constructor(props) {
        super(props);
    }

    /**
     * The method will update and send the subscription packet
     * to fetch the default list of waves
     * @private
     */
    _refreshWavesList() {
        let updatedWsSubscription = this.props.wsSubscriptionData;
        delete updatedWsSubscription["orders"].data[0].details["filter_params"];
        this.props.updateSubscriptionPacket(updatedWsSubscription);
        this.props.filterApplied(!this.props.isFilterApplied);
        this.props.wavesFilterToggle(false);
        this.props.toggleWaveFilter(false);
        /**
         * It will reset the filter
         * fields already applied in
         * the Filter box
         */
        this.props.wavefilterState({
            tokenSelected: {"STATUS": ["any"]},
            searchQuery: {},
            defaultToken: {"STATUS": ["any"]}
        })
    }

    render() {
        var updateStatusIntl = "";
        var itemNumber = 7, waveData = this.props.waveDetail.waveData, waveState = {
            "pendingWave": "--",
            "progressWave": "--",
            "orderRemaining": "--",
            "completedWaves": "--",
            "totalOrders": "--"
        };
        var  emptyResponse=this.props.waveDetail.emptyResponse;
        var totalOrders = 0, orderToFulfill = 0, completedWaves = 0, pendingWaves = 0, progressWave = 0, alertNum = 0;

        if (this.props.waveDetail.waveData !== undefined) {
            waveData = this._processWaveData()
            if (waveData && waveData.length) {
                for (var i = waveData.length - 1; i >= 0; i--) {
                    if (waveData[i].totalOrders) {
                        totalOrders = waveData[i].totalOrders + totalOrders;
                    }
                    if (waveData[i].ordersToFulfill) {
                        orderToFulfill = waveData[i].ordersToFulfill + orderToFulfill;
                    }

                    if (waveData[i].progress === 100) {
                        completedWaves++;
                    }
                    if (waveData[i].statusClass === GOR_PENDING) {
                        pendingWaves++;
                    }

                    if (waveData[i].statusClass === GOR_PROGRESS) {
                        progressWave++;
                    }

                    if (waveData[i].statusClass === GOR_BREACHED) {
                        alertNum++;
                    }
                }
                waveState = {
                    "pendingWave": pendingWaves,
                    "progressWave": progressWave,
                    "orderRemaining": orderToFulfill,
                    "completedWaves": completedWaves,
                    "totalOrders": totalOrders,
                    "alertNum": alertNum
                };
            }
        }
        return (
            <div className="gorTesting">
                <Spinner isLoading={this.props.wavesSpinner} setSpinner={this.props.setWavesSpinner}/>
                <WavesTable items={waveData} itemNumber={itemNumber}
                            waveState={waveState} intlMessg={this.props.intlMessages}
                            sortHeaderState={this.props.waveHeaderSort}
                            sortHeaderOrder={this.props.waveHeaderSortOrder}
                            currentSortState={this.props.waveSortHeader}
                            currentHeaderOrder={this.props.waveSortHeaderState}
                            setWaveFilter={this.props.waveFilterDetail}
                            getWaveFilter={this.props.waveFilter}
                            lastUpdatedText={updateStatusIntl}
                            lastUpdated={updateStatusIntl}
                            refreshOption={this.refresh.bind(this)}
                            isFilterApplied={this.props.isFilterApplied}
                            wavesToggleFilter={this.props.wavesToggleFilter}
                            setFilter={this.props.wavesFilterToggle}
                            waveFilterStatus={this.props.waveFilterStatus}
                            refreshList={this._refreshWavesList.bind(this)}
                            emptyResponse={emptyResponse}
                            filterapplyflag={this.props.filterapplyflag}
                            setFilterApplyFlag={this.props.setFilterApplyFlag}
                />
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        waveFilter: state.sortHeaderState.waveFilter || "",
        waveSortHeader: state.sortHeaderState.waveHeaderSort || INITIAL_HEADER_SORT,
        waveSortHeaderState: state.sortHeaderState.waveHeaderSortOrder || INITIAL_HEADER_ORDER,
        wavesSpinner: state.spinner.wavesSpinner || false,
        filterOptions: state.filterOptions || {},
        waveDetail: state.waveInfo || {},
        intlMessages: state.intl.messages,
        timeOffset: state.authLogin.timeOffset,
        waveFilterStatus: state.filterInfo.waveFilterStatus || false,
        wavesToggleFilter: state.filterInfo.wavesToggleFilter || false,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        filterapplyflag:state.filterInfo.filterapplyflag|| false
    };
};

var mapDispatchToProps = function (dispatch) {
    return {
        waveFilterDetail: function (data) {
            dispatch(waveFilterDetail(data))
        },
        setWavesSpinner: function (data) {
            dispatch(setWavesSpinner(data))
        },
        waveHeaderSort: function (data) {
            dispatch(waveHeaderSort(data))
        },
        waveHeaderSortOrder: function (data) {
            dispatch(waveHeaderSortOrder(data))
        },
        wavesFilterToggle: function (data) {
            dispatch(wavesFilterToggle(data));
        },
        filterApplied: function (data) {
            dispatch(filterApplied(data));
        },
        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        toggleWaveFilter: function (data) {
            dispatch(toggleWaveFilter(data));
        },
        wavefilterState: function (data) {
            dispatch(wavefilterState(data));
        },
        setFilterApplyFlag: function (data) {
            dispatch(setFilterApplyFlag(data));
        }
    };
}

WaveTab.contextTypes = {
    intl: React.PropTypes.object.isRequired
}

WaveTab.PropTypes = {
    waveSortHeaderState: React.PropTypes.string,
    wavesSpinner: React.PropTypes.bool,
    filterOptions: React.PropTypes.object,
    waveDetail: React.PropTypes.object,
    intlMessages: React.PropTypes.string,
    waveFilterState: React.PropTypes.bool,
    wavesToggleFilter: React.PropTypes.bool,
    waveFilterDetail: React.PropTypes.func,
    setWavesSpinner: React.PropTypes.func,
    waveHeaderSort: React.PropTypes.func,
    waveHeaderSortOrder: React.PropTypes.func,
    wavesFilterToggle: React.PropTypes.func,
    wsSubscriptionData: React.PropTypes.object,
    filterapplyflag:React.PropTypes.bool,
    setFilterApplyFlag:React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(WaveTab) ;