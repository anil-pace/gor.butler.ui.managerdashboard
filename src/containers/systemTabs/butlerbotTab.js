/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import ButlerBotTable from './butlerbotTable';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {stringConfig} from '../../constants/backEndConstants';
import {INITIAL_HEADER_SORT,INITIAL_HEADER_ORDER,GOR_PERIPHERAL_ONLINE, GOR_PERIPHERAL_OFFLINE} from '../../constants/frontEndConstants';
import Spinner from '../../components/spinner/Spinner';
import { setButlerSpinner } from  '../../actions/spinnerAction';
import { butlerHeaderSort,butlerHeaderSortOrder,butlerFilterDetail } from '../../actions/sortHeaderActions';
import { defineMessages } from 'react-intl';

//Mesages for internationalization
const messages = defineMessages({
    butlerPrefix: {id:"butlerDetail.name.prefix",
     description:"prefix for butler id", 
     defaultMessage:"BOT - {botId}"
   },
    ppsPrefix:{
      id:"pps.name.prefix",
      description:"prefix for pps id", 
      defaultMessage:"PPS {ppsId}"
    },
    chargerPrefix:{
      id:"charger.name.prefix", 
      description:"prefix for charger id", 
      defaultMessage:"CS - {csId}"
    },
    msuPrefix: {
      id:"msu.name.prefix", 
      description:"prefix for msu id", 
      defaultMessage:"MSU - {msuId}"
    },
    audit: {
      id:"audit.name.prefix", 
      description:"prefix for audit", 
      defaultMessage:"Audit"
    },
    pick: {
      id:"pick.name.prefix", 
      description:"prefix for Pick", 
      defaultMessage:"Pick"
    },
    put: {
      id:"Put.name.prefix", 
      description:"prefix for put", 
      defaultMessage:"Put"
    },
    charging: {
      id:"Charging.name.prefix", 
      description:"prefix for Charging", 
      defaultMessage:"Charging"
    },
    move: {
      id:"Move.name.prefix", 
      description:"prefix for Charging", 
      defaultMessage:"Move"
    },
    moving: {
      id:"moving.task", 
      description:"moving task", 
      defaultMessage:"Moving to"
    },
    movingMount: {
      id:"movingMount.task", 
      description:"movingMount task", 
      defaultMessage:"Moving to mount"
    },
    movingDismount: {
      id:"movingDismount.task", 
      description:"movingDismount task", 
      defaultMessage:"Moving to dismount"
    },
    docked: {
      id:"docked.task", 
      description:"docked task", 
      defaultMessage:"Docked at"
    }
});



class ButlerBot extends React.Component{
	
  _processButlersData() {
  var nProps = this,
  data = nProps.props.butlerDetail.butlerDetail;
  var butlerData=[], butlerDetail = {};
  
  var currentTask = {0:nProps.context.intl.formatMessage(messages.pick), 
                     1:nProps.context.intl.formatMessage(messages.put),
                     2:nProps.context.intl.formatMessage(messages.audit),
                     3:nProps.context.intl.formatMessage(messages.charging), 
                     4:nProps.context.intl.formatMessage(messages.move)};

  var currentSubtask = {0:nProps.context.intl.formatMessage(messages.moving),
                        1:nProps.context.intl.formatMessage(messages.movingMount),
                        2:nProps.context.intl.formatMessage(messages.movingDismount),
                        3:nProps.context.intl.formatMessage(messages.docked)};
  
  var priStatus = {"online": 1, "offline": 2};
  let BOT, PPS, CS, MSU ;

  for (var i = data.length - 1; i >= 0; i--) {
    var botId = data[i].butler_id, msuId = data[i].display_msu_id, csId = data[i].charger_id, ppsId = data[i].pps_id;
    BOT =  nProps.context.intl.formatMessage(messages.butlerPrefix,{"botId":botId});
    PPS =  nProps.context.intl.formatMessage(messages.ppsPrefix,{"ppsId":ppsId});
    CS =  nProps.context.intl.formatMessage(messages.chargerPrefix,{"csId":csId});
    MSU =  nProps.context.intl.formatMessage(messages.msuPrefix,{"msuId":msuId});
    butlerDetail = {};
    butlerDetail.id =  BOT;
    butlerDetail.statusClass = data[i].state;
    butlerDetail.status = nProps.context.intl.formatMessage(stringConfig[data[i].state]);
    butlerDetail.statusPriority = priStatus[data[i].state];
    butlerDetail.location = data[i].location;
    butlerDetail.voltage = data[i].voltage;
    butlerDetail.taskNum = currentTask[data[i].current_task];
    butlerDetail.taskType = data[i].current_task;
    if(data[i].display_msu_id === null) {
      butlerDetail.msu = "--";
    }
    else{
      butlerDetail.msu = MSU;
    }

    if(data[i].current_task !== null) {
      butlerDetail.current = currentTask[data[i].current_task];
      if(data[i].current_subtask !== null) {
        butlerDetail.current = butlerDetail.current +" - "+ currentSubtask[data[i].current_subtask];
        if(data[i].charger_id !== null) {
          butlerDetail.current = butlerDetail.current + " CS " + data[i].charger_id;
        }

        else if(data[i].msu_id !== null) {
          butlerDetail.current = butlerDetail.current + " MSU " + data[i].msu_id;
        }

        else {
          butlerDetail.current = butlerDetail.current + " " +  PPS ;
        }
      }

      
    }
    else {
      butlerDetail.current = "--";
    }
    butlerData.push(butlerDetail);
  }
  
  return butlerData;
}
  constructor(props) 
	{
    	super(props);
    }	
	render(){
  var itemNumber = 6;
  var butlerData, avgVoltage =0;
  var taskDetail = {"Put":0, "Pick":0, "Charging":0, "Idle":0,"Audit":0, 
                    "avgVoltage":0, "msuMounted":0, "location":0, "online":0, 
                    "offline":0};

  if(this.props.butlerDetail.butlerDetail !==undefined) {
    butlerData = this._processButlersData();
    if(butlerData && butlerData.length) {
    	for (var i = butlerData.length - 1; i >= 0; i--) {
    		avgVoltage = butlerData[i].voltage + avgVoltage;
    		if(butlerData[i].taskNum === null || butlerData[i].taskNum === undefined) {
    			taskDetail["Idle"]++;
    		}
    		else{
        
    			taskDetail[butlerData[i].taskNum]++;
    		}

    		if(butlerData[i].msu !== "--") {
    			taskDetail["msuMounted"]++;
    		}

    		if(butlerData[i].location !== null) {
    			taskDetail["location"]++;
    		}

        if(butlerData[i].status === GOR_PERIPHERAL_ONLINE) {
          taskDetail["online"]++;
        }

        if(butlerData[i].status === GOR_PERIPHERAL_OFFLINE) {
          taskDetail["offline"]++;
        }

    	}
    	avgVoltage = ((avgVoltage/(butlerData.length)).toFixed(1));
    	taskDetail["avgVoltage"]=avgVoltage + "V";
    }
  else {
  	taskDetail = {"Put":"--", "Pick":"--", "Charging":"--", "Idle":"--","Audit":"--", "avgVoltage":"--", "msuMounted":"--", "location":"--", "online":"--"};
  }
}
		return (
			<div>
				<div>
					<div className="gorTesting">
          <Spinner isLoading={this.props.butlerSpinner} setSpinner={this.props.setButlerSpinner}/>
						<ButlerBotTable items={butlerData} itemNumber={itemNumber} parameters={taskDetail} 
                            intlMessg={this.props.intlMessages} sortHeaderState={this.props.butlerHeaderSort} 
                            currentSortState={this.props.butlerSortHeader} 
                            sortHeaderOrder={this.props.butlerHeaderSortOrder} 
                            currentHeaderOrder={this.props.butlerSortHeaderState}
                            setButlerFilter={this.props.butlerFilterDetail}
                            getButlerFilter = {this.props.butlerFilter}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    butlerFilter: state.sortHeaderState.butlerFilter|| "",
    butlerSortHeader: state.sortHeaderState.butlerHeaderSort || INITIAL_HEADER_SORT ,
    butlerSortHeaderState: state.sortHeaderState.butlerHeaderSortOrder || INITIAL_HEADER_ORDER,
    butlerSpinner: state.spinner.butlerSpinner || false,
    butlerDetail: state.butlerDetail || [],
    intlMessages: state.intl.messages
  };
}


var mapDispatchToProps = function(dispatch){
  return{
    butlerFilterDetail: function(data){dispatch(butlerFilterDetail(data))},
    setButlerSpinner: function(data){dispatch(setButlerSpinner(data))},
    butlerHeaderSort: function(data){dispatch(butlerHeaderSort(data))},
    butlerHeaderSortOrder: function(data){dispatch(butlerHeaderSortOrder(data))}
  };
}

ButlerBot.contextTypes ={
 intl:React.PropTypes.object.isRequired
}


export default connect(mapStateToProps,mapDispatchToProps)(ButlerBot) ;


