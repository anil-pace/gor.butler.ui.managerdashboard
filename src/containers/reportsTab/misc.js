import React from "react";
import UtilityTile from "../../components/utilityComponents/utilityTile";
import DownloadReportTile from "../../components/utilityComponents/downloadReportsTile";
import DownloadGRNTile from "../../components/utilityComponents/downloadGRTile";
import {
    INVENTORY_REPORT_URL,
    GR_REPORT_URL,
    UPLOAD_HISTORY_URL,
    GET_MAXSIZE_FILE_URL,
    REPORTS_HISTORY_URL,
} from "../../constants/configConstants";
import {connect} from "react-redux";
import {
    getItemRecall,
    getGRdata,
    validateInvoiceID,
    getUploadHistory,
    utilityTabRefreshed,
} from "../../actions/utilityActions";
import {
    setInventoryReportSpinner
} from "../../actions/spinnerAction";
import {
    GET,
    GR_REPORT_RESPONSE,
    INVENTORY_REPORT_RESPONSE,
    UPLOAD_HISTORY,
    REPORTS_HISTORY,
    GRN_HISTORY,
    GET_MAX_FILE_SIZE,
    WS_ONSEND,
} from "../../constants/frontEndConstants";

import {defineMessages} from "react-intl";
import {
    updateSubscriptionPacket,
    setWsAction
} from "./../../actions/socketActions";
import {wsOverviewData} from "./../../constants/initData.js";

//Mesages for internationalization
const messages = defineMessages({
    downloadReportsHead: {
        id: "utility.downloadReport.head",
        description: "Download Reports",
        defaultMessage: "Download Reports"
    },
    goodsRcvdNotesHead: {
        id: "utility.goodsRcvdNotes.head",
        description: "Goods Received Notes",
        defaultMessage: "Goods Received Notes"
    }
});

class UtilityTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportState: {},
            grnState: {},
            utilityTabRefreshed: null
        };
    }

    _changeReportCategory(data) {
        var newState = this.state.reportState;
        newState.category = data.value;
        this.setState({reportState: newState});
    }

    _changeReportFileType(data) {
        var newState = this.state.reportState;
        newState.fileType = data.value;
        this.setState({reportState: newState});
    }
    
    _getfilemaxsize() {
        var params = {
            url: GET_MAXSIZE_FILE_URL,
            method: GET,
            token: this.props.auth_token,
            cause: GET_MAX_FILE_SIZE,
            contentType: false
        };
        this.props.getItemRecall(params);
    }

    _generateReport(reqFileType) {
        let fileType = "csv";
        if (reqFileType) {
            fileType = reqFileType;
        }
        let url = INVENTORY_REPORT_URL + "?sync=false&format=" + fileType;
        let data = {
            url: url,
            method: GET,
            token: this.props.auth_token,
            responseType: "arraybuffer",
            cause: INVENTORY_REPORT_RESPONSE
        };
        this.props.setInventoryReportSpinner(true);
        this.props.getGRdata(data);
        this._onInvRprtRefresh();
    }

    _generateGRN(reqFileType, invoiceId) {
        var fileType = "csv";
        if (reqFileType) {
            fileType = reqFileType;
        }
        if (!invoiceId) {
            throw new Error(
                "Did not receive the Invoice id for GRN generation!"
            );
        }
        var url =
            GR_REPORT_URL + "/" + invoiceId + "?sync=false&format=" + fileType;
        let data = {
            url: url,
            method: GET,
            token: this.props.auth_token,
            cause: GR_REPORT_RESPONSE,
            responseType: "arraybuffer"
        };
        this.props.getGRdata(data);
        this.props.validateInvoiceID(false);
        this._onGRNRefresh();
    }

    _onMDMRefresh() {
        var params = {
            url: UPLOAD_HISTORY_URL + "?&order_by=create_time",
            method: GET,
            token: this.props.auth_token,
            cause: UPLOAD_HISTORY
        };
        this.props.getUploadHistory(params);
    }

    _onInvRprtRefresh() {
        var params = {
            url: REPORTS_HISTORY_URL + "?component=inventory&order_by=create_time",
            method: GET,
            token: this.props.auth_token,
            cause: REPORTS_HISTORY
        };
        this.props.getUploadHistory(params);
    }

    _onGRNRefresh() {
        var params = {
            url: REPORTS_HISTORY_URL + "?component=gr&order_by=create_time",
            method: GET,
            token: this.props.auth_token,
            cause: GRN_HISTORY
        };
        this.props.getUploadHistory(params);
    }

    componentDidMount() {
        this._onMDMRefresh();
        this._getfilemaxsize();
        this._onInvRprtRefresh();
        this._onGRNRefresh();
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.newFileUploaded !== this.props.newFileUploaded) {
            this._onMDMRefresh();
        }

        if (
            nextProps.socketAuthorized &&
            nextProps.utilityTabRefreshed !== this.state.utilityTabRefreshed
        ) {
            this.setState({
                utilityTabRefreshed: nextProps.utilityTabRefreshed
            });
            this._subscribeData();
        }
    }

    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
        this.props.utilityTabRefreshed();
    }

    _subscribeData() {
        let updatedWsSubscription = this.props.wsSubscriptionData;
        this.props.initDataSentCall(updatedWsSubscription["default"]);
        this.props.updateSubscriptionPacket(updatedWsSubscription);
    }

    render() {
        let show_gr_report = false;
        let show_inventory_report = false;

        try {
            if (!this.props.config.utility_tab.enabled) {
                return null;
            }
        } catch (ex) {
            //Do nothing
        }

        try {
            show_gr_report = this.props.config.utility_tab.widgets.gr_report;
        } catch (ex) {
            //Do nothing
        }
        
        try {
            show_inventory_report = this.props.config.utility_tab.widgets
                .reports.inventory_report;
        } catch (ex) {
            //Do nothing
        }

        return (
            <div>
                {show_inventory_report
                    ? <UtilityTile
                        tileHead={this.context.intl.formatMessage(
                            messages.downloadReportsHead
                        )}
                        showHeaderIcon={true}
                        onRefresh={this._onInvRprtRefresh.bind(this)}
                        >
                        <DownloadReportTile
                            generateReport={this._generateReport.bind(
                                this
                            )}
                            reportsHistory={this.props.reportsHistory}
                            timeOffset={this.props.timeOffset}
                        />
                    </UtilityTile>
                    : null}

                {show_gr_report
                    ? <UtilityTile
                        tileHead={this.context.intl.formatMessage(
                            messages.goodsRcvdNotesHead
                        )}
                        showFooter={false}
                        showHeaderIcon={true}
                        onRefresh={this._onGRNRefresh.bind(this)}
                    >
                        <DownloadGRNTile
                            validatedInvoice={this.props.validatedInvoice}
                            generateReport={this._generateGRN.bind(this)}
                            grnHistory={this.props.grnHistory}
                            timeOffset={this.props.timeOffset}
                        />
                    </UtilityTile>
                    : null}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        auth_token: state.authLogin.auth_token,
        reportsHistory: state.utilityValidations.reportsHistory || [],
        timeOffset: state.authLogin.timeOffset,
        grnHistory: state.utilityValidations.grnHistory || [],
        utilityTabRefreshed: state.utilityValidations.utilityTabRefreshed,
        validatedInvoice: state.utilityValidations.invalidInvoice || false,
        newFileUploaded: state.utilityValidations.newFileUploaded,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        config: state.config || {},
    };
}

var mapDispatchToProps = function (dispatch) {
    return {
        getItemRecall: function (data) {
            dispatch(getItemRecall(data));
        },
        getUploadHistory: function (data) {
            dispatch(getUploadHistory(data));
        },
        getGRdata: function (data) {
            dispatch(getGRdata(data));
        },
        validateInvoiceID: function (data) {
            dispatch(validateInvoiceID(data));
        },
        setInventoryReportSpinner: function (data) {
            dispatch(setInventoryReportSpinner(data));
        },
        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        initDataSentCall: function (data) {
            dispatch(setWsAction({type: WS_ONSEND, data: data}));
        },
        utilityTabRefreshed: function (data) {
            dispatch(utilityTabRefreshed(data));
        }
    };
};
UtilityTab.contextTypes = {
    intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UtilityTab);
