
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
import { setPpsSpinner } from '../../actions/spinnerAction';
import {stringConfig} from '../../constants/backEndConstants'
import { defineMessages } from 'react-intl';
import { ppsHeaderSort,ppsHeaderSortOrder, setCheckedPps,setDropDisplay ,setCheckAll,ppsFilterDetail} from '../../actions/sortHeaderActions';
import {INITIAL_HEADER_SORT,INITIAL_HEADER_ORDER,GOR_ON_STATUS,GOR_FIRST_LAST} from '../../constants/frontEndConstants';
import {showTableFilter,filterApplied} from '../../actions/filterAction';

//Mesages for internationalization
const messages = defineMessages({
    namePrefix: {
      id:"ppsDetail.name.prefix", 
      description:"prefix for pps id in ppsDetail", 
      defaultMessage:"PPS-{ppsId}"
    },
    perfPrefix:{
      id:"ppsDetail.performance.prefix.items", 
      description:"prefix for pps id in ppsDetail", 
      defaultMessage:"{performance} items/hr"
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
    performance = (data[i].performance<0?0:data[i].performance);
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
      detail.statusPriority = 1;
    }
    detail.statusClass = data[i].pps_status;
    detail.operatingMode = currentTask[data[i].current_task];
    detail.operatingModeClass = data[i].current_task;
    detail.performance = PERFORMANCE;///  orders /items
    detail.ppsThroughput = (data[i].performance<0?0:data[i].performance);
    if(data[i].operators_assigned === null) {
      detail.operatorAssigned = "--";
    }
    else {
      var userFirstLast;
      totalUser = totalUser + data[i].operators_assigned.length;
      for (var j = data[i].operators_assigned.length - 1; j >= 0; j--) {
        if(GOR_FIRST_LAST) {
            userFirstLast = (data[i].operators_assigned[j][0]?data[i].operators_assigned[j][0]:"") + " " + (data[i].operators_assigned[j][1]?data[i].operators_assigned[j][1]:"");
          }
          else {
            userFirstLast = (data[i].operators_assigned[j][1]?data[i].operators_assigned[j][1]:"") + " " + (data[i].operators_assigned[j][0]?data[i].operators_assigned[j][0]:"");
          }
        if(detail.operatorAssigned) {
          detail.operatorAssigned = detail.operatorAssigned + ", " + userFirstLast;
        }
        else {
          detail.operatorAssigned =  userFirstLast;
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
let updateStatusIntl="";
	let operationMode = {"pick":0, "put":0, "audit":0,"notSet":0};
    let data , operatorNum = 0, itemNumber = 5, ppsOn = 0, avgThroughput=0;
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

         if(data[i].status === GOR_ON_STATUS) {
          ppsOn++;
         }

         if(data[i].ppsThroughput) {
          avgThroughput = avgThroughput + data[i].ppsThroughput;
         }
    }

    if(data.length) {
      avgThroughput = (avgThroughput/(data.length)).toFixed(1);
    }

    }
	
		return (
			<div>
				<div>
					<div className="gorTesting">
            <Spinner isLoading={this.props.ppsSpinner} setSpinner={this.props.setPpsSpinner}/>
						<PPStable items={data} itemNumber={itemNumber} operatorNum={operatorNum} operationMode={operationMode}
             modeChange={this.props.changePPSmode} intlMessg={this.props.intlMessages} 
             sortHeaderState={this.props.ppsHeaderSort} currentSortState={this.props.ppsSortHeader} 
             sortHeaderOrder={this.props.ppsHeaderSortOrder} currentHeaderOrder={this.props.ppsSortHeaderState} 
             setCheckedPps={this.props.setCheckedPps} checkedPps={this.props.checkedPps} ppsOnState={ppsOn}
             renderDdrop={this.props.setDropDisplay}
             bDropRender = {this.props.bDropRender}
             setCheckAll = {this.props.setCheckAll}
             getCheckAll = {this.props.getCheckAll}
             setPpsFilter={this.props.ppsFilterDetail}
             getPpsFilter = {this.props.ppsFilter}
             avgThroughput = {avgThroughput}
            ppsFilterState={this.props.ppsFilterState}
             isFilterApplied={this.props.isFilterApplied}
             lastUpdatedText={updateStatusIntl}
             lastUpdated={updateStatusIntl}
             showFilter={this.props.showFilter}
             setFilter={this.props.showTableFilter}/>
					</div>
				</div>
			</div>
		);
	}
};



function mapStateToProps(state, ownProps){
  return {
    ppsFilter: state.sortHeaderState.ppsFilter|| "",
    getCheckAll: state.sortHeaderState.checkAll || false,
    bDropRender: state.sortHeaderState.renderDropD || false,
    checkedPps: state.sortHeaderState.checkedPps,
    ppsSortHeader: state.sortHeaderState.ppsHeaderSort || INITIAL_HEADER_SORT ,
    ppsSortHeaderState: state.sortHeaderState.ppsHeaderSortOrder || INITIAL_HEADER_ORDER,
    ppsSpinner: state.spinner.ppsSpinner || false,
    PPSDetail: state.PPSDetail || [],
    intlMessages: state.intl.messages,
    showFilter: state.filterInfo.filterState || false,
    ppsFilterState:state.filterInfo.ppsFilterState|| false,
    showFilter: state.filterInfo.filterState || false
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    ppsFilterDetail: function(data){dispatch(ppsFilterDetail(data))},
    changePPSmode: function(data){ dispatch(changePPSmode(data)); },
    setPpsSpinner: function(data){ dispatch(setPpsSpinner(data))},
    ppsHeaderSort: function(data){dispatch(ppsHeaderSort(data))},
    ppsHeaderSortOrder: function(data){dispatch(ppsHeaderSortOrder(data))},
    setCheckedPps: function(data){dispatch(setCheckedPps(data))},
    setDropDisplay: function(data){dispatch(setDropDisplay(data))},
    setCheckAll: function(data) {dispatch(setCheckAll(data))},
    showTableFilter: function(data){dispatch(showTableFilter(data));}
  }
};

PPS.contextTypes = {
 intl:React.PropTypes.object.isRequired
}
PPS.PropTypes={
ppsFilter: React.PropTypes.string,
getCheckAll:React.PropTypes.bool,
bDropRender:React.PropTypes.bool,
ppsSortHeader:React.PropTypes.string,
ppsSortHeaderState:React.PropTypes.string,
ppsSpinner:React.PropTypes.bool,
PPSDetail: React.PropTypes.array,
showFilter:React.PropTypes.bool,
ppsFilterState:React.PropTypes.bool,
showFilter:React.PropTypes.bool,
ppsFilterDetail:React.PropTypes.func,
changePPSmode: React.PropTypes.func,
setPpsSpinner: React.PropTypes.func,
ppsHeaderSort: React.PropTypes.func,
ppsHeaderSortOrder:React.PropTypes.func,
setCheckedPps: React.PropTypes.func,
setDropDisplay:React.PropTypes.func,
setCheckAll: React.PropTypes.func,
showTableFilter:React.PropTypes.func

}

export default connect(mapStateToProps,mapDispatchToProps)(PPS) ;

