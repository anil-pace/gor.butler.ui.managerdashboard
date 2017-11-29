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

import GorPaginateV2 from '../../components/gorPaginate/gorPaginateV2';

import Spinner from '../../components/spinner/Spinner';

import {Table, Column,Cell} from 'fixed-data-table';

import {
    tableRenderer,
    TextCell,
    ProgressCell
} from '../../components/commonFunctionsDataTable';

// import {
//     showTableFilter
// } from '../../actions/filterAction';
//import OperationsFilter from './operationsFilter';

import FilterSummary from '../../components/tableFilter/filterSummary';

import Dropdown from '../../components/gor-dropdown-component/dropdown';

import {OPERATIONS_LOG_URL, WS_OPERATIONS_LOG_SUBSCRIPTION, REQUEST_REPORT_DOWNLOAD, STORAGE_SPACE_URL, STORAGE_SPACE_REPORT_DOWNLOAD_URL} from '../../constants/configConstants';
import {makeAjaxCall} from '../../actions/ajaxActions';
import {recieveStorageSpaceData} from '../../actions/storageSpaceActions';
import {STORAGE_SPACE_FETCH, 
        GET,
        //REPORT_NAME_STORAGE_SPACE,
        DOWNLOAD_REPORT_REQUEST,
        APP_JSON,
        DEFAULT_PAGE_SIZE_OL,
        REALTIME
        } from '../../constants/frontEndConstants';

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
        
        this._handlePageChange= this._handlePageChange.bind(this);
        this._requestReportDownload = this._requestReportDownload.bind(this);
        
    }

    _getInitialState(){
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
    
    
    componentDidMount(){
        this._getStorageSpaceData(this.props);
    }

    _getStorageSpaceData(props){
        let params={
                'url':STORAGE_SPACE_URL,
                'method':GET,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                //'formdata':filters,
                'cause':STORAGE_SPACE_FETCH,
                'token': this.props.auth_token
            }
        this.props.makeAjaxCall(params);
    }
    
    _requestReportDownload(){
        let params={
                'url':STORAGE_SPACE_REPORT_DOWNLOAD_URL,
                'method':GET,
                'contentType': 'application/vnd.ms-excel',
                'cause':DOWNLOAD_REPORT_REQUEST,
                'token': this.props.auth_token,
                //'responseType': "arraybuffer",
                'responseType': "binary",
                'accept': "text/xls"
            }
        this.props.makeAjaxCall(params);
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
    

    render(){
        var {dataList,totalSize,pageSize} = this.state;
        var _this = this;
        var filterHeight=screen.height - 190 - 50;
        var dataSize = dataList.getSize();
        var timePeriod = _this.props.location.query.time_period;
        var noData = !dataSize && timePeriod !== REALTIME;
        var pageSizeDDDisabled = timePeriod === REALTIME ;
        var location = JSON.parse(JSON.stringify(_this.props.location));
        var totalPage = Math.ceil(totalSize / pageSize);

        return (
            <div className="gorTesting wrapper gor-storage-space">
                <Spinner isLoading={this.props.reportsSpinner} setSpinner={this.props.setReportsSpinner}/>
            {/*<div className="gor-filter-wrap"
                                 style={{'width': this.props.showFilter ? '350px' : '0px', height: filterHeight}}>
                                <OperationsFilter ref={instance => { this.child = instance; }}
                                filters = {this.props.location.query} 
                                noData={noData} 
                                pageSize={this.state.pageSize} 
                                hideLayer={this.state.hideLayer}
                                responseFlag={this.props.reportsSpinner}/>
            </div>*/}
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
        //initDataSentCall: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); },
        updateSubscriptionPacket: function (data) {
                dispatch(updateSubscriptionPacket(data));
        },
        //showTableFilter: function(data){dispatch(showTableFilter(data));},
        makeAjaxCall: function(params){dispatch(makeAjaxCall(params));},
        applyOLFilterFlag:function(data){dispatch(applyOLFilterFlag(data))},
        wsOLUnSubscribe:function(data){dispatch(wsOLUnSubscribe(data))},
        wsOLSubscribe:function(data){dispatch(wsOLSubscribe(data))},
        setReportsSpinner:function(data){dispatch(setReportsSpinner(data))}
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Dimensions()(withRouter(injectIntl(StorageSpaceTab))));




