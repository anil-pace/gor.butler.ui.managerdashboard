/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';


import { setInventorySpinner ,inventoryRefreshed} from '../../actions/inventoryActions';
import { FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';
import {wsOverviewData} from '../../constants/initData.js';
import Dimensions from 'react-dimensions';
import {withRouter} from 'react-router';
import {updateSubscriptionPacket,setWsAction} from '../../actions/socketActions';
import {applyOLFilterFlag,wsOLSubscribe,wsOLUnSubscribe} from '../../actions/operationsLogsActions';
import {WS_ONSEND,POST,OPERATION_LOG_FETCH,
    OPERATIONS_LOG_REQUEST_PARAMS,APP_JSON} from '../../constants/frontEndConstants';
import GorPaginateV2 from '../../components/gorPaginate/gorPaginateV2';
import {Table, Column,Cell} from 'fixed-data-table';
import {
    tableRenderer,
    SortHeaderCell,
    TextCell
} from '../../components/commonFunctionsDataTable';
import {
    showTableFilter,
    filterApplied
} from '../../actions/filterAction';
import OperationsFilter from './operationsFilter';
import Dropdown from '../../components/gor-dropdown-component/dropdown';
import {OPERATIONS_LOG_URL,WS_OPERATIONS_LOG_SUBSCRIPTION} from '../../constants/configConstants';
import {makeAjaxCall} from '../../actions/ajaxActions'


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
        /*this._clearFilter =  this._clearFilter.bind(this);
        this._sortTableData = this._sortTableData.bind(this);*/
        this._setFilter= this._setFilter.bind(this);
        this._handlePageChange= this._handlePageChange.bind(this);
        
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
            pageSize:"25",
            queryApplied:Object.keys(this.props.location.query).length ? true :false
        }
    }

        _processData(data){
        
        var dataLen = data.length;
        var processedData=[];
        if(dataLen){
            for(let i=0 ;i < dataLen ; i++){
                let rowData = data[i]["_source"];
                let rowObj = {};//Object.assign({},data[i]["_source"]);
                rowObj.operatingMode = rowData.operatingMode;
                rowObj.status = rowData.status.type
                rowObj.requestId = rowData.requestId;
                rowObj.skuId = rowData.skuId+"/"+rowData.quantity+"items";
                rowObj.sourceId = rowData.source.type+" "+rowData.source.id+"/"+
                                rowData.source.children[0].type+"-"+rowData.source.children[0].id;
                rowObj.destinationId = rowData.destination.type+" "+rowData.destination.id+"/"+
                                rowData.destination.children[0].type+"-"+rowData.destination.children[0].id;
                rowObj.timestamp=rowData.timestamp;
                rowObj.userId=rowData.userId;

                processedData.push(rowObj)
            }
        }
        return processedData
    }
    shouldComponentUpdate(nextProps,nextState){
        var shouldUpdate = (nextProps.hasDataChanged !== this.props.hasDataChanged) || 
        (nextProps.showFilter !== this.props.showFilter);
        return shouldUpdate;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.socketAuthorized && !this.state.subscribed) {
            this.setState({subscribed: true},function(){
                this._subscribeData(nextProps.location.query)
            })
            
        }
        else if(nextProps.socketAuthorized && (nextProps.filtersApplied || this.props.location.query.page !== nextProps.location.query.page)){
            this._getOperationsData(nextProps)
        }
        if(this.props.hasDataChanged !== nextProps.hasDataChanged){
            let data = this._processData(nextProps.olData.slice(0));
            let dataList = new tableRenderer(data.length)
            dataList.newData=data;
            this.setState({
                dataList
            })
        }
        
    }
    componentDidMount(){
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
            pageSize:e.value
        },function(){
            let _query =  Object.assign({},this.props.location.query);
            _query.pageSize = this.state.pageSize;
            _query.page = _query.page || 1;
            this.props.router.push({pathname: "/reports/operationsLog",query: _query})
            //this._getOperationsData(this.props,{pageSize:e.value});
        })
        
    }
    _getOperationsData(props){
        var query = props.location.query,
        isSocketConnected = props.notificationSocketConnected;
        var filters = {};//JSON.parse(JSON.stringify(OPERATIONS_LOG_REQUEST_PARAMS));
            if(Object.keys(query).length){
                let currTime = new Date();
                let toTime = new Date(currTime);
                toTime.setMinutes(currTime.getMinutes() - parseInt(query.time_period));
                filters.status = {
                    type:query.status
                };
                filters.requestId = query.request_id;
                filters.skuId = query.sku_id;
                filters.userId = query.user_id;
                filters.page={
                    size:query.pageSize ? parseInt(query.pageSize) : parseInt(this.state.pageSize),
                    from:query.page ? parseInt(query.page) : 1
                }
                /*filters.timeRange = {
                    from: currTime.getTime(),//Need to add timeoffset
                    to:toTime.getTime()
                }*/
            }
        if(query.time_period !== "realtime"){
            this.props.wsOLUnSubscribe();
            
            let params={
                'url':OPERATIONS_LOG_URL,
                'method':POST,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'formdata':filters,
                'cause':OPERATION_LOG_FETCH
            }

        //this.props.setLoginSpinner(true); TODO
        this.props.applyOLFilterFlag(false);
        this.props.makeAjaxCall(params);
        this.setState({
                realTimeSubSent:false
            })
        }
        else if(query.time_period && query.time_period === "realtime" 
            && !this.state.realTimeSubSent && isSocketConnected){
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

	render(){
		var {dataList} = this.state;
        var filterHeight=screen.height - 190 - 50;
        var hideLayer = dataList.getSize() ? false : true;
		return (
			<div className="gorTesting wrapper gor-operations-log">

            <div className="gor-filter-wrap"
                                 style={{'width': this.props.showFilter ? '350px' : '0px', height: filterHeight}}>
                                <OperationsFilter hideLayer={hideLayer} pageSize={this.state.pageSize} responseFlag={true}/>
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
                                  
                                        <button
                                            className={"gor-filterBtn-btn"}
                                            onClick={this._setFilter}>
                                            <div className="gor-manage-task"/>
                                            <FormattedMessage id="gor.filter.filterLabel" description="button label for filter"
                                                              defaultMessage="Filter data"/>
                                        </button>
                                    </div>
                                </div>

                            </div>
             </div>
     
                        
               
				<Table
                    rowHeight={80}
                    rowsCount={dataList.getSize()}
                    headerHeight={70}
                    onColumnResizeEndCallback={null}
                    isColumnResizing={false}
                    width={this.props.containerWidth}
                    height={document.documentElement.clientHeight * 0.6}
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
                        columnKey="status"
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
                <div className="gor-ol-paginate-wrap">
                <div className="gor-ol-paginate-left">
                <Dropdown 
                    options={pageSize} 
                    onSelectHandler={(e) => this._handlePageChange(e)}
                    disabled={false} 
                    selectedOption={"25"}/>
                </div>
                <div className="gor-ol-paginate-right">
                <GorPaginateV2 location={this.props.location} currentPage={this.state.query.page||1} totalPage={10}/>
                </div>
                </div>
			</div>
		);
	}
};



function mapStateToProps(state, ownProps) {
    return {
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        showFilter: state.filterInfo.filterState || false,
        olData:state.operationsLogsReducer.olData || [],
        hasDataChanged:state.operationsLogsReducer.hasDataChanged,
        filtersApplied:state.operationsLogsReducer.filtersApplied || false,
        notificationSocketConnected:state.notificationSocketReducer.notificationSocketConnected || false

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
        wsOLSubscribe:function(data){dispatch(wsOLSubscribe(data))}
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Dimensions()(withRouter(OperationsLogTab)));

