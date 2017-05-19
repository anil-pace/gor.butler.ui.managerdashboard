import React  from 'react';
import UtilityTile from '../components/utilityComponents/utilityTile'
import UploadDownBar from '../components/utilityComponents/uploadDownBar'
import DropdownTable from '../components/dropdown/dropdownTable'
import UtilityDropDown from '../components/utilityComponents/utilityDropdownWrap'
import MasterUploadTile from '../components/utilityComponents/masterUploadTile'
import {
  INVENTORY_REPORT_URL, 
  GET_ITEM_RECALL, 
  GR_REPORT_URL,
  MASTER_UPLOAD_URL,
  UPLOAD_HISTORY_URL,
  GET_MAXSIZE_FILE_URL

} from '../constants/configConstants';
import {connect} from 'react-redux';
import {
    getItemRecall,
    getGRdata,
    validateInvoiceID,
    uploadMasterDataProcessing,
    getUploadHistory, utilityTabRefreshed
} from "../actions/utilityActions";
import {setInventoryReportSpinner} from '../actions/spinnerAction';
import {
  GET, 
  ITEM_RECALLED,
  MASTER_FILE_UPLOAD,
  GR_REPORT_RESPONSE,
  POST,
  MASTER_FILE_FORMATS,
  UPLOAD_HISTORY,GET_MAX_FILE_SIZE,MASTER_FILE_MAX_SIZE,WS_ONSEND

} from '../constants/frontEndConstants';
import {
fileUploadMessages
} from '../constants/messageConstants';

import FieldError from '../components/fielderror/fielderror';
import {defineMessages} from 'react-intl';
import {updateSubscriptionPacket, setWsAction} from './../actions/socketActions'
import {wsOverviewData} from './../constants/initData.js';

//Mesages for internationalization
const messages = defineMessages({
    masterDataHead: {
        id: 'utility.masterData.head',
        description: 'Master data upload',
        defaultMessage: "Master data upload"
    },
    runScriptsHead: {
        id: 'utility.runScript.head',
        description: 'Run Script',
        defaultMessage: "Run Script"
    },
    downloadReportsHead: {
        id: 'utility.downloadReport.head',
        description: 'Download Reports',
        defaultMessage: "Download Reports",
    },
    goodsRcvdNotesHead: {
        id: "utility.goodsRcvdNotes.head",
        description: 'Download Goods Recieved Notes',
        defaultMessage: "Download Goods Recieved Notes"
    },
    uploadBtnText: {
        id: "utility.uploadBtn.label",
        description: 'Upload Master Data',
        defaultMessage: "Upload Master Data"
    }

});

class UtilityTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportState: {},
            grnState: {},
            prodStatusCalledOnLoad: false,
            utilityTabRefreshed: null
        };
    }

    _renderUploadDataTile() {
        var barData = {h1: "Expired Items", h2: "(Recall all the expired items)", buttonText: "RECALL"}
        var recallBar = <UploadDownBar barData={barData} barAction={this._requestExpiredItems.bind(this)}/>;
        return recallBar;
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

    _changeGrnFileType(data) {
        var newState = this.state.grnState;
        newState.fileType = data.value;
        this.setState({grnState: newState});
    }

    _captureQuery(e) {
        if (e.target.value) {
            var newState = this.state.grnState;
            newState.invoiceId = e.target.value;
            this.setState({grnState: newState});
        }
    }

    _renderDownReportTile() {
        var downloadReportTile = [];
        const modes = [{value: 'inventory', label: "Inventory"}];
        const fileType = [{value: 'csv', label: "Comma separated values (csv)"}, {
            value: 'xls',
            label: "ExceL Spreadsheet (xls)"
        }];
        var currentFileState = this.state.reportState.fileType ? (this._getCurrentDropDownState(fileType, this.state.reportState.fileType)) : null;
        var currentCategoryState = this.state.reportState.category ? (this._getCurrentDropDownState(modes, this.state.reportState.category)) : null;
        downloadReportTile.push(<UtilityDropDown key="1" items={modes} dropdownLabel="Category"
                                                 placeHolderText="Select Category"
                                                 changeMode={this._changeReportCategory.bind(this)}
                                                 currentState={currentCategoryState}/>);
        downloadReportTile.push(<UtilityDropDown key="2" items={fileType} dropdownLabel="File format"
                                                 placeHolderText="Select format"
                                                 changeMode={this._changeReportFileType.bind(this)}
                                                 currentState={currentFileState}/>)
        return downloadReportTile;
    }

    _getCurrentDropDownState(fileType, currentValue) {
        for (var i = fileType.length - 1; i >= 0; i--) {
            if (fileType[i].value === currentValue) {
                return fileType[i].label;
            }
        }
        return null;
    }

    _renderGRNtile() {
        var grnTile = [];
        const fileType = [{value: 'csv', label: "Comma separated values (csv)"}, {
            value: 'xls',
            label: "ExceL Spreadsheet (xls)"
        }];
        var currentState = this.state.grnState.fileType ? (this._getCurrentDropDownState(fileType, this.state.grnState.fileType)) : null;
        var invoiceInput = <div key="1">
            <div className="gor-utility-invoice-h1"> STN number:</div>
            <div className="gor-audit-input-wrap gor-utility-invoice-wrap">
                <input className="gor-audit-input gor-input-ok" placeholder="Enter STN Number" ref={node => {
                    this.invoiceId = node
                }} onChange={this._captureQuery.bind(this)}/>
                {this.props.validatedInvoice ? <div className="gor-login-error"/> : ""}
            </div>
            {this.props.validatedInvoice ?
                <div className="gor-sku-error gor-utility-error-invoice">Please enter correct STN number</div> : ''}
        </div>
        grnTile.push(invoiceInput)
        grnTile.push(<UtilityDropDown key="2" items={fileType} dropdownLabel="File format"
                                      placeHolderText="Select format" changeMode={this._changeGrnFileType.bind(this)}
                                      currentState={currentState}/>)
        return grnTile;
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
            'url': MASTER_UPLOAD_URL,
            'method': POST,
            'token': this.props.auth_token,
            'cause': MASTER_FILE_UPLOAD,
            'contentType': false,
            'formdata': formData
        }
        this.props.uploadMasterDataProcessing(true);
        this.props.getItemRecall(params)
    }
     _getfilemaxsize(){
      var params={
         'url':  GET_MAXSIZE_FILE_URL,
         'method':GET,
         'token': this.props.auth_token,
         'cause':GET_MAX_FILE_SIZE,
         'contentType':false
        }
        this.props.getItemRecall(params);
    }

    _renderMasterUpload() {
        var uploadHistoryData = this.props.uploadHistoryData || [];
        var recallBar = <MasterUploadTile uploadHistChanged={this.props.uploadHistChanged}
        uploadBtnText = {this.context.intl.formatMessage(messages.uploadBtnText)} 
        isMasterUploadProcessing = {this.props.isMasterUploadProcessing} 
        maxFileSize = {this.props.maxfilesizelimit} errorList={fileUploadMessages}
        acceptedFormats ={MASTER_FILE_FORMATS} onMasterFileUpload = {this._onMasterFileUpload.bind(this)} 
        historyData={uploadHistoryData} errorCode={this.props.errorCode} maxSize={this.props.maxsize}/>;

        return recallBar;
    }

    _downloadReport() {
        let data = {
            'url': INVENTORY_REPORT_URL,
            'method': GET,
            'token': this.props.auth_token,
        }
        this.props.setInventoryReportSpinner(true);
        this.props.getGRdata(data);

    }

    _downloadGRN() {
        var url = GR_REPORT_URL + "/" + this.state.grnState.invoiceId;
        let data = {
            'url': url,
            'method': GET,
            'token': this.props.auth_token,
            'cause': GR_REPORT_RESPONSE,
        }
        this.props.getGRdata(data)
        this.props.validateInvoiceID(false)
    }

    _requestExpiredItems() {

        let data = {
            'url': GET_ITEM_RECALL,
            'method': GET,
            'token': this.props.auth_token,
            'cause': ITEM_RECALLED,
        }
        this.props.getItemRecall(data)
    }

    _onRefresh() {
        var params = {
            'url': UPLOAD_HISTORY_URL,
            'method': GET,
            'token': this.props.auth_token,
            'cause': UPLOAD_HISTORY
        }
        this.props.getUploadHistory(params)
    }

    componentDidMount(){
      this._onRefresh();
     this._getfilemaxsize();
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.newFileUploaded !== this.props.newFileUploaded) {
            this._onRefresh();
        }

        if (nextProps.socketAuthorized && nextProps.utilityTabRefreshed !== this.state.utilityTabRefreshed) {
            this.setState({utilityTabRefreshed: nextProps.utilityTabRefreshed})
            this._subscribeData()
        }
    }


    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
        this.props.utilityTabRefreshed()
    }


    _subscribeData() {
        let updatedWsSubscription = this.props.wsSubscriptionData;
        this.props.initDataSentCall(updatedWsSubscription["default"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
    }

    render() {
        var uploadDataTile = this._renderUploadDataTile();
        var downloadReportTile = this._renderDownReportTile();
        var grnTile = this._renderGRNtile();
        var masterUpload = this._renderMasterUpload();
        var activeReportDownButton = (this.state.reportState.fileType && this.state.reportState.category) ? true : false;
        var activeGRNDownButton = (this.state.grnState.fileType && this.state.grnState.invoiceId) ? true : false;
        let show_gr_report = false
        let show_masterdata_upload = false
        let show_inventory_report = false
        let show_item_recall_scripts = false
        try{
            if(!this.props.config.utility_tab.enabled){
                return null
            }
        }catch(ex){
            //Do nothing
        }


        try {
            show_gr_report = this.props.config.utility_tab.widgets.gr_report
        } catch (ex) {
            //Do nothing
        }
        try {
            show_masterdata_upload = this.props.config.utility_tab.widgets.masterdata_upload;
        } catch (ex) {
            //Do nothing
        }
        try {
            show_inventory_report = this.props.config.utility_tab.widgets.reports.inventory_report;
        } catch (ex) {
            //Do nothing
        }
        try {
            show_item_recall_scripts = this.props.config.utility_tab.widgets.scripts.item_recall;
        } catch (ex) {
            //Do nothing
        }

        return (
            <div >
                <div>
                    {show_masterdata_upload ?
                        <UtilityTile tileHead={this.context.intl.formatMessage(messages.masterDataHead)}
                                     showFooter={false}
                                     tileBody={masterUpload} showHeaderIcon={true}
                                     onRefresh={this._onRefresh.bind(this)}/> : null}
                    {show_item_recall_scripts ?
                        <UtilityTile tileHead={this.context.intl.formatMessage(messages.runScriptsHead)}
                                     showFooter={false}
                                     tileBody={uploadDataTile}/> : null}
                    {show_inventory_report ?
                        <UtilityTile tileHead={this.context.intl.formatMessage(messages.downloadReportsHead)}
                                     showFooter={true} tileBody={downloadReportTile}
                                     footerAction={this._downloadReport.bind(this)}
                                     enableButton={activeReportDownButton}
                                     responseState={this.props.inventorySpinner}/> : null}
                    {show_gr_report ?
                        <UtilityTile tileHead={this.context.intl.formatMessage(messages.goodsRcvdNotesHead)}
                                     showFooter={true}
                                     tileBody={grnTile} footerAction={this._downloadGRN.bind(this)}
                                     enableButton={activeGRNDownButton}/> : null}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        auth_token: state.authLogin.auth_token,
        validatedInvoice: state.utilityValidations.invalidInvoice || false,
        inventorySpinner: state.spinner.inventoryReportSpinner || false,
        isMasterUploadProcessing: state.utilityValidations.isMasterUploadProcessing || false,
        newFileUploaded: state.utilityValidations.newFileUploaded,
        uploadHistoryData: state.utilityValidations.uploadHistoryData,
        uploadHistChanged: state.utilityValidations.uploadHistChanged,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        utilityTabRefreshed: state.utilityValidations.utilityTabRefreshed,
        config: state.config || {},
         maxfilesizelimit:state.utilityValidations.maxfilesizelimit ||0,
      errorCode:state.utilityValidations.errorCode,
      maxsize:state.utilityValidations.maxsize ||0,
     
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
        uploadMasterDataProcessing: function (data) {
            dispatch(uploadMasterDataProcessing(data));
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
            dispatch(utilityTabRefreshed(data))
        },
    }
};
UtilityTab.contextTypes = {
    intl: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(UtilityTab);