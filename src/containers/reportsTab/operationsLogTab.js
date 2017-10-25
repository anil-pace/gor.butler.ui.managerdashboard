/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';
import { FormattedMessage,FormattedDate} from 'react-intl';
import { connect } from 'react-redux';
import {wsOverviewData} from '../../constants/initData.js';
import Dimensions from 'react-dimensions';
import {withRouter} from 'react-router';
import {updateSubscriptionPacket,setWsAction} from '../../actions/socketActions';
import {applyOLFilterFlag,wsOLSubscribe,wsOLUnSubscribe,setReportsSpinner} from '../../actions/operationsLogsActions';
import {WS_ONSEND,POST,OPERATION_LOG_FETCH
    ,APP_JSON,OPERATIONS_LOG_MODE_MAP,
    DEFAULT_PAGE_SIZE_OL,REALTIME,DOWNLOAD_REPORT_REQUEST,REPORT_NAME_OPERATOR_LOGS} from '../../constants/frontEndConstants';
import GorPaginateV2 from '../../components/gorPaginate/gorPaginateV2';
import Spinner from '../../components/spinner/Spinner';
import {Table, Column,Cell} from 'fixed-data-table';
import {
    tableRenderer,
    TextCell
} from '../../components/commonFunctionsDataTable';
import {
    showTableFilter
} from '../../actions/filterAction';
import OperationsFilter from './operationsFilter';
import FilterSummary from '../../components/tableFilter/filterSummary';
import Dropdown from '../../components/gor-dropdown-component/dropdown';
import {OPERATIONS_LOG_URL,WS_OPERATIONS_LOG_SUBSCRIPTION,REQUEST_REPORT_DOWNLOAD} from '../../constants/configConstants';
import {makeAjaxCall} from '../../actions/ajaxActions';


const pageSize = [ {value: "25", disabled:false,label: <FormattedMessage id="operationLog.page.twentyfive" description="Page size 25"
                                                          defaultMessage="25"/>},
            {value: "50",  disabled:false,label: <FormattedMessage id="operationLog.page.fifty" description="Page size 50"
                                                          defaultMessage="50"/>},
            {value: "100",  disabled:false,label: <FormattedMessage id="operationLog.page.hundred" description="Page size 100"
                                                          defaultMessage="100"/>}];

class OperationsLogTab extends React.Component{
	constructor(props,context) {
        super(props,context);
        this.state=this._getInitialState();
        
        this._setFilter= this._setFilter.bind(this);
        this._handlePageChange= this._handlePageChange.bind(this);
        this._requestReportDownload = this._requestReportDownload.bind(this);
        
    }

    _getInitialState(){
        var data=this._processData(this.props.olData.slice(0));
        var dataList = new tableRenderer(data.length);
        dataList.newData=data;
        return {
            columnWidths: {
                operatingMode: this.props.containerWidth * 0.15,
                status: this.props.containerWidth * 0.1,
                requestId: this.props.containerWidth * 0.13,
                skuId: this.props.containerWidth * 0.1,
                sourceId: this.props.containerWidth * 0.1,
                userId: this.props.containerWidth * 0.1,
                timestamp: this.props.containerWidth * 0.1
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
        var timeZone = this.props.timeOffset;
        if(dataLen){
            for(let i=0 ;i < dataLen ; i++){
                let rowData = data[i]["_source"];
                let rowObj = {};//Object.assign({},data[i]["_source"]);
                rowObj.operatingMode =  rowData.operatingMode || "--";
                rowObj.status = rowData.status.type;
                rowObj.statusText = rowData.status.type !== "success" ? (rowData.status.data || rowData.status.type) : rowData.status.type
                rowObj.requestId = rowData.requestId;
                rowObj.skuId = (rowData.productInfo.type || "--")+" "+(rowData.productInfo.id || "--")+"/"+(rowData.productInfo.quantity ? rowData.productInfo.quantity+" items" : "--");
                rowObj.sourceId = (rowData.source.type || "--")+" "+rowData.source.id+(rowData.source.children ? "/"+
                                rowData.source.children[0].type+"-"+rowData.source.children[0].id : "");
                rowObj.destinationId = (rowData.destination.type || "--")+" "+(rowData.destination.id || "--")+(rowData.destination.children ? "/"+
                                rowData.destination.children[0].type+"-"+rowData.destination.children[0].id:"");
                rowObj.timestamp=<FormattedDate 
                                    value={rowData.createdTime}
                                    year='numeric'
                                    month='long'
                                    day='2-digit'
                                    hour='2-digit'
                                    minute='2-digit'
                                    timeZone={timeZone}
                                  />;
                rowObj.userId=rowData.userId;

                processedData.push(rowObj)
            }
        }
        return processedData
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
                this._getOperationsData(nextProps)
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
        var _query = JSON.parse(JSON.stringify(this.props.location.query))
        delete _query.page;
        delete _query.pageSize;
        if(Object.keys(_query).length){
            this.props.applyOLFilterFlag(true);
        }
        this._getOperationsData(this.props)
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
        this.props.wsOLUnSubscribe();
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
            this.props.router.push({pathname: "/reports/operationsLog",query: _query})
        })
        
    }
    _getOperationsData(props){
        var query = props.location.query,
        isSocketConnected = props.notificationSocketConnected;
        var filters = {};
        var pageSize = this.state.pageSize;
        var frm = ((query.page ? parseInt(query.page) : 1) -1) * pageSize;
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
                    filters.source = {
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
                        "value": parseInt(timeOffset[0])
                    }
                }
            }
            filters.page={
                    size:parseInt(pageSize),
                    from:frm
                }

        if(query.time_period !== REALTIME){
            this.props.wsOLUnSubscribe();
            
            let params={
                'url':OPERATIONS_LOG_URL,
                'method':POST,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'formdata':filters,
                'cause':OPERATION_LOG_FETCH
            }

        
        this.props.makeAjaxCall(params);
        this.setState({
                realTimeSubSent:false
            })
        }
        else if(query.time_period && query.time_period === REALTIME 
            && !this.state.realTimeSubSent && isSocketConnected){
            this.props.wsOLUnSubscribe(false);
            let wsParams = {}
            delete filters.timeRange;
            delete filters.page;
            wsParams.url = WS_OPERATIONS_LOG_SUBSCRIPTION;
            wsParams.filters = JSON.stringify(filters);
            this.props.wsOLSubscribe(wsParams);
            this.setState({
                realTimeSubSent:true
            })
        }
    }
    _setFilter(){
        this.props.showTableFilter(!this.props.showFilter);
    }
    _requestReportDownload(){
        var formData = {
                "report": {
                "requestedBy": this.props.username,
                "type" : REPORT_NAME_OPERATOR_LOGS
                }
        }
        if(this.props.location.query.time_period !== REALTIME){
            formData.searchRequest = {
                page:{
                    size:this.state.totalSize ? parseInt(this.state.totalSize)-1 : null,
                    from:0
                }
            }
        }
        var params={
                'url':REQUEST_REPORT_DOWNLOAD,
                'method':POST,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'formdata':formData,
                'cause':DOWNLOAD_REPORT_REQUEST
            }

        
        this.props.makeAjaxCall(params);
    }

	render(){
		var {dataList} = this.state;
        var _this = this;
        var filterHeight=screen.height - 190 - 50;
        var dataSize = dataList.getSize();
        var timePeriod = this.props.location.query.time_period;
        var noData = !dataSize && timePeriod !== REALTIME;
        var pageSizeDDDisabled = timePeriod === REALTIME ;
        var location = JSON.parse(JSON.stringify(this.props.location))
		return (
			<div className="gorTesting wrapper gor-operations-log">
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
                                        <FormattedMessage id="operationLog.table.heading" description="Heading for PPS"
                                                          defaultMessage="Operations Log"/>
                                        
                                    </div>
                                </div>
                                  <div className="filterWrapper">
                            
                                <div className="gorToolBarDropDown">
                                    <div className="gor-button-wrap">
                                       <button className="gor-rpt-dwnld" onClick={this._requestReportDownload}>
                                        <FormattedMessage id="operationLog.table.downloadBtn"
                                        description="button label for download report"
                                        defaultMessage="Generate Report"/>
                                        </button>
                                        <button
                                            className={this.props.filtersApplied ? "gor-filterBtn-applied" : "gor-filterBtn-btn"}
                                            onClick={this._setFilter}>
                                            <div className="gor-manage-task"/>
                                            <FormattedMessage id="gor.filter.filterLabel" description="button label for filter"
                                                              defaultMessage="Filter data"/>
                                        </button>
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
                        columnKey="operatingMode"
                        header={
                            
                               
                                    <Cell >
                                        <div className="gorToolHeaderEl">
                                            <FormattedMessage id="operationLog.table.operatingMode"
                                                              description='OPERATING MODE'
                                                              defaultMessage='OPERATING MODE'/>
                                            
                                        </div>
                                    </Cell>
                                
                            
                        }
                        cell={<TextCell data={dataList} classKey={"id"} />}
                        fixed={true}
                        width={this.state.columnWidths.operatingMode}
                        isResizable={true}
                    />
                    <Column
                        columnKey="statusText"
                        header={
                            <Cell >

                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="operationLog.table.status" description="STATUS"
                                                      defaultMessage="STATUS"/>

                                   
                                </div>
                            </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"status"}/>}
                        fixed={true}
                        width={this.state.columnWidths.status}
                        isResizable={true}
                    />
                    <Column
                        columnKey="requestId"
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="operationLog.table.requestId" description="Request ID"
                                                      defaultMessage="REQUEST ID"/>
                                </div>
                            </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"requestId"}/>}
                        fixed={true}
                        width={this.state.columnWidths.requestId}
                        isResizable={true}
                    />
                    <Column
                        columnKey="skuId"
                        
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="operationLog.table.skuId" description="Status for PPS"
                                                      defaultMessage="SKU ID"/>
                                </div>
                                </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"executionId"}/>}
                        fixed={true}
                        width={this.state.columnWidths.requestId}
                        isResizable={true}
                    />
                    <Column
                        columnKey="sourceId"
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="operationLog.table.sourceId" description="Status for PPS"
                                                      defaultMessage="SOURCE ID"/>

                                  
                                </div>
                                </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"skuId"}/>}
                        fixed={true}
                        width={this.state.columnWidths.skuId}
                        isResizable={true}
                    />
                     <Column
                        columnKey="destinationId"
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="operationLog.table.destinationId" description="Status for PPS"
                                                      defaultMessage="DESTINATION ID"/>

                                  
                                </div>
                                </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"destinationId"}/>}
                        fixed={true}
                        width={this.state.columnWidths.skuId}
                        isResizable={true}
                    />
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

                                    <FormattedMessage id="operationLog.table.timestamp" description="Status for PPS"
                                                      defaultMessage="TIMESTAMP"/>

                                  
                                </div>
                                </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"timestamp"}/>}
                        fixed={true}
                        width={this.state.columnWidths.timestamp}
                        isResizable={true}
                    />
                    
                </Table>
                {!dataSize ? <div className="gor-no-data"><FormattedMessage id="operationsLog.table.noData"
                                                                    description="No data message for operations logs"
                                                                    defaultMessage="No Data Found"/></div>:""}
                <div className="gor-ol-paginate-wrap">
                <div className="gor-ol-paginate-left">
                <Dropdown 
                    options={pageSize} 
                    onSelectHandler={(e) => this._handlePageChange(e)}
                    disabled={pageSizeDDDisabled} 
                    selectedOption={DEFAULT_PAGE_SIZE_OL}/>
                </div>
                <div className="gor-ol-paginate-right">
                <GorPaginateV2 disabled={pageSizeDDDisabled} location={location} currentPage={this.state.query.page||1} totalPage={10}/>
                </div>
                </div>
			</div>
		);
	}
};

OperationsLogTab.propTypes = {
    olData: React.PropTypes.array,
    socketAuthorized: React.PropTypes.bool,
    showFilter: React.PropTypes.bool,
    hasDataChanged: React.PropTypes.bool,
    filtersApplied: React.PropTypes.bool,
    filtersModified: React.PropTypes.bool,
    notificationSocketConnected: React.PropTypes.bool,
    reportsSpinner: React.PropTypes.bool,
    olWsData: React.PropTypes.array

}
OperationsLogTab.defaultProps = {
  olData: [],
  socketAuthorized:false,
  showFilter:false,
  hasDataChanged:false,
  filtersApplied:false,
  filtersModified:false,
  notificationSocketConnected:false,
  reportsSpinner:true,
  olWsData:[]
}

function mapStateToProps(state, ownProps) {
    return {
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        showFilter: state.filterInfo.filterState ,
        olData:state.operationsLogsReducer.olData,
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


export default connect(mapStateToProps,mapDispatchToProps)(Dimensions()(withRouter(OperationsLogTab)));


