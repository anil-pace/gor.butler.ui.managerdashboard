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
    getUploadHistory, utilityTabRefreshed,downloadStockLedgerReport,clearStockLedgerSKU
} from "../actions/utilityActions";
import {setInventoryReportSpinner} from '../actions/spinnerAction';
import {
  GET, 
  ITEM_RECALLED,
  MASTER_FILE_UPLOAD,
  GR_REPORT_RESPONSE,
  POST,
  MASTER_FILE_FORMATS,
  UPLOAD_HISTORY,GET_MAX_FILE_SIZE,WS_ONSEND,DOWNLOAD_STOCK_LEDGER_REPORT

} from '../constants/frontEndConstants';
import {
fileUploadMessages
} from '../constants/messageConstants';

import FieldError from '../components/fielderror/fielderror';
import {defineMessages} from 'react-intl';
import {updateSubscriptionPacket, setWsAction} from './../actions/socketActions'
import {wsOverviewData} from './../constants/initData.js';
import {FormattedMessage} from 'react-intl'

//Mesages for internationalization
const messages=defineMessages({
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
    stockLedgerHead: {
        id: "utility.stockLedgerHead.head",
        description: 'Inventory Stock Ledger',
        defaultMessage: "Inventory Stock Ledger"
    },
    uploadBtnText: {
        id: "utility.uploadBtn.label",
        description: 'Upload Master Data',
        defaultMessage: "Upload Master Data"
    },
    itemRecallHead:{
        id: "utility.itemRecall.head",
        description:"Expired Items",
        defaultMessage:"Expired Items"
    },
    itemRecallSubHead:{
        id: "utility.itemRecall.subHead",
        description:"(Recall all the expired items)",
        defaultMessage:"(Recall all the expired items)"
    },
    itemRecallButtonText:{
        id: "utility.itemRecall.buttonText",
        description:"RECALL",
        defaultMessage:"RECALL"
    }

});

class UtilityTab extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            reportState: {},
            grnState: {},
            stockLedgerState:{category:'all',duration:{today:false,yesterday:false},sku:""},
            prodStatusCalledOnLoad: false,
            utilityTabRefreshed: null
        };
    }

    _renderUploadDataTile() {
        var barData={
            h1: this.context.intl.formatMessage(messages.itemRecallHead),
            h2: this.context.intl.formatMessage(messages.itemRecallSubHead), 
            buttonText: this.context.intl.formatMessage(messages.itemRecallButtonText)}
        var recallBar=<UploadDownBar barData={barData} barAction={this._requestExpiredItems.bind(this)}/>;
        return recallBar;
    }

    _changeReportCategory(data) {
        var newState=this.state.reportState;
        newState.category=data.value;
        this.setState({reportState: newState});
    }

    _changeReportFileType(data) {
        var newState=this.state.reportState;
        newState.fileType=data.value;
        this.setState({reportState: newState});
    }

    _changeGrnFileType(data) {
        var newState=this.state.grnState;
        newState.fileType=data.value;
        this.setState({grnState: newState});
    }

    _captureQuery(e) {
        if (e.target.value) {
            var newState=this.state.grnState;
            newState.invoiceId=e.target.value;
            this.setState({grnState: newState});
        }
    }

    _handleChangeSkuNumber(e) {
        if (e.target) {
            var newState=this.state.stockLedgerState;
            newState.sku=e.target.value;
            this.setState({stockLedgerState: newState});
        }
    }

    _handleChangeStockLedgerCategory(e){
        if (e.target.value) {
            var newState=this.state.stockLedgerState;
            newState.category=e.target.value;
            if(newState.category==='all'){
                newState.sku=""
                this.props.clearStockLedgerSKU()
            }
            this.setState({stockLedgerState: newState});
        }
    }
    _handleChangeStockLedgerDuration(e){
        if(e.target){
            let newState=this.state.stockLedgerState;
            newState.duration[e.target.value]=e.target.checked
            this.setState({stockLedgerState: newState});
        }
        console.log(this.state.stockLedgerState)
    }

    _validateStockLedgerButton(){
        let stock_ledger_state=this.state.stockLedgerState
        let validated=false
        if(stock_ledger_state.category==="all" && (stock_ledger_state.duration.today||stock_ledger_state.duration.yesterday)){
         validated=true
        }else if(stock_ledger_state.category==="sku" && stock_ledger_state.sku.trim().length!==0 && (stock_ledger_state.duration.today||stock_ledger_state.duration.yesterday)){
            validated=true
        }
        return validated
    }

    _renderDownReportTile() {
        var downloadReportTile=[];
        const modes=[{value: 'inventory', label: "Inventory"}];
        const fileType=[{value: 'csv', label: "Comma separated values (csv)"}, {
            value: 'xlsx',
            label: "ExceL Spreadsheet (xlsx)"
        }];
        var currentFileState=this.state.reportState.fileType ? (this._getCurrentDropDownState(fileType, this.state.reportState.fileType)) : null;
        var currentCategoryState=this.state.reportState.category ? (this._getCurrentDropDownState(modes, this.state.reportState.category)) : null;
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
        for (var i=fileType.length - 1; i >= 0; i--) {
            if (fileType[i].value=== currentValue) {
                return fileType[i].label;
            }
        }
        return null;
    }

    _renderGRNtile() {
        var grnTile=[];
        const fileType=[{value: 'csv', label: "Comma separated values (csv)"}, {
            value: 'xlsx',
            label: "ExceL Spreadsheet (xlsx)"
        }];
        var currentState=this.state.grnState.fileType ? (this._getCurrentDropDownState(fileType, this.state.grnState.fileType)) : null;
        var invoiceInput=<div key="1">
            <div className="gor-utility-invoice-h1"> STN number:</div>
            <div className="gor-audit-input-wrap gor-utility-invoice-wrap">
                <input className="gor-audit-input gor-input-ok" placeholder="Enter STN Number" ref={node=> {
                    this.invoiceId=node
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

    _renderStockLedgertile() {
        let current_state=this.state.stockLedgerState
        let tile=[];
        const fileType=[{value: 'csv', label: "Comma separated values (csv)"}, {
            value: 'xlsx',
            label: "ExceL Spreadsheet (xlsx)"
        }];
        let checkbox=<div key="0">
            <div className="gor-utility-sku-wrap" style={{marginTop:10,marginBottom:10,fontSize:13}}>
                <div>
                    <input checked={current_state.category==='all'} onChange={this._handleChangeStockLedgerCategory.bind(this)} type="radio" id="all" name="stock_ledger" value="all"/>
                    <label><FormattedMessage id="utility.stockLedger.category.all"
                                             description="all"
                                             defaultMessage="All"/></label>

                </div>
                <div><input checked={current_state.category==='sku'} onChange={this._handleChangeStockLedgerCategory.bind(this)} type="radio" id="sku" name="stock_ledger" value="sku"/>
                    <label><FormattedMessage id="utility.stockLedger.category.sku"
                                             description="sku"
                                             defaultMessage="Specific SKU"/></label></div>
            </div>
        </div>
        tile.push(checkbox)
        var invoiceInput=<div key="1">
            <div className="gor-audit-input-wrap gor-utility-sku-wrap">
                <input value={current_state.sku} disabled={this.state.stockLedgerState.category==='all'} className="gor-audit-input gor-input-ok" placeholder="Enter SKU Number" onChange={this._handleChangeSkuNumber.bind(this)}/>
                {this.props.validatedStockLedgerSKU && this.state.stockLedgerState.category==='sku' ? <div className="gor-login-error"/> : ""}
            </div>
            {this.props.validatedStockLedgerSKU && this.state.stockLedgerState.category==='sku' ?
                <div className="gor-sku-error gor-utility-error-invoice"><FormattedMessage id="utility.stockLedger.incorrectSku"
                                                                                           description="Please enter correct SKU"
                                                                                           defaultMessage="Please enter correct SKU"/></div> : ''}
        </div>
        tile.push(invoiceInput)
        tile.push(<div key="2" style={{marginBottom:10,fontSize:13}}>
            <div className="gor-utility-stock-ledger-duration-label"> <FormattedMessage id="utility.stockLedger.duration.label"
                                                                                        description="Time Duration:"
                                                                                        defaultMessage="Time Duration:"/></div>
            <div className="gor-utility-duration-wrap">
                <div style={{width:'50%',float:'left'}}>

                    <input onChange={this._handleChangeStockLedgerDuration.bind(this)} defaultChecked={current_state.duration.today} type="checkbox" id="today" value="today"/>
                    <label><FormattedMessage id="utility.stockLedger.duration.today"
                                             description="Today"
                                             defaultMessage="Today"/></label>
                </div>
                <div style={{width:'50%',float:'right'}}>
                    <input onChange={this._handleChangeStockLedgerDuration.bind(this)} defaultChecked={current_state.duration.yesterday} type="checkbox" id="yesterday" value="yesterday"/>
                    <label><FormattedMessage id="utility.stockLedger.duration.yesterday"
                                             description="Yesterday"
                                             defaultMessage="Yesterday"/></label>
                </div>
            </div>
        </div>)
        return tile;
    }

    /**
     * [_onMasterFileUpload callback for master data file upload]
     * @param  {[type]} fileObject [description]
     * @return {[type]}            [description]
     */
    _onMasterFileUpload(fileObject) {
        var formData=new FormData();
        formData.append("file", fileObject);
        var params={
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

        var uploadHistoryData=this.props.uploadHistoryData || [];
        var recallBar=<MasterUploadTile  timeOffset={this.props.timeOffset} uploadHistChanged={this.props.uploadHistChanged}
        uploadBtnText={this.context.intl.formatMessage(messages.uploadBtnText)} 
        isMasterUploadProcessing={this.props.isMasterUploadProcessing} 
        maxFileSize={this.props.maxfilesizelimit} errorList={fileUploadMessages}
        acceptedFormats={MASTER_FILE_FORMATS} onMasterFileUpload={this._onMasterFileUpload.bind(this)} 
        historyData={uploadHistoryData} errorCode={this.props.errorCode} maxSize={this.props.maxsize}/>;

        return recallBar;
    }

    _downloadReport() {
       let fileType= this.state.reportState.fileType;
       let url=INVENTORY_REPORT_URL+'?format='+fileType;
        let data={
            'url': url,
            'method': GET,
            'token': this.props.auth_token,
            'responseType':'arraybuffer'

        }
        this.props.setInventoryReportSpinner(true);
        this.props.getGRdata(data);

    }

    _downloadGRN() {
        var fileType=this.state.grnState.fileType;
        var url=GR_REPORT_URL + "/" + this.state.grnState.invoiceId+'?format='+fileType;
        let data={
            'url': url,
            'method': GET,
            'token': this.props.auth_token,
            'cause': GR_REPORT_RESPONSE,
            'responseType':'arraybuffer'
        }
        this.props.getGRdata(data)
        this.props.validateInvoiceID(false)
    }

    _downloadStockLedger() {
        /**
         * TODO:
         * URL need to be refactored
         * @type {*}
         */
        var stock_ledger_state=this.state.stockLedgerState;
        var url=GR_REPORT_URL + "/" + "2"+'?format='+"pdf";
        let data={
            'url': url,
            'method': GET,
            'token': this.props.auth_token,
            'cause': DOWNLOAD_STOCK_LEDGER_REPORT,
            'responseType':'arraybuffer'
        }
        this.props.downloadStockLedgerReport(data)
        this.props.validateInvoiceID(false)
    }

    _requestExpiredItems() {

        let data={
            'url': GET_ITEM_RECALL,
            'method': GET,
            'token': this.props.auth_token,
            'cause': ITEM_RECALLED,
        }
        this.props.getItemRecall(data)
    }

    _onRefresh() {
        var params={
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
        let updatedWsSubscription=this.props.wsSubscriptionData;
        this.props.initDataSentCall(updatedWsSubscription["default"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
    }

    render() {
        var uploadDataTile=this._renderUploadDataTile();
        var downloadReportTile=this._renderDownReportTile();
        var grnTile=this._renderGRNtile();
        let stockLedgerTile=this._renderStockLedgertile()
        var masterUpload=this._renderMasterUpload();
        var activeReportDownButton=(this.state.reportState.fileType && this.state.reportState.category) ? true : false;
        var activeGRNDownButton=(this.state.grnState.fileType && this.state.grnState.invoiceId) ? true : false;
        var activeStockLedgerButton=this._validateStockLedgerButton()
        let show_gr_report=false
        let show_masterdata_upload=false
        let show_inventory_report=false
        let show_item_recall_scripts=false
        let show_stock_ledger_widget=true
        try{
            if(!this.props.config.utility_tab.enabled){
                return null
            }
        }catch(ex){
            //Do nothing
        }


        try {
            show_gr_report=this.props.config.utility_tab.widgets.gr_report
        } catch (ex) {
            //Do nothing
        }
        try {
            show_masterdata_upload=this.props.config.utility_tab.widgets.masterdata_upload;
        } catch (ex) {
            //Do nothing
        }
        try {
            show_inventory_report=this.props.config.utility_tab.widgets.reports.inventory_report;
        } catch (ex) {
            //Do nothing
        }
        try {
            show_item_recall_scripts=this.props.config.utility_tab.widgets.scripts.item_recall;
        } catch (ex) {
            //Do nothing
        }

        try {
            show_stock_ledger_widget=this.props.config.utility_tab.widgets.show_stock_ledger_widget.abcd;
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
                    {show_stock_ledger_widget ?
                        <UtilityTile tileHead={this.context.intl.formatMessage(messages.stockLedgerHead)}
                                     showFooter={true}
                                     tileBody={stockLedgerTile} footerAction={this._downloadStockLedger.bind(this)}
                                     enableButton={activeStockLedgerButton}/> : null}

                </div>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        auth_token: state.authLogin.auth_token,
        validatedInvoice: state.utilityValidations.invalidInvoice || false,
        validatedStockLedgerSKU: state.utilityValidations.invalidStockLedgerSKU || false,
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
        timeOffset: state.authLogin.timeOffset
    };
}

var mapDispatchToProps=function (dispatch) {
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
        downloadStockLedgerReport: function (data) {
            dispatch(downloadStockLedgerReport(data));
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
UtilityTab.contextTypes={
    intl: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(UtilityTab);