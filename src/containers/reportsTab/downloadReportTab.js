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
import {setDownloadReportSpinner} from '../../actions/downloadReportsActions';
import {graphql, withApollo, compose} from "react-apollo";
import gql from 'graphql-tag';
import DownloadReportTable from './DownloadReportTable';


/*
const pageSize = [ {value: "25", disabled:false,label: <FormattedMessage id="operationLog.page.twentyfive" description="Page size 25"
                                                          defaultMessage="25"/>},
            {value: "50",  disabled:false,label: <FormattedMessage id="operationLog.page.fifty" description="Page size 50"
                                                          defaultMessage="50"/>},
            {value: "100",  disabled:false,label: <FormattedMessage id="operationLog.page.hundred" description="Page size 100"
                                                          defaultMessage="100"/>}];

*/
const DOWNLOAD_REPORT_QUERY = gql`
    query DownloadReportList($input: DownloadReportListParams) {
        DownloadReportList(input:$input){
            list {
                id
                requestedTime
                completionTime
                query
                fileName
                type
                requestedBy
                status
                lastDownloaded
                storageId

            }
        }
    }
`;


class DownloadReportTab extends React.Component{
    constructor(props,context) {
        super(props,context);
        //this.state=this._getInitialState();
        //this._refreshList = this._refreshList.bind(this);
        //this._handlePageChange = this._handlePageChange.bind(this);
        //this._subscribeData = this._subscribeData.bind(this);
        //this._rowClassNameGetter = this._rowClassNameGetter.bind(this);

        this.state={page:4,loading:false};
        
    }
/*
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
    */

        _processData(data){
            if(data){   
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
    }
        return processedData;
    }
    /*
    shouldComponentUpdate(nextProps,nextState){
        var shouldUpdate = (nextProps.hasDataChanged !== this.props.hasDataChanged);
        return shouldUpdate;
    }
    */
    /*
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
    */
    /*
    componentDidMount(){
       if (this.props.socketAuthorized && !this.state.subscribed) {
            this.setState({subscribed: true},function(){
                this._subscribeData();
                this._getReportsData(this.props)
            })
            
        }
    }
    */
/*
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
   */

/*
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
    */
/*
    _subscribeData(){
        this.props.initDataSentCall(wsOverviewData["default"]);
    }
*/  
/*
    _refreshList(){
        this._getReportsData();
    }
*/
/*
    _handlePageChange(e){
        var _query =  Object.assign({},this.props.location.query);
            _query.pageSize = e.value;
            _query.page = _query.page || 1;
            this.props.router.push({pathname: "/reports/downloadReport",query: _query})
    }
    */
    /*  
    _rowClassNameGetter(index){
        var {dataList} = this.state;
        if(dataList.newData[index].lastDownloaded){
            return "public_fixedDataTableRow_downloaded"
        }
        return ""
    }
    */
    _onScrollHandler(event){
       
        let self=this;
        let page_num=self.state.page;
        if((Math.floor(event.target.scrollHeight) - Math.floor(event.target.scrollTop)) === Math.floor(event.target.clientHeight))
        {
            page_num++;
            
            self.props.fetchMore({variables:{input:{page:page_num,size:5}},updateQuery:self.props.updateQuery});
            self.setState({page:page_num,loading:self.props.loading});
            
                
        }
        
    }

    _refreshList(event){
         this.props.refetch(); 
         this.setState({page:4});     
        
        
    }
    
    render(){
        //var {dataList} = this.state;
        //var _this = this;
        //var dataSize = dataList.getSize();
        //var noData = !dataSize ;
        var data=this._processData(this.props.downloadReportList); 
        let self=this

        if(!data){
            return null
        }

        if(data){
        
           return(


            <div className="gorTesting wrapper gor-download-rpts">
                <div>
                    <div>
                    <div className="gorToolBar">
                            <div className="gorToolBarWrap">
                                <div className="gorToolBarElements">
                                    <FormattedMessage id="downloadReport.table.heading" description="Heading for Download Report"
                                                          defaultMessage="Download Report"/>
                                </div>
                                
                            </div>

                            <div className="filterWrapper">
                            
                                <div className="gorToolBarDropDown">
                                    <div className="gor-button-wrap">
                                       <button className="gor-filterBtn-btn" onClick={self._refreshList.bind(self)}>
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
                        
                        <DownloadReportTable data={data} onScrollHandler={self._onScrollHandler.bind(self)}/>
                    

                         


                    </div>
                </div>
            </div>


           );
        
    }
    }
};

DownloadReportTab.propTypes = {
   
}
DownloadReportTab.defaultProps = {
  //reportsData: [],
  //socketAuthorized:false,
  //hasDataChanged:false,
  timeOffset:"",
  //downloadReportsSpinner:true
}

function mapStateToProps(state, ownProps) {
    return {
        //socketAuthorized: state.recieveSocketActions.socketAuthorized,
        //reportsData:state.downloadReportsReducer.reportsData,
        //hasDataChanged:state.downloadReportsReducer.hasDataChanged,
        timeOffset: state.authLogin.timeOffset,
        //downloadReportsSpinner:state.downloadReportsReducer.downloadReportsSpinner

    };
}


const withQuery = graphql(DOWNLOAD_REPORT_QUERY, {
    
    props: function(data){
         if(!data || !data.data.DownloadReportList || !data.data.DownloadReportList.list){
            return{}
        }
        
        return {
            refetch: data.data.refetch,
            fetchMore:data.data.fetchMore,
            loading:data.data.loading,
            downloadReportList: data.data.DownloadReportList.list,

            updateQuery:function(prev,next){
                    const newEntries = next.fetchMoreResult.DownloadReportList;
                    return { DownloadReportList: {
                            list: [...prev.DownloadReportList.list, ...newEntries.list],
                            __typename: "DownloadReportList"
                     }};

            }
        }
    },
    options: ({match, location}) => ({
        variables: {},
        fetchPolicy: 'network-only',

    }),
});



export default compose(
    withQuery
)(connect(mapStateToProps)(Dimensions()(withRouter(DownloadReportTab))));


