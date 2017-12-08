/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import PPStable from './PPStable';
import {connect} from 'react-redux';
import {changePPSmode} from '../../actions/ppsModeChangeAction'
import {FormattedMessage} from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import {setPpsSpinner} from '../../actions/spinnerAction';
import {stringConfig} from '../../constants/backEndConstants'
import {defineMessages} from 'react-intl';
import {ppsListRefreshed} from './../../actions/systemActions'
import {hashHistory} from 'react-router'
import {
    ppsHeaderSort,
    ppsHeaderSortOrder,
    setCheckedPps,
    setDropDisplay,
    setCheckAll,
    ppsFilterDetail
} from '../../actions/sortHeaderActions';
import {
    INITIAL_HEADER_SORT,
    INITIAL_HEADER_ORDER,
    GOR_ON_STATUS,
    GOR_FIRST_LAST,WS_ONSEND,
    PPS_STATUS_CHANGE,
    PPS_STATUS_CLOSE,
    PPS_STATUS_FCLOSE,
    PPS_STATUS_OPEN,
    PPS_MODE_CHANGE, APP_JSON, PUT,
    POST
} from '../../constants/frontEndConstants';
import {
    showTableFilter,
    filterApplied,
    ppsfilterState,
    togglePPSFilter,
    setDefaultRange
} from '../../actions/filterAction';
import {updateSubscriptionPacket,setWsAction} from './../../actions/socketActions'
import {wsOverviewData} from './../../constants/initData.js';
import PPSFilter from './ppsFilter';
import FilterSummary from '../../components/tableFilter/filterSummary';
import Dropdown from '../../components/gor-dropdown-component/dropdown';
import {PPS_MODE_CHANGE_URL,PPS_STATUS_CHANGE_URL} from '../../constants/configConstants';


import {modal} from 'react-redux-modal';
import ClosePPSList from './closePPSList';

//Mesages for internationalization
const messages=defineMessages({
    namePrefix: {
        id: "ppsDetail.name.prefix",
        description: "prefix for pps id in ppsDetail",
        defaultMessage: "PPS-{ppsId}"
    },
    perfPrefix: {
        id: "ppsDetail.performance.prefix.items",
        description: "prefix for pps id in ppsDetail",
        defaultMessage: "{performance} items/hr"
    }

});


class PPS extends React.Component {
    constructor(props) {
        super(props);
        this.state={query:null,sortedDataList:null}
    }

    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
        this.props.ppsListRefreshed()
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
        this.props.setPpsSpinner(true)
        let filterSubsData={}
        if (query.operator) {
            let operator_assigned_query=query.operator.split(" ")
            operator_assigned_query=operator_assigned_query.filter(function(word){ return !!word})
            filterSubsData["operators_assigned"]=operator_assigned_query.length>1?["=",operator_assigned_query]:["=",operator_assigned_query.join("").trim()];
        }

        if (query.pps_id) {
            filterSubsData["pps_id"]=['=',query.pps_id]
        }
        if (query.status) {
            filterSubsData["pps_status"]=['in',query.status.constructor===Array?query.status:[query.status]]
        }
        if (query.mode) {
            filterSubsData["current_task"]=['in',query.mode.constructor===Array?query.mode:[query.mode]]
        }

        if(query.minRange||query.maxRange){
            filterSubsData["performance"]=['between',[query.minRange?+query.minRange:-1,query.maxRange?+query.maxRange:500]]
        }

        if (Object.keys(query).filter(function(el){return el!=='page'}).length !== 0) {
            this.props.togglePPSFilter(true);
            this.props.filterApplied(true);
        } else {
            this.props.togglePPSFilter(false);
            this.props.filterApplied(false);
        }

        let updatedWsSubscription=this.props.wsSubscriptionData;
        updatedWsSubscription["pps"].data[0].details["filter_params"]=filterSubsData;
        this.props.initDataSentCall(updatedWsSubscription["pps"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
        this.props.ppsfilterState({
            tokenSelected: {
                "STATUS": query.status ? query.status.constructor=== Array ? query.status : [query.status] : ["all"],
                "MODE": query.mode ? query.mode.constructor=== Array ? query.mode : [query.mode] : ["all"]
            },
            searchQuery: {
                "PPS ID": query.pps_id || '',
                "OPERATOR ASSIGNED": query.operator || ""
            },
            rangeSelected: {"minValue": [query.minRange || "-1"], "maxValue": [query.maxRange || "500"]}
        })

    }


    /**
     *
     */
    _clearFilter() {
        hashHistory.push({pathname: "/system/pps", query: {}})
    }

    _processPPSData() {
        //TODO: codes need to be replaced after checking with backend
        var PPSData=[], detail={}, ppsId, performance, totalUser=0;
        var nProps=this;
        var data=nProps.props.PPSDetail.PPStypeDetail;
        let PPS, OPEN, CLOSE,FCLOSE, PERFORMANCE;
        let pick=nProps.context.intl.formatMessage(stringConfig.pick);
        let put=nProps.context.intl.formatMessage(stringConfig.put);
        let audit=nProps.context.intl.formatMessage(stringConfig.audit);
        var currentTask={"pick": pick, "put": put, "audit": audit};
        var priStatus={"open": 2, "close": 0,"force_close": 1};
        var checkedPPS = this.props.checkedPps || {};
        var requestedStatusText="--";
        detail.totalOperator=0;
        for (var i=data.length - 1; i >= 0; i--) {
            detail={};
            ppsId=data[i].pps_id;
            performance=(data[i].performance < 0 ? 0 : data[i].performance);
            PPS=nProps.context.intl.formatMessage(messages.namePrefix, {"ppsId": ppsId});
            OPEN=nProps.context.intl.formatMessage(stringConfig.open);
            CLOSE=nProps.context.intl.formatMessage(stringConfig.close);
            FCLOSE=nProps.context.intl.formatMessage(stringConfig.fclose);
            PERFORMANCE=nProps.context.intl.formatMessage(messages.perfPrefix, {"performance": performance ? performance : "0"});
            if(data[i]["requested_status"] === PPS_STATUS_OPEN){
                requestedStatusText = OPEN
            }
            else if(data[i]["requested_status"] === PPS_STATUS_CLOSE){
                requestedStatusText = CLOSE
            }
             else if(data[i]["requested_status"] === PPS_STATUS_FCLOSE){
                requestedStatusText = FCLOSE
            }
            else{
                requestedStatusText = "--"
            }
            detail.id=PPS;
            detail.ppsId=ppsId;
            detail.requested_status=requestedStatusText ;
            detail.pps_requested_mode=data[i]["pps_requested_mode"];
            detail.isChecked = checkedPPS[data[i].pps_id] ? true :false;
            if (data[i].pps_status=== PPS_STATUS_OPEN) {
                detail.status=OPEN;
                detail.statusPriority=2;
            }
            else if(data[i].pps_status=== PPS_STATUS_CLOSE){
                detail.status=CLOSE;
                detail.statusPriority=0;
            }
            else{
                detail.status=FCLOSE;
                detail.statusPriority=1;
            }
            detail.statusClass=data[i].pps_status;
            detail.operatingMode=currentTask[data[i].current_task];
            detail.operatingModeClass=data[i].current_task;
            detail.performance=PERFORMANCE;///  orders /items
            detail.ppsThroughput=(data[i].performance < 0 ? 0 : data[i].performance);
            if (data[i].operators_assigned=== null) {
                detail.operatorAssigned="--";
            }
            else {
                var userFirstLast;
                totalUser=totalUser + data[i].operators_assigned.length;
                for (var j=data[i].operators_assigned.length - 1; j >= 0; j--) {
                    if (GOR_FIRST_LAST) {
                        userFirstLast=(data[i].operators_assigned[j][0] ? data[i].operators_assigned[j][0] : "") + " " + (data[i].operators_assigned[j][1] ? data[i].operators_assigned[j][1] : "");
                    }
                    else {
                        userFirstLast=(data[i].operators_assigned[j][1] ? data[i].operators_assigned[j][1] : "") + " " + (data[i].operators_assigned[j][0] ? data[i].operators_assigned[j][0] : "");
                    }
                    if (detail.operatorAssigned) {
                        detail.operatorAssigned=detail.operatorAssigned + ", " + userFirstLast;
                    }
                    else {
                        detail.operatorAssigned=userFirstLast;
                    }
                }
                detail.totalOperator=detail.totalOperator + data[i].operators_assigned.length;

            }
            detail.totalUser=totalUser;
            detail.profiles=data[i].pps_profiles
            PPSData.push(detail);
        }
        return PPSData;

    }

    _setFilter() {
        this.props.showTableFilter(!this.props.showFilter);
    }


    updateSortedDataList(updatedList){
        this.setState({sortedDataList:updatedList})
    }

    /*handler for status change*/
    handleStatusChange(selection,requestObj){
      var checkedPPS=[], j=0, sortedIndex;
        
        if(selection.value === "close"){
             if(!requestObj){
             let selectedPps = this.props.checkedPps,openPps={};
             for(let k in selectedPps){
                if(selectedPps[k].statusPriority === 2){ // status priority for open is 2
                    openPps[k] = selectedPps[k];
                }
             }
             modal.add(ClosePPSList, {
                title: '',
                heading:<FormattedMessage id="pps.close.heading"
                       description='Heading for Close PPS'
                       defaultMessage='Close PPS'/>,
                size: 'large', // large, medium or small,
                closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
                hideCloseButton: true,
                checkedPPS: openPps,
                handleStatusChange:this.handleStatusChange.bind(this),
                changePPSmode:this.props.changePPSmode.bind(this)
            });
         }
         else {
               let formData={}
                formData = requestObj
                let ppsStatusChange={
                        'url': PPS_STATUS_CHANGE_URL,
                        'formdata': formData,
                        'method': POST,
                        'cause': PPS_STATUS_CHANGE,
                        'token': sessionStorage.getItem('auth_token'),
                        'contentType': APP_JSON
                    }

            this.props.changePPSmode(ppsStatusChange);
            this.props.setCheckAll(false);
            this.props.setDropDisplay(false);
            
         }
        }
        else if(selection.value === "open"){
            let formData={},checkedPps = this.props.checkedPps,selectedPps={}
            for(let k in this.props.checkedPps){
                selectedPps[k] = "open"
            }
            formData["requested_pps_status"] = selectedPps
            let ppsStatusChange={
                    'url': PPS_STATUS_CHANGE_URL,
                    'formdata': formData,
                    'method': POST,
                    'cause': PPS_STATUS_CHANGE,
                    'token': sessionStorage.getItem('auth_token'),
                    'contentType': APP_JSON
                }

        this.props.changePPSmode(ppsStatusChange);
        this.props.setCheckAll(false);
        this.props.setDropDisplay(false);
        
        }
    }

    handleModeChange(data) {
        var checkedPPS=[], j=0, mode=data.value, sortedIndex,formData={};
        checkedPPS =Object.keys(this.props.checkedPps);
        formData["pps_id"] = checkedPPS
        formData["requested_pps_mode"] =  mode;
        var ppsModeChange={
                    'url': PPS_MODE_CHANGE_URL,
                    'formdata': formData,
                    'method': POST,
                    'cause': PPS_MODE_CHANGE,
                    'token': sessionStorage.getItem('auth_token'),
                    'contentType': APP_JSON
                }

        this.props.changePPSmode(ppsModeChange);
        this.props.setCheckAll(false);
        this.props.setDropDisplay(false);
        

    }
    

    render() {
        let filterHeight=screen.height - 190 - 50;
        let updateStatusIntl="";
        let operationMode={"pick": 0, "put": 0, "audit": 0, "notSet": 0};
        let data, operatorNum=0, itemNumber=5, ppsOn=0, avgThroughput=0;
        if (this.props.PPSDetail.PPStypeDetail !== undefined) {
            data=this._processPPSData();
            for (var i=data.length - 1; i >= 0; i--) {
                if (data[i].operatingModeClass !== null) {
                    operationMode[data[i].operatingModeClass]=operationMode[data[i].operatingModeClass] + 1;
                }
                else {
                    operationMode={"Pick": "--", "Put": "--", "Audit": "--", "NotSet": "--"};
                    operatorNum="--";
                }

                if (operatorNum < data[i].totalUser) {
                    operatorNum=data[i].totalUser
                }

                if (data[i].statusClass.toLowerCase()=== GOR_ON_STATUS.toLowerCase()) {
                    ppsOn++;
                }

                if (data[i].ppsThroughput) {
                    avgThroughput=avgThroughput + data[i].ppsThroughput;
                }
            }

            if (data.length) {
                avgThroughput=(avgThroughput / (data.length)).toFixed(1);
            }

        }

        let drop, selected=0, statusDrop;
        let pickDrop=<FormattedMessage id="PPS.table.pickDrop" description="pick dropdown option for PPS"
                                         defaultMessage="Put"/>
        let putDrop=<FormattedMessage id="PPS.table.putDrop" description="put dropdown option for PPS"
                                        defaultMessage="Pick"/>
        let auditDrop=<FormattedMessage id="PPS.table.auditDrop" description="audit dropdown option for PPS"
                                          defaultMessage="Audit"/>
        let openStatusLabel = <FormattedMessage id="PPS.table.openStatusLabel" description="audit dropdown option for Status change"
                                          defaultMessage="Open Selected PPS"/>
         let closeStatusLabel = <FormattedMessage id="PPS.table.closeStatusLabel" description="audit dropdown option for Status change"
                                          defaultMessage="Close Selected PPS"/>
        let statusDropPHolder = <FormattedMessage id="PPS.table.statusPlaceholder" description="Placeholder for status dropdown"
                                          defaultMessage="Change PPS Status"/>
        let modeDropPHolder = <FormattedMessage id="PPS.table.modePlaceholder" description="Placeholder for mode dropdown"
                                          defaultMessage="Change PPS Mode"/>
        var openCount=0,closeCount=0;
        for(let k in this.props.checkedPps){
            if(this.props.checkedPps[k].statusPriority === 0 || this.props.checkedPps[k].statusPriority === 1){
                closeCount++
            }
            else{
                openCount++
            }
        }

        const status = [
            {value: 'open', disabled:(closeCount  ? false : true),label: openStatusLabel},
            {value: 'close', disabled:(openCount ? false : true),label: closeStatusLabel}
        ];
        const modes=[ {value: 'put', disabled:false,label: pickDrop},
            {value: 'pick',  disabled:false,label: putDrop},
            {value: 'audit',  disabled:false,label: auditDrop}];
       
            drop=<Dropdown 
                    options={modes} 
                    onSelectHandler={(e) => this.handleModeChange(e)}
                    disabled={!this.props.bDropRender}
                    resetOnSelect={true}
                    placeholder={modeDropPHolder} />
        
            statusDrop = <Dropdown 
                    options={status} 
                    onSelectHandler={(e) => this.handleStatusChange(e)}
                    disabled={!this.props.bDropRender}
                    resetOnSelect={true}
                    placeholder={statusDropPHolder} />
       
        if (this.props.checkedPps) {
            
            selected = Object.keys(this.props.checkedPps).length;
        }

        return (
            <div>
                <div>
                    <div className="gorTesting">
                        <Spinner isLoading={this.props.ppsSpinner} setSpinner={this.props.setPpsSpinner}/>
                        {data?<div>
                            <div className="gor-filter-wrap"
                                 style={{'width': this.props.showFilter ? '350px' : '0px', height: filterHeight}}>
                                <PPSFilter data={data} responseFlag={this.props.responseFlag}/>
                            </div>

                            <div className="gorToolBar">
                                <div className="gorToolBarWrap">
                                    <div className="gorToolBarElements">
                                        <FormattedMessage id="pps.table.heading" description="Heading for PPS"
                                                          defaultMessage="Pick Put Stations"/>
                                        <div className="gorHeaderSubText">
                                            <FormattedMessage id="PPStable.selected" description='selected pps for ppsSelected'
                                                              defaultMessage='{selected} selected'
                                                              values={{selected: selected ? selected : '0'}}/>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="filterWrapper">
                                <div className="gorToolBarDropDown pps">
                                        {statusDrop}
                                            </div>
                                <div className="gorToolBarDropDown pps">
                                        {drop}
                                    </div>
                                    <div className="gorToolBarDropDown">
                                        <div className="gor-button-wrap">
                                            <div
                                                className="gor-button-sub-status">{this.props.lastUpdatedText} {this.props.lastUpdated} </div>
                                            <button
                                                className={this.props.ppsFilterState ? "gor-filterBtn-applied" : "gor-filterBtn-btn"}
                                                onClick={this._setFilter.bind(this)}>
                                                <div className="gor-manage-task"/>
                                                <FormattedMessage id="gor.filter.filterLabel" description="button label for filter"
                                                                  defaultMessage="Filter data"/>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/*Filter Summary*/}
                            <FilterSummary total={data.length||0} isFilterApplied={this.props.isFilterApplied} responseFlag={this.props.responseFlag}
                                           filterText={<FormattedMessage id="ppsList.filter.search.bar"
                                                                         description='total pps for filter search bar'
                                                                         defaultMessage='{total} Stations found'
                                                                         values={{total: data.length || 0}}/>}
                                           refreshList={this._clearFilter.bind(this)}
                                           refreshText={<FormattedMessage id="ppsList.filter.search.bar.showall"
                                                                          description="button label for show all"
                                                                          defaultMessage="Show all Stations"/>}/>

                        </div>:null}


                        <PPStable updateSortedDataList={this.updateSortedDataList.bind(this)} items={data} itemNumber={itemNumber} operatorNum={operatorNum}
                                  operationMode={operationMode}
                                  modeChange={this.props.changePPSmode} intlMessg={this.props.intlMessages}
                                  sortHeaderState={this.props.ppsHeaderSort} currentSortState={this.props.ppsSortHeader}
                                  sortHeaderOrder={this.props.ppsHeaderSortOrder}
                                  currentHeaderOrder={this.props.ppsSortHeaderState}
                                  setCheckedPps={this.props.setCheckedPps} checkedPps={this.props.checkedPps}
                                  ppsOnState={ppsOn}
                                  renderDdrop={this.props.setDropDisplay}
                                  bDropRender={this.props.bDropRender}
                                  setCheckAll={this.props.setCheckAll}
                                  getCheckAll={this.props.getCheckAll}
                                  setPpsFilter={this.props.ppsFilterDetail}
                                  getPpsFilter={this.props.ppsFilter}
                                  avgThroughput={avgThroughput}
                                  ppsFilterState={this.props.ppsFilterState}
                                  isFilterApplied={this.props.isFilterApplied}
                                  lastUpdatedText={updateStatusIntl}
                                  lastUpdated={updateStatusIntl}
                                  showFilter={this.props.showFilter}
                                  setFilter={this.props.showTableFilter}
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
        ppsFilter: state.sortHeaderState.ppsFilter || "",
        getCheckAll: state.sortHeaderState.checkAll || false,
        bDropRender: state.sortHeaderState.renderDropD || false,
        checkedPps: state.sortHeaderState.checkedPps,
        ppsSortHeader: state.sortHeaderState.ppsHeaderSort || INITIAL_HEADER_SORT,
        ppsSortHeaderState: state.sortHeaderState.ppsHeaderSortOrder || INITIAL_HEADER_ORDER,
        ppsSpinner: state.spinner.ppsSpinner || false,
        PPSDetail: state.PPSDetail || [],
        intlMessages: state.intl.messages,
        showFilter: state.filterInfo.filterState || false,
        ppsFilterState: state.filterInfo.ppsFilterState || false,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        ppsListRefreshed:state.ppsInfo.ppsListRefreshed
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        ppsFilterDetail: function (data) {
            dispatch(ppsFilterDetail(data))
        },
        changePPSmode: function (data) {
            dispatch(changePPSmode(data));
        },
        setPpsSpinner: function (data) {
            dispatch(setPpsSpinner(data))
        },
        ppsHeaderSort: function (data) {
            dispatch(ppsHeaderSort(data))
        },
        ppsHeaderSortOrder: function (data) {
            dispatch(ppsHeaderSortOrder(data))
        },
        setCheckedPps: function (data) {
            dispatch(setCheckedPps(data))
        },
        setDropDisplay: function (data) {
            dispatch(setDropDisplay(data))
        },
        setCheckAll: function (data) {
            dispatch(setCheckAll(data))
        },
        showTableFilter: function (data) {
            dispatch(showTableFilter(data));
        },
        ppsfilterState: function (data) {
            dispatch(ppsfilterState(data));
        },
        filterApplied: function (data) {
            dispatch(filterApplied(data));
        },
        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        togglePPSFilter: function (data) {
            dispatch(togglePPSFilter(data));
        },

        setDefaultRange: function (data) {
            dispatch(setDefaultRange(data));
        },
        initDataSentCall: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); },
        ppsListRefreshed:function(data){dispatch(ppsListRefreshed(data))}
    }
};

PPS.contextTypes={
    intl: React.PropTypes.object.isRequired
}
PPS.PropTypes={
    ppsFilter: React.PropTypes.string,
    getCheckAll: React.PropTypes.bool,
    bDropRender: React.PropTypes.bool,
    ppsSortHeader: React.PropTypes.string,
    ppsSortHeaderState: React.PropTypes.string,
    ppsSpinner: React.PropTypes.bool,
    PPSDetail: React.PropTypes.array,
    showFilter: React.PropTypes.bool,
    ppsFilterState: React.PropTypes.bool,
    ppsFilterDetail: React.PropTypes.func,
    changePPSmode: React.PropTypes.func,
    setPpsSpinner: React.PropTypes.func,
    ppsHeaderSort: React.PropTypes.func,
    ppsHeaderSortOrder: React.PropTypes.func,
    setCheckedPps: React.PropTypes.func,
    setDropDisplay: React.PropTypes.func,
    setCheckAll: React.PropTypes.func,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    isFilterApplied: React.PropTypes.bool,
    wsSubscriptionData: React.PropTypes.object

}

export default connect(mapStateToProps, mapDispatchToProps)(PPS) ;

