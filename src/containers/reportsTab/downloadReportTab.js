/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';
import { FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';
import {wsOverviewData} from '../../constants/initData.js';
import Dimensions from 'react-dimensions';
import {withRouter} from 'react-router';
import {updateSubscriptionPacket,setWsAction} from '../../actions/socketActions';
import {applyOLFilterFlag,wsOLSubscribe,wsOLUnSubscribe,setReportsSpinner} from '../../actions/operationsLogsActions';
import {WS_ONSEND,POST,OPERATION_LOG_FETCH
    ,APP_JSON,OPERATIONS_LOG_MODE_MAP,
    DEFAULT_PAGE_SIZE_OL,REALTIME} from '../../constants/frontEndConstants';
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
import {OPERATIONS_LOG_URL,WS_OPERATIONS_LOG_SUBSCRIPTION} from '../../constants/configConstants';
import {makeAjaxCall} from '../../actions/ajaxActions';

const dummyData = [{
id: 1,
fileName : "abc.csv",
type : "OPERATOR_LOGS",
requestedBy : "himanshu.s",
requestedTime : "Dec 24, 2016 12:38",
completionTime :"Dec 24, 2016 12:38",
lastDownloaded : "Dec 24, 2016 12:38",
status : "PENDING"
}]


class DownloadReportTab extends React.Component{
	constructor(props,context) {
        super(props,context);
        
        this.state = this._getInitialState();
    }
     _getInitialState(){
        var data=this._processData(dummyData);
        var dataList = new tableRenderer(data.length);
        dataList.newData=data;
        return {
            columnWidths: {
                reportName: this.props.containerWidth * 0.2,
                reportType: this.props.containerWidth * 0.15,
                requestedBy: this.props.containerWidth * 0.2,
                completionTime: this.props.containerWidth * 0.15,
                status: this.props.containerWidth * 0.2
            },
            dataList:dataList,
            subscribed:false,
            dataFetchedOnLoad:false
        }
    }
    _processData(data){
        return data;
    }

    shouldComponentUpdate(nextProps,nextState){
        var shouldUpdate = true;// (nextProps.hasDataChanged !== this.props.hasDataChanged) 
        return shouldUpdate;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.socketAuthorized && !this.state.subscribed) {
            this.setState({subscribed: true},function(){
                this._subscribeData()
            })
            
        }
    }
    _subscribeData(){
        this.props.initDataSentCall(wsOverviewData["default"]);
    }
	render(){
		/* <div className="gor-ol-paginate-wrap">
                <div className="gor-ol-paginate-left">
                <Dropdown 
                    options={pageSize} 
                    onSelectHandler={(e) => this._handlePageChange(e)}
                    disabled={pageSizeDDDisabled} 
                    selectedOption={DEFAULT_PAGE_SIZE_OL}/>
                </div>
                <div className="gor-ol-paginate-right">
                <GorPaginateV2 disabled={pageSizeDDDisabled} location={this.props.location} currentPage={this.state.query.page||1} totalPage={10}/>
                </div>
                </div>*/
        var {dataList} = this.state;
        var _this = this;
        var filterHeight=screen.height - 190 - 50;
        var dataSize = dataList.getSize();
        var noData = !dataSize 
		return (
			<div className="gorTesting wrapper gor-operations-log">
                
             <div className="gorToolBar">
                                <div className="gorToolBarWrap">
                                    <div className="gorToolBarElements">
                                        <FormattedMessage id="reportDownload.table.heading" description="Heading for PPS"
                                                          defaultMessage="Download Reports"/>
                                        
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
                    height={dataSize ? document.documentElement.clientHeight * 0.6 : 71}
                    {...this.props}>
                    <Column
                        columnKey="fileName"
                        header={
                            
                               
                                    <Cell >
                                        <div className="gorToolHeaderEl">
                                            <FormattedMessage id="reportDownload.table.reportName"
                                                              description='report name'
                                                              defaultMessage='REPORT NAME'/>
                                            
                                        </div>
                                    </Cell>
                                
                            
                        }
                        cell={<TextCell data={dataList} classKey={"fileName"} />}
                        fixed={true}
                        width={this.state.columnWidths.reportName}
                        isResizable={true}
                    />
                    <Column
                        columnKey="type"
                        header={
                            <Cell >

                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="reportDownload.table.reportType" description="REPORT TYPE"
                                                      defaultMessage="REPORT TYPE"/>

                                   
                                </div>
                            </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"reportType"}/>}
                        fixed={true}
                        width={this.state.columnWidths.reportType}
                        isResizable={true}
                    />
                    <Column
                        columnKey="requestedBy"
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="reportDownload.table.requestId" description="REQUESTED BY"
                                                      defaultMessage="REQUESTED BY"/>
                                </div>
                            </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"requestedBy"}/>}
                        fixed={true}
                        width={this.state.columnWidths.requestedBy}
                        isResizable={true}
                    />
                    <Column
                        columnKey="completionTime"
                        
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="reportDownload.table.completionTime" description="Status for PPS"
                                                      defaultMessage="COMPLETION TIME"/>
                                </div>
                                </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"completionTime"}/>}
                        fixed={true}
                        width={this.state.columnWidths.completionTime}
                        isResizable={true}
                    />
                    <Column
                        columnKey="status"
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="reportDownload.table.progress" description="GENERATION PROGRESS"
                                                      defaultMessage="GENERATION PROGRESS"/>

                                  
                                </div>
                                </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"status"}/>}
                        fixed={true}
                        width={this.state.columnWidths.status}
                        isResizable={true}
                    />
                    
                    
                </Table>
                {!dataSize ? <div className="gor-no-data"><FormattedMessage id="operationsLog.table.noData"
                                                                    description="No data message for operations logs"
                                                                    defaultMessage="No Data Found"/></div>:""}
               
			</div>
		);
	}
};



function mapStateToProps(state, ownProps) {
    return {
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        hasDataChanged:state.operationsLogsReducer.hasDataChanged,
        reportsData:state.operationsLogsReducer.reportsData
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


export default connect(mapStateToProps,mapDispatchToProps)(Dimensions()(DownloadReportTab));


