import React  from 'react';
import UtilityTile from '../components/utilityComponents/utilityTile'
import UploadDownBar from '../components/utilityComponents/uploadDownBar'
import DropdownTable from '../components/dropdown/dropdownTable'
import UtilityDropDown from '../components/utilityComponents/utilityDropdownWrap'
class UtilityTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    	this.state = {reportState: {}, grnState:{}}; 
    }

    _renderUploadDataTile() {
    	var barData = {h1:"Expired Items", h2:"(Recall all the expired items)"}
    	var recallBar = <UploadDownBar barData={barData}/>;
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

    _downloadReport() {
    	// integration with backend pending
    	console.log("download report")
    }	

    _downloadGRN() {
    	// integration with backend pending
    	console.log("download grn")
    }

	render(){
		var uploadDataTile = this._renderUploadDataTile();
		var downloadReportTile = this._renderDownReportTile();
		var grnTile = this._renderGRNtile();
		return (
			<div >
				<div>
					<UtilityTile tileHead="Run scripts" showFooter={false} tileBody={uploadDataTile}/>
					<UtilityTile tileHead="Download reports" showFooter={true} tileBody={downloadReportTile} footerAction={this._downloadReport.bind(this)}/>
					<UtilityTile tileHead="Download Goods Recieved Note" showFooter={true} tileBody={grnTile} footerAction={this._downloadGRN.bind(this)}/>
				</div>
			</div>
		);
	}
}

export default UtilityTab ;