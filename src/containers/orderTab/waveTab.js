import React  from 'react';
import WavesTable from './waveTable';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import {setWavesSpinner} from '../../actions/spinnerAction';
import {GOR_PENDING, GOR_PROGRESS, GOR_BREACHED,WS_ONSEND} from '../../constants/frontEndConstants';
import {stringConfig} from '../../constants/backEndConstants';
import {defineMessages} from 'react-intl';
import {waveHeaderSort, waveHeaderSortOrder, waveFilterDetail} from '../../actions/sortHeaderActions';
import {INITIAL_HEADER_SORT, INITIAL_HEADER_ORDER} from '../../constants/frontEndConstants';
import {getDaysDiff} from '../../utilities/getDaysDiff';
import {showTableFilter, filterApplied, toggleWaveFilter, wavefilterState} from '../../actions/filterAction';
import {updateSubscriptionPacket,setWsAction} from './../../actions/socketActions'
import {wsOverviewData} from './../../constants/initData.js';
import {wavesRefreshed} from './../../actions/orderListActions'
import {hashHistory} from 'react-router'
import WaveFilter from './waveFilter';
import FilterSummary from '../../components/tableFilter/filterSummary'

//Mesages for internationalization
const messages=defineMessages({
    wavePrefix: {
        id: "waveDetail.id.prefix",
        defaultMessage: "WAVE-{waveId}"
    }


});


class WaveTab extends React.Component {
    constructor(props) {
        super(props);
        this.state={query:null}
    }

    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
        this.props.wavesRefreshed()
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
        this.props.setWavesSpinner(true)
        let filterSubsData={}
        if (query.waveId) {
            filterSubsData["wave_id"]=['=', query.waveId];
        }
        if (query.status) {
            filterSubsData["status"]=['in', query.status.constructor=== Array ? query.status : [query.status]]
        }
        if (Object.keys(query).filter(function(el){return el!=='page'}).length !== 0) {
            this.props.toggleWaveFilter(true);
            this.props.filterApplied(true);
        } else {
            this.props.toggleWaveFilter(false);
            this.props.filterApplied(false);
        }
        let updatedWsSubscription=this.props.wsSubscriptionData;
        updatedWsSubscription["orders"].data[0].details["filter_params"]=filterSubsData;
        this.props.initDataSentCall(updatedWsSubscription["orders"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
        this.props.wavefilterState({
            tokenSelected: {
                "STATUS": query.status ? (query.status.constructor=== Array ? query.status : [query.status]) : ["any"]
            },
            searchQuery: {
                "WAVE ID": query.waveId || ''
            }
        });

    }


    /**
     *
     */
    _clearFilter() {
        hashHistory.push({pathname: "/orders/waves", query: {}})
    }

    _processWaveData(data, nProps) {
        var nProps=this,
            data=nProps.props.waveDetail.waveData;
        var waveData=[], waveDetail={};
        let WAVE, waveId;


        var status={
            "in_progress": "progress",
            "completed": "completed",
            "breached": "breached",
            "wave_pending": "pending"
        };
        var priStatus={"in_progress": 2, "completed": 4, "breached": 1, "pending": 3};
        var timeOffset=this.props.timeOffset, alertNum=0;
        if (data) {
            for (var i=data.length - 1; i >= 0; i--) {
                waveId=data[i].wave_id;
                WAVE=nProps.context.intl.formatMessage(messages.wavePrefix, {"waveId": waveId});
                waveDetail={};
                waveDetail.id=WAVE;
                waveDetail.statusClass=status[data[i].status];
                waveDetail.statusPriority=priStatus[data[i].status];
                if (nProps.context.intl.formatMessage(stringConfig[data[i].status])) {
                    waveDetail.status=nProps.context.intl.formatMessage(stringConfig[data[i].status]);
                }
                else {
                    waveDetail.status=data[i].status;
                }
                if (!data[i].start_time) {
                    waveDetail.startTime="--";
                }
                else {
                    if (getDaysDiff(data[i].start_time) < 2) {
                        waveDetail.startTime=nProps.context.intl.formatRelative(data[i].start_time, {
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
                        waveDetail.startTime=nProps.context.intl.formatDate(data[i].start_time,
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
                    waveDetail.cutOffTime="--";
                }
                else {
                    if (getDaysDiff(data[i].cut_off_time) < 2) {
                        waveDetail.cutOffTime=nProps.context.intl.formatRelative(data[i].cut_off_time, {
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
                        waveDetail.cutOffTime=nProps.context.intl.formatDate(data[i].cut_off_time,
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
                waveDetail.ordersToFulfill=data[i].orders_to_fulfill;
                waveDetail.totalOrders=data[i].total_orders;
                if (waveDetail.totalOrders) {
                    waveDetail.progress=parseInt(((waveDetail.totalOrders - waveDetail.ordersToFulfill) / waveDetail.totalOrders) * 100);
                }
                else {
                    waveDetail.progress=0;
                }
                waveData.push(waveDetail);
            }
        }
        return waveData;
    }

    _setFilter() {
        var newState=!this.props.showFilter;
        this.props.showTableFilter(newState);
    }

    refresh=()=> {
        console.log('Refresh');
    }

    render() {
        let filterHeight=screen.height-190-50;
        var updateStatusIntl="";
        var itemNumber=7, waveData=this.props.waveDetail.waveData, waveState={
            "pendingWave": "--",
            "progressWave": "--",
            "orderRemaining": "--",
            "completedWaves": "--",
            "totalOrders": "--"
        };
        var totalOrders=0, orderToFulfill=0, completedWaves=0, pendingWaves=0, progressWave=0, alertNum=0;

        if (this.props.waveDetail.waveData !== undefined) {
            waveData=this._processWaveData()
            if (waveData && waveData.length) {
                for (var i=waveData.length - 1; i >= 0; i--) {
                    if (waveData[i].totalOrders) {
                        totalOrders=waveData[i].totalOrders + totalOrders;
                    }
                    if (waveData[i].ordersToFulfill) {
                        orderToFulfill=waveData[i].ordersToFulfill + orderToFulfill;
                    }

                    if (waveData[i].progress=== 100) {
                        completedWaves++;
                    }
                    if (waveData[i].statusClass=== GOR_PENDING) {
                        pendingWaves++;
                    }

                    if (waveData[i].statusClass=== GOR_PROGRESS) {
                        progressWave++;
                    }

                    if (waveData[i].statusClass=== GOR_BREACHED) {
                        alertNum++;
                    }
                }
                waveState={
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
                {waveData?<div>
                    <div className="gor-filter-wrap" style={{'width':this.props.showFilter?'350px':'0px', height:filterHeight}}>
                        <WaveFilter waveData={waveData} responseFlag={this.props.responseFlag}/>
                    </div>
                    <div className="gorToolBar">
                        <div className="gorToolBarWrap">
                            <div className="gorToolBarElements">
                                <FormattedMessage id="waves.table.heading" description="Heading for waves"
                                                  defaultMessage="Waves"/>

                            </div>
                        </div>



                        <div className="filterWrapper">
                            <div className="gorToolBarDropDown">
                                <div className="gor-button-wrap">
                                    <div className="gor-button-sub-status">{updateStatusIntl} {updateStatusIntl} </div>

                                    <button className={this.props.waveFilterStatus?"gor-filterBtn-applied":"gor-filterBtn-btn"} onClick={this._setFilter.bind(this)} >
                                        <div className="gor-manage-task"/>
                                        <FormattedMessage id="gor.filter.filterLabel" description="button label for filter"
                                                          defaultMessage="Filter data"/>
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/*Filter Summary*/}
                    <FilterSummary total={waveData.length||0} isFilterApplied={this.props.isFilterApplied} responseFlag={this.props.responseFlag} filterText={<FormattedMessage id="waveList.filter.search.bar"
                                                                                                                                                     description='total waves for filter search bar'
                                                                                                                                                     defaultMessage='{total} Waves found'
                                                                                                                                                     values={{total: waveData.length || 0}}/>}
                                   refreshList={this._clearFilter.bind(this)}
                                   refreshText={<FormattedMessage id="waveList.filter.search.bar.showall"
                                                                  description="button label for show all"
                                                                  defaultMessage="Show all Waves"/>}/>
                </div>:null}
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
                            showFilter={this.props.showFilter}
                            setFilter={this.props.showTableFilter}
                            waveFilterStatus={this.props.waveFilterStatus}
                            refreshList={this._clearFilter.bind(this)}
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
        showFilter: state.filterInfo.filterState || false,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        wavesRefreshed:state.ppsInfo.wavesRefreshed

    };
};

var mapDispatchToProps=function (dispatch) {
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
        showTableFilter: function (data) {
            dispatch(showTableFilter(data));
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
        initDataSentCall: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); },
        wavesRefreshed:function(data){dispatch(wavesRefreshed(data))}
    };
}

WaveTab.contextTypes={
    intl: React.PropTypes.object.isRequired
}

WaveTab.PropTypes={
    waveSortHeaderState: React.PropTypes.string,
    wavesSpinner: React.PropTypes.bool,
    filterOptions: React.PropTypes.object,
    waveDetail: React.PropTypes.object,
    intlMessages: React.PropTypes.string,
    waveFilterState: React.PropTypes.bool,
    showFilter: React.PropTypes.bool,
    waveFilterDetail: React.PropTypes.func,
    setWavesSpinner: React.PropTypes.func,
    waveHeaderSort: React.PropTypes.func,
    waveHeaderSortOrder: React.PropTypes.func,
    showTableFilter: React.PropTypes.func,
    wsSubscriptionData: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(WaveTab) ;