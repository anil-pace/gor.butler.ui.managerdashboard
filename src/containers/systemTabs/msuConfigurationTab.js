/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ButlerBotTable from './butlerbotTable';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {stringConfig} from '../../constants/backEndConstants';
import {butlerBotsRefreshed} from './../../actions/systemActions'
import {hashHistory} from 'react-router'
import {
    INITIAL_HEADER_SORT,
    INITIAL_HEADER_ORDER,
    GOR_PERIPHERAL_ONLINE,
    GOR_PERIPHERAL_OFFLINE,WS_ONSEND
} from '../../constants/frontEndConstants';
import Spinner from '../../components/spinner/Spinner';
import {setButlerSpinner} from  '../../actions/spinnerAction';
import {butlerHeaderSort, butlerHeaderSortOrder, butlerFilterDetail} from '../../actions/sortHeaderActions';
import {defineMessages} from 'react-intl';
import {showTableFilter, filterApplied, toggleBotButton, butlerfilterState} from '../../actions/filterAction';
import {updateSubscriptionPacket,setWsAction} from './../../actions/socketActions'
import {wsOverviewData} from './../../constants/initData.js';
//import ButlerBotFilter from './butlerBotFilter';
import MsuConfigFilter from './msuConfigFilter';
import FilterSummary from '../../components/tableFilter/filterSummary';
import {modal} from 'react-redux-modal';
import ChangeRackType from './changeRackType';
//Mesages for internationalization
const messages=defineMessages({
    butlerPrefix: {
        id: "butlerDetail.name.prefix",
        description: "prefix for butler id",
        defaultMessage: "BOT - {botId}"
    },
    ppsPrefix: {
        id: "pps.name.prefix",
        description: "prefix for pps id",
        defaultMessage: "PPS {ppsId}"
    },
    chargerPrefix: {
        id: "charger.name.prefix",
        description: "prefix for charger id",
        defaultMessage: "CS - {csId}"
    },
    msuPrefix: {
        id: "msu.name.prefix",
        description: "prefix for msu id",
        defaultMessage: "MSU - {msuId}"
    },
    audit: {
        id: "audit.name.prefix",
        description: "prefix for audit",
        defaultMessage: "Audit"
    },
    pick: {
        id: "pick.name.prefix",
        description: "prefix for Pick",
        defaultMessage: "Pick"
    },
    put: {
        id: "Put.name.prefix",
        description: "prefix for put",
        defaultMessage: "Put"
    },
    charging: {
        id: "Charging.name.prefix",
        description: "prefix for Charging",
        defaultMessage: "Charging"
    },
    move: {
        id: "Move.name.prefix",
        description: "prefix for Charging",
        defaultMessage: "Move"
    },
    moving: {
        id: "moving.task",
        description: "moving task",
        defaultMessage: "Moving to"
    },
    movingMount: {
        id: "movingMount.task",
        description: "movingMount task",
        defaultMessage: "Moving to mount"
    },
    movingDismount: {
        id: "movingDismount.task",
        description: "movingDismount task",
        defaultMessage: "Moving to dismount"
    },
    docked: {
        id: "docked.task",
        description: "docked task",
        defaultMessage: "Docked at"
    }
});


class ButlerBot extends React.Component {


    _processButlersData() {
        var nProps=this,
            data=nProps.props.butlerDetail.butlerDetail;
        var butlerData=[], butlerDetail={};

        var currentTask={
            0: nProps.context.intl.formatMessage(messages.pick),
            1: nProps.context.intl.formatMessage(messages.put),
            2: nProps.context.intl.formatMessage(messages.audit),
            3: nProps.context.intl.formatMessage(messages.charging),
            4: nProps.context.intl.formatMessage(messages.move)
        };
        var currentTaskClass={
            0: "Pick",
            1: "Put",
            2: "Audit",
            3: "Charging",
            4: "Move"
        }

        var currentSubtask={
            0: nProps.context.intl.formatMessage(messages.moving),
            1: nProps.context.intl.formatMessage(messages.movingMount),
            2: nProps.context.intl.formatMessage(messages.movingDismount),
            3: nProps.context.intl.formatMessage(messages.docked)
        };

        var priStatus={"online": 1, "offline": 2};
        let BOT, PPS, CS, MSU;

        for (var i=data.length - 1; i >= 0; i--) {
            var botId=data[i].butler_id, msuId=data[i].display_msu_id, csId=data[i].charger_id,
                ppsId=data[i].pps_id;
            BOT=nProps.context.intl.formatMessage(messages.butlerPrefix, {"botId": botId});
            PPS=nProps.context.intl.formatMessage(messages.ppsPrefix, {"ppsId": ppsId});
            CS=nProps.context.intl.formatMessage(messages.chargerPrefix, {"csId": csId});
            MSU=nProps.context.intl.formatMessage(messages.msuPrefix, {"msuId": msuId});
            butlerDetail={};
            butlerDetail.id=BOT;
            butlerDetail.statusClass=data[i].state;
            if (nProps.context.intl.formatMessage(stringConfig[data[i].state])) {
                butlerDetail.status=nProps.context.intl.formatMessage(stringConfig[data[i].state]);
            }

            else {
                butlerDetail.status=data[i].state;
            }
            butlerDetail.statusPriority=priStatus[data[i].state];
            if (data[i].location) {
                butlerDetail.location=data[i].location;
            }
            else {
                butlerDetail.location="--";
            }
            if (data[i].power || data[i].power=== 0) {
                butlerDetail.voltage=data[i].power + " %";
            }
            else {
                butlerDetail.voltage="--";
            }
            butlerDetail.butlerAvgVoltage=data[i].power;
            butlerDetail.taskNum=currentTask[data[i].current_task];
            butlerDetail.taskNumClass=currentTaskClass[data[i].current_task];
            butlerDetail.taskType=data[i].current_task;
            if (data[i].display_msu_id=== null) {
                butlerDetail.msu="--";
            }
            else {
                butlerDetail.msu=MSU;
            }

            if (data[i].current_task !== null) {
                butlerDetail.current=currentTask[data[i].current_task];
                if (data[i].current_subtask !== null) {
                    butlerDetail.current=butlerDetail.current + " - " + currentSubtask[data[i].current_subtask];
                    if (data[i].charger_id !== null) {
                        butlerDetail.current=butlerDetail.current + " CS " + data[i].charger_id;
                    }

                    else if (data[i].msu_id !== null) {
                        butlerDetail.current=butlerDetail.current + " MSU " + data[i].msu_id;
                    }

                    else {
                        butlerDetail.current=butlerDetail.current + " " + PPS;
                    }
                }


            }
            else {
                butlerDetail.current="--";
            }
            butlerData.push(butlerDetail);
        }

        return butlerData;
    }

    constructor(props) {
        super(props);
        this.state={query:null};
        this._handleRefreshData = this._handleRefreshData.bind(this);
        this._releaseMSU = this._releaseMSU.bind(this);
        this._startReconfig = this._startReconfig.bind(this);
    }

    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
        this.props.butlerBotsRefreshed()
    }


    _handleRefreshData = () => {
        console.log("inside _handleRefreshData function");
        modal.add(ChangeRackType, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true // (optional) if you don't wanna show the top right close button
            //.. all what you put in here you will get access in the modal props ;),
        });
    }

    _releaseMSU = () => {
        console.log("inside _releaseMSU function");
    }

    _startReconfig = () => {
        console.log("inside _startReconfig function");
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
        this.props.setButlerSpinner(true)
        let filterSubsData={}
        if (query.location) {
            filterSubsData["location"]=['contains',query.location]
        }
        if (query.butler_id) {
            filterSubsData["butler_id"]=['=',query.butler_id]
        }
        if (query.status) {
            filterSubsData["state"]=['in',query.status.constructor===Array?query.status:[query.status]]
        }
        if (query.current_task) {
            filterSubsData["current_task"]=['in',query.current_task.constructor===Array?query.current_task:[query.current_task]]
        }

        if (Object.keys(query).filter(function(el){return el!=='page'}).length !== 0) {
            this.props.toggleBotButton(true);
            this.props.filterApplied(true);
        } else {
            this.props.toggleBotButton(false);
            this.props.filterApplied(false);
        }

        let updatedWsSubscription=this.props.wsSubscriptionData;
        updatedWsSubscription["system"].data[0].details["filter_params"]=filterSubsData;
        updatedWsSubscription["butlerbots"].data[0].details["filter_params"]=filterSubsData;
        this.props.initDataSentCall(updatedWsSubscription["butlerbots"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
        this.props.butlerfilterState({
            tokenSelected: {"STATUS": query.status?query.status.constructor===Array?query.status:[query.status]:["any"], "MODE": query.current_task?query.current_task.constructor===Array?query.current_task:[query.current_task]:["any"]}, searchQuery: {
                "SPECIFIC LOCATION/ZONE":query.location||null,
                "BOT ID":query.butler_id||null
            },
            defaultToken: {"STATUS": ["any"], "MODE": ["any"]}
        });
    }


    /**
     *
     */
    _clearFilter() {
        hashHistory.push({pathname: "/system/butlerbots", query: {}})
    }


    _setFilter() {
        var newState=!this.props.showFilter;
        this.props.showTableFilter(newState)
    }

    render() {
        var filterHeight=screen.height - 190 - 50;
        let updateStatusIntl="";
        var itemNumber=6;
        var butlerData, avgVoltage=0;
        var taskDetail={
            "Put": 0, "Pick": 0, "Charging": 0, "Idle": 0, "Audit": 0,
            "avgVoltage": 0, "msuMounted": 0, "location": 0, "online": 0,
            "offline": 0
        };

        if (this.props.butlerDetail.butlerDetail !== undefined) {
            butlerData=this._processButlersData();
            let activeBotsCount=0;
            if (butlerData && butlerData.length) {
                for (var i=butlerData.length - 1; i >= 0; i--) {
                    avgVoltage=(butlerData[i].butlerAvgVoltage || 0) + avgVoltage;
                    activeBotsCount=butlerData[i].butlerAvgVoltage ? activeBotsCount +1 : activeBotsCount;
                    if (butlerData[i].taskNumClass=== null || butlerData[i].taskNumClass=== undefined) {
                        taskDetail["Idle"]++;
                    }
                    else {

                        taskDetail[butlerData[i].taskNumClass]++;
                    }

                    if (butlerData[i].msu !== "--") {
                        taskDetail["msuMounted"]++;
                    }

                    if (butlerData[i].location !== null) {
                        taskDetail["location"]++;
                    }

                    if (butlerData[i].statusClass=== GOR_PERIPHERAL_ONLINE) {
                        taskDetail["online"]++;
                    }

                    if (butlerData[i].statusClass=== GOR_PERIPHERAL_OFFLINE) {
                        taskDetail["offline"]++;
                    }

                }
                avgVoltage=((avgVoltage / (activeBotsCount)).toFixed(1));
                taskDetail["avgVoltage"]=avgVoltage + "%";
            }
            else {
                taskDetail={
                    "Put": "--",
                    "Pick": "--",
                    "Charging": "--",
                    "Idle": "--",
                    "Audit": "--",
                    "avgVoltage": 0,
                    "msuMounted": "--",
                    "location": "--",
                    "online": "--"
                };
            }
        }
        return (
            <div>
                <div>
                    <div className="gorTesting">
                        <Spinner isLoading={this.props.butlerSpinner} setSpinner={this.props.setButlerSpinner}/>
                        {butlerData?<div><div className="gor-filter-wrap"
                                         style={{'width': this.props.showFilter ? '350px' : '0px', height: filterHeight}}>
                                <MsuConfigFilter butlerData={butlerData} responseFlag={this.props.responseFlag}/>
                            </div>


                            <div className="gorToolBar">
                            <div className="gorToolBarWrap">
                                <div className="gorToolBarElements">
                                    <FormattedMessage id="msuConfig.table.heading" description="Heading for butlerbot" defaultMessage="MSU Configuration"/>
                                </div>
                            </div>


                            <div className="filterWrapper">

                                <div style={{paddingLeft: "0px"}} className="gorToolBarDropDown">
                                    <div className="gor-operations-log">
                                        <button style={{width: "145px"}} className="gor-rpt-dwnld" onClick={this._handleRefreshData}>
                                            <div className="gor-refresh-icon"/>
                                            <FormattedMessage id="gor.msuConfig.refreshData" description="button label for refresh data" defaultMessage="REFRESH DATA"/>
                                        </button>
                                    </div>
                                </div>

                                <div style={{paddingLeft: "0px"}} className="gorToolBarDropDown">
                                    <div className="gor-button-wrap">
                                        <button style={{width: "145px"}} className={this.props.botFilterStatus ? "gor-filterBtn-applied" : "gor-filterBtn-btn"} onClick={this._releaseMSU}>
                                            <FormattedMessage id="gor.msuConfig.releaseMsu" description="button label for release msu" defaultMessage="RELEASE MSU(S)"/>
                                        </button>
                                    </div>
                                </div> 

                                <div style={{paddingLeft: "0px"}} className="gorToolBarDropDown">
                                    <div className="gor-button-wrap">
                                        <button style={{width: "145px"}} className={this.props.botFilterStatus ? "gor-filterBtn-applied" : "gor-filterBtn-btn"} onClick={this._startReconfig}>
                                            <FormattedMessage id="gor.msuConfig.startReconfig" description="button label for start reconfig" defaultMessage="START RECONFIG"/>
                                        </button>
                                    </div>
                                </div>  


                                <div style={{paddingLeft: "0px"}} className="gorToolBarDropDown">
                                    <div className="gor-button-wrap">
                                        <button style={{width: "145px"}} className={this.props.botFilterStatus ? "gor-filterBtn-applied" : "gor-filterBtn-btn"} onClick={this._setFilter.bind(this)}>
                                            <div className="gor-manage-task"/>
                                            <FormattedMessage id="gor.msuConfig.filterLabel" description="button label for filter" defaultMessage="FILTER DATA"/>
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/*Filter Summary*/}
                            <FilterSummary total={butlerData.length||0} isFilterApplied={this.props.isFilterApplied} responseFlag={this.props.responseFlag}
                            filterText={<FormattedMessage id="msuConfig.filter.search.bar"
                                                          description='total bots for filter search bar'
                                                          defaultMessage='{total} Bots found'
                                                          values={{total: butlerData.length || 0}}/>}
                            refreshList={this._clearFilter.bind(this)}
                            refreshText={<FormattedMessage id="msuConfig.filter.search.bar.showall" description="button label for show all" defaultMessage="Show all MSUs"/>}/></div>:null}

                        <ButlerBotTable items={butlerData} itemNumber={itemNumber} parameters={taskDetail}
                                        intlMessg={this.props.intlMessages}
                                        sortHeaderState={this.props.butlerHeaderSort}
                                        currentSortState={this.props.butlerSortHeader}
                                        sortHeaderOrder={this.props.butlerHeaderSortOrder}
                                        currentHeaderOrder={this.props.butlerSortHeaderState}
                                        setButlerFilter={this.props.butlerFilterDetail}
                                        getButlerFilter={this.props.butlerFilter}
                                        showFilter={this.props.showFilter}
                                        isFilterApplied={this.props.isFilterApplied}
                                        setFilter={this.props.showTableFilter}
                                        botFilterStatus={this.props.botFilterStatus}
                                        lastUpdatedText={updateStatusIntl}
                                        lastUpdated={updateStatusIntl}
                                        butlerState={this.props.filterState}
                                        refreshList={this._clearFilter.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
;

function mapStateToProps(state, ownProps) {
    return {
        butlerFilter: state.sortHeaderState.butlerFilter || "",
        butlerSortHeader: state.sortHeaderState.butlerHeaderSort || INITIAL_HEADER_SORT,
        butlerSortHeaderState: state.sortHeaderState.butlerHeaderSortOrder || INITIAL_HEADER_ORDER,
        butlerSpinner: state.spinner.butlerSpinner || false,
        butlerDetail: state.butlerDetail || [],
        intlMessages: state.intl.messages,
        showFilter: state.filterInfo.filterState || false,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        botFilterStatus: state.filterInfo.botFilterStatus || false,
        filterState: state.filterInfo.butlerFilterState,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        butlerBotsRefreshed:state.butlersInfo.butlerBotsRefreshed
    };
}


var mapDispatchToProps=function (dispatch) {
    return {
        butlerFilterDetail: function (data) {
            dispatch(butlerFilterDetail(data))
        },
        setButlerSpinner: function (data) {
            dispatch(setButlerSpinner(data))
        },
        butlerHeaderSort: function (data) {
            dispatch(butlerHeaderSort(data))
        },
        butlerHeaderSortOrder: function (data) {
            dispatch(butlerHeaderSortOrder(data))
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
        toggleBotButton: function (data) {
            dispatch(toggleBotButton(data));
        },
        butlerfilterState: function (data) {
            dispatch(butlerfilterState(data));
        },
        initDataSentCall: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); },
        butlerBotsRefreshed:function(data){dispatch(butlerBotsRefreshed(data))}
    };
}

ButlerBot.contextTypes={
    intl: React.PropTypes.object.isRequired
}
ButlerBot.PropTypes={
    butlerFilter: React.PropTypes.string,
    butlerSortHeader: React.PropTypes.string,
    butlerSortHeaderState: React.PropTypes.string,
    butlerSpinner: React.PropTypes.bool,
    butlerDetail: React.PropTypes.array,
    showFilter: React.PropTypes.bool,
    isFilterApplied: React.PropTypes.bool,
    botFilterStatus: React.PropTypes.bool,
    filterState: React.PropTypes.object,
    butlerFilterDetail: React.PropTypes.func,
    setButlerSpinner: React.PropTypes.func,
    butlerHeaderSort: React.PropTypes.func,
    butlerHeaderSortOrder: React.PropTypes.func,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ButlerBot) ;


