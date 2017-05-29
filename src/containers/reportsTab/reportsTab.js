/**
 * Created by gaurav.m on 5/22/17.
 */


import React  from 'react';
import {connect} from 'react-redux';
import {
    WS_ONSEND,POST,GENERATE_REPORT,APP_JSON,GET
} from '../../constants/frontEndConstants';
import {updateSubscriptionPacket, setWsAction} from './../../actions/socketActions'
import {wsOverviewData} from './../../constants/initData.js';
import {reportsTabRefreshed,generateReport,clearGeneratedReport,reportGenerationParamsState} from './../../actions/reportsActions'
import {FormattedMessage} from 'react-intl';
import ReportsTabTable from './reportsTabTable'
import ReportDownloadDropDown from "./reportDownloadDropdownWrap";
import ReportsSidebar from "./reportsSidebar";
import {REPORT_GENERATION_URL} from './../../constants/configConstants'
import {setGenerateReportSpinner} from './../../actions/spinnerAction'
class ReportsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {reportsTabRefreshed: null, sidebarOpened: true, query: null}
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.socketAuthorized && nextProps.reportsTabRefreshed && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.setState({query: nextProps.location.query})
            this.setState({reportsTabRefreshed: nextProps.reportsTabRefreshed})
            this._subscribeData()
            this.generateReport(nextProps.location.query)
        }
    }


    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
        this.props.clearGeneratedReport()
        this.props.reportsTabRefreshed()
    }


    _subscribeData() {
        let updatedWsSubscription = this.props.wsSubscriptionData;
        this.props.initDataSentCall(updatedWsSubscription["default"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
    }

    _changeReportFileType(data) {
        this.setState({fileType: data.value})
    }

    _toggleReportDownloadSidebar() {
        this.setState({sidebarOpened: !this.state.sidebarOpened})
    }

    generateReport(query) {
        this.props.reportGenerationParamsState({skuNumber:query.skuNumber,category:query.category||'All',reportType:query.reportType})
        if(Object.keys(query).length<1){
            this.props.clearGeneratedReport()
            return
        }
        /**
         * TODO:
         * Will have to change the request.
         * @type {{url, method, cause, contentType, accept, token, data: *}}
         */
        let request = {
            'url': REPORT_GENERATION_URL,
            'method': GET,
            'cause': GENERATE_REPORT,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token,
            'data':query
        }
        this.props.setGenerateReportSpinner(true)
        this.props.generateReport(request);
    }

    downloadReport(){
        // user request to download report will
        // be made
    }

    render() {
        let fileTypes = [{value: 'csv', label: "Comma Separated Values(csv)"}, {
            value: 'pdf',
            label: "Portable Document Format(pdf)"
        }]
        return (
            <div>
                <div>
                    <div className="gor-User-Table">
                        <div
                            className={"report-sidebar-wrap " + (this.state.sidebarOpened ? "report-sidebar-open" : 'report-sidebar-close')}
                            style={{width: this.state.sidebarOpened ? '25%' : '0', float: 'left'}}>

                            <ReportsSidebar/>
                        </div>

                        <div className="reports-container"
                             style={{width: this.state.sidebarOpened ? '75%' : '100%', float: 'right'}}>
                            <div className="reportsHeader">
                                <div className="reportHeaderTextWrap">
                                    <div className="gorToolBarElements">
                                        <span onClick={this._toggleReportDownloadSidebar.bind(this)}>[ICON]</span>
                                        <FormattedMessage id="stockLedger.table.heading"
                                                          description="Heading for stock ledger table"
                                                          defaultMessage="Inventory stock ledger report"/>
                                    </div>
                                </div>


                                <div className="gor-report-download-dropDown-wrap">
                                    <div style={{width: '65%', marginRight: '2%', maxWidth: '325px', float: 'left'}}>
                                        <ReportDownloadDropDown key="2" items={fileTypes} dropdownLabel="File format"
                                                                placeHolderText="Select format"
                                                                changeMode={this._changeReportFileType.bind(this)}
                                                                currentState={null}/>


                                    </div>
                                    <div style={{width: '31%', float: 'left', marginRight: '2%'}}>
                                        <button onClick={this.downloadReport.bind(this)} className="gor-report-download-btn">Download</button>
                                    </div>


                                </div>


                            </div>
                            {this.props.stockLedgerReport?
                              <ReportsTabTable/>
                                :
                                <div style={{marginTop:'25%',fontSize:'20',textAlign:'center',fontWeight:'bold'}}>Please generate a report to preview.</div>
                            }

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth_token: state.authLogin.auth_token,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        reportsTabRefreshed: state.reportsDetail.reportsTabRefreshed,
        config: state.config || {},
        maxfilesizelimit: state.utilityValidations.maxfilesizelimit || 0,
        errorCode: state.utilityValidations.errorCode,
        maxsize: state.utilityValidations.maxsize || 0,
        stockLedgerReport: state.reportsDetail.stockLedgerReport

    };
}

var mapDispatchToProps = function (dispatch) {
    return {
        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        initDataSentCall: function (data) {
            dispatch(setWsAction({type: WS_ONSEND, data: data}));
        },
        reportsTabRefreshed: function (data) {
            dispatch(reportsTabRefreshed(data))
        },
        generateReport: function (data) {
            dispatch(generateReport(data));
        },
        clearGeneratedReport: function (data) {
            dispatch(clearGeneratedReport(data));
        },
        reportGenerationParamsState:function(data){
            dispatch(reportGenerationParamsState(data))
        },
        setGenerateReportSpinner:function(data){
            dispatch(setGenerateReportSpinner(data))
        }

    }
};
ReportsTab.contextTypes = {
    intl: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsTab);