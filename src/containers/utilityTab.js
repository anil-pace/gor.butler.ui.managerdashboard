import React  from 'react';
import UtilityTile from '../components/utilityComponents/utilityTile'
import UploadDownBar from '../components/utilityComponents/uploadDownBar'
import DropdownTable from '../components/dropdown/dropdownTable'
import UtilityDropDown from '../components/utilityComponents/utilityDropDownWrap'
import MasterUploadTile from '../components/utilityComponents/masterUploadTile'
import {INVENTORY_REPORT_URL, GET_ITEM_RECALL} from '../constants/configConstants';
import { connect } from 'react-redux';
import {getItemRecall} from "../actions/utilityActions";
import {GET, ITEM_RECALLED} from '../constants/frontEndConstants';

class UtilityTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    	this.state = {reportState: {}, grnState:{}}; 
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

    _renderDownReportTile() {
    	var downloadReportTile = [];
    	const modes = [{ value: 'inventory', label: "Inventory" }];
    	const fileType = [{ value: 'csv', label: "Comma separated values (csv)" }, { value: 'xls', label: "ExceL Spreadsheet (xls)" }];
    	downloadReportTile.push(<UtilityDropDown items={modes} dropdownLabel="Category" placeHolderText="Select Category" changeMode={this._changeReportCategory.bind(this)}/>);
    	downloadReportTile.push(<UtilityDropDown items={fileType} dropdownLabel="File format" placeHolderText="Select format" changeMode={this._changeReportFileType.bind(this)}/>)
    	return downloadReportTile;
    } 

    _renderGRNtile() {
    	var grnTile = [];
    	const fileType = [{ value: 'csv', label: "Comma separated values (csv)" }, { value: 'xls', label: "ExceL Spreadsheet (xls)" }];
    	grnTile.push(<UtilityDropDown items={fileType} dropdownLabel="File format" placeHolderText="Select format" changeMode={this._changeGrnFileType.bind(this)}/>)
    	return grnTile;
    }

    _renderMasterUpload() {
        var fileType = ["File 001", "File 002"];
        var recallBar = <MasterUploadTile data={fileType}/>;
        return recallBar;
    }

    _downloadReport() {
        if(this.state.reportState.fileType && this.state.reportState.category) {
           window.open(INVENTORY_REPORT_URL)
        }
    }	

    _downloadGRN() {
    	// integration with backend pending
    	console.log("download grn")
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


	render(){
		var uploadDataTile = this._renderUploadDataTile();
		var downloadReportTile = this._renderDownReportTile();
		var grnTile = this._renderGRNtile();
        var masterUpload = this._renderMasterUpload();
        var activeReportDownButton = (this.state.reportState.fileType && this.state.reportState.category)?true:false;
		return (
			<div >
				<div>
                    <UtilityTile tileHead="Master Data Upload" showFooter={false} 
                                 tileBody={masterUpload} showHeaderIcon={true}/>
					<UtilityTile tileHead="Run scripts" showFooter={false} tileBody={uploadDataTile}/>
					<UtilityTile tileHead="Download reports" showFooter={true} tileBody={downloadReportTile} 
                                 footerAction={this._downloadReport.bind(this)} enableButton={activeReportDownButton}/>
					<UtilityTile tileHead="Download Goods Recieved Note" showFooter={true} tileBody={grnTile} footerAction={this._downloadGRN.bind(this)}/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps){
  return {
      auth_token:state.authLogin.auth_token
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    getItemRecall: function(data){ dispatch(getItemRecall(data)); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(UtilityTab);
