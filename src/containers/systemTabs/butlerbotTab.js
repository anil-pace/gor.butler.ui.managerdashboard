/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import ButlerBotTable from './butlerbotTable';
import { connect } from 'react-redux';
class ButlerBot extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
  var itemNumber = 6;
  var butlerData = this.props.butlerDetail.butlerDetail, avgVoltage =0;
  var taskDetail = {"Put":0, "Pick":0, "Charging":0, "Idle":0,"Audit":0, "avgVoltage":0, "msuMounted":0, "location":0};
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


      butlerData = butlerData.sort(function(a, b) {
        if(a.id < b.id) return -1;
        if(a.id > b.id) return 1;
        return 0;
      });

  }
  else {
  	taskDetail = {"Put":"--", "Pick":"--", "Charging":"--", "Idle":"--","Audit":"--", "avgVoltage":"--", "msuMounted":"--", "location":"--"};
  }
		return (
			<div>
				<div>
					<div className="gorTesting">
						<ButlerBotTable items={butlerData} itemNumber={itemNumber} parameters={taskDetail} intlMessg={this.props.intlMessages}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    butlerDetail: state.butlerDetail || [],
    intlMessages: state.intl.messages
  };
}

export default connect(mapStateToProps)(ButlerBot) ;


