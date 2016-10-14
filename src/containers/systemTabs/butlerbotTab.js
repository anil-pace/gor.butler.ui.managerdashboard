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
  var butlerData = this.props.butlerDetail.butlerDetail, avgVoltage = 0;
  if(butlerData && butlerData.length) {
  	for (var i = butlerData.length - 1; i >= 0; i--) {
  		avgVoltage = butlerData[i].voltage + avgVoltage;
  	}
  	avgVoltage = ((avgVoltage/(butlerData.length)).toFixed(2));
  }
		return (
			<div>
				<div>
					<div className="gorTesting">
						<ButlerBotTable items={butlerData} itemNumber={itemNumber} avgVoltage={avgVoltage}/>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
  return {
    butlerDetail: state.butlerDetail || {},
  };
}

export default connect(mapStateToProps)(ButlerBot) ;


