
/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import ChargingStationsTable from './chargingStationsTable';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import {stringConfig} from '../../constants/backEndConstants'




class ChargingStations extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	

  _processChargersData(data, nProps) {
  var chargerData=[],detail = {},count = 0,
  nProps = this,
  data = nProps.props.chargersDetail.chargersDetail,
  CS, csId, botId, BUTLER;
  
  var priStatus = {"connected": 1, "disconnected": 2};

  for (var i = data.length - 1; i >= 0; i--) {
    detail = {}
    csId = data[i].charger_id;
    botId = data[i].docked_butler_id;
    CS = nProps.context.intl.formatMessage({id:"chargersDetail.name.prefix", description:"prefix for cs id in chargersDetail", defaultMessage:"Charging Stations - {csId}"},{"csId":csId});
    BUTLER = nProps.context.intl.formatMessage({id:"chargersDetail.butler.prefix", description:"prefix for butler id in chargersDetail", defaultMessage:"Butler - {botId}"},{"botId":botId});
    detail.id = CS;
    detail.status = nProps.context.intl.formatMessage((stringConfig[data[i].charger_status]).params);
    detail.statusClass = data[i].charger_status;
    detail.statusPriority = priStatus[data[i].charger_status];
    detail.mode = nProps.context.intl.formatMessage(stringConfig[data[i].charger_mode].params);
    detail.modeClass = data[i].charger_mode;
    if(data[i].docked_butler_id  && data[i].docked_butler_id.length) {
       detail.dockedBots = BUTLER;
     }

     else {
       detail.dockedBots = "--";
     }
    chargerData.push(detail); 
  }
  return chargerData;
}
	render(){
	
	var itemNumber = 4, connectedBots = 0, manualMode = 0, automaticMode = 0, chargersState = {"connectedBots": "--","manualMode": "--", "automaticMode":"--"}, chargersData;
    if(this.props.chargersDetail.chargersDetail !== undefined) {
     chargersData =  this._processChargersData();
    if(chargersData && chargersData.length) {
    	for (var i = chargersData.length - 1; i >= 0; i--) {
        	if(chargersData[i].dockedBots !== "--") {
        		connectedBots++;
      		}

      		if(chargersData[i].mode === "Manual") {
      			manualMode++;
      		}
      		else{
      			automaticMode++;
      		}
    	}
    	chargersState = {"connectedBots": connectedBots,"manualMode": manualMode, "automaticMode":automaticMode};
	}
}

		return (
			<div>
				<div>
					<div className="gorTesting">
          <Spinner isLoading={this.props.csSpinner} />
						<ChargingStationsTable items={chargersData} itemNumber={itemNumber} chargersState={chargersState} intlMessg={this.props.intlMessages}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    csSpinner: state.spinner.csSpinner || false,
    chargersDetail: state.chargersDetail || [],
    intlMessages: state.intl.messages
  };
}

ChargingStations.contextTypes ={
 intl:React.PropTypes.object.isRequired
}


export default connect(mapStateToProps)(ChargingStations) ;

