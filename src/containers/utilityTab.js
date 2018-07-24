import React from "react";
import UtilityTile from "../components/utilityComponents/utilityTile";
import ItemRecall from "../containers/itemRecall/itemRecall";
import MasterUploadTile from "../components/utilityComponents/masterUploadTile";
import {
    MASTER_UPLOAD_URL,
    UPLOAD_HISTORY_URL,
    GET_MAXSIZE_FILE_URL,
    STOCK_LEDGER_REPORT_DOWNLOAD_URL,
    STOCK_LEDGER_REPORT_DOWNLOAD_RAW_TRANSACTIONS_URL
} from "../constants/configConstants";
import {connect} from "react-redux";
import {
    getItemRecall,
    validateInvoiceID,
    uploadMasterDataProcessing,
    getUploadHistory,
    utilityTabRefreshed,
    downloadStockLedgerReport,
    clearStockLedgerSKU,
    downloadStockLedgerRawTransactionsReport
} from "../actions/utilityActions";
import {
    setStockLedgerSpinner,
    setStockLedgerRawTransactionsSpinner
} from "../actions/spinnerAction";
import {
    GET,
    MASTER_FILE_UPLOAD,
    POST,
    MASTER_FILE_FORMATS,
    UPLOAD_HISTORY,
    GET_MAX_FILE_SIZE,
    WS_ONSEND,
    DOWNLOAD_STOCK_LEDGER_REPORT,
    DOWNLOAD_STOCK_LEDGER_RAW_TRANSACTIONS_REPORT,
    APP_JSON
} from "../constants/frontEndConstants";
import {fileUploadMessages} from "../constants/messageConstants";

import {defineMessages} from "react-intl";
import {
    updateSubscriptionPacket,
    setWsAction
} from "./../actions/socketActions";
import {wsOverviewData} from "./../constants/initData.js";
import {FormattedMessage} from "react-intl";

//Mesages for internationalization
const messages = defineMessages({
    masterDataHead: {
        id: "utility.masterData.head",
        description: "Master data upload",
        defaultMessage: "Master data upload"
    },
    stockLedgerHead: {
        id: "utility.stockLedgerHead.head",
        description: "Inventory Stock Ledger",
        defaultMessage: "Inventory Stock Ledger"
    },
    stockLedgerRawTransactionHead: {
        id: "utility.stockLedgerRawTransactionHead.head",
        description: "Stock Ledger Raw Transactions",
        defaultMessage: "Stock Ledger Raw Transactions"
    },
    uploadBtnText: {
        id: "utility.uploadBtn.label",
        description: "Upload Master Data",
        defaultMessage: "Upload Master Data"
    },
    itemsRecall:{
        id: "utility.itemsRecall.head",
        description: "Recall Items",
        defaultMessage: "Recall Items"
    }
});

class UtilityTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockLedgerState: {
                category: "all",
                duration: {today: false, yesterday: false},
                sku: ""
            },
            prodStatusCalledOnLoad: false,
            utilityTabRefreshed: null
        };
    }

    _handleChangeSkuNumber(e) {
        if (e.target) {
            var newState = this.state.stockLedgerState;
            newState.sku = e.target.value;
            this.setState({stockLedgerState: newState});
        }
    }

    _handleChangeStockLedgerCategory(e) {
        if (e.target.value) {
            var newState = this.state.stockLedgerState;
            newState.category = e.target.value;
            if (newState.category === "all") {
                newState.sku = "";
                this.props.clearStockLedgerSKU();
            }
            this.setState({stockLedgerState: newState});
        }
    }

    _handleChangeStockLedgerDuration(e) {
        if (e.target) {
            let newState = this.state.stockLedgerState;
            newState.duration[e.target.value] = e.target.checked;
            this.setState({stockLedgerState: newState});
        }
        console.log(this.state.stockLedgerState);
    }

    _validateStockLedgerButton() {
        let stock_ledger_state = this.state.stockLedgerState;
        let validated = false;
        if (
            stock_ledger_state.category === "all" &&
            (stock_ledger_state.duration.today ||
            stock_ledger_state.duration.yesterday)
        ) {
            validated = true;
        } else if (
            stock_ledger_state.category === "sku" &&
            stock_ledger_state.sku.trim().length !== 0 &&
            (stock_ledger_state.duration.today ||
            stock_ledger_state.duration.yesterday)
        ) {
            validated = true;
        }
        return validated;
    }

    _renderStockLedgertile() {
        let current_state = this.state.stockLedgerState;
        let tile = [];
        const fileType = [
            {value: "csv", label: "Comma separated values (csv)"},
            {
                value: "xlsx",
                label: "ExceL Spreadsheet (xlsx)"
            }
        ];
        let checkbox = (
            <div key="0">
                <div
                    className="gor-utility-sku-wrap"
                    style={{marginTop: 10, marginBottom: 10, fontSize: 13}}
                >
                    <div>
                        <input
                            checked={current_state.category === "all"}
                            onChange={this._handleChangeStockLedgerCategory.bind(
                                this
                            )}
                            type="radio"
                            id="all"
                            name="stock_ledger"
                            value="all"
                        />
                        <label>
                            <FormattedMessage
                                id="utility.stockLedger.category.all"
                                description="all"
                                defaultMessage="All"
                            />
                        </label>

                    </div>
                    <div>
                        <input
                            checked={current_state.category === "sku"}
                            onChange={this._handleChangeStockLedgerCategory.bind(
                                this
                            )}
                            type="radio"
                            id="sku"
                            name="stock_ledger"
                            value="sku"
                        />
                        <label>
                            <FormattedMessage
                                id="utility.stockLedger.category.sku"
                                description="sku"
                                defaultMessage="Specific SKU"
                            />
                        </label>
                    </div>
                </div>
            </div>
        );
        tile.push(checkbox);
        var invoiceInput = (
            <div key="1">
                <div className="gor-audit-input-wrap gor-utility-sku-wrap">
                    <input
                        value={current_state.sku}
                        disabled={
                            this.state.stockLedgerState.category === "all"
                        }
                        className="gor-audit-input gor-input-ok"
                        placeholder="Enter SKU Number"
                        onChange={this._handleChangeSkuNumber.bind(this)}
                    />
                    {this.props.validatedStockLedgerSKU &&
                    this.state.stockLedgerState.category === "sku"
                        ? <div className="gor-login-error"/>
                        : ""}
                </div>
                {this.props.validatedStockLedgerSKU &&
                this.state.stockLedgerState.category === "sku"
                    ? <div className="gor-sku-error gor-utility-error-invoice">
                        <FormattedMessage
                            id="utility.stockLedger.incorrectSku"
                            description="Please enter correct SKU"
                            defaultMessage="Please enter correct SKU"
                        />
                    </div>
                    : ""}
            </div>
        );
        tile.push(invoiceInput);
        tile.push(
            <div key="2" style={{marginBottom: 10, fontSize: 13}}>
                <div className="gor-utility-stock-ledger-duration-label">
                    {" "}
                    <FormattedMessage
                        id="utility.stockLedger.duration.label"
                        description="Time Duration:"
                        defaultMessage="Time Duration:"
                    />
                </div>
                <div className="gor-utility-duration-wrap">
                    <div style={{width: "50%", float: "left"}}>

                        <input
                            onChange={this._handleChangeStockLedgerDuration.bind(
                                this
                            )}
                            defaultChecked={current_state.duration.today}
                            type="checkbox"
                            id="today"
                            value="today"
                        />
                        <label>
                            <FormattedMessage
                                id="utility.stockLedger.duration.today"
                                description="Today"
                                defaultMessage="Today"
                            />
                        </label>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                        <input
                            onChange={this._handleChangeStockLedgerDuration.bind(
                                this
                            )}
                            defaultChecked={current_state.duration.yesterday}
                            type="checkbox"
                            id="yesterday"
                            value="yesterday"
                        />
                        <label>
                            <FormattedMessage
                                id="utility.stockLedger.duration.yesterday"
                                description="Yesterday"
                                defaultMessage="Yesterday"
                            />
                        </label>
                    </div>
                </div>
            </div>
        );
        return tile;
    }

    /**
     * The method will render the widget which will
     * enable the user to download raw transactions
     * for today only.
     * @returns {Array}
     * @private
     */
    _renderStockLedgerRawTransactionTile() {
        let tile = [];
        let checkbox = (
            <div key="0">
                <div className="gor-utility-stock-ledger-duration-label">
                    {" "}
                    <FormattedMessage
                        id="utility.stockLedger.duration.label"
                        description="Time Duration:"
                        defaultMessage="Time Duration:"
                    />
                </div>
                <div
                    className="gor-utility-duration-wrap"
                    style={{marginBottom: 10, fontSize: 13}}
                >
                    <div>
                        <input
                            checked={true}
                            disabled={true}
                            type="checkbox"
                            id="all"
                            name="stock_ledger_raw_transaction_duration"
                            value="all"
                        />
                        <label>
                            <FormattedMessage
                                id="utility.stockLedgerRawTransaction.duration.today"
                                description="today"
                                defaultMessage="Today"
                            />
                        </label>

                    </div>
                </div>
            </div>
        );
        tile.push(checkbox);
        return tile;
    }

    /**
     * [_onMasterFileUpload callback for master data file upload]
     * @param  {[type]} fileObject [description]
     * @return {[type]}            [description]
     */
    _onMasterFileUpload(fileObject) {
        var formData = new FormData();
        formData.append("file", fileObject);
        var params = {
            url: MASTER_UPLOAD_URL,
            method: POST,
            token: this.props.auth_token,
            cause: MASTER_FILE_UPLOAD,
            contentType: false,
            formdata: formData,
            accept: APP_JSON
        };
        this.props.uploadMasterDataProcessing(true);
        this.props.getItemRecall(params);
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

    /**
     * The method will download
     * the aggregated stock ledger
     * report.
     * @private
     */
    _downloadStockLedger() {
        let params = [];
        if (this.state.stockLedgerState.sku) {
            params.push(["sku", this.state.stockLedgerState.sku].join("="));
            params.push(["all", "false"].join("="));
        } else {
            params.push(["all", "true"].join("="));
        }
        params.push(
            [
                "today",
                this.state.stockLedgerState.duration.today ? "true" : "false"
            ].join("=")
        );
        params.push(
            [
                "yesterday",
                this.state.stockLedgerState.duration.yesterday
                    ? "true"
                    : "false"
            ].join("=")
        );

        var url = STOCK_LEDGER_REPORT_DOWNLOAD_URL;
        url = [url, params.join("&")].join("?");
        let data = {
            url: url,
            method: GET,
            token: this.props.auth_token,
            cause: DOWNLOAD_STOCK_LEDGER_REPORT,
            responseType: "arraybuffer",
            accept: "text/csv"
        };
        this.props.setStockLedgerSpinner(true);
        this.props.downloadStockLedgerReport(data);
        this.props.validateInvoiceID(false);
    }

    /**
     * The method will make the HTTP call to download
     * raw transactions for today.
     * @private
     */
    _downloadStockLedgerRawTransactions() {
        let url = STOCK_LEDGER_REPORT_DOWNLOAD_RAW_TRANSACTIONS_URL;
        let data = {
            url: url,
            method: GET,
            token: this.props.auth_token,
            cause: DOWNLOAD_STOCK_LEDGER_RAW_TRANSACTIONS_REPORT,
            responseType: "arraybuffer",
            accept: "text/csv"
        };
        this.props.setStockLedgerRawTransactionsSpinner(true);
        this.props.downloadStockLedgerRawTransactionsReport(data);
    }

    _onMDMRefresh() {
        var params = {
            url: UPLOAD_HISTORY_URL + "?sort=CreateTime,desc",
            method: GET,
            token: this.props.auth_token,
            cause: UPLOAD_HISTORY,
            accept: APP_JSON
        };
        this.props.getUploadHistory(params);
    }

    componentDidMount() {
        this._onMDMRefresh();
        this._getfilemaxsize();
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
        let stockLedgerTile = this._renderStockLedgertile();
        let stockLedgerRawTransactionTile = this._renderStockLedgerRawTransactionTile();
        let activeStockLedgerButton = this._validateStockLedgerButton();
        let show_masterdata_upload = false;
        let show_item_recall_scripts = false;
        let show_stock_ledger_widget = false;
        let show_stock_ledger_raw_transaction_widget = false;


        try {
            if (!this.props.config.utility_tab.enabled) {
                return null;
            }
        } catch (ex) {
            //Do nothing
        }

        try {
            show_masterdata_upload = this.props.config.utility_tab.widgets
                .masterdata_upload;
        } catch (ex) {
            //Do nothing
        }
       
        try {
            show_item_recall_scripts = this.props.config.utility_tab.widgets
                .scripts.item_recall;
        } catch (ex) {
            //Do nothing
        }

        try {
            show_stock_ledger_widget = this.props.config.utility_tab.widgets
                .reports.stock_ledger_report;
        } catch (ex) {
            //Do nothing
        }

        try {
            show_stock_ledger_raw_transaction_widget = this.props.config
                .utility_tab.widgets.reports
                .stock_ledger_raw_transactions_report;
        } catch (ex) {
            //Do nothing
        }

        return (
            <div>
                 {show_item_recall_scripts
                    ? <UtilityTile
                        tileHead={this.context.intl.formatMessage(
                            messages.itemsRecall
                        )}
                        showFooter={false}
                        additionalClass="item-recall"
                    >
                        <ItemRecall auth_token={this.props.auth_token}/>
                    </UtilityTile>
                    : null}

                {show_masterdata_upload
                    ? <UtilityTile
                        tileHead={this.context.intl.formatMessage(
                            messages.masterDataHead
                        )}
                        showFooter={false}
                        showHeaderIcon={true}
                        onRefresh={this._onMDMRefresh.bind(this)}
                    >
                        <MasterUploadTile
                            uploadHistChanged={
                                this.props.uploadHistChanged
                            }
                            uploadBtnText={this.context.intl.formatMessage(
                                messages.uploadBtnText
                            )}
                            isMasterUploadProcessing={
                                this.props.isMasterUploadProcessing
                            }
                            maxFileSize={this.props.maxfilesizelimit}
                            errorList={fileUploadMessages}
                            acceptedFormats={MASTER_FILE_FORMATS}
                            onMasterFileUpload={this._onMasterFileUpload.bind(
                                this
                            )}
                            historyData={
                                this.props.uploadHistoryData || []
                            }
                            errorCode={this.props.errorCode}
                            maxSize={this.props.maxsize}
                            timeOffset={this.props.timeOffset}
                        />
                    </UtilityTile>
                    : null}
                {show_stock_ledger_widget
                    ? <UtilityTile
                        loading={this.props.stockLedgerSpinner}
                        tileHead={this.context.intl.formatMessage(
                            messages.stockLedgerHead
                        )}
                        showFooter={true}
                        footerAction={this._downloadStockLedger.bind(
                            this
                        )}
                        enableButton={activeStockLedgerButton}
                    >
                        {stockLedgerTile}
                    </UtilityTile>
                    : null}
                {show_stock_ledger_raw_transaction_widget
                    ? <UtilityTile
                        loading={
                            this.props.stockLedgerRawTransactionsSpinner
                        }
                        tileHead={this.context.intl.formatMessage(
                            messages.stockLedgerRawTransactionHead
                        )}
                        showFooter={true}
                        footerAction={this._downloadStockLedgerRawTransactions.bind(
                            this
                        )}
                        enableButton={true}
                    >
                        {stockLedgerRawTransactionTile}
                    </UtilityTile>
                    : null}
               

            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        auth_token: state.authLogin.auth_token,
        validatedStockLedgerSKU: state.utilityValidations.invalidStockLedgerSKU || false,
        isMasterUploadProcessing: state.utilityValidations.isMasterUploadProcessing || false,
        newFileUploaded: state.utilityValidations.newFileUploaded,
        uploadHistoryData: state.utilityValidations.uploadHistoryData,
        uploadHistChanged: state.utilityValidations.uploadHistChanged,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket ||wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        utilityTabRefreshed: state.utilityValidations.utilityTabRefreshed,
        config: state.config || {},
        maxfilesizelimit: state.utilityValidations.maxfilesizelimit || 0,
        errorCode: state.utilityValidations.errorCode,
        maxsize: state.utilityValidations.maxsize || 0,
        timeOffset: state.authLogin.timeOffset,
        stockLedgerSpinner: state.spinner.stockLedgerSpinner || false,
        stockLedgerRawTransactionsSpinner: state.spinner.stockLedgerRawTransactionsSpinner || false
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
        downloadStockLedgerReport: function (data) {
            dispatch(downloadStockLedgerReport(data));
        },
        downloadStockLedgerRawTransactionsReport: function (data) {
            dispatch(downloadStockLedgerRawTransactionsReport(data));
        },
        clearStockLedgerSKU: function (data) {
            dispatch(clearStockLedgerSKU(data));
        },
        validateInvoiceID: function (data) {
            dispatch(validateInvoiceID(data));
        },
        uploadMasterDataProcessing: function (data) {
            dispatch(uploadMasterDataProcessing(data));
        },
        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        initDataSentCall: function (data) {
            dispatch(setWsAction({type: WS_ONSEND, data: data}));
        },
        utilityTabRefreshed: function (data) {
            dispatch(utilityTabRefreshed(data));
        },
        setStockLedgerSpinner: function (data) {
            dispatch(setStockLedgerSpinner(data));
        },
        setStockLedgerRawTransactionsSpinner: function (data) {
            dispatch(setStockLedgerRawTransactionsSpinner(data));
        }
    };
};
UtilityTab.contextTypes = {
    intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UtilityTab);
