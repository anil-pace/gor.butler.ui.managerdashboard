
/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import PPStable from './PPStable';
import { connect } from 'react-redux';
import {changePPSmode} from '../../actions/ppsModeChangeAction'
import { FormattedMessage } from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import {stringConfig} from '../../constants/backEndConstants'
import { defineMessages } from 'react-intl';

//Mesages for internationalization
const messages = defineMessages({
    namePrefix: {
      id:"ppsDetail.name.prefix", 
      description:"prefix for pps id in ppsDetail", 
      defaultMessage:"PPS-{ppsId}"
    },
    perfPrefix:{
      id:"ppsDetail.performance.prefix", 
      description:"prefix for pps id in ppsDetail", 
      defaultMessage:"{performance} orders/hr"
    }

});



class PPS extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	

  _processPPSData() {
  //TODO: codes need to be replaced after checking with backend
  var PPSData=[], detail = {}, ppsId, performance,totalUser = 0;
  var nProps = this;
  var data = nProps.props.PPSDetail.PPStypeDetail;
  let PPS, ON, OFF, PERFORMANCE;
  let pick  = nProps.context.intl.formatMessage(stringConfig.pick);
  let put = nProps.context.intl.formatMessage(stringConfig.put);
  let audit = nProps.context.intl.formatMessage(stringConfig.audit);
  var currentTask = {"pick":pick, "put":put, "audit":audit};
  var priStatus = {"on": 1, "off": 2};

  detail.totalOperator = 0;
  for (var i = data.length - 1; i >= 0; i--) {
    detail = {};
    ppsId = data[i].pps_id;
    performance = data[i].performance;
    PPS =  nProps.context.intl.formatMessage(messages.namePrefix,{"ppsId":ppsId});
    ON = nProps.context.intl.formatMessage(stringConfig.on);
    OFF = nProps.context.intl.formatMessage(stringConfig.off);
    PERFORMANCE =  nProps.context.intl.formatMessage(messages.perfPrefix,{"performance":performance?performance:"0"});
    detail.id =  PPS;
    detail.ppsId = ppsId;
    if(data[i].pps_status === "on") {
      detail.status = ON;
      detail.statusPriority = priStatus[data[i].pps_status];
    }
    else {
      detail.status = OFF;
      detail.statusPriority = 2;
    }
    detail.statusClass = data[i].pps_status;
    detail.operatingMode = currentTask[data[i].current_task];
    detail.operatingModeClass = data[i].current_task;
    detail.performance = PERFORMANCE;///  orders /items
    if(data[i].operators_assigned === null) {
      detail.operatorAssigned = "--";
    }
    else {
      totalUser = totalUser + data[i].operators_assigned.length;
      for (var j = data[i].operators_assigned.length - 1; j >= 0; j--) {
        if(detail.operatorAssigned) {
          detail.operatorAssigned = detail.operatorAssigned + ", " + data[i].operators_assigned[j];
        }
        else {
          detail.operatorAssigned =  data[i].operators_assigned[j];
        }
      }
      detail.totalOperator = detail.totalOperator + data[i].operators_assigned.length;
      
    }
    detail.totalUser = totalUser;
    PPSData.push(detail);
  }
  return PPSData;

}
	render(){	

	var operationMode = {"Pick":0, "Put":0, "Audit":0,"NotSet":0};
    var data , operatorNum = 0, itemNumber = 5;
    if(this.props.PPSDetail.PPStypeDetail !== undefined) {
    	data = this._processPPSData();
      for (var i = data.length - 1; i >= 0; i--) {
        if(data[i].operatingMode !== null) {
           operationMode[data[i].operatingMode] = operationMode[data[i].operatingMode] +1;
        }
        else {
          operationMode = {"Pick":"--", "Put":"--", "Audit":"--","NotSet":"--"};
          operatorNum = "--";
       }
       
    if (operatorNum < data[i].totalUser) {
      operatorNum = data[i].totalUser
    }
    }
    

    }
	
		return (
			<div>
				<div>
					<div className="gorTesting">
            <Spinner isLoading={this.props.ppsSpinner} />
						<PPStable items={data} itemNumber={itemNumber} operatorNum={operatorNum} operationMode={operationMode} modeChange={this.props.changePPSmode} intlMessg={this.props.intlMessages}/>
					</div>
				</div>
			</div>
		);
	}
};



function mapStateToProps(state, ownProps){
  return {
    ppsSpinner: state.spinner.ppsSpinner || false,
    PPSDetail: state.PPSDetail || [],
    intlMessages: state.intl.messages
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    changePPSmode: function(data){ dispatch(changePPSmode(data)); }
  }
};

PPS.contextTypes = {
 intl:React.PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(PPS) ;

