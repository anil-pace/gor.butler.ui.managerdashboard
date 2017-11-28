/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';
import { FormattedMessage,FormattedDate,injectIntl,intlShape,defineMessages} from 'react-intl';
import { connect } from 'react-redux';
import {wsOverviewData} from '../../constants/initData.js';
import Dimensions from 'react-dimensions';
import {withRouter} from 'react-router';
import {updateSubscriptionPacket,setWsAction} from '../../actions/socketActions';

import {applyOLFilterFlag,wsOLSubscribe,wsOLUnSubscribe,setReportsSpinner,flushWSData} from '../../actions/operationsLogsActions';

import {WS_ONSEND,POST,OPERATION_LOG_FETCH
    ,APP_JSON,OPERATIONS_LOG_MODE_MAP,
    DEFAULT_PAGE_SIZE_OL,REALTIME,DOWNLOAD_REPORT_REQUEST,REPORT_NAME_OPERATOR_LOGS} from '../../constants/frontEndConstants';

import GorPaginateV2 from '../../components/gorPaginate/gorPaginateV2';

import Spinner from '../../components/spinner/Spinner';

import {Table, Column,Cell} from 'fixed-data-table';

import {
    tableRenderer,
    TextCell,
    ProgressCell
} from '../../components/commonFunctionsDataTable';

import {
    showTableFilter
} from '../../actions/filterAction';
import OperationsFilter from './operationsFilter';

import FilterSummary from '../../components/tableFilter/filterSummary';

import Dropdown from '../../components/gor-dropdown-component/dropdown';

import {OPERATIONS_LOG_URL, WS_OPERATIONS_LOG_SUBSCRIPTION, REQUEST_REPORT_DOWNLOAD, STORAGE_SPACE_URL, STORAGE_SPACE_REPORT_DOWNLOAD_URL} from '../../constants/configConstants';
import {makeAjaxCall} from '../../actions/ajaxActions';
import {recieveStorageSpaceData} from '../../actions/storageSpaceActions';
import {STORAGE_SPACE_FETCH, GET} from '../../constants/frontEndConstants';

/*Page size dropdown options*/
const pageSizeDDOpt = [ {value: "25", disabled:false,label: <FormattedMessage id="operationLog.page.twentyfive" description="Page size 25"
                                                          defaultMessage="25"/>},
            {value: "50",  disabled:false,label: <FormattedMessage id="operationLog.page.fifty" description="Page size 50"
                                                          defaultMessage="50"/>},
            {value: "100",  disabled:false,label: <FormattedMessage id="operationLog.page.hundred" description="Page size 100"
                                                          defaultMessage="100"/>}];
/*Intl Messages*/
const  messages= defineMessages({
    genRepTooltip: {
        id: 'operationLog.genRep.tooltip',
        description: 'Tooltip to display Generate button',
        defaultMessage: 'Reports not available for Realtime filter'
    }
})

class StorageSpaceTab extends React.Component{
    constructor(props,context) {
        super(props,context);
        this.state=this._getInitialState();
        
        //this._setFilter= this._setFilter.bind(this);
        this._handlePageChange= this._handlePageChange.bind(this);
        this._requestReportDownload = this._requestReportDownload.bind(this);
        
    }

    _getInitialState(){
        //var data=this._processData(this.props.olData.slice(0));
//         var abc = [{
//     "slot_type": "hanger",
//     "slot_dimensions": "90.0*80.0*47.0",
//     "slot_volume": 338400.0,
//     "number_of_slots": 2,
//     "number_of_empty_slots": 2.0,
//     "utilization": 0.0
// }, {
//     "slot_type": "slot",
//     "slot_dimensions": "120*105*100",
//     "slot_volume": 1260000.0,
//     "number_of_slots": 1,
//     "number_of_empty_slots": 0.0,
//     "utilization": 0.0723296429
// }, {
//     "slot_type": "slot",
//     "slot_dimensions": "20.0*35.2*31.0",
//     "slot_volume": 21824.0,
//     "number_of_slots": 4,
//     "number_of_empty_slots": 4.0,
//     "utilization": 0.0
// }, {
//     "slot_type": "slot",
//     "slot_dimensions": "20.0*35.2*63.0",
//     "slot_volume": 44352.0,
//     "number_of_slots": 4,
//     "number_of_empty_slots": 4.0,
//     "utilization": 0.0
// }, {
//     "slot_type": "slot",
//     "slot_dimensions": "28.0*55.0*47.0",
//     "slot_volume": 72380.0,
//     "number_of_slots": 6,
//     "number_of_empty_slots": 3.0,
//     "utilization": 0.0667749378
// }, {
//     "slot_type": "slot",
//     "slot_dimensions": "32*25*48",
//     "slot_volume": 38400.0,
//     "number_of_slots": 336,
//     "number_of_empty_slots": 336.0,
//     "utilization": 0.0
// }, {
//     "slot_type": "slot",
//     "slot_dimensions": "32*33*48",
//     "slot_volume": 50688.0,
//     "number_of_slots": 890,
//     "number_of_empty_slots": 883.0,
//     "utilization": 0.0055350379
// }, {
//     "slot_type": "slot",
//     "slot_dimensions": "32*44*48",
//     "slot_volume": 67584.0,
//     "number_of_slots": 84,
//     "number_of_empty_slots": 83.0,
//     "utilization": 0.0022321851
// }, {
//     "slot_type": "slot",
//     "slot_dimensions": "48*25*48",
//     "slot_volume": 57600.0,
//     "number_of_slots": 56,
//     "number_of_empty_slots": 56.0,
//     "utilization": 0.0
// }];
        var data=this._processData(this.props.storageSpaceData.slice(0));  // slice(0) simply duplicates an array
        var dataList = new tableRenderer(data.length);
        dataList.newData=data;
        return {
            columnWidths: {
                slotType: this.props.containerWidth * 0.15,
                slotVolume: this.props.containerWidth * 0.1,
                dimension: this.props.containerWidth * 0.13,
                totalSlots: this.props.containerWidth * 0.1,
                emptySlots: this.props.containerWidth * 0.1,
                slotUtilization: this.props.containerWidth * 0.1,
                //timestamp: this.props.containerWidth * 0.1
            },
            sortOrder:{
                controller_id: "ASC",
                statusText: "ASC"
            },
            dataList:dataList,
            query:this.props.location.query,
            subscribed:false,
            realTimeSubSent:false,
            pageSize:this.props.location.query.pageSize || DEFAULT_PAGE_SIZE_OL,
            dataFetchedOnLoad:false,
            hideLayer:false,
            queryApplied:Object.keys(this.props.location.query).length ? true :false,
            totalSize:this.props.totalSize || null
        }
    }

        _processData(data){
        
        var dataLen = data.length;
        var processedData=[];
        //var timeZone = this.props.timeOffset;
        if(dataLen){
            for(let i=0 ;i < dataLen ; i++){
                let rowData = data[i];
                let rowObj = {};//Object.assign({},data[i]["_source"]);
                rowObj.slotType =  rowData.slot_type;
                rowObj.slotVolume = rowData.slot_volume + " cc";
                rowObj.dimension = rowData.slot_dimensions+ " cm";
                rowObj.totalSlots = rowData.number_of_slots;
                rowObj.emptySlots = rowData.number_of_empty_slots;
                rowObj.slotUtilization = rowData.utilization;
                processedData.push(rowObj);
            }
        }
        return processedData;
    }
    shouldComponentUpdate(nextProps,nextState){
        var shouldUpdate = (nextProps.hasDataChanged !== this.props.hasDataChanged) || 
        (nextProps.showFilter !== this.props.showFilter) || (nextProps.reportsSpinner !== this.props.reportsSpinner);
        return shouldUpdate;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.socketAuthorized && !this.state.subscribed) {
            this.setState({subscribed: true},function(){
                this._subscribeData(nextProps.location.query)
            })
            
        }
        
        else if(nextProps.socketAuthorized && nextProps.notificationSocketConnected 
            && (!this.state.dataFetchedOnLoad  
                || ((this.props.filtersModified !== nextProps.filtersModified)
                || (this.props.location.query.page !== nextProps.location.query.page)))){
            this.setState({
                dataFetchedOnLoad:true,
                realTimeSelected:nextProps.location.query.time_period === REALTIME
            },function(){
                this._getStorageSpaceData(nextProps)
            })
            
        }
        if(this.props.hasDataChanged !== nextProps.hasDataChanged){
            let rawData = this.state.realTimeSelected  ? 
            nextProps.olWsData.slice(0) : nextProps.olData.slice(0);
            let data = this._processData(rawData);
            let totalSize = nextProps.totalSize;
            let dataList = new tableRenderer(data.length)
            dataList.newData=data;
            this.setState({
                dataList,
                totalSize
            })
        }
        if((!nextProps.olData.length || !nextProps.olWsData.length) 
            && (this.props.filtersModified !== nextProps.filtersModified)){
            this.setState({
                hideLayer:false
            })
        }
        else if(this.props.filtersModified !== nextProps.filtersModified){
            this.setState({
                hideLayer:true
            })
        }
    }
    componentDidMount(){
        // var _query = JSON.parse(JSON.stringify(this.props.location.query))
        // delete _query.page;
        // delete _query.pageSize;
        // if(Object.keys(_query).length){
        //     this.props.applyOLFilterFlag(true);
        // }
        //this._getStorageSpaceData(this.props);
        let params={
                'url':STORAGE_SPACE_URL,
                'method':GET,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                //'formdata':filters,
                'cause':STORAGE_SPACE_FETCH,
                token: this.props.auth_token
            }

        
        this.props.makeAjaxCall(params);
    }
    /*Since componentWillRecieveProps is not called for the first time
    We need to put the subscription code in componentWillMount as well*/
    componentWillMount() {
        if (this.props.socketAuthorized && !this.state.subscribed) {
            this.setState({subscribed: true},function(){
                this._subscribeData()
            })
            
        }
    }
    componentWillUnmount(){
        /**
         * If a user navigates back to the inventory page,
         * it should subscribe to the packet again.
         */
        this.setState({subscribed: false})
        this.props.wsOLUnSubscribe(flushWSData);
    }

    _subscribeData(){
        this.props.initDataSentCall(wsOverviewData["default"]);
    }
    _handlePageChange(e){
        
        this.setState({
            pageSize:e.value,
            dataFetchedOnLoad:false
        },function(){
            let _query =  Object.assign({},this.props.location.query);
            _query.pageSize = this.state.pageSize;
            _query.page = _query.page || 1;
            this.props.router.push({pathname: "/reports/storageSpace",query: _query})
        })
        
    }

    _getStorageSpaceData(props){
        var query = props.location.query,
        isSocketConnected = props.notificationSocketConnected;
        var filters = {};
        var pageSize = this.state.pageSize;
        var frm = ((query.page ? parseInt(query.page,10) : 1) -1) * pageSize;
        this.props.setReportsSpinner(true);
            if(Object.keys(query).length){
                let timeOffset = query.time_period ? query.time_period.split("_") : [];
                if(query.status){
                    filters.status = {
                        type: (query.status.toString()).replace(/,/g," ") 
                    };
                }
                if(query.request_id){
                    filters.requestId = query.request_id;
                }
                if(query.sku_id){
                    filters.productInfo = {
                        type:"item",
                        id:query.sku_id
                    };
                }
                if(query.user_id){
                    filters.userId = query.user_id;
                }
                if(query.pps_id){
                    filters.stationInfo = {
                        "id":query.pps_id,
                        "type":"pps"
                    };
                    filters.destination = {
                        "id":query.pps_id,
                        "type":"pps"
                    };
                }
                if(query.operatingMode){
                    filters.operatingMode = (query.operatingMode.toString()).replace(/,/g," ");
                }
                
                if(timeOffset.length === 2){
                    filters.timeOffset={
                        "unit" : timeOffset[1],
                        "value": parseInt(timeOffset[0],10)
                    }
                }
            }
            filters.page={
                    size:parseInt(pageSize,10),
                    from:frm
                }

        if(query.time_period !== REALTIME){
            this.props.wsOLUnSubscribe(flushWSData);
            
            let params={
                'url':STORAGE_SPACE_URL,
                'method':POST,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'formdata':filters,
                'cause':STORAGE_SPACE_FETCH
            }

        
        this.props.makeAjaxCall(params);
        this.setState({
                realTimeSubSent:false,
                derivedFilters: JSON.stringify(filters)
            })
        }
        else if(query.time_period && query.time_period === REALTIME 
            && !this.state.realTimeSubSent && isSocketConnected){
            this.props.wsOLUnSubscribe(flushWSData);
            let wsParams = {},filterString;
            delete filters.timeRange;
            delete filters.page;
            filterString = JSON.stringify(filters);
            wsParams.url = WS_OPERATIONS_LOG_SUBSCRIPTION;
            wsParams.filters = filterString;
            this.props.wsOLSubscribe(wsParams);
            this.setState({
                realTimeSubSent:true,
                derivedFilters: filterString
            })
        }
    }
    _setFilter(){
        this.props.showTableFilter(!this.props.showFilter);
    }
    _requestReportDownload(){
            // let derivedFilters = JSON.parse(this.state.derivedFilters);
            // let formData = {
            //         "report": {
            //         "requestedBy": this.props.username,
            //         "type" : REPORT_NAME_OPERATOR_LOGS
            //         }
            // }
            
            // formData.searchRequest = Object.assign(derivedFilters,{
            //         page:{
            //             size:this.state.totalSize ? parseInt(this.state.totalSize,10): null,
            //             from:0
            //         }
            // })

            
            let params={
                    'url':STORAGE_SPACE_REPORT_DOWNLOAD_URL,
                    'method':GET,
                    'contentType':APP_JSON,
                    'accept':APP_JSON,
                    //'formdata':formData,
                    'cause':DOWNLOAD_REPORT_REQUEST,
                    token: this.props.auth_token
                }

            
            this.props.makeAjaxCall(params);
        }
    

    render(){
        console.log("===============================================================>");
        console.log("coming inside Storage space Tab.js file");
        var {dataList,totalSize,pageSize} = this.state;
        var _this = this;
        var filterHeight=screen.height - 190 - 50;
        var dataSize = dataList.getSize();
        var timePeriod = _this.props.location.query.time_period;
        var noData = !dataSize && timePeriod !== REALTIME;
        var pageSizeDDDisabled = timePeriod === REALTIME ;
        var location = JSON.parse(JSON.stringify(_this.props.location));
        var totalPage = Math.ceil(totalSize / pageSize);

        // var {sortedDataList, colSortDirs, columnWidths}=this.state, heightRes;
        // var auditCompleted=this.props.auditState.auditCompleted;
        // var auditIssue=this.props.auditState.auditIssue;
        // var locationAudit=this.props.auditState.locationAudit;
        // var skuAudit=this.props.auditState.skuAudit;
        // var totalProgress= 10;//this.props.auditState.totalProgress;
        // var rowsCount=sortedDataList.getSize();
        // let checkState=this.handleChange.bind(this);
        // let checkedStateAudit=[];


        return (
            <div className="gorTesting wrapper gor-storage-space">
                <Spinner isLoading={this.props.reportsSpinner} setSpinner={this.props.setReportsSpinner}/>
            <div className="gor-filter-wrap"
                                 style={{'width': this.props.showFilter ? '350px' : '0px', height: filterHeight}}>
                                <OperationsFilter ref={instance => { this.child = instance; }}
                                filters = {this.props.location.query} 
                                noData={noData} 
                                pageSize={this.state.pageSize} 
                                hideLayer={this.state.hideLayer}
                                responseFlag={this.props.reportsSpinner}/>
            </div>
             <div className="gorToolBar">
                                <div className="gorToolBarWrap">
                                    <div className="gorToolBarElements">
                                        <FormattedMessage id="storageSpace.table.heading" description="Heading for PPS"
                                                          defaultMessage="Storage space information"/>
                                        
                                    </div>
                                </div>
                                  <div className="filterWrapper">
                            
                                <div className="gorToolBarDropDown">
                                    <div className="gor-button-wrap">
                                       <button disabled = {pageSizeDDDisabled} title={this.props.intl.formatMessage(messages.genRepTooltip)} className="gor-rpt-dwnld" onClick={this._requestReportDownload}>
                                        <FormattedMessage id="operationLog.table.downloadBtn"
                                        description="button label for download report"
                                        defaultMessage="Generate Report"/>
                                        </button>
                                        {/*<button
                                            className={this.props.filtersApplied ? "gor-filterBtn-applied" : "gor-filterBtn-btn"}
                                            onClick={this._setFilter}>
                                            <div className="gor-manage-task"/>
                                            <FormattedMessage id="gor.filter.filterLabel" description="button label for filter"
                                                              defaultMessage="Filter data"/>
                                        </button>*/}
                                    </div>
                                </div>

                            </div>
            
                    
             </div>
             {this.props.location.query.time_period !== REALTIME ? 
             <FilterSummary 
             total={dataSize} 
             isFilterApplied={this.props.filtersApplied}  
             filterText={<FormattedMessage id="operationsLog.filter.search.bar"
                                     description='total waves for filter search bar'
                                     defaultMessage='{total} Results found'
                                     values={{total: dataSize.toString()}}/>}
                                   refreshList={() => { 
                                    _this.child.getWrappedInstance()._clearFilter();
                                    }}
                                   refreshText={<FormattedMessage id="operationsLog.filter.search.bar.showall"
                                                                  description="button label for show all"
                                                                  defaultMessage="Show all Operations"/>}/>
                :null}
                
                        
               
                <Table
                    rowHeight={80}
                    rowsCount={dataList.getSize()}
                    headerHeight={70}
                    onColumnResizeEndCallback={null}
                    isColumnResizing={false}
                    width={this.props.containerWidth}
                    height={dataSize ? document.documentElement.clientHeight * 0.6 : 71}
                    {...this.props}>
                    <Column
                        columnKey="slotType"
                        header={
                                <Cell >
                                    <div className="gorToolHeaderEl">
                                        <FormattedMessage id="storageSpace.table.slotType"
                                                          description='SLOT TYPE'
                                                          defaultMessage='SLOT TYPE'/>
                                        
                                    </div>
                                </Cell>
                                
                            
                        }
                        cell={<TextCell data={dataList} classKey={"type"} />}
                        fixed={true}
                        width={this.state.columnWidths.slotType}
                        isResizable={true}
                    />
                    <Column
                        columnKey="slotVolume"
                        header={
                            <Cell >

                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="storageSpace.table.slotVolume" description="SLOT VOLUME"
                                                      defaultMessage="SLOT VOLUME"/>

                                   
                                </div>
                            </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"volume"}/>}
                        fixed={true}
                        width={this.state.columnWidths.slotVolume}
                        isResizable={true}
                    />
                    <Column
                        columnKey="dimension"
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="storageSpace.table.dimension" description="Dimension"
                                                      defaultMessage="DIMENSION (L*B*H)"/>
                                </div>
                            </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"dimension"}/>}
                        fixed={true}
                        width={this.state.columnWidths.dimension}
                        isResizable={true}
                    />
                    <Column
                        columnKey="totalSlots"
                        
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="storageSpace.table.totalSlots" description="Status for PPS"
                                                      defaultMessage="TOTAL SLOTS"/>
                                </div>
                                </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"executionId"}/>}
                        fixed={true}
                        width={this.state.columnWidths.totalSlots}
                        isResizable={true}
                    />
                    <Column
                        columnKey="emptySlots"
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="storageSpace.table.emptySlots" description="Status for PPS"
                                                      defaultMessage="EMPTY SLOTS"/>

                                  
                                </div>
                                </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"skuId"}/>}
                        fixed={true}
                        width={this.state.columnWidths.emptySlots}
                        isResizable={true}
                    />
                     <Column
                        columnKey="slotUtilization"
                        header={
                            <Cell>
                            <div className="gorToolHeaderEl">

                                <FormattedMessage id="storageSpace.table.slotUtilization" description="Status for PPS"
                                                  defaultMessage="SLOT UTILIZATION"/>

                              
                            </div>
                            </Cell>
                        }
                        

                        cell={<ProgressCell data={dataList} setClass={"destinationId"}> </ProgressCell>}
                        fixed={true}
                        width={this.state.columnWidths.slotUtilization}
                        isResizable={true}
                    />
                    {/*
                    <Column
                        columnKey="userId"
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="operationLog.table.userId" description="Status for PPS"
                                                      defaultMessage="USER ID"/>

                                  
                                </div>
                                </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"userId"}/>}
                        fixed={true}
                        width={this.state.columnWidths.userId}
                        isResizable={true}
                    />
                    <Column
                        columnKey="timestamp"
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="opeartionLog.table.timestamp" description="Status for PPS"
                                                      defaultMessage="TIMESTAMP"/>

                                  
                                </div>
                                </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"timestamp"}/>}
                        fixed={true}
                        width={this.state.columnWidths.timestamp}
                        isResizable={true}
                    />
                */}
                    
                </Table>
                {!dataSize ? <div className="gor-no-data"><FormattedMessage id="storageSpace.table.noData"
                                                                    description="No data message for Storage space"
                                                                    defaultMessage="No Data Found"/></div>:""}
                <div className="gor-ol-paginate-wrap">
                <div className="gor-ol-paginate-left">
                <Dropdown 
                    options={pageSizeDDOpt} 
                    onSelectHandler={(e) => this._handlePageChange(e)}
                    disabled={pageSizeDDDisabled} 
                    selectedOption={DEFAULT_PAGE_SIZE_OL}/>
                </div>
                <div className="gor-ol-paginate-right">
                <GorPaginateV2 disabled={pageSizeDDDisabled} location={location} currentPage={this.state.query.page||1} totalPage={isNaN(totalPage) ? 1 : totalPage}/>
                </div>
                </div>
            </div>
        );
    }
};

StorageSpaceTab.propTypes = {
    olData: React.PropTypes.array,
    socketAuthorized: React.PropTypes.bool,
    showFilter: React.PropTypes.bool,
    hasDataChanged: React.PropTypes.bool,
    filtersApplied: React.PropTypes.bool,
    filtersModified: React.PropTypes.bool,
    notificationSocketConnected: React.PropTypes.bool,
    reportsSpinner: React.PropTypes.bool,
    olWsData: React.PropTypes.array,
    intl: intlShape.isRequired,
    storageSpaceData: React.PropTypes.array

}
StorageSpaceTab.defaultProps = {
  olData: [],
  socketAuthorized:false,
  showFilter:false,
  hasDataChanged:false,
  filtersApplied:false,
  filtersModified:false,
  notificationSocketConnected:false,
  reportsSpinner:true,
  olWsData:[],
  storageSpaceData: []
}

function mapStateToProps(state, ownProps) {
    return {
        auth_token: state.authLogin.auth_token,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        showFilter: state.filterInfo.filterState ,
        olData:state.operationsLogsReducer.olData,
        storageSpaceData: state.storageSpaceReducer.storageSpaceData,
        totalSize:state.operationsLogsReducer.totalSize,
        hasDataChanged:state.operationsLogsReducer.hasDataChanged,
        filtersApplied:state.operationsLogsReducer.filtersApplied,
        filtersModified:state.operationsLogsReducer.filtersModified,
        notificationSocketConnected:state.notificationSocketReducer.notificationSocketConnected,
        reportsSpinner:state.operationsLogsReducer.reportsSpinner,
        olWsData:state.operationsLogsReducer.olWsData,
        timeOffset: state.authLogin.timeOffset,
        username: state.authLogin.username

    };
}
function mapDispatchToProps(dispatch){
    return {
        initDataSentCall: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); },
        updateSubscriptionPacket: function (data) {
                dispatch(updateSubscriptionPacket(data));
        },
        showTableFilter: function(data){dispatch(showTableFilter(data));},
        makeAjaxCall: function(params){dispatch(makeAjaxCall(params));},
        applyOLFilterFlag:function(data){dispatch(applyOLFilterFlag(data))},
        wsOLUnSubscribe:function(data){dispatch(wsOLUnSubscribe(data))},
        wsOLSubscribe:function(data){dispatch(wsOLSubscribe(data))},
        setReportsSpinner:function(data){dispatch(setReportsSpinner(data))}
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Dimensions()(withRouter(injectIntl(StorageSpaceTab))));




