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
import {setWsAction} from '../../actions/socketActions';
import {setReportsSpinner} from '../../actions/operationsLogsActions';
import {WS_ONSEND,GET,APP_JSON,DEFAULT_PAGE_SIZE_OL,REPORTS_FETCH,GET_REPORT} from '../../constants/frontEndConstants';
import GorPaginateV2 from '../../components/gorPaginate/gorPaginateV2';
import Spinner from '../../components/spinner/Spinner';
import {Table, Column,Cell} from 'fixed-data-table';
import {
    tableRenderer,
    TextCell
} from '../../components/commonFunctionsDataTable';
import Dropdown from '../../components/gor-dropdown-component/dropdown';
import {REPORTS_URL,DOWNLOAD_REPORT} from '../../constants/configConstants';
import {makeAjaxCall} from '../../actions/ajaxActions';
import {setDownloadReportSpinner} from '../../actions/downloadReportsActions'


const pageSize = [ {value: "25", disabled:false,label: <FormattedMessage id="operationLog.page.twentyfive" description="Page size 25"
                                                          defaultMessage="25"/>},
            {value: "50",  disabled:false,label: <FormattedMessage id="operationLog.page.fifty" description="Page size 50"
                                                          defaultMessage="50"/>},
            {value: "100",  disabled:false,label: <FormattedMessage id="operationLog.page.hundred" description="Page size 100"
                                                          defaultMessage="100"/>}];

class DownloadReportTab extends React.Component{
    constructor(props,context) {
        super(props,context);
        this.state=this._getInitialState();
        this._refreshList = this._refreshList.bind(this);
        this._handlePageChange = this._handlePageChange.bind(this);
        this._subscribeData = this._subscribeData.bind(this);
        this._rowClassNameGetter = this._rowClassNameGetter.bind(this);
        
    }

    _getInitialState(){
        var data=this._processData(this.props.reportsData);
        var dataList = new tableRenderer(data.length);
        dataList.newData=data;
        return {
            columnWidths: {
                reportName: this.props.containerWidth * 0.2,
                reportType: this.props.containerWidth * 0.15,
                requestedBy: this.props.containerWidth * 0.15,
                completionTime: this.props.containerWidth * 0.15,
                status: this.props.containerWidth * 0.2
            },
            dataList:dataList,
            query:this.props.location.query,
            subscribed:false,
            pageSize:this.props.location.query.pageSize || DEFAULT_PAGE_SIZE_OL,
            dataFetchedOnLoad:false
        }
    }

        _processData(data){
        var processedData = [],
        datalen = data.length,
        _this=this,
        timeZone = _this.props.timeOffset;

        if(datalen){
            for(let i=0 ; i < datalen ; i++){
                let dataTuple=Object.assign({},data[i]);
                if(dataTuple.type === "OPERATOR_LOGS"){
                    dataTuple.typeText =  <FormattedMessage id="downloadReport.type.operationsLog" description="Heading for PPS"
                                              defaultMessage="Operations Logs"/>
                }
                else{
                    dataTuple.typeText =  dataTuple.type
                }

                if(dataTuple.completionTime){
                    dataTuple.formattedCompletionDate = <FormattedDate 
                                    value={new Date(dataTuple.completionTime)}
                                    year='numeric'
                                    month='long'
                                    day='2-digit'
                                    hour='2-digit'
                                    minute='2-digit'
                                    timeZone={timeZone}
                                  />
                }
                else{
                    dataTuple.formattedCompletionDate = "--"
                }
                if(dataTuple.status === "PENDING"){
                    dataTuple.statusText = <FormattedMessage id="downloadReport.status.pending" description="Heading for PPS"
                                              defaultMessage="Generating report..."/>
                }
                else if(dataTuple.status === "FAILED"){
                    dataTuple.statusText = <FormattedMessage id="downloadReport.status.failed" description="Heading for PPS"
                                              defaultMessage="Report failed!"/>
                }
                else if(dataTuple.status === "COMPLETED"){
                    dataTuple.statusText = <button className="gor-rpt-dwnld" onClick={() => {_this._downloadReport(dataTuple.id)}}>
                                            <span className="ico-wrap"><i className="dwnload-rpt-ico"></i></span>
                                            <span className="ico-txt-wrp">
                                            <FormattedMessage id="downloadReport.status.completed"
                                            description="button label for download report"
                                            defaultMessage="DOWNLOAD"/>
                                            </span>
                                            </button>
                }
               processedData.push(dataTuple) ;
            }
        }
        return processedData;
    }
    shouldComponentUpdate(nextProps,nextState){
        var shouldUpdate = (nextProps.hasDataChanged !== this.props.hasDataChanged);
        return shouldUpdate;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.socketAuthorized && !this.state.subscribed) {
            this.setState({subscribed: true},function(){
                this._subscribeData();
                this._getReportsData(nextProps);
            })
            
        }
        if(this.props.hasDataChanged !== nextProps.hasDataChanged){
            let rawData = nextProps.reportsData.slice(0);
            let data = this._processData(rawData);
            let dataList = new tableRenderer(data.length)
            dataList.newData=data;
            this.setState({
                dataList
            })
        }
    }
    componentDidMount(){
       if (this.props.socketAuthorized && !this.state.subscribed) {
            this.setState({subscribed: true},function(){
                this._subscribeData();
                this._getReportsData(this.props)
            })
            
        }
    }
   _downloadReport(id){

    
        var params={
                'url':DOWNLOAD_REPORT+id,
                'method':GET,
                'responseType': "arraybuffer",
                'accept': "text/csv",
                'cause':GET_REPORT
            }
        this.props.setDownloadReportSpinner(true);
        this.props.makeAjaxCall(params);
   }
    _getReportsData(props){
        var _props = props || this.props;
        var query = _props.location.query;
        var pageSize = query.pageSize || 25;
        var page = query.page || 1;

        var params={
                'url':REPORTS_URL+"?page="+(parseInt(page) -1)+"&size="+pageSize,
                'method':GET,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'cause':REPORTS_FETCH
            }
        _props.makeAjaxCall(params);
        
    }

    _subscribeData(){
        this.props.initDataSentCall(wsOverviewData["default"]);
    }

    _refreshList(){
        this._getReportsData();
    }

    _handlePageChange(e){
        var _query =  Object.assign({},this.props.location.query);
            _query.pageSize = e.value;
            _query.page = _query.page || 1;
            this.props.router.push({pathname: "/reports/downloadReport",query: _query})
    }
    _rowClassNameGetter(index){
        var {dataList} = this.state;
        if(dataList.newData[index].lastDownloaded){
            return "public_fixedDataTableRow_downloaded"
        }
        return ""
    }

    render(){
        var {dataList} = this.state;
        var _this = this;
        var dataSize = dataList.getSize();
        var noData = !dataSize ;
        
        return (
            <div className="gorTesting wrapper gor-download-rpts">
               <Spinner isLoading={this.props.downloadReportsSpinner} setSpinner={this.props.setDownloadReportSpinner}/> 
       
             <div className="gorToolBar">
                    <div className="gorToolBarWrap">
                        <div className="gorToolBarElements">
                            <FormattedMessage id="downloadReport.table.heading" description="Heading for PPS"
                                              defaultMessage="Download Report"/>
                            
                        </div>
                    </div>
                    <div className="filterWrapper">
                            
                                <div className="gorToolBarDropDown">
                                    <div className="gor-button-wrap">
                                       <button className="gor-filterBtn-btn" onClick={this._refreshList}>
                                       <span className="ico-wrap"><i className="gor-refresh-icon"></i></span>
                                       <span className="ico-txt-wrp">
                                        <FormattedMessage id="downloadReport.table.refresh"
                                        description="button label for download report"
                                        defaultMessage="Refresh"/>
                                        </span>
                                        </button>
                                       
                                    </div>
                                </div>

                            </div>
             </div>    
               
                <Table
                    rowHeight={80}
                    rowsCount={dataList.getSize()}
                    headerHeight={70}
                    isColumnResizing={false}
                    rowClassNameGetter={this._rowClassNameGetter}
                    width={this.props.containerWidth}
                    height={dataSize ? document.documentElement.clientHeight * 0.5 : 71}
                    {...this.props}>
                    <Column
                        columnKey="fileName"
                        header={
                            
                               
                                    <Cell >
                                        <div className="gorToolHeaderEl">
                                            <FormattedMessage id="downloadReport.table.reportName"
                                                              description='REPORT NAME'
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
                        columnKey="typeText"
                        header={
                            <Cell >

                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="downloadReport.table.reportType" description="REPORT TYPE"
                                                      defaultMessage="REPORT TYPE"/>

                                   
                                </div>
                            </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"type"}/>}
                        fixed={true}
                        width={this.state.columnWidths.reportType}
                        isResizable={true}
                    />
                    <Column
                        columnKey="requestedBy"
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="downloadReport.table.requestedBy" description="Request ID"
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
                        columnKey="formattedCompletionDate"
                        
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="downloadReport.table.completionTime" description="Status for PPS"
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
                        columnKey="statusText"
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="downloadReport.table.status" description="Status for PPS"
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
            <div className="gor-ol-paginate-wrap">
                <div className="gor-ol-paginate-left">
                <Dropdown 
                    options={pageSize} 
                    onSelectHandler={(e) => this._handlePageChange(e)}
                    disabled={false} 
                    selectedOption={DEFAULT_PAGE_SIZE_OL}/>
                </div>
                <div className="gor-ol-paginate-right">
                <GorPaginateV2 disabled={false} location={this.props.location} currentPage={this.state.query.page||1} totalPage={10}/>
                </div>
                </div>   
            </div>
        );
    }
};

DownloadReportTab.propTypes = {
    reportsData: React.PropTypes.array,
    hasDataChanged: React.PropTypes.bool,
    socketAuthorized: React.PropTypes.bool

}
DownloadReportTab.defaultProps = {
  reportsData: [],
  socketAuthorized:false,
  hasDataChanged:false,
  timeOffset:"",
  downloadReportsSpinner:true
}

function mapStateToProps(state, ownProps) {
    return {
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        reportsData:state.downloadReportsReducer.reportsData,
        hasDataChanged:state.downloadReportsReducer.hasDataChanged,
        timeOffset: state.authLogin.timeOffset,
        downloadReportsSpinner:state.downloadReportsReducer.downloadReportsSpinner

    };
}
function mapDispatchToProps(dispatch){
    return {
        initDataSentCall: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); },
        makeAjaxCall: function(params){dispatch(makeAjaxCall(params));},
        setDownloadReportSpinner:function(data){dispatch(setDownloadReportSpinner(data));}
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Dimensions()(withRouter(DownloadReportTab)));

