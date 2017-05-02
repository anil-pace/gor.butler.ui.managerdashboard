import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import AccordianBar from './accordianBar';
class MasterUploadTile extends React.Component{
	constructor(props)  
	{
    	super(props);
    	var accordianState = new Array(this.props.data.length?this.props.data.length:0).fill(false);
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
    	for (var i = this.props.data.length - 1; i >= 0; i--) {
    		masterUploadBar = <AccordianBar showPanel={this.state.showPanel[i]} data={this.props.data[i]} 
    										handleAccordianState={this._handlePanel} index={i}/>
    		result.push(masterUploadBar)
    	}
    	return result;
    }

	render(){
		var masterDataBody = this._renderMasterData();
		return (
			<div>
				<div className="gor-utility-btn-wrap">
					<button className="gor-filterBtn-applied">
          				<label>
  							UPLOAD MASTER DATA
  							<input type="file" style={{'display': 'none'}}/>
						</label>
         			</button>
         		</div>
         		<div className="gor-utility-body-header">
         			Upload History 
         		</div>
         		<div>
         			{masterDataBody}
         		</div>
			</div>
		);
	}
};

export default MasterUploadTile ;