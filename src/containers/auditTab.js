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
import {AUDIT_RETRIEVE} from '../constants/appConstants';
import {BASE_URL, API_URL,ORDERS_URL,PAGE_SIZE_URL,PROTOCOL} from '../constants/configConstants';
import { FormattedTime ,FormattedRelative} from 'react-intl';


function processAuditData(data, nProps ) {
  let created  = nProps.context.intl.formatMessage({id:"auditdetail.created.status", defaultMessage: "Created"});
  let pending  = nProps.context.intl.formatMessage({id:"auditdetail.pending.status", defaultMessage: "Pending"});
  let progress  = nProps.context.intl.formatMessage({id:"auditdetail.progress.status", defaultMessage: "In Progress"});
  let completed  = nProps.context.intl.formatMessage({id:"auditdetail.completed.status", defaultMessage: "Completed"});
  let sku  = nProps.context.intl.formatMessage({id:"auditdetail.sku.prefix", defaultMessage: "SKU"});
  let location  = nProps.context.intl.formatMessage({id:"auditdetail.location.prefix", defaultMessage: "Location"});
  
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
      auditData.startTime = nProps.context.intl.formatRelative(data[i].start_request_time, {units:'day'}) +', '+
       nProps.context.intl.formatTime(data[i].start_request_time);
    }
    else {
      auditData.startTime = "--";
    }

    if(data[i].expected_quantity !== 0 && completed_quantity !== null) {
      auditData.progress = (data[i].completed_quantity)/(data[i].expected_quantity) * 100;
    }
    else {
      auditData.progress = 0; 
    }

    if(data[i].completion_time) {
      auditData.completedTime = nProps.context.intl.formatRelative(data[i].completion_time, {units:'day'}) +', '+
       nProps.context.intl.formatTime(data[i].completion_time);;
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
 componentWillReceiveProps(nextProps)
 {
  if(nextProps.auditRefresh)
  {
     var data = {};
     data.selected = 0;
     this.handlePageClick(data);
     nextProps.setAuditRefresh(false);
  }
 }
 componentDidMount() {
  var data = {};
  data.selected = 0;
  this.handlePageClick(data);
 }
 handlePageClick(data){
    var url;
    var makeDate = new Date();
    makeDate.setDate(makeDate.getDate() - 30)
    makeDate = makeDate.getFullYear()+'-'+makeDate.getMonth()+'-'+makeDate.getDate();  
 
    if(data.url === undefined) {
      url = AUDIT_URL + "/search?start_time="+makeDate+"&page="+(data.selected+1)+"&PAGE_SIZE=10";
    }


    else {
      url = data.url;
    }
   
    let paginationData={
              'url':url,
              'method':'GET',
              'cause': AUDIT_RETRIEVE,
              'token': this.props.auth_token,
              'contentType':'application/json'
          } 
         this.props.getPageData(paginationData);
 }

render(){
  var renderTab = <div/>;
  
    var auditData = processAuditData(this.props.auditDetail, this);
    renderTab = <AuditTable items={auditData}
    intlMessg={this.props.intlMessages} />
  
  
  return (
  
   <div>
   <div>
   <div className="gor-Auditlist-table" >
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
    auditDetail: state.recieveAuditDetail.auditDetail || [],
    totalPage: state.recieveAuditDetail.totalPage || 0,
    auditRefresh:state.recieveAuditDetail.auditRefresh || null,  
    intlMessages: state.intl.messages,
    auth_token: state.authLogin.auth_token
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    getAuditData: function(data){ dispatch(getAuditData(data)); },
    getPageData: function(data){ dispatch(getPageData(data)); },
    setAuditRefresh: function(){dispatch(setAuditRefresh());}
  }
};

AuditTab.contextTypes ={
 intl:React.PropTypes.object.isRequired
}



export  default connect(mapStateToProps,mapDispatchToProps)(AuditTab);


