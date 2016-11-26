
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


function processChargersData(data, nProps) {
  var chargerData=[],detail = {},count = 0;
  let CS, csId, botId, BUTLER;
  let connected  = nProps.context.intl.formatMessage({id:"chargersDetail.connected.status", defaultMessage: "Connected"});
  let disconnected  = nProps.context.intl.formatMessage({id:"chargersDetail.disconnected.status", defaultMessage: "Disconnected"});
  let manual  = nProps.context.intl.formatMessage({id:"chargersDetail.manual.mode", defaultMessage: "Manual"});
  let auto  = nProps.context.intl.formatMessage({id:"chargersDetail.auto.mode", defaultMessage: "Auto"});
  var status = {"connected":connected, "disconnected":disconnected}, mode = {"manual":manual, "auto":auto};
  var priStatus = {"connectd": 1, "disconnected": 2};
  for (var i = data.length - 1; i >= 0; i--) {
    detail = {}
    csId = data[i].charger_id;
    botId = data[i].docked_butler_id;
    CS = nProps.context.intl.formatMessage({id:"chargersDetail.name.prefix", description:"prefix for cs id in chargersDetail", defaultMessage:"Charging Stations - {csId}"},{"csId":csId});
    BUTLER = nProps.context.intl.formatMessage({id:"chargersDetail.butler.prefix", description:"prefix for butler id in chargersDetail", defaultMessage:"Butler - {botId}"},{"botId":botId});
    detail.id = CS;
    detail.status = stringConfig[data[i].charger_status];//status[data[i].charger_status];
    detail.statusClass = data[i].charger_status;
    detail.statusPriority = priStatus[data[i].charger_status];
    detail.mode = stringConfig[data[i].charger_mode];
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

class ChargingStations extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
	
	var itemNumber = 4, connectedBots = 0, manualMode = 0, automaticMode = 0, chargersState = {"connectedBots": "--","manualMode": "--", "automaticMode":"--"}, chargersData;
    if(this.props.chargersDetail.chargersDetail !== undefined) {
     chargersData =  processChargersData(this.props.chargersDetail.chargersDetail, this);
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

