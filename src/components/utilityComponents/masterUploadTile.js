import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';

class MasterUploadTile extends React.Component{
	constructor(props)  
	{
    	super(props);
    	var arrordianState = new Array(this.props.data.length?this.props.data.length:0).fill(false);
    	this.state = {showPanel: arrordianState};
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
    		
    	
    	masterUploadBar =<div> 
	    						<div className={this.state.showPanel[i]?"gor-utility-accordian-open":"gor-utility-updown-bar"}  onClick={this._handlePanel.bind(this,i)}>
	    							<div className="gor-inline gor-utility-accordian-arrow-wrap">
	    								<div className={this.state.showPanel[i]?"gor-down-arrow":"gor-right-arrow"}/>
	    							</div>
	    							<div className="gor-inline">
	    								<div className="gor-utility-master-h1">{this.props.data[i]}</div>
	    								<div className="gor-utility-master-h2">Status: 100% completed</div> 
	    							</div>
	    							<div className="gor-inline gor-utility-master-h2"> 
	    								2 April 2017, 10:57 
	    							</div>
	    						</div>
	    						{this.state.showPanel[i]?<div className="gor-utility-accordian">
	    							<div className="gor-utility-accordian-border"/>
	    							<div className="gor-utility-master-arrordian-h1">
	    								<div className="gor-inline gor-utility-accordian-h1">Records added</div> 
	    								<div className="gor-inline gor-utility-accordian-h3">-</div> 
	    								<div className="gor-inline gor-utility-accordian-h2">48 lines</div>
	    							</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    								<div className="gor-inline gor-utility-accordian-h1">Records updated</div> 
	    								<div className="gor-inline gor-utility-accordian-h3">-</div> 
	    								<div className="gor-inline gor-utility-accordian-h2">3 lines</div>
	    							</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    								<div className="gor-inline gor-utility-accordian-h1">Records deleted</div> 
	    								<div className="gor-inline gor-utility-accordian-h3">-</div> 
	    								<div className="gor-inline gor-utility-accordian-h2">0 lines</div>
	    							</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    								<div className="gor-inline gor-utility-accordian-h1">Errors</div> 
	    								<div className="gor-inline gor-utility-accordian-h3">-</div> 
	    								<div className="gor-inline gor-utility-accordian-h2">0</div>
	    							</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    						  		<div className="gor-inline gor-utility-accordian-h1">Upload file:</div>
	    						  		<div className="gor-inline gor-utility-accordian-button gor-utility-accordian-h3">DOWNLOAD</div>
	    						  	</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    						  		<div className="gor-inline gor-utility-accordian-h1">Result file:</div>
	    						  		<div className="gor-inline gor-utility-accordian-button gor-utility-accordian-h3">DOWNLOAD</div>
	    						  	</div>
	    						</div>:""}
    						 </div>
    						 result.push(masterUploadBar)
    						}
    	return result
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