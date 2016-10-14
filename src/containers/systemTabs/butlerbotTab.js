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
  var taskDetail = {"put":0, "pick":0, "charging":0, "idle":0, "avgVoltage":0, "msuMounted":0, "location":0};
  if(butlerData && butlerData.length) {
  	for (var i = butlerData.length - 1; i >= 0; i--) {
  		avgVoltage = butlerData[i].voltage + avgVoltage;
  		if(butlerData[i].taskType === null) {
  			taskDetail["idle"]++;
  		}
  		else{
  			taskDetail[butlerData[i].taskType]++;
  		}

  		if(taskDetail["msuMounted"] !== null) {
  			taskDetail["msuMounted"]++;
  		}

  		if(taskDetail["location"] !== null) {
  			taskDetail["location"]++;
  		}

  	}
  	avgVoltage = ((avgVoltage/(butlerData.length)).toFixed(2));
  	taskDetail["avgVoltage"]=avgVoltage;
  }
  else {
  	taskDetail = {"put":"--", "pick":"--", "charging":"--", "idle":"--", "avgVoltage":"--", "msuMounted":"--", "location":"--"};
  }
		return (
			<div>
				<div>
					<div className="gorTesting">
						<ButlerBotTable items={butlerData} itemNumber={itemNumber} parameters={taskDetail}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    butlerDetail: state.butlerDetail || [],
  };
}

export default connect(mapStateToProps)(ButlerBot) ;


