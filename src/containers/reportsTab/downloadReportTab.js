import React  from 'react';
import { FormattedMessage,FormattedDate} from 'react-intl';
import { connect } from 'react-redux';
import Dimensions from 'react-dimensions';
import {withRouter} from 'react-router';
import {WS_ONSEND,GET,APP_JSON,
    DEFAULT_PAGE_SIZE_OL,REPORTS_FETCH,GET_REPORT} from '../../constants/frontEndConstants';
import {wsOverviewData} from '../../constants/initData.js';
import {REPORTS_URL,DOWNLOAD_REPORT} from '../../constants/configConstants';
import {makeAjaxCall} from '../../actions/ajaxActions';
import {setDownloadReportSpinner} from '../../actions/downloadReportsActions';
import { setWsAction} from '../../actions/socketActions'
import {graphql, withApollo, compose} from "react-apollo";
import gql from 'graphql-tag';
import DownloadReportTable from './DownloadReportTable';


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
        this.state={page:4,loading:false,legacyDataSubscribed:false};
        this._subscribeLegacyData = this._subscribeLegacyData.bind(this);
        
    }
    _subscribeLegacyData() {
        this.props.initDataSentCall(wsOverviewData["default"]);
    }
    componentWillReceiveProps(nextProps) {
        if(!this.state.legacyDataSubscribed && nextProps.socketAuthorized){
            this.setState(()=>{
                return{legacyDataSubscribed:true}
            },()=>{
                this._subscribeLegacyData()
            })
        }
    }
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


DownloadReportTab.defaultProps = {
  timeOffset:""
}

function mapStateToProps(state, ownProps) {
    return {
        timeOffset: state.authLogin.timeOffset,
        socketAuthorized: state.recieveSocketActions.socketAuthorized
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


function mapDispatchToProps(dispatch){
    return {
        
        makeAjaxCall: function(params){dispatch(makeAjaxCall(params));},
        setDownloadReportSpinner:function(data){dispatch(setDownloadReportSpinner(data));},
        initDataSentCall: function (data) {
            dispatch(setWsAction({type: WS_ONSEND, data: data}));
        }
    }
};


export default compose(
    withQuery
)(connect(mapStateToProps,mapDispatchToProps)(Dimensions()(withRouter(DownloadReportTab))));
