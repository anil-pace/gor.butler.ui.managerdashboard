import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import AccordianBar from './accordianBar';
import FileUpload from '../fileUpload/fileUpload';


class MasterUploadTile extends React.Component{
	constructor(props)  
	{
    	super(props);
    	 this.state = {
            showPanel: []
        }
    	
    }

    _handlePanel(index) {
        var accordianState = this.state.showPanel;
        var currentState = accordianState[index];
        accordianState = new Array(accordianState.length?accordianState.length:0).fill(false);
        accordianState[index] = !currentState;
        this.setState({showPanel:accordianState});
    }

    _renderMasterData() {
    	var result = [], masterUploadBar,historyData = this.props.historyData;
        if(!this.state.showPanel.length){
            let accordianState = new Array(historyData.length?historyData.length:0).fill(false);
            this.state = {showPanel: accordianState};
        }
    	for (let i = historyData.length - 1; i >= 0; i--) {
    		let status = ((historyData[i].created + historyData[i].deleted + historyData[i].error +historyData[i].updated) / historyData[i].total)*100;
            
            masterUploadBar = <AccordianBar completed = {Math.ceil(status)} showPanel={this.state.showPanel[i]} data={historyData[i]} 
    										handleAccordianState={this._handlePanel.bind(this)} index={i} key={"acc"+i}/>
    		result.push(masterUploadBar)
    	}
    	return result;
    }

	render(){
		var masterDataBody = this._renderMasterData();
		return (
			<div>
				<FileUpload uploadBtnText= {this.props.uploadBtnText} isProcessing={this.props.isMasterUploadProcessing} maxFileSize = {this.props.maxFileSize} validationList = {this.props.validationList} acceptedFormats = {this.props.acceptedFormats} onChange={this.props.onMasterFileUpload}/>
         		<div className="gor-utility-body-header">
         			<FormattedMessage id="utility.uploadHistory.head" description='Upload History' defaultMessage='Upload History'/> 
         		</div>
         		<div>
         			{masterDataBody}
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
    isMasterUploadProcessing: React.PropTypes.bool,
    uploadBtnText:React.PropTypes.string
}

export default MasterUploadTile ;