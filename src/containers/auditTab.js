import React  from 'react';
import ReactDOM  from 'react-dom';
import UserDataTable from './userTab/userTabTable';
import Spinner from '../components/spinner/Spinner';
import { connect } from 'react-redux'; 
import {AUDIT_URL,FILTER_AUDIT_ID} from '../constants/configConstants';
import {getAuditData,setAuditRefresh} from '../actions/auditActions';
import AuditTable from './auditTab/auditTable';
import {getPageData} from '../actions/paginationAction';
import {AUDIT_RETRIEVE,GET,APP_JSON,GOR_COMPLETED_STATUS,LOCATION,AUDIT_PARAM_TYPE,AUDIT_PARAM_VALUE,SPECIFIC_LOCATION_ID,
  SPECIFIC_SKU_ID,AUDIT_TYPE,SKU,AUDIT_PENDING_APPROVAL,AUDIT_RESOLVED,AUDIT_CREATED, AUDIT_LINE_REJECTED,AUDIT_ISSUES_STATUS,
  AUDIT_BY_PDFA,AUDIT_TASK_ID,AUDIT_STATUS,sortAuditHead,sortOrder,ALL,ANY} from '../constants/frontEndConstants';
import {BASE_URL, API_URL,ORDERS_URL,PAGE_SIZE_URL,PROTOCOL,SEARCH_AUDIT_URL,GIVEN_PAGE,GIVEN_PAGE_SIZE} from '../constants/configConstants';
import {setAuditSpinner} from '../actions/auditActions';
import { defineMessages } from 'react-intl';
import {auditHeaderSortOrder, auditHeaderSort, auditFilterDetail} from '../actions/sortHeaderActions';
import {getDaysDiff} from '../utilities/getDaysDiff';
import {addDateOffSet} from '../utilities/processDate'; 
import GorPaginate from '../components/gorPaginate/gorPaginate';
import {filterApplied,auditfilterState,toggleAuditFilterApplied,auditFilterToggle,setFilterApplyFlag} from '../actions/filterAction';
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
  },
  auditRejected:{
    id:"auditdetail.auditRejected.prefix", 
    defaultMessage: "Rejected"
  },
  auditResolved:{
    id:"auditdetail.auditResolved.prefix", 
    defaultMessage: "Resolved"
  },
  auditReAudited:{
    id:"auditdetail.auditReaudited.prefix", 
    defaultMessage: "Re-audited"
  },


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

shouldComponentUpdate(nextProps) {
  var flag = false;
    if (nextProps.auditRefresh !== this.props.auditRefresh) {
      flag = flag || true;
    }

    else if((nextProps.auditDetail && !nextProps.auditDetail.length)){
      flag = flag || false;
    }

    else if(this.props.auditSortHeader !== nextProps.auditSortHeader || this.props.auditSpinner !== nextProps.auditSpinner) {
      flag = flag || true;
    }

    else if(this.props.auditToggleFilter !== nextProps.auditToggleFilter) {
      flag = flag || true;
    }

    return flag;
  }

componentDidMount() {
  var data = this.props.auditFilterState;
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
  let rejected = nProps.context.intl.formatMessage(messages.auditRejected);
  let resolved = nProps.context.intl.formatMessage(messages.auditResolved);
  let reAudited = nProps.context.intl.formatMessage(messages.auditReAudited);
  var timeOffset= nProps.props.timeOffset || "";
  var auditStatus = {"audit_created":created, "audit_pending":pending, "audit_waiting":pending, "audit_conflicting":pending, "audit_accepted":pending, "audit_started":progress, "audit_tasked":progress, "audit_aborted":completed, "audit_completed":completed, "audit_pending_approval":pendingApp, "audit_resolved":resolved, audit_rejected:rejected,audit_reaudited:reAudited};
  var statusClass = {"audit_created":"pending", "audit_pending":"pending", "audit_waiting":"pending", "audit_conflicting":"pending", "audit_accepted":"pending", "audit_started":"progress", "audit_tasked":"progress", "audit_aborted":"completed", "audit_completed":"completed", "audit_pending_approval":"breached", "audit_resolved":"progress", audit_rejected:"breached",audit_reaudited:"completed"};
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

    if(data[i].audit_param_type !== AUDIT_BY_PDFA) {
      auditData.auditType = data[i].audit_param_type;
      if(data[i].audit_param_value) {
        auditData.auditValue = data[i].audit_param_value;
        auditData.auditTypeValue = auditType[data[i].audit_param_type] + "-" + data[i].audit_param_value;
      }
    }

    else if(data[i].audit_param_type === AUDIT_BY_PDFA){
      auditData.auditType = data[i].audit_param_type;
      if(data[i].audit_param_value) {
        auditData.auditValue = data[i].audit_param_value.product_sku;
        auditData.auditTypeValue = auditType[SKU] + "-" + data[i].audit_param_value.product_sku;
        auditData.pdfaValues = data[i].audit_param_value.pdfa_values;
      }
    }

    if(data[i].audit_status) {
      if(auditData.statusPriority === undefined) {
        auditData.statusPriority = 1;
      }
      auditData.status = auditStatus[data[i].audit_status]; 
      auditData.statusClass = statusClass[data[i].audit_status];
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

      if(data[i].audit_status === AUDIT_RESOLVED || data[i].audit_status === AUDIT_LINE_REJECTED || data[i].audit_status==="audit_reaudited") {
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
      if(data[i].audit_status === "audit_completed") {
       auditData.progress = 100; 
      }
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

_mappingString(selectvalue){
    switch(selectvalue){
                    case "sku":
                    return SPECIFIC_SKU_ID;
                    case "location":
                    return SPECIFIC_LOCATION_ID;
                    default:
                    return "any";
                };
}

handlePageClick(data){
  var url, appendSortUrl = "",appendTextFilterUrl="", makeDate,inc=0,value=[],paramValue="",selectedAuditType="";
  var currentDate = new Date();
  var filterApplied = false;
  var skuText="",arr=[],selectvalue;
  makeDate = addDateOffSet(currentDate,-30);

  if (!data) {
      /**
       * After clearing the applied filter,
       * It'll set the default state to the filters.
       */
      data={}
      this.props.auditfilterState({tokenSelected: {"AUDIT TYPE":[ANY], "STATUS":[ALL]}, searchQuery: {},defaultToken: {"AUDIT TYPE":[ANY], "STATUS":[ALL]}})
      this.props.toggleAuditFilterApplied(false)
      this.props.auditFilterToggle(false)

  }
//If user select both we are making it Any for backend support
  if(data.searchQuery && data.tokenSelected[AUDIT_TYPE]) {
   selectvalue=(data.tokenSelected[AUDIT_TYPE].length===2)?ANY:data.tokenSelected[AUDIT_TYPE][0];
    skuText=AUDIT_PARAM_TYPE+selectvalue;
    selectedAuditType=this._mappingString(selectvalue);

//Pushing the audit type into array to make it generic
   for(let propt in data.searchQuery){
if(selectedAuditType==='any'){
(propt!==AUDIT_TASK_ID && data.searchQuery[propt]!=="")?value.push(data.searchQuery[propt]):'';
}
else
{
  (data.searchQuery[propt]!=="" && propt==selectedAuditType)?value.push(data.searchQuery[propt]):'';
}
      
      }
//Formatting the param value for single and multiple type       
      if(value.length)
      {
      paramValue=(value.length>1 || selectvalue===ANY)?"['"+value.join("','")+"']":"'"+value[0]+"'";
        skuText=skuText+AUDIT_PARAM_VALUE+paramValue;
      }
  }
//formating the audit status 
  if(data.tokenSelected && data.tokenSelected["STATUS"][0]!==ALL) {
    let statusToken=data.tokenSelected["STATUS"];
    skuText=skuText+AUDIT_STATUS+"['"+statusToken.join("','")+"']";
  }

   if(data.searchQuery && data.searchQuery[AUDIT_TASK_ID]) {
    appendTextFilterUrl = FILTER_AUDIT_ID + data.searchQuery[AUDIT_TASK_ID];
    data.selected = 1;
    filterApplied = true;
  }


  if(data.url === undefined) {
    data.selected = data.selected?data.selected:1;
    if(data.columnKey && data.sortDir) {
      appendSortUrl = sortAuditHead[data.columnKey] + sortOrder[data.sortDir]; 
    }
    url = SEARCH_AUDIT_URL+makeDate+GIVEN_PAGE+(data.selected)+GIVEN_PAGE_SIZE + appendSortUrl+skuText;
  }
  else {
    url = data.url;
  }
  this.setState({selected_page:data.selected});
  url = url + appendTextFilterUrl;

  let paginationData={
    'url':url,
    'method':GET,
    'cause': AUDIT_RETRIEVE,
    'token': this.props.auth_token,
    'contentType':APP_JSON
  } 
  this.props.setAuditSpinner(true);
  this.props.filterApplied(filterApplied);
  this.props.getPageData(paginationData);
}



render(){
  var  emptyResponse=this.props.emptyResponse;
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
  var auditState = {"auditCompleted":0 ,"skuAudit": 0, "locationAudit":0, "totalProgress":0, auditIssue:0}; 
  for (var i = auditData.length - 1; i >= 0; i--) {
    if(auditData[i].status === GOR_COMPLETED_STATUS) {
      auditState["auditCompleted"]++;
    }

    if(auditData[i].status === AUDIT_ISSUES_STATUS) {
      auditState["auditIssue"]++;
    }
    if(auditData[i].auditType === SKU || auditData[i].auditType === AUDIT_BY_PDFA) {
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
              setAuditFilter={this.props.auditFilterDetail} auditState={auditState}
              setFilter={this.props.auditFilterToggle} auditToggleFilter={this.props.auditToggleFilter}
              isFilterApplied={this.props.isFilterApplied}  auditFilterStatus={this.props.auditFilterStatus}
              responseFlag={this.props.auditSpinner}      filterApplyFlag={this.props.filterApplyFlag}
              emptyResponse={emptyResponse}
              setFilterApplyFlag={this.props.setFilterApplyFlag}/>



  
  
  
  return (
    <div>
      <div>
        <div className="gor-Auditlist-table">
          {!this.props.auditToggleFilter?<Spinner isLoading={this.props.auditSpinner} setSpinner={this.props.setAuditSpinner}/>:""}
          {renderTab}
        </div>
      </div>
      {auditData.length?<div className="gor-audit-paginate-wrap">
        <GorPaginate getPageDetail={this.handlePageClick.bind(this)} totalPage={this.props.totalPage}/>
      </div>:""} 
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
    emptyResponse: state.recieveAuditDetail.emptyResponse || false,
    totalPage: state.recieveAuditDetail.totalPage || 0,
    auditRefresh:state.recieveAuditDetail.auditRefresh || false,  
    intlMessages: state.intl.messages,
    auth_token: state.authLogin.auth_token,
    timeOffset: state.authLogin.timeOffset,
    auditToggleFilter: state.filterInfo.auditToggleFilter || false,
    isFilterApplied: state.filterInfo.isFilterApplied || false,
    auditFilterStatus:state.filterInfo.auditFilterStatus|| false,
    auditFilterState: state.filterInfo.auditFilterState ||{},
    filterApplyFlag:state.filterInfo.filterApplyFlag|| false
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
    setAuditRefresh: function(){dispatch(setAuditRefresh());},
    auditFilterToggle: function(data){dispatch(auditFilterToggle(data));},
    filterApplied: function(data){dispatch(filterApplied(data));},
    setFilterApplyFlag: function (data) {dispatch(setFilterApplyFlag(data));},
    auditfilterState: function (data) {dispatch(auditfilterState(data));},
    toggleAuditFilterApplied: function (data) {dispatch(toggleAuditFilterApplied(data));}
  }
};

AuditTab.contextTypes ={
 intl:React.PropTypes.object.isRequired
}
AuditTab.PropTypes={
orderFilter: React.PropTypes.string,
auditSortHeader: React.PropTypes.string,
auditSortHeaderState:React.PropTypes.array,
totalAudits: React.PropTypes.number,
auditSpinner: React.PropTypes.bool,
auditDetail: React.PropTypes.array,
totalPage:React.PropTypes.number,
auditRefresh:React.PropTypes.bool,
intlMessages: React.PropTypes.string,
auth_token: React.PropTypes.object,
timeOffset: React.PropTypes.number,
auditToggleFilter: React.PropTypes.bool,
isFilterApplied: React.PropTypes.bool,
auditFilterStatus:React.PropTypes.bool,
auditFilterState:React.PropTypes.object,
auditFilterDetail:React.PropTypes.func,
auditHeaderSort:React.PropTypes.func,
auditHeaderSortOrder:React.PropTypes.func,
setAuditSpinner:React.PropTypes.func,
getAuditData: React.PropTypes.func,
getPageData: React.PropTypes.func,
setAuditRefresh:React.PropTypes.func,
auditFilterToggle:React.PropTypes.func,
filterApplied: React.PropTypes.func,
setFilterApplyFlag:React.PropTypes.func,
filterApplyFlag:React.PropTypes.bool,
toggleAuditFilterApplied:React.PropTypes.func
}



export  default connect(mapStateToProps,mapDispatchToProps)(AuditTab);


