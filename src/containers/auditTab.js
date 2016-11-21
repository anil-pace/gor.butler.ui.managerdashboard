import React  from 'react';
import ReactDOM  from 'react-dom';
import UserDataTable from './userTab/userTabTable';
import Loader from '../components/loader/Loader';
import { connect } from 'react-redux'; 
import {AUDIT_RETRIEVE} from '../constants/appConstants';
import {AUDIT_URL} from '../constants/configConstants';
import {getAuditData} from '../actions/auditActions';
import AuditTable from './auditTab/auditTable'

function processAuditData(data, nProps ) {
  let created  = nProps.context.intl.formatMessage({id:"auditdetail.created.status", defaultMessage: "Created"});
  let pending  = nProps.context.intl.formatMessage({id:"auditdetail.pending.status", defaultMessage: "Pending"});
  let progress  = nProps.context.intl.formatMessage({id:"auditdetail.progress.status", defaultMessage: "In Progress"});
  let completed  = nProps.context.intl.formatMessage({id:"auditdetail.completed.status", defaultMessage: "Completed"});
  let sku  = nProps.context.intl.formatMessage({id:"auditdetail.sku.prefix", defaultMessage: "SKU"});
  let location  = nProps.context.intl.formatMessage({id:"auditdetail.location.prefix", defaultMessage: "Location"});
  var priStatus = {"audit_created":2, "audit_pending":3, "audit_waiting":3, "audit_conflicting":3, "audit_started":1, "audit_tasked":1, "audit_aborted":4, "audit_completed":4};
  var auditStatus = {"audit_created":created, "audit_pending":pending, "audit_waiting":pending, "audit_conflicting":pending, "audit_started":progress, "audit_tasked":progress, "audit_aborted":completed, "audit_completed":completed};
  var statusClass = {"Pending": "pending", "Completed":"completed", "In Progress":"progress", "Created":"pending"}
  var auditType = {"sku":sku, "location":location};
  var auditDetails = [], auditData = {};
  for (var i = data.length - 1; i >= 0; i--) {
    if(data[i].audit_id) {
      auditData.id = data[i].audit_id;
    }

    if(data[i].audit_param_type) {
      auditData.auditType = data[i].audit_param_type;
      if(data[i].audit_param_value) {
        auditData.auditValue = data[i].audit_param_value;
        auditData.auditTypeValue = auditType[data[i].audit_param_type] + "-" + data[i].audit_param_value;
      }
    }

    if(data[i].audit_status) {
      auditData.statusPriority = priStatus[data[i].audit_status];
      auditData.status = auditStatus[data[i].audit_status]; 
      auditData.statusClass = statusClass[auditData.status];
      if(data[i].audit_status === "audit_created") {
        auditData.startAudit = true;
      }

      else {
        auditData.startAudit = false;
      }
    }

    if(data[i].start_request_time) {
      auditData.startTime = data[i].start_request_time;
    }
    else {
      auditData.startTime = "--";
    }

    if(data[i].expected_quantity !== 0 && completed_quantity !== null) {
      auditData.progress = (data[i].completed_quantity)/(data[i].expected_quantity);
    }
    else {
      auditData.progress = 0; //needs to be done
    }

    if(data[i].completion_time) {
      auditData.completedTime = data[i].completion_time;
    }
    else {
      auditData.completedTime = "--";
    }
    auditDetails.push(auditData);
    auditData = {};
  }
  return auditDetails;
}


class AuditTab extends React.Component{
	constructor(props) 
	{
   super(props);
 }

 componentDidMount() {
   this.getPageData();
 }

 getPageData() {
  let url = AUDIT_URL;
  let auditData={
    'url':url,
    'method':'GET',
    'cause': AUDIT_RETRIEVE,
    'token': sessionStorage.getItem('auth_token'),
    'contentType':'application/json'
  } 
  this.props.getAuditData(auditData);  
}

render(){
  var itemNumber = 7, renderTab = <div/>;
  
    var auditData = processAuditData(this.props.auditDetail, this);
    renderTab = <AuditTable items={auditData} itemNumber={itemNumber}  
    intlMessg={this.props.intlMessages} refreshData={this.getPageData.bind(this)}/>
  
  
  return (
   <div>
    <div>
      <div className="gorUserTable">
        {renderTab}
      </div>
    </div>
   </div>
   );
}
};


function mapStateToProps(state, ownProps){
  
  return {
    auditDetail: state.recieveAuditDetail.auditDetail || [],
    intlMessages: state.intl.messages
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    getAuditData: function(data){ dispatch(getAuditData(data)); }
  }
};

AuditTab.contextTypes ={
 intl:React.PropTypes.object.isRequired
}



export  default connect(mapStateToProps,mapDispatchToProps)(AuditTab);


