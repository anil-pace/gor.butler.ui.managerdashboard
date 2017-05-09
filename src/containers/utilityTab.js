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
  UPLOAD_HISTORY_URL
} from '../constants/configConstants';
import { connect } from 'react-redux';
import {
  getItemRecall,
  getGRdata,
  validateInvoiceID,
  uploadMasterDataProcessing,
  getUploadHistory
} from "../actions/utilityActions";
import {setInventoryReportSpinner} from '../actions/spinnerAction';
import {
  GET, 
  ITEM_RECALLED,
  MASTER_FILE_VALIDATIONS, 
  MASTER_FILE_UPLOAD,
  GR_REPORT_RESPONSE,
  POST,
  MASTER_FILE_FORMATS,
  MASTER_FILE_MAX_SIZE,
  UPLOAD_HISTORY
} from '../constants/frontEndConstants';
import FieldError from '../components/fielderror/fielderror';

class UtilityTab extends React.Component{
  constructor(props) 
  {
      super(props);
      this.state = {
        reportState: {}, 
        grnState:{},
        prodStatusCalledOnLoad:false
      }; 
    }

    _renderUploadDataTile() {
      var barData = {h1:"Expired Items", h2:"(Recall all the expired items)", buttonText: "RECALL"}
      var recallBar = <UploadDownBar barData={barData} barAction={this._requestExpiredItems.bind(this)}/>;
      return recallBar;
    }

    _changeReportCategory(data) {
      var newState = this.state.reportState;
      newState.category = data.value;
      this.setState({reportState:newState});
    }

    _changeReportFileType(data) {
      var newState = this.state.reportState;
      newState.fileType = data.value;
      this.setState({reportState:newState});
    }

    _changeGrnFileType(data) {
      var newState = this.state.grnState;
      newState.fileType = data.value;
      this.setState({grnState:newState});
    }

    _captureQuery(e) {
        if(e.target.value) {
            var newState = this.state.grnState;
            newState.invoiceId = e.target.value;
            this.setState({grnState:newState});
        }
    }

    _renderDownReportTile() {
      var downloadReportTile = [];
      const modes = [{ value: 'inventory', label: "Inventory" }];
      const fileType = [{ value: 'csv', label: "Comma separated values (csv)" }, { value: 'xls', label: "ExceL Spreadsheet (xls)" }];
        var currentFileState = this.state.reportState.fileType?(this._getCurrentDropDownState(fileType,this.state.reportState.fileType)):null;
        var currentCategoryState = this.state.reportState.category?(this._getCurrentDropDownState(modes,this.state.reportState.category)):null;
      downloadReportTile.push(<UtilityDropDown key={Math.random()} items={modes} dropdownLabel="Category" placeHolderText="Select Category" changeMode={this._changeReportCategory.bind(this)} currentState={currentCategoryState}/>);
      downloadReportTile.push(<UtilityDropDown key={Math.random()} items={fileType} dropdownLabel="File format" placeHolderText="Select format" changeMode={this._changeReportFileType.bind(this)} currentState={currentFileState}/>)
      return downloadReportTile;
    } 
    _getCurrentDropDownState(fileType, currentValue) {
        for (var i = fileType.length - 1; i >= 0; i--) {
                if(fileType[i].value === currentValue) {
                    return  fileType[i].label; 
                }
        }
        return null;
    }
    _renderGRNtile() {
      var grnTile = [];
      const fileType = [{ value: 'csv', label: "Comma separated values (csv)" }, { value: 'xls', label: "ExceL Spreadsheet (xls)" }];
        var currentState = this.state.grnState.fileType?(this._getCurrentDropDownState(fileType,this.state.grnState.fileType)):null;
        var invoiceInput = <div key={Math.random()}>
                                <div className="gor-utility-invoice-h1"> STN number: </div>
                                <div className="gor-audit-input-wrap gor-utility-invoice-wrap">
                                    <input className="gor-audit-input gor-input-ok" placeholder="Enter STN Number"  ref={node => { this.invoiceId = node }} onChange={this._captureQuery.bind(this)}/>
                                    {this.props.validatedInvoice?<div className="gor-login-error"/>:""}
                                </div>
                                {this.props.validatedInvoice?<div className="gor-sku-error gor-utility-error-invoice">Please enter correct STN number</div>:''}
                            </div>
        grnTile.push(invoiceInput)
      grnTile.push(<UtilityDropDown key={Math.random()} items={fileType} dropdownLabel="File format" 
                                      placeHolderText="Select format" changeMode={this._changeGrnFileType.bind(this)}
                                      currentState={currentState}/>)
      return grnTile;
    }
    /**
     * [_onMasterFileUpload callback for master data file upload]
     * @param  {[type]} fileObject [description]
     * @return {[type]}            [description]
     */
    _onMasterFileUpload(fileObject){
      console.log(fileObject);
      var formData = new FormData();
      formData.append("file", fileObject);
      var params={
         'url':  MASTER_UPLOAD_URL,
         'method':POST,
         'token': this.props.auth_token,
         'cause':MASTER_FILE_UPLOAD,
         'formdata':formData
        }
        this.props.getItemRecall(params)
        this.props.uploadMasterDataProcessing(true);
    }

    _renderMasterUpload() {
        var uploadHistoryData = this.props.uploadHistoryData ? this.props.uploadHistoryData.data : [];
        var recallBar = <MasterUploadTile isMasterUploadProcessing = {this.props.isMasterUploadProcessing} maxFileSize = {MASTER_FILE_MAX_SIZE} validationList = {MASTER_FILE_VALIDATIONS} acceptedFormats ={MASTER_FILE_FORMATS} onMasterFileUpload = {this._onMasterFileUpload.bind(this)} historyData={uploadHistoryData}/>;
        return recallBar;
    }

    _downloadReport() {
        let data={
         'url':  INVENTORY_REPORT_URL,
         'method':GET,
         'token': this.props.auth_token,
        }
        this.props.setInventoryReportSpinner(true);
        this.props.getGRdata(data);

    } 

    _downloadGRN() {
        var url = GR_REPORT_URL + "/" + this.state.grnState.invoiceId;
      let data={
         'url':  url,
         'method':GET,
         'token': this.props.auth_token,
         'cause':GR_REPORT_RESPONSE,
        }
        this.props.getGRdata(data)
        this.props.validateInvoiceID(false)
    }

    _requestExpiredItems() {
        
        let data={
         'url':  GET_ITEM_RECALL,
         'method':GET,
         'token': this.props.auth_token,
         'cause':ITEM_RECALLED,
        }
        this.props.getItemRecall(data)
    }
    _onRefresh(){
      var params={
         'url':  UPLOAD_HISTORY_URL,
         'method':GET,
         'token': this.props.auth_token,
         'cause':UPLOAD_HISTORY
        }
        this.props.getUploadHistory(params)
    }
    componentDidMount(){
      this._onRefresh();
    }


  render(){
    var uploadDataTile = this._renderUploadDataTile();
    var downloadReportTile = this._renderDownReportTile();
    var grnTile = this._renderGRNtile();
        var masterUpload = this._renderMasterUpload();
        var activeReportDownButton = (this.state.reportState.fileType && this.state.reportState.category)?true:false;
        var activeGRNDownButton = (this.state.grnState.fileType && this.state.grnState.invoiceId)?true:false;
    return (
      <div >
        <div>
                    <UtilityTile tileHead="Master Data Upload" showFooter={false} 
                                 tileBody={masterUpload} showHeaderIcon={true} onRefresh = {this._onRefresh.bind(this)}/>
          <UtilityTile tileHead="Run scripts" showFooter={false} tileBody={uploadDataTile}/>
          <UtilityTile tileHead="Download reports" showFooter={true} tileBody={downloadReportTile} 
                                 footerAction={this._downloadReport.bind(this)} enableButton={activeReportDownButton}
                                 responseState={this.props.inventorySpinner}/>
          <UtilityTile tileHead="Download Goods Recieved Note" showFooter={true} 
                                 tileBody={grnTile} footerAction={this._downloadGRN.bind(this)} 
                                 enableButton={activeGRNDownButton}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
      auth_token:state.authLogin.auth_token,
      validatedInvoice:state.utilityValidations.invalidInvoice || false,
      inventorySpinner: state.spinner.inventoryReportSpinner || false,
      isMasterUploadProcessing : state.utilityValidations.isMasterUploadProcessing || false,
      uploadHistoryData : state.utilityValidations.uploadHistoryData
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    getItemRecall: function(data){ dispatch(getItemRecall(data)); },
    getUploadHistory: function(data){dispatch(getUploadHistory(data));},
    getGRdata: function(data){ dispatch(getGRdata(data)); },
    validateInvoiceID: function(data){ dispatch(validateInvoiceID(data)); },
    uploadMasterDataProcessing:function(data){ dispatch(uploadMasterDataProcessing(data)); },
    setInventoryReportSpinner: function(data){ dispatch(setInventoryReportSpinner(data)); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(UtilityTab);