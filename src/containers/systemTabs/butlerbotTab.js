/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import ButlerBotTable from './butlerbotTable';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Spinner from '../../components/spinner/Spinner';


function processButlersData(data, nProps) {
  var butlerData=[], butlerDetail = {};
  let online  = nProps.context.intl.formatMessage({id:"butlerDetail.online.status", defaultMessage: "Online"});
  let offline  = nProps.context.intl.formatMessage({id:"butlerDetail.offline.status", defaultMessage: "Offline"});
  var currentTask = {0:"Pick", 1:"Put", 2:"Audit", 3:"Charging", 4:"Move"};
  var currentSubtask = {0:"Moving to",1:"Moving to mount",2:"Moving to dismount",3:"Docked at"};
  var currentState = {"online":online, "offline":offline};
  var priStatus = {"online": 1, "offline": 2};
  let BOT, PPS, CS, MSU ;

  for (var i = data.length - 1; i >= 0; i--) {
    var botId = data[i].butler_id, msuId = data[i].display_msu_id, csId = data[i].charger_id, ppsId = data[i].pps_id;
    BOT =  nProps.context.intl.formatMessage({id:"butlerDetail.name.prefix", description:"prefix for butler id", defaultMessage:"BOT - {botId}"},{"botId":botId});
    PPS =  nProps.context.intl.formatMessage({id:"pps.name.prefix", description:"prefix for pps id", defaultMessage:"PPS {ppsId}"},{"ppsId":ppsId});
    CS =  nProps.context.intl.formatMessage({id:"charger.name.prefix", description:"prefix for charger id", defaultMessage:"CS - {csId}"},{"csId":csId});
    MSU =  nProps.context.intl.formatMessage({id:"msu.name.prefix", description:"prefix for msu id", defaultMessage:"MSU - {msuId}"},{"msuId":msuId});
    butlerDetail = {};
    butlerDetail.id =  BOT;
    butlerDetail.statusClass = data[i].state;
    butlerDetail.status = currentState[data[i].state];
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
class ButlerBot extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
  var itemNumber = 6;
  var butlerData, avgVoltage =0;
  var taskDetail = {"Put":0, "Pick":0, "Charging":0, "Idle":0,"Audit":0, "avgVoltage":0, "msuMounted":0, "location":0};
  if(this.props.butlerDetail.butlerDetail !==undefined) {
    butlerData = processButlersData(this.props.butlerDetail.butlerDetail, this)
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

    	}
    	avgVoltage = ((avgVoltage/(butlerData.length)).toFixed(2));
    	taskDetail["avgVoltage"]=avgVoltage + "V";
    }
  else {
  	taskDetail = {"Put":"--", "Pick":"--", "Charging":"--", "Idle":"--","Audit":"--", "avgVoltage":"--", "msuMounted":"--", "location":"--"};
  }
}
		return (
			<div>
				<div>
					<div className="gorTesting">
          <Spinner isLoading={this.props.butlerSpinner}/>
						<ButlerBotTable items={butlerData} itemNumber={itemNumber} parameters={taskDetail} intlMessg={this.props.intlMessages}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  console.log(state)
  return {
    butlerSpinner: state.spinner.butlerSpinner || false,
    butlerDetail: state.butlerDetail || [],
    intlMessages: state.intl.messages
  };
}

ButlerBot.contextTypes ={
 intl:React.PropTypes.object.isRequired
}


export default connect(mapStateToProps)(ButlerBot) ;


