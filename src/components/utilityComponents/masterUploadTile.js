import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import AccordianBar from './accordianBar';
import FileUpload from '../fileUpload/fileUpload';

class MasterUploadTile extends React.Component{
	constructor(props)  
	{
    	super(props);
    	var accordianState = new Array(this.props.historyData.length?this.props.historyData.length:0).fill(false);
    	this.state = {showPanel: accordianState};
    	this._handlePanel = this._handlePanel.bind(this);
    }

    _handlePanel(index) {
    	var accordianState = this.state.showPanel;
    	var currentState = accordianState[index];
    	accordianState = new Array(accordianState.length?accordianState.length:0).fill(false);
    	accordianState[index] = !currentState;
    	this.setState({showPanel:accordianState});
    }

    _renderMasterData() {
    	var result = [], masterUploadBar;
    	for (let i = this.props.historyData.length - 1; i >= 0; i--) {
    		masterUploadBar = <AccordianBar showPanel={this.state.showPanel[i]} data={this.props.historyData[i]} 
    										handleAccordianState={this._handlePanel} index={i} key={"acc"+i}/>
    		result.push(masterUploadBar)
    	}
    	return result;
    }

	render(){
		//var masterDataBody = this._renderMasterData();{masterDataBody}
		return (
			<div>
				<FileUpload isProcessing={this.props.isMasterUploadProcessing} maxFileSize = {this.props.maxFileSize} validationList = {this.props.validationList} acceptedFormats = {this.props.acceptedFormats} onChange={this.props.onMasterFileUpload}/>
         		<div className="gor-utility-body-header">
         			Upload History 
         		</div>
         		<div>
         			
         		</div>
			</div>
		);
	}
};
MasterUploadTile.propTypes={
    onMasterFileUpload:React.PropTypes.func,
    historyData:React.PropTypes.array,
    acceptedFormats:React.PropTypes.array,
    validationList:React.PropTypes.object,
    maxFileSize :  React.PropTypes.number,
    isMasterUploadProcessing: React.PropTypes.bool
}

export default MasterUploadTile ;