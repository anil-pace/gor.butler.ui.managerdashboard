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
  var claculateVol = this.props.butlerDetail.butlerDetail, avgVoltage = 0;
  for (var i = claculateVol.length - 1; i >= 0; i--) {
  	avgVoltage = claculateVol[i].voltage + avgVoltage;
  }
  avgVoltage = ((avgVoltage/(claculateVol.length)).toFixed(2));
		return (
			<div>
				<div>
					<div className="gorTesting">
						<ButlerBotTable items={this.props.butlerDetail.butlerDetail} itemNumber={itemNumber} avgVoltage={avgVoltage}/>
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


