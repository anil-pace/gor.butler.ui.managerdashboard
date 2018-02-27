import React  from 'react';
import Spinner from '../components/spinner/Spinner';
import {connect} from 'react-redux';
import { FILTER_AUDIT_ID,CANCEL_AUDIT_URL} from '../constants/configConstants';
import {getAuditData, setAuditRefresh,auditListRefreshed,setTextBoxStatus,cancelAudit,setAuditQuery} from '../actions/auditActions';
import AuditTable from './auditListingTab';
import {getPageData} from '../actions/paginationAction';
import {userRequest} from '../actions/userActions';
import StartAudit from './auditTab/startAudit';
 import {GTableHeader,GTableHeaderCell} from '../components/gor-table-component/tableHeader';
import {GTable} from '../components/gor-table-component/index'
 import ViewDetailsAudit from '../containers/auditTab/viewDetailsAudit';
 import AuditStart from '../containers/auditTab/auditStart';
 import ActionDropDown from '../components/actionDropDown/actionDropDown';

import {
    AUDIT_RETRIEVE,
    GET,PUT,
    APP_JSON,
    GOR_COMPLETED_STATUS,
    GOR_IN_PROGRESS_STATUS,
    LOCATION,
    AUDIT_PARAM_TYPE,
    AUDIT_PARAM_VALUE,
    SPECIFIC_LOCATION_ID,
    SPECIFIC_SKU_ID,
    AUDIT_TYPE,
    SKU,
    TIMER_ID,
    AUDIT_PENDING_APPROVAL,
    AUDIT_RESOLVED,
    AUDIT_CREATED,
    AUDIT_LINE_REJECTED,
    AUDIT_ISSUES_STATUS,
    AUDIT_BY_PDFA,
    AUDIT_BY_LOCATION,
    AUDIT_BY_SKU,
    AUDIT_TASK_ID,
    AUDIT_STATUS,
    sortAuditHead,
    sortOrder,
    ALL,FILTER_PPS_ID,AUDIT_START_TIME,AUDIT_END_TIME,AUDIT_CREATEDBY,
    ANY,WS_ONSEND,toggleOrder,CANCEL_AUDIT,SYSTEM_GENERATED
} from '../constants/frontEndConstants';
import {
    SEARCH_AUDIT_URL,
    GIVEN_PAGE,
    GIVEN_PAGE_SIZE
} from '../constants/configConstants';
import {setAuditSpinner} from '../actions/auditActions';
import {defineMessages} from 'react-intl';
import {auditHeaderSortOrder, auditHeaderSort, auditFilterDetail, setCheckedAudit} from '../actions/sortHeaderActions';
import {getDaysDiff} from '../utilities/getDaysDiff';
import {addDateOffSet} from '../utilities/processDate';
import GorPaginateV2 from '../components/gorPaginate/gorPaginateV2';
import {showTableFilter, filterApplied, auditfilterState, toggleAuditFilter} from '../actions/filterAction';
import {hashHistory} from 'react-router'
import {updateSubscriptionPacket,setWsAction} from './../actions/socketActions'
import {wsOverviewData} from './../constants/initData.js';
import AuditFilter from './auditTab/auditFilter';
import {FormattedMessage} from 'react-intl';
import CreateAudit from './auditTab/createAudit';
import {modal} from 'react-redux-modal';
import FilterSummary from './../components/tableFilter/filterSummary'
import {mappingArray} from '../utilities/utils';
//Mesages for internationalization
const messages=defineMessages({
    auditCreatedStatus: {
        id: "auditdetail.created.status",
        defaultMessage: "Created"
    },
    auditPendingStatus: {
        id: "auditdetail.pending.status",
        defaultMessage: "Pending"
    },
    auditInProgressStatus: {
        id: "auditdetail.progress.status",
        defaultMessage: "In Progress"
    },
    auditCompletedStatus: {
        id: "auditdetail.completed.status",
        defaultMessage: "Audited"
    },
    auditSKU: {
        id: "auditdetail.sku.prefix",
        defaultMessage: "SKU"
    },
    auditLocation: {
        id: "auditdetail.location.prefix",
        defaultMessage: "Location"
    },
    auditPendingApp: {
        id: "auditdetail.auditPendingApp.prefix",
        defaultMessage: "Issues found"
    },
    auditRejected: {
        id: "auditdetail.auditRejected.prefix",
        defaultMessage: "Rejected"
    },
    auditResolved: {
        id: "auditdetail.auditResolved.prefix",
        defaultMessage: "Resolved"
    },
    auditReAudited: {
        id: "auditdetail.auditReaudited.prefix",
        defaultMessage: "Re-audited"
    },
    auditCancelled: {
        id: "auditdetail.auditCancelled.prefix",
        defaultMessage: "Cancelled"
    },
    auditCancellingText: {
        id: "auditdetail.auditCancellingText.text",
        defaultMessage: "Cancelling..."
    },


});


class AuditTab extends React.Component {
    
    constructor(props) {
        //var timerId=0;
        super(props);
        this.state={selected_page: 1,query:null,auditListRefreshed:null,timerId:0};
          this._handelClick = this._handelClick.bind(this);

    }


    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
         this.props.auditListRefreshed()
     }
    componentWillReceiveProps(nextProps) {
        //let me=this;
        if (nextProps.socketAuthorized && nextProps.auditListRefreshed && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)) || nextProps.auditRefresh!==this.props.auditRefresh)) { //Changes to refresh the table after creating audit
            this.props.showFilter;
            let obj={},selectedToken;
            selectedToken=(nextProps.location.query.auditType)?(nextProps.location.query.auditType).constructor.name!=='Array'?[nextProps.location.query.auditType]:nextProps.location.query.auditType:[];
            obj.name=mappingArray(selectedToken);
            this.props.setTextBoxStatus(obj);
            this.setState({query: JSON.parse(JSON.stringify(nextProps.location.query))});
            this.setState({auditListRefreshed:nextProps.auditListRefreshed});
            this._subscribeData();
            
            this._refreshList(nextProps.location.query,nextProps.auditSortHeaderState.colSortDirs);
        
//         (function polling(){
// let timerId=0;
//              timerId = setInterval(function(){
//                 me._refreshList(nextProps.location.query,nextProps.auditSortHeaderState.colSortDirs); 
//         }, 3000);
//         me.setState({timerId:timerId});
//         })();

//clearInterval(timerId);




        }
    }
    _handelClick(field) {

  if(field.target.value=='viewdetails'){
    this.viewAuditDetails();
  }else if(field.target.value=='mannualassignpps'){
    this.startAudit();
  }

} 

startAudit() {
  var  auditId=this.props.checkedAudit;
  modal.add(AuditStart, {
    title: '',
    size: 'large',
                        closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
                        hideCloseButton: true, // (optional) if you don't wanna show the top right close button
                        auditID: auditId
                        //.. all what you put in here you will get access in the modal props ;),
                      });
} 

    _subscribeData() {
        let updatedWsSubscription=this.props.wsSubscriptionData;
        this.props.initDataSentCall(updatedWsSubscription["default"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
    }
  //   _refresh(data){
  //       if(this.props.noResultFound){
  //           hashHistory.push({pathname: "/audit", query: this.props.successQuery})
  //       }else{
  //           this._refreshList(this.props.location.query,data);
  //       }

  // }
   viewAuditDetails() {
  modal.add(ViewDetailsAudit, {
    title: '',
    size: 'large',
                    closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
                    hideCloseButton: true // (optional) if you don't wanna show the top right close button
                    //.. all what you put in here you will get access in the modal props ;),
                  });
}
    /**
     * The method will update the subscription packet
     * and will fetch the data from the socket.
     * @private
     */
     _refreshList(query,auditParam) {
        var auditbyUrl;
        let _query_params=[], _auditParamValue=[], _auditStatuses=[],_auditCretedBy=[],url="";
        if(query.fromDate){
            url=SEARCH_AUDIT_URL+AUDIT_START_TIME+"="+query.fromDate;
        }else{
            url=SEARCH_AUDIT_URL +AUDIT_START_TIME+"="+ addDateOffSet(new Date(), -30)
        }
         if(query.toDate)
        {
            _query_params.push([AUDIT_END_TIME, query.toDate].join("="))
        }
        
        if (query.auditType && query.auditType.constructor !== Array) {
            query.auditType=[query.auditType]
        }

        if (query.auditType && query.auditType.length=== 1) {
            _query_params.push([AUDIT_PARAM_TYPE, query.auditType[0]].join("="))
         }
       
        else {
            _query_params.push([AUDIT_PARAM_TYPE, ANY].join("="))
        }

        if (query.skuId || query.locationId) {

            if (query.skuId) {
                _auditParamValue.push(query.skuId)
            }
            if (query.locationId) {
                _auditParamValue.push(query.locationId)
            }

            _query_params.push([AUDIT_PARAM_VALUE, _auditParamValue.join("','")].join("="))
        }

        if (query.status) {
            let _flattened_statuses=[]
            query.status=query.status.constructor===Array?query.status:[query.status]
            query.status.forEach(function (status) {
                _flattened_statuses.push(status.split("__"))
            })
            _auditStatuses=[].concat.apply([], _flattened_statuses)
            _query_params.push([AUDIT_STATUS,"['"+_auditStatuses.join("','")+"']" ].join("="))
        }
        if (query.createdBy) {
            let _flattened_createdBy=[]
            query.createdBy=query.createdBy.constructor===Array?query.createdBy:[query.createdBy]
            query.createdBy.forEach(function (createdBy) {
                _flattened_createdBy.push(createdBy.split("__"))
            })
            _auditCretedBy=[].concat.apply([], _flattened_createdBy)
            _query_params.push([AUDIT_CREATEDBY,"['"+_auditCretedBy.join("','")+"']" ].join("="))
        }
        if (query.taskId) {
            _query_params.push([FILTER_AUDIT_ID, query.taskId].join("="))
        }
        if (query.ppsId) {
            _query_params.push([FILTER_PPS_ID, query.ppsId].join("="))
        }

        _query_params.push([GIVEN_PAGE,query.page||1].join("="))
        _query_params.push([GIVEN_PAGE_SIZE,20].join("="))

           if(auditParam && auditParam.sortDir){
            _query_params.push(['order',toggleOrder(auditParam.sortDir)].join("="));
            auditbyUrl=sortAuditHead[auditParam["columnKey"]];

        }
        else
        {
            if (auditParam){
                _query_params.push(['order',toggleOrder(auditParam[Object.keys(auditParam)])].join("="));
                auditbyUrl=sortAuditHead[Object.keys(auditParam)[0]];
            }else{
                auditbyUrl="";
            }
        }

        url=[url,_query_params.join("&")].join("&")
        url+=auditbyUrl;

        if (Object.keys(query).filter(function(el){return el!=='page'}).length !== 0) {
            this.props.toggleAuditFilter(true);
            this.props.filterApplied(true);
        } else {
            this.props.toggleAuditFilter(false);
            this.props.filterApplied(false);
        }

        let paginationData={
            'url': url,
            'method': GET,
            'cause': AUDIT_RETRIEVE,
            'token': this.props.auth_token,
            'contentType': APP_JSON
        }
        this.props.setAuditSpinner(true);
        this.props.auditfilterState({
            tokenSelected: {"AUDIT TYPE": query.auditType ? query.auditType.constructor=== Array ? query.auditType : [query.auditType] : [ANY],
            "STATUS": query.status ? query.status.constructor=== Array ? query.status : [query.status] : [ALL],
            "CREATED BY": query.createdBy ? query.createdBy.constructor=== Array ? query.createdBy : [query.createdBy] : [ALL]},
            searchQuery: {
                'SPECIFIC SKU ID':query.skuId||'',
                'SPECIFIC LOCATION ID':query.locationId||'',
                'AUDIT TASK ID':query.taskId||'',
                'SPECIFIC PPS ID':query.ppsId||'',
                'FROM DATE':query.fromDate||'',
                'TO DATE':query.toDate||''
            },
            "PAGE": query.page || 1,
            defaultToken: {"AUDIT TYPE": [ANY], "STATUS": [ALL],"CREATED BY":[ALL]}
        })
        this.props.setAuditQuery({query:query})
        this.props.getPageData(paginationData);
    }
    /**
     *
     */
     _clearFilter() {
        hashHistory.push({pathname: "/auditlisting", query: {}})
    }


    _cancelAudit(auditId) {
        let url = CANCEL_AUDIT_URL + auditId
        let cancelAuditData = {
            'url': url,
            'method': PUT,
            'cause': CANCEL_AUDIT,
            'token': this.props.auth_token,
            'contentType': APP_JSON
        }
        this.props.setAuditSpinner(true);
        this.props.cancelAudit(cancelAuditData)
    }


    _processAuditData(data, nProps) {
        nProps=this;
        data=nProps.props.auditDetail;
        let created=nProps.context.intl.formatMessage(messages.auditCreatedStatus);
        let pending=nProps.context.intl.formatMessage(messages.auditPendingStatus);
        let progress=nProps.context.intl.formatMessage(messages.auditInProgressStatus);
        let completed=nProps.context.intl.formatMessage(messages.auditCompletedStatus);
        let pendingApp=nProps.context.intl.formatMessage(messages.auditPendingApp);
        let sku=nProps.context.intl.formatMessage(messages.auditSKU);
        let location=nProps.context.intl.formatMessage(messages.auditLocation);
        let rejected=nProps.context.intl.formatMessage(messages.auditRejected);
        let resolved=nProps.context.intl.formatMessage(messages.auditResolved);
        let reAudited=nProps.context.intl.formatMessage(messages.auditReAudited);
        let auditCancelled=nProps.context.intl.formatMessage(messages.auditCancelled);
        var timeOffset=nProps.props.timeOffset || "";
        var checkedAudit = nProps.props.checkedAudit || {};
        
        var auditType={"sku": sku, "location": location};
        var auditDetails=[], auditData={};
        var i,limit=data.length;
        for (i=0;i<=limit - 1; i++) {
            auditData.id=data[i].audit_id;
            if (data[i].audit_name) {
                auditData.audit_name=data[i].audit_name;
            }
            else {
                auditData.audit_name="";
            }
           auditData.auditBased=data[i].audit_type?data[i].audit_type:"";
            auditData.pps_id=data[i].audit_status=='audit_created'?"":(data[i].pps_id.length==1?"PPS "+data[i].pps_id:"Multi PPS");

            
            if (data[i].audit_status=="audit_created") {
                auditData.status="Not yet Started";
                auditData.progressBarflag=false;
  } else if(data[i].audit_status=="audit_cancelled"){
                auditData.status="Cancelled";
                auditData.progressBarflag=false;
  }
 
   else if(data[i].audit_button_data.audit_cancel_button==='enable'){
                auditData.status=auditCancelled;
                auditData.progressBarflag=false;
  }

    else if(data[i].audit_status=="audit_paused"){
                auditData.status="Paused";
                auditData.progressBarflag=false;
  }

  else  if(data[i].start_actual_time && data[i].completion_time){
        auditData.status="Completed";
        auditData.progressBarflag=false;
    }
    else if(data[i].audit_progress.completed || data[i].audit_progress.total){
        auditData.status=data[i].audit_progress.completed+" completed out of "+data[i].audit_progress.total;
        auditData.progressBarflag=true;
    }
    auditData.progressStatus=data[i].audit_progress;


                if (data[i].audit_button_data && data[i].audit_button_data.audit_start_button==="enable") {
                    auditData.startAudit=true;
                }

                else {
                    auditData.startAudit=false;

                }

                if (data[i].audit_button_data && data[i].audit_button_data.audit_resolve_button==="enable") {
                    auditData.resolveAudit=true;
                }

                else {
                    auditData.resolveAudit=false;
                }

//Create time need to be add
        if(data[i].start_actual_time){

            if (getDaysDiff(data[i].start_actual_time) < 2) {
                    auditData.startTime=nProps.context.intl.formatRelative(data[i].start_actual_time, {
                        timeZone: timeOffset,
                        units: 'day'
                    }) +
                    ", " + nProps.context.intl.formatTime(data[i].start_actual_time, {
                        timeZone: timeOffset,
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                    });
                }
                else {
                    auditData.startTime=nProps.context.intl.formatDate(data[i].start_actual_time,
                    {
                        timeZone: timeOffset,
                        month: 'short',
                        day: '2-digit',
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    });
                }


                if (data[i].completion_time) {

                if ((getDaysDiff(data[i].completion_time)==getDaysDiff(data[i].start_actual_time))) {
                    auditData.endTime=nProps.context.intl.formatTime(data[i].completion_time, {
                        timeZone: timeOffset,
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                    });
                }
                else {
                    auditData.endTime=nProps.context.intl.formatDate(data[i].completion_time,
                    {
                        timeZone: timeOffset,
                        month: 'short',
                        day: '2-digit',
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    });
                }
            }
            else
                auditData.endTime=""
        }
        var endTIme=(auditData.endTime!=="")?" - "+auditData.endTime:"";
        auditData.totalTime=(auditData.startTime?auditData.startTime:"")+(auditData.endTime?endTIme:"");

            if (data[i].completion_time) {
                if (getDaysDiff(data[i].completion_time) < 2) {
                    auditData.completedTime=nProps.context.intl.formatRelative(data[i].completion_time, {
                        timeZone: timeOffset,
                        units: 'day'
                    }) +
                    ", " + nProps.context.intl.formatTime(data[i].completion_time, {
                        timeZone: timeOffset,
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                    });
                }
                else {
                    auditData.completedTime=nProps.context.intl.formatDate(data[i].completion_time,
                        {
                            timeZone: timeOffset,
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12:false
                        });
                }
            }
            else {
                auditData.completedTime="--";
            }
            auditData.resolved=data[i].resolved;
            if(data[i].audit_button_data.audit_resolve_button=='disable'){
                auditData.lineResolveState=data[i].unresolved<=0?(data[i].unresolved+" lines to be resolved"):"";
            }
            else if(data[i].audit_button_data.audit_reaudit_button=='enable'){
                auditData.lineResolveState=data[i].unresolved>0?(data[i].unresolved+" lines to be re-audited"):"";
            }

            
            auditData.button=data[i].audit_button_data;
            

            auditData.startButton=data[i].audit_button_data.audit_start_button==='enable'?true:false;
            auditData.resolveButton=data[i].audit_button_data.audit_resolve_button==='enable'?true:false;
            auditData.reauditButton=data[i].audit_button_data.audit_reaudit_button==='enable'?true:false;
            auditData.cancelButton=data[i].audit_button_data.audit_cancel_button==='enable'?true:false;
            auditData.deleteButton=data[i].audit_button_data.audit_delete_button==='enable'?true:false;
            auditData.duplicateButton=data[i].audit_button_data.audit_duplicate_button==='enable'?true:false;
            auditData.pauseButton=(data[i].audit_progress.completed || data[i].audit_progress.total)?true:false;
            auditData.detailsButton=true;
           
            auditData.system_created_audit=data[i].audit_created_by===SYSTEM_GENERATED?true:data[i].audit_created_by;
           
            auditDetails.push(auditData);
            auditData={};
        }
        return auditDetails;
    }

     headerCheckChange(e){
    let checkedAudit=this.props.auditDetail;
   let arr=[];// this.props.checkedAudit
   if(e.currentTarget.checked)
   {
    for(let i=0,len=checkedAudit.length;i<len;i++){
        if(checkedAudit[i].audit_button_data.audit_start_button==='enable')
        arr.push(checkedAudit[i].audit_id)
    }
    this.props.setCheckedAudit(arr);
   }
   else{
    this.props.setCheckedAudit([]);
   }
 //  let a= arr.indexOf(e.currentTarget.id);
 //  (a==-1)?arr.push(e.currentTarget.id): arr.splice(a,1);
 // console.log(e.currentTarget.checked);
 //  this.props.setCheckedAudit(arr);
 //   console.log((this.props.auditDetail).length);

 }

    _mappingString(selectvalue) {
        switch (selectvalue) {
            case "sku":
            return SPECIFIC_SKU_ID;
            case "location":
            return SPECIFIC_LOCATION_ID;
            default:
            return "any";
        }
        ;
    }

//     handlePageClick(data) {
//         var url, appendTextFilterUrl="", makeDate, inc=0, value=[], paramValue="",
//         selectedAuditType="",_queryParams=[];
//         var currentDate=new Date();
//         var filterApplied=false;
//         var skuText="", arr=[], selectvalue;
//         makeDate=addDateOffSet(currentDate, -30);

//         if (!data) {
//             /**
//              * After clearing the applied filter,
//              * It'll set the default state to the filters.
//              */
//              data={}
//              this.props.auditfilterState({
//                 tokenSelected: {"AUDIT TYPE": [ANY], "STATUS": [ALL],"CREATED BY":[ALL]},
//                 searchQuery: {},
//                 defaultToken: {"AUDIT TYPE": [ANY], "STATUS": [ALL],"CREATED BY":[ALL]}
//             })
//              this.props.toggleAuditFilter(false)
//              this.props.showTableFilter(false)

//          }
// //If user select both we are making it Any for backend support
// if (data.searchQuery && data.tokenSelected[AUDIT_TYPE]) {
//     selectvalue=(data.tokenSelected[AUDIT_TYPE].length=== 2) ? ANY : data.tokenSelected[AUDIT_TYPE][0];
//     skuText=AUDIT_PARAM_TYPE + selectvalue;
//     _queryParams.push([AUDIT_PARAM_TYPE,selectvalue].join("="))
//     selectedAuditType=this._mappingString(selectvalue);

// //Pushing the audit type into array to make it generic
// for (let propt in data.searchQuery) {
//     if (selectedAuditType=== 'any') {
//         (propt !== AUDIT_TASK_ID && data.searchQuery[propt] !== "") ? value.push(data.searchQuery[propt]) : '';
//     }
//     else {
//         (data.searchQuery[propt] !== "" && propt== selectedAuditType) ? value.push(data.searchQuery[propt]) : '';
//     }

// }
// //Formatting the param value for single and multiple type       
// if (value.length) {
//     paramValue=(value.length > 1 || selectvalue=== ANY) ? "['" + value.join("','") + "']" : "'" + value[0] + "'";
//     _queryParams.push([AUDIT_PARAM_VALUE, "['"+value.join("','")+"']"].join("="))
//     skuText=skuText + AUDIT_PARAM_VALUE + paramValue;
// }
// }
// //formating the audit status 
// if (data.tokenSelected && data.tokenSelected["STATUS"][0] !== ALL) {
//     let statusToken=data.tokenSelected["STATUS"];
//     skuText=skuText + AUDIT_STATUS + "['" + statusToken.join("','") + "']";
//     _queryParams.push([AUDIT_STATUS,"['"+statusToken.join("','")+"']" ].join("="))
// }

// if (data.searchQuery && data.searchQuery[AUDIT_TASK_ID]) {
//     appendTextFilterUrl=FILTER_AUDIT_ID + data.searchQuery[AUDIT_TASK_ID];
//     _queryParams.push([FILTER_AUDIT_ID, data.searchQuery[AUDIT_TASK_ID]].join("="))
//     data.selected=1;
//     filterApplied=true;
// }


// if (data.url=== undefined) {
//     data.selected=data.selected ? data.selected : 1;
//     if (data.columnKey && data.sortDir) {
//         _queryParams.push(sortAuditHead[data.columnKey])
//         _queryParams.push(sortOrder[data.sortDir])
//     }
//     _queryParams.push([GIVEN_PAGE,data.selected||1].join("="))
//     _queryParams.push([GIVEN_PAGE_SIZE,20].join("="))
//     url=[SEARCH_AUDIT_URL + makeDate,_queryParams.join("&")].join("&")
// }
// else {
//     url=data.url;
// }
// this.setState({selected_page: data.selected});
// let paginationData={
//     'url': url,
//     'method': GET,
//     'cause': AUDIT_RETRIEVE,
//     'token': this.props.auth_token,
//     'contentType': APP_JSON
// }
// this.props.setAuditSpinner(true);
// this.props.filterApplied(filterApplied);
// this.props.getPageData(paginationData);
// }

_setFilter() {
    var newState=!this.props.showFilter;
    this.props.showTableFilter(newState);
    clearInterval(this.state.timerId);
}

createAudit() {
    modal.add(CreateAudit, {
        title: '',
        size: 'large',
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true // (optional) if you don't wanna show the top right close button
            //.. all what you put in here you will get access in the modal props ;),
        });

}



    // startBulkAudit() {
    //     var auditId=[]; 
    //     auditId=Object.keys(this.props.checkedAudit);
    //     modal.add(StartAudit, {
    //         title: '',
    //         size: 'large', // large, medium or small,
    //         closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
    //         hideCloseButton: true,
    //         auditId: auditId,
    //         bulkFlag:true
    //     });
    // }


//Render Function goes here
render() {
    let checkedAuditCount=this.props.checkedAudit.length;
    let auditCount=this.props.auditDetail;
    let totalStartAuditCount=0;
    for(let i=0,len=auditCount.length;i<len;i++){
        if(auditCount[i].audit_button_data.audit_start_button==='enable')
        totalStartAuditCount++;
    }
    var filterHeight=screen.height - 190;
    var renderTab=<div/>,
    timeOffset=this.props.timeOffset || "",
    headerTimeZone=(this.context.intl.formatDate(Date.now(),
    {
        timeZone: timeOffset,
        year: 'numeric',
        timeZoneName: 'long'
    })),
    totalProgress=0;

    /*Extracting Time zone string for the specified time zone*/
    headerTimeZone=headerTimeZone.substr(5, headerTimeZone.length);

    var auditData=this._processAuditData();


renderTab=<AuditTable raja={'raja'} items={auditData} setCheckedAudit={this.props.setCheckedAudit} checkedAudit={this.props.checkedAudit} userRequest={this.props.userRequest}/>
    // renderTab=<AuditTable items={auditData} 
    // intlMessg={this.props.intlMessages}
    // timeZoneString={headerTimeZone}
    // totalAudits={this.props.totalAudits}
    // sortHeaderState={this.props.auditHeaderSort}
    // currentSortState={this.props.auditSortHeader}
    // sortHeaderOrder={this.props.auditHeaderSortOrder}
    // currentHeaderOrder={this.props.auditSortHeaderState}
    // refreshData={this._clearFilter.bind(this)}
    // setAuditFilter={this.props.auditFilterDetail} auditState={auditState}
    // setFilter={this.props.showTableFilter} showFilter={this.props.showFilter}
    // isFilterApplied={this.props.isFilterApplied}
    // auditFilterStatus={this.props.auditFilterStatus} setCheckedAudit={this.props.setCheckedAudit} 
    // checkedAudit={this.props.checkedAudit} 
    // responseFlag={this.props.auditSpinner}
    // onSortChange={this._refresh.bind(this)} cancelAudit={this._cancelAudit.bind(this)}/>

    let toolbar=<div>
    <div className="gor-filter-wrap"
    style={{'display': this.props.showFilter ? 'block' : 'none', height: filterHeight}}>
    <AuditFilter auditDetail={this.props.auditDetail} responseFlag={this.props.responseFlag}/>
    </div>
    <div className="gorToolBar auditListingToolbar">
    <div className="gorToolBarWrap auditListingToolbarWrap">
<div className="auditHeaderContainer">
   <label className="container">
   <input type="checkbox" checked={this.props.checkedAudit.length==0?'':true} onChange={this.headerCheckChange.bind(this)}/>
   <span className={totalStartAuditCount==checkedAuditCount?"checkmark":"checkmark1"}></span>
   </label> 
   <span className='auditHeader'>Audit</span>
</div>
   {(this.props.checkedAudit.length>1)?<div style={{display:'inline','border-left':'2px solid #ffffff','margin-left':'25px','float': 'right'}}><ActionDropDown style={{width:'115px',display:'inline',float:'right','padding-left':'25px'}} clickOptionBack={this._handelClick} data={[{name:'Auto Assign PPS',value:'autoassignpps'},{name:'Manual Assign PPS',value:'mannualassignpps'}]}>
      <button className="gor-add-btn gor-listing-button">
      START
      </button>      
      </ActionDropDown></div>:""}
   

    </div>
    <div className="gor-audit-filter-create-wrap">
    <div className="gor-button-wrap">
    <button className="gor-audit-create-btn" onClick={this.createAudit.bind(this)}>
    <div className="gor-filter-add-token-white"/>
    <FormattedMessage id="audit.table.createAudit"
    description="button label for audit create"
    defaultMessage="CREATE AUDIT"/>
    </button>
    </div>
    <div className="gor-button-wrap">
    <button
    className={this.props.isFilterApplied ? "gor-filterBtn-applied" : "gor-filterBtn-btn"}
    onClick={this._setFilter.bind(this)}>
    <div className="gor-manage-task"/>
    <FormattedMessage id="gor.filter.filterLabel" description="button label for filter"
    defaultMessage="FILTER DATA"/>
    </button>
    </div>
    </div>
    </div>
{/*Filter Summary*/}
<FilterSummary total={this.props.totalAudits||0} isFilterApplied={this.props.isFilterApplied} responseFlag={this.props.responseFlag}
filterText={<FormattedMessage id="auditList.filter.search.bar"
description='total results for filter search bar'
defaultMessage='{total} results found'
values={{total: this.props.totalAudits || '0'}}/>}
refreshList={this._clearFilter.bind(this)}
refreshText={<FormattedMessage id="auditList.filter.search.bar.showall"
description="button label for show all"
defaultMessage="Show all results"/>}/>
</div>


return (
    <div>
    <div>
    <div className="gor-Auditlist-table">
    {!this.props.showFilter ?
        <Spinner isLoading={this.props.auditSpinner} setSpinner={this.props.setAuditSpinner}/> : ""}
        {toolbar}
        {renderTab}
        </div>
        </div>
        {auditData.length && this.state.query ? <div className="gor-audit-paginate-wrap">
        <GorPaginateV2 location={this.props.location} currentPage={this.state.query.page||1} totalPage={this.props.totalPage}/>
        </div> : ""}
        </div>
        );
}
}
;


function mapStateToProps(state, ownProps) {
    return {
        orderFilter: state.sortHeaderState.auditFilter || "",
        auditSortHeader: state.sortHeaderState.auditHeaderSort || "id",
        checkedAudit: state.sortHeaderState.checkedAudit|| [],
        auditSortHeaderState: state.sortHeaderState.auditHeaderSortOrder || [],
        totalAudits: state.recieveAuditDetail.totalAudits || 0,
        auditSpinner: state.spinner.auditSpinner || false,
        auditDetail: state.recieveAuditDetail.auditDetail || [],
        noResultFound: state.recieveAuditDetail.noResultFound ,
        successQuery: state.recieveAuditDetail.successQuery ,
        totalPage: state.recieveAuditDetail.totalPage || 0,
        auditRefresh: state.recieveAuditDetail.auditRefresh || null,
        intlMessages: state.intl.messages,
        auth_token: state.authLogin.auth_token,
        timeOffset: state.authLogin.timeOffset,
        showFilter: state.filterInfo.filterState || false,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        auditFilterStatus: state.filterInfo.auditFilterStatus || false,
        auditFilterState: state.filterInfo.auditFilterState || {},
        auditListRefreshed:state.auditInfo.auditListRefreshed,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        auditFilterDetail: function (data) {
            dispatch(auditFilterDetail(data))
        },
        auditHeaderSort: function (data) {
            dispatch(auditHeaderSort(data))
        },
        auditHeaderSortOrder: function (data) {
            dispatch(auditHeaderSortOrder(data))
        },
        setAuditSpinner: function (data) {
            dispatch(setAuditSpinner(data))
        },
        getAuditData: function (data) {
            dispatch(getAuditData(data));
        },
        getPageData: function (data) {
            dispatch(getPageData(data));
        },
        setAuditRefresh: function () {
            dispatch(setAuditRefresh());
        },
        showTableFilter: function (data) {
            dispatch(showTableFilter(data));
        },
        filterApplied: function (data) {
            dispatch(filterApplied(data));
        },
        auditfilterState: function (data) {
            dispatch(auditfilterState(data));
        },
        toggleAuditFilter: function (data) {
            dispatch(toggleAuditFilter(data));
        },
        auditListRefreshed:function(data){
            dispatch(auditListRefreshed(data))
        },
        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        initDataSentCall: function (data) {
            dispatch(setWsAction({type: WS_ONSEND, data: data}));
        },
         setTextBoxStatus: function (data) {
            dispatch(setTextBoxStatus(data));
        },
        cancelAudit:function(data){
            dispatch(cancelAudit(data))
        },
        setAuditQuery:function(data){
            dispatch(setAuditQuery(data))
        },
        setCheckedAudit: function (data) {
            dispatch(setCheckedAudit(data))
        },
        userRequest: function (data) {
            dispatch(userRequest(data))
        }

    }
};

AuditTab.contextTypes={
    intl: React.PropTypes.object.isRequired
}
AuditTab.PropTypes={
    orderFilter: React.PropTypes.string,
    auditSortHeader: React.PropTypes.string,
    auditSortHeaderState: React.PropTypes.array,
    totalAudits: React.PropTypes.number,
    auditSpinner: React.PropTypes.bool,
    auditDetail: React.PropTypes.array,
    totalPage: React.PropTypes.number,
    auditRefresh: React.PropTypes.bool,
    intlMessages: React.PropTypes.string,
    auth_token: React.PropTypes.object,
    timeOffset: React.PropTypes.number,
    showFilter: React.PropTypes.bool,
    isFilterApplied: React.PropTypes.bool,
    auditFilterStatus: React.PropTypes.bool,
    auditFilterState: React.PropTypes.object,
    auditFilterDetail: React.PropTypes.func,
    auditHeaderSort: React.PropTypes.func,
    auditHeaderSortOrder: React.PropTypes.func,
    setAuditSpinner: React.PropTypes.func,
    getAuditData: React.PropTypes.func,
    getPageData: React.PropTypes.func,
    setAuditRefresh: React.PropTypes.func,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    setTextBoxStatus:React.PropTypes.func,
}


export  default connect(mapStateToProps, mapDispatchToProps)(AuditTab);

