import React  from 'react';
import ReactDOM  from 'react-dom';
import UserDataTable from './userTab/userTabTable';
import Spinner from '../components/spinner/Spinner';
import { connect } from 'react-redux'; 
import {AUDIT_URL,FILTER_AUDIT_ID} from '../constants/configConstants';
import {getAuditData,setAuditRefresh} from '../actions/auditActions';
import AuditTable from './auditTab/auditTable';
import {getPageData} from '../actions/paginationAction';
import {AUDIT_RETRIEVE,GET,APP_JSON,GOR_COMPLETED_STATUS,LOCATION,SKU,AUDIT_PENDING_APPROVAL,AUDIT_RESOLVED,AUDIT_CREATED, AUDIT_LINE_REJECTED} from '../constants/frontEndConstants';
import {BASE_URL, API_URL,ORDERS_URL,PAGE_SIZE_URL,PROTOCOL,SEARCH_AUDIT_URL,GIVEN_PAGE,GIVEN_PAGE_SIZE} from '../constants/configConstants';
import {setAuditSpinner} from '../actions/auditActions';
import { defineMessages } from 'react-intl';
import {auditHeaderSortOrder, auditHeaderSort, auditFilterDetail} from '../actions/sortHeaderActions';
import {getDaysDiff} from '../utilities/getDaysDiff';
import GorPaginate from '../components/gorPaginate/gorPaginate';
//Mesages for internationalization
const messages = defineMessages({
  auditCreatedStatus: {
    id:"auditdetail.created.status", 
    defaultMessage: "Created"
  },
  auditPendingStatus:{
    id:"auditdetail.pending.status", 
    defaultMessage: "Pending"
  },
  auditInProgressStatus:{
    id:"auditdetail.progress.status", 
    defaultMessage: "In Progress"
  },
  auditCompletedStatus: {
    id:"auditdetail.completed.status", 
    defaultMessage: "Completed"
  },
  auditSKU:{
    id:"auditdetail.sku.prefix", 
    defaultMessage: "SKU"
  },
  auditLocation:{
    id:"auditdetail.location.prefix", 
    defaultMessage: "Location"
  },
  auditPendingApp:{
    id:"auditdetail.auditPendingApp.prefix", 
    defaultMessage: "Issues found"
  }


});


class AuditTab extends React.Component{
	constructor(props) 
	{
   super(props);
   this.state={selected_page:0};
  }
 componentWillReceiveProps(nextProps)
 {
  if(nextProps.auditRefresh)
  {
   var data={};
   data.selected = this.state.selected_page;
   this.handlePageClick(data);
   this.props.setAuditRefresh(false);
 }
}
componentDidMount() {
  var data = {};
  data.selected = 1;
  this.handlePageClick(data);
}
_processAuditData(data,nProps){
  var nProps = this,
  data = nProps.props.auditDetail;
  let created  = nProps.context.intl.formatMessage(messages.auditCreatedStatus);
  let pending  = nProps.context.intl.formatMessage(messages.auditPendingStatus);
  let progress  = nProps.context.intl.formatMessage(messages.auditInProgressStatus);
  let completed  = nProps.context.intl.formatMessage(messages.auditCompletedStatus);
  let pendingApp  = nProps.context.intl.formatMessage(messages.auditPendingApp);
  let sku  = nProps.context.intl.formatMessage(messages.auditSKU);
  let location  = nProps.context.intl.formatMessage(messages.auditLocation);

  var timeOffset= nProps.props.timeOffset || "";
  var auditStatus = {"audit_created":created, "audit_pending":pending, "audit_waiting":pending, "audit_conflicting":pending, "audit_accepted":pending, "audit_started":progress, "audit_tasked":progress, "audit_aborted":completed, "audit_completed":completed, "audit_pending_approval":pendingApp, "audit_resolved":progress, audit_rejected:"audit_rejected"};
  var statusClass = {"Pending": "pending", "Completed":"completed", "In Progress":"progress", "Created":"pending", "Issues found":"breached"}
  var auditType = {"sku":sku, "location":location};
  var auditDetails = [], auditData = {};
  for (var i = data.length - 1; i >= 0; i--) {
     auditData.id = data[i].audit_id;
    if(data[i].display_id) {
      auditData.display_id = data[i].display_id;
    }

    else {
      auditData.display_id = "--";
    }

    if(data[i].audit_param_type) {
      auditData.auditType = data[i].audit_param_type;
      if(data[i].audit_param_value) {
        auditData.auditValue = data[i].audit_param_value;
        auditData.auditTypeValue = auditType[data[i].audit_param_type] + "-" + data[i].audit_param_value;
      }
    }

    if(data[i].audit_status) {
      if(auditData.statusPriority === undefined) {
        auditData.statusPriority = 1;
      }
      auditData.status = auditStatus[data[i].audit_status]; 
      auditData.statusClass = statusClass[auditData.status];
      if(data[i].audit_status === AUDIT_CREATED) {
        auditData.startAudit = true;
      }

      else {
        auditData.startAudit = false;
      }

      
      if(data[i].audit_status === AUDIT_PENDING_APPROVAL) {
        auditData.resolveAudit = true;
      }

      else {
        auditData.resolveAudit = false;
      }

      if(data[i].audit_status === AUDIT_RESOLVED || data[i].audit_status === AUDIT_LINE_REJECTED) {
        auditData.viewIssues = true;
      }

      else {
        auditData.viewIssues = false;
      }
    }

    if(data[i].start_actual_time) {
      if(getDaysDiff(data[i].start_actual_time)<2){
       auditData.startTime = nProps.context.intl.formatRelative(data[i].start_actual_time,{timeZone:timeOffset,units:'day'}) +
        ", " + nProps.context.intl.formatTime(data[i].start_actual_time,{timeZone:timeOffset,hour: 'numeric',minute: 'numeric',hour12: false});
      }
      else{
        auditData.startTime = nProps.context.intl.formatDate(data[i].start_actual_time,
        {timeZone:timeOffset,
          year:'numeric',
          month:'short',
          day:'2-digit',
          hour:"2-digit",
          minute:"2-digit",
          hour12: false
        });
      }
    }
    else {
      auditData.startTime = "--";
    }

    if( data[i].expected_quantity && data[i].completed_quantity ) {
      auditData.progress = ((data[i].completed_quantity)/(data[i].expected_quantity)*100);
    }

    else {
      auditData.progress = 0; 
    }

    if(data[i].completion_time) {
      if(getDaysDiff(data[i].completion_time)<2){
       auditData.completedTime = nProps.context.intl.formatRelative(data[i].completion_time,{timeZone:timeOffset,units:'day'}) + 
       ", " + nProps.context.intl.formatTime(data[i].completion_time,{timeZone:timeOffset,hour: 'numeric',minute: 'numeric',hour12: false});
      }
      else{
        auditData.completedTime = nProps.context.intl.formatDate(data[i].completion_time,
        {timeZone:timeOffset,
          year:'numeric',
          month:'short',
          day:'2-digit',
          hour:"2-digit",
          minute:"2-digit"
        });
      }
    }
    else {
      auditData.completedTime = "--";
    }
    auditData.resolvedTask = data[i].resolved;
    auditData.unresolvedTask = data[i].unresolved;
    auditDetails.push(auditData);
    auditData = {};
  }
  return auditDetails;
}
handlePageClick(data){
  var url, appendSortUrl = "",appendTextFilterUrl="";
  var sortHead = {"startTime":"&order_by=start_actual_time", "completedTime":"&order_by=completion_time", "display_id":"&order_by=audit_id"};
  var sortOrder = {"DESC":"&order=asc", "ASC":"&order=desc"};
  var makeDate = new Date();
  this.setState({selected_page:data.selected});
  makeDate.setDate(makeDate.getDate() - 30)
  makeDate = makeDate.getFullYear()+'-'+makeDate.getMonth()+'-'+makeDate.getDate();  
  
  if((data.captureValue || data.captureValue === "") && data.type === "searchOrder") {
      appendTextFilterUrl = FILTER_AUDIT_ID + data.captureValue;
  }

  if(data.url === undefined) {
    if(data.columnKey && data.sortDir) {
      appendSortUrl = sortHead[data.columnKey] + sortOrder[data.sortDir]; 
    }
    url = SEARCH_AUDIT_URL+makeDate+GIVEN_PAGE+(data.selected)+GIVEN_PAGE_SIZE + appendSortUrl;
  }
  else {
    url = data.url;
  }

  url = url + appendTextFilterUrl;

  let paginationData={
    'url':url,
    'method':GET,
    'cause': AUDIT_RETRIEVE,
    'token': this.props.auth_token,
    'contentType':APP_JSON
  } 
  this.props.setAuditSpinner(true);
  this.props.getPageData(paginationData);
}



render(){
  var renderTab = <div/>,
  timeOffset = this.props.timeOffset || "",
  headerTimeZone = (this.context.intl.formatDate(Date.now(),
    {timeZone:timeOffset,
      year:'numeric',
      timeZoneName:'long'
    })),
  totalProgress = 0;
  
  /*Extracting Time zone string for the specified time zone*/
  headerTimeZone = headerTimeZone.substr(5, headerTimeZone.length);
  
  var auditData = this._processAuditData();
  var auditState = {"auditCompleted":0 ,"skuAudit": 0, "locationAudit":0, "totalProgress":0} 
  for (var i = auditData.length - 1; i >= 0; i--) {
    if(auditData[i].status === GOR_COMPLETED_STATUS) {
      auditState["auditCompleted"]++;
    }
    if(auditData[i].auditType === SKU) {
      auditState["skuAudit"]++;
    }
    if(auditData[i].auditType === LOCATION) {
      auditState["locationAudit"]++;
    }
    totalProgress = auditData[i].progress + totalProgress;
    auditData[i].progress = auditData[i].progress.toFixed(1);

  }
  if(auditData.length && auditData.length !== 0) {
    auditState["totalProgress"] = (totalProgress)/(auditData.length);
  }

  renderTab = <AuditTable items={auditData}
              intlMessg={this.props.intlMessages} 
              timeZoneString = {headerTimeZone}
              totalAudits={this.props.totalAudits}
              sortHeaderState={this.props.auditHeaderSort} currentSortState={this.props.auditSortHeader} 
              sortHeaderOrder={this.props.auditHeaderSortOrder} currentHeaderOrder={this.props.auditSortHeaderState}
              refreshData={this.handlePageClick.bind(this)}
              setAuditFilter={this.props.auditFilterDetail} auditState={auditState}/>
  
  
  return (
    <div>
      <div>
        <div className="gor-Auditlist-table">
          <Spinner isLoading={this.props.auditSpinner} setSpinner={this.props.setAuditSpinner}/>
          {renderTab}
        </div>
      </div>
      <div className="gor-audit-paginate-wrap">
        <GorPaginate getPageDetail={this.handlePageClick.bind(this)} totalPage={this.props.totalPage}/>
      </div>  
    </div>
    );
}
};


function mapStateToProps(state, ownProps){
  return {
    orderFilter: state.sortHeaderState.auditFilter|| "",
    auditSortHeader: state.sortHeaderState.auditHeaderSort || "id" ,
    auditSortHeaderState: state.sortHeaderState.auditHeaderSortOrder || [],
    totalAudits: state.recieveAuditDetail.totalAudits || 0,
    auditSpinner: state.spinner.auditSpinner || false,
    auditDetail: state.recieveAuditDetail.auditDetail || [],
    totalPage: state.recieveAuditDetail.totalPage || 0,
    auditRefresh:state.recieveAuditDetail.auditRefresh || null,  
    intlMessages: state.intl.messages,
    auth_token: state.authLogin.auth_token,
    timeOffset: state.authLogin.timeOffset
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    auditFilterDetail: function(data){dispatch(auditFilterDetail(data))},
    auditHeaderSort: function(data){dispatch(auditHeaderSort(data))},
    auditHeaderSortOrder: function(data){dispatch(auditHeaderSortOrder(data))},
    setAuditSpinner: function(data){dispatch(setAuditSpinner(data))},
    getAuditData: function(data){ dispatch(getAuditData(data)); },
    getPageData: function(data){ dispatch(getPageData(data)); },
    setAuditRefresh: function(){dispatch(setAuditRefresh());}
  }
};

AuditTab.contextTypes ={
 intl:React.PropTypes.object.isRequired
}



export  default connect(mapStateToProps,mapDispatchToProps)(AuditTab);


