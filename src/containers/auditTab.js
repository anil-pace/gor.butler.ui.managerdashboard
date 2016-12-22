import React  from 'react';
import ReactDOM  from 'react-dom';
import UserDataTable from './userTab/userTabTable';
import Spinner from '../components/spinner/Spinner';
import { connect } from 'react-redux'; 
import {AUDIT_URL} from '../constants/configConstants';
import {getAuditData,setAuditRefresh} from '../actions/auditActions';
import AuditTable from './auditTab/auditTable';
import ReactPaginate from 'react-paginate';
import {getPageData} from '../actions/paginationAction';
import {AUDIT_RETRIEVE,GET,APP_JSON} from '../constants/frontEndConstants';
import {BASE_URL, API_URL,ORDERS_URL,PAGE_SIZE_URL,PROTOCOL,SEARCH_AUDIT_URL,GIVEN_PAGE,GIVEN_PAGE_SIZE} from '../constants/configConstants';
import {setAuditSpinner} from '../actions/auditActions';
import { defineMessages } from 'react-intl';

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
  data.selected = 0;
  this.handlePageClick(data);
}
_processAuditData(data,nProps){
  var nProps = this,
  data = nProps.props.auditDetail;
  let created  = nProps.context.intl.formatMessage(messages.auditCreatedStatus);
  let pending  = nProps.context.intl.formatMessage(messages.auditPendingStatus);
  let progress  = nProps.context.intl.formatMessage(messages.auditInProgressStatus);
  let completed  = nProps.context.intl.formatMessage(messages.auditCompletedStatus);
  let sku  = nProps.context.intl.formatMessage(messages.auditSKU);
  let location  = nProps.context.intl.formatMessage(messages.auditLocation);


  var timeOffset= nProps.props.timeOffset || "";

  
  var priorityStatus = {"audit_created":2, "audit_pending":3, "audit_waiting":3, "audit_conflicting":3, "audit_started":1, "audit_tasked":1, "audit_aborted":4, "audit_completed":4, "audit_pending_approval":4};
  var auditStatus = {"audit_created":created, "audit_pending":pending, "audit_waiting":pending, "audit_conflicting":pending, "audit_started":progress, "audit_tasked":progress, "audit_aborted":completed, "audit_completed":completed, "audit_pending_approval":completed};
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
      auditData.statusPriority = priorityStatus[data[i].audit_status];
      if(auditData.statusPriority === undefined) {
        auditData.statusPriority = 1;
      }
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
      auditData.startTime = nProps.context.intl.formatDate(data[i].start_request_time,
        {timeZone:timeOffset,
          year:'numeric',
          month:'short',
          day:'2-digit',
          hour:"2-digit",
          minute:"2-digit",
          hour12: false
        })
    }
    else {
      auditData.startTime = "--";
    }

    if( data[i].expected_quantity && data[i].completed_quantity ) {
      auditData.progress = (data[i].completed_quantity)/(data[i].expected_quantity);
    }

    else {
      auditData.progress = 0; //needs to be done
    }

    if(data[i].completion_time) {
      auditData.completedTime = nProps.context.intl.formatDate(data[i].completion_time,
        {timeZone:timeOffset,
          year:'numeric',
          month:'short',
          day:'2-digit',
          hour:"2-digit",
          minute:"2-digit"
        })
    }
    else {
      auditData.completedTime = "--";
    }
    auditDetails.push(auditData);
    auditData = {};
  }
  
  return auditDetails;
}
handlePageClick(data){
  var url;
  var makeDate = new Date();
  this.setState({selected_page:data.selected});
  makeDate.setDate(makeDate.getDate() - 30)
  makeDate = makeDate.getFullYear()+'-'+makeDate.getMonth()+'-'+makeDate.getDate();  

  if(data.url === undefined) {
    url = SEARCH_AUDIT_URL+makeDate+GIVEN_PAGE+(data.selected+1)+GIVEN_PAGE_SIZE;
  }


  else {
    url = data.url;
  }

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
    }));
  
  /*Extracting Time zone string for the specified time zone*/
  headerTimeZone = headerTimeZone.substr(5, headerTimeZone.length);
  
  var auditData = this._processAuditData();
  renderTab = <AuditTable items={auditData}
  intlMessg={this.props.intlMessages} timeZoneString = {headerTimeZone}/>
  
  
  return (
    <div>

    <div>

    <div className="gor-Auditlist-table">
    <Spinner isLoading={this.props.auditSpinner} setSpinner={this.props.setAuditSpinner}/>
    {renderTab}

    </div>
    </div>
    <div id={"react-paginate"}>
    <ReactPaginate previousLabel={"<<"}
    nextLabel={">>"}
    breakClassName={"break-me"}
    pageNum={this.props.totalPage}
    marginPagesDisplayed={1}
    pageRangeDisplayed={1}
    clickCallback={this.handlePageClick.bind(this)}
    containerClassName={"pagination"}
    subContainerClassName={"pages pagination"}
    activeClassName={"active"} />
    </div>   
    </div>
    );
}
};


function mapStateToProps(state, ownProps){
  return {
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


