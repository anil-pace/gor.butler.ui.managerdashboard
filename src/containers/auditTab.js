import React  from 'react';
import Spinner from '../components/spinner/Spinner';
import {connect} from 'react-redux';
import { FILTER_AUDIT_ID,CANCEL_AUDIT_URL} from '../constants/configConstants';
import {getAuditData, setAuditRefresh,auditListRefreshed,setTextBoxStatus,cancelAudit} from '../actions/auditActions';
import AuditTable from './auditTab/auditTable';
import {getPageData} from '../actions/paginationAction';
import StartAudit from './auditTab/startAudit';
import {
    AUDIT_RETRIEVE,
    GET,PUT,
    APP_JSON,
    GOR_COMPLETED_STATUS,
    LOCATION,
    AUDIT_PARAM_TYPE,
    AUDIT_PARAM_VALUE,
    SPECIFIC_LOCATION_ID,
    SPECIFIC_SKU_ID,
    AUDIT_TYPE,
    SKU,
    AUDIT_PENDING_APPROVAL,
    AUDIT_RESOLVED,
    AUDIT_CREATED,
    AUDIT_LINE_REJECTED,
    AUDIT_ISSUES_STATUS,
    AUDIT_BY_PDFA,
    AUDIT_TASK_ID,
    AUDIT_STATUS,
    sortAuditHead,
    sortOrder,
    ALL,
    ANY,WS_ONSEND,toggleOrder,CANCEL_AUDIT
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
        super(props);
        this.state={selected_page: 1,query:null,auditListRefreshed:null};
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
        if (nextProps.socketAuthorized && nextProps.auditListRefreshed && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)) || nextProps.auditRefresh!==this.props.auditRefresh)) { //Changes to refresh the table after creating audit
            let obj={},selectedToken;
            selectedToken=[nextProps.location.query.auditType];
            obj.name=mappingArray(selectedToken);
            this.props.setTextBoxStatus(obj);
            this.setState({query: nextProps.location.query});
            this.setState({auditListRefreshed:nextProps.auditListRefreshed});
            this._subscribeData();
            this._refreshList(nextProps.location.query,nextProps.auditSortHeaderState.colSortDirs);
        }
    }

    _subscribeData() {
        let updatedWsSubscription=this.props.wsSubscriptionData;
        this.props.initDataSentCall(updatedWsSubscription["default"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
    }
    _refresh(data){
        this._refreshList(this.props.location.query,data);
  }
    /**
     * The method will update the subscription packet
     * and will fetch the data from the socket.
     * @private
     */
     _refreshList(query,auditParam) {
        var auditbyUrl;
        let _query_params=[], _auditParamValue=[], _auditStatuses=[],
        url=SEARCH_AUDIT_URL + addDateOffSet(new Date(), -30)
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

            _query_params.push([AUDIT_PARAM_VALUE, "['"+_auditParamValue.join("','")+"']"].join("="))
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
        if (query.taskId) {
            _query_params.push([FILTER_AUDIT_ID, query.taskId].join("="))
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
            "STATUS": query.status ? query.status.constructor=== Array ? query.status : [query.status] : [ALL]},
            searchQuery: {
                'SPECIFIC SKU ID':query.skuId||'',
                'SPECIFIC LOCATION ID':query.locationId||'',
                'AUDIT TASK ID':query.taskId||''
            },
            "PAGE": query.page || 1,
            defaultToken: {"AUDIT TYPE": [ANY], "STATUS": [ALL]}
        })
        this.props.getPageData(paginationData);
    }
    /**
     *
     */
     _clearFilter() {
        hashHistory.push({pathname: "/audit", query: {}})
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
        // cancellable: "audit_pending", "audit_waiting", "audit_conflicting","audit_accepted", "audit_started", "audit_tasked","audit_rejected"
        //resolve issues first and then cancel: pending approval
        var auditStatus={
            "audit_created": created,
            "audit_pending": pending,
            "audit_waiting": pending,
            "audit_conflicting": pending,
            "audit_accepted": pending,
            "audit_started": progress,
            "audit_tasked": progress,
            "audit_aborted": completed,
            "audit_completed": completed,
            "audit_pending_approval": pendingApp,
            "audit_resolved": resolved,
            audit_rejected: rejected,
            audit_reaudited: reAudited,
            audit_cancelled: auditCancelled
        };
        var statusClass={
            "audit_created": "pending",
            "audit_pending": "pending",
            "audit_waiting": "pending",
            "audit_conflicting": "pending",
            "audit_accepted": "pending",
            "audit_started": "progress",
            "audit_tasked": "progress",
            "audit_aborted": "completed",
            "audit_completed": "completed",
            "audit_pending_approval": "breached",
            "audit_resolved": "progress",
            audit_rejected: "breached",
            audit_reaudited: "completed",
            audit_cancelled: "cancelled"
        };
        var auditType={"sku": sku, "location": location};
        var auditDetails=[], auditData={};
        var i,limit=data.length;
        for (i=0;i<=limit - 1; i++) {
            auditData.id=data[i].audit_id;
            if (data[i].display_id) {
                auditData.display_id=data[i].display_id;
            }

            else {
                auditData.display_id="--";
            }
            let total_lines=0
            try{
                total_lines=data[i].audit_info.length
            }catch(ex){}

            if (data[i].audit_param_type !== AUDIT_BY_PDFA) {
                auditData.auditType=data[i].audit_param_type;
                if (data[i].audit_param_value) {
                    auditData.auditValue=data[i].audit_param_value;
                    auditData.auditTypeValue=auditType[data[i].audit_param_type] + "-" + data[i].audit_param_value;
                }
            }

            else if (data[i].audit_param_type=== AUDIT_BY_PDFA) {
                auditData.auditType=data[i].audit_param_type;
                if (data[i].audit_param_value) {
                    auditData.auditValue=data[i].audit_param_value.product_sku;
                    auditData.auditTypeValue=auditType[SKU] + "-" + data[i].audit_param_value.product_sku;
                    auditData.pdfaValues=data[i].audit_param_value.pdfa_values;
                }
            }

            if (data[i].audit_status) {
                if (auditData.statusPriority=== undefined) {
                    auditData.statusPriority=1;
                }
                auditData.status=auditStatus[data[i].audit_status];
                auditData.statusClass=statusClass[data[i].audit_status];
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

                if (data[i].audit_button_data && data[i].audit_button_data.audit_view_issues_button==="enable") {
                    auditData.viewIssues=true;
                }

                else {
                    auditData.viewIssues=false;
                }
                if(data[i].audit_button_data && data[i].audit_button_data.audit_cancel_button==="enable"){
                    auditData.cancellable=true
                }else{
                    auditData.cancellable=false
                }

                if(data[i].audit_button_data && data[i].audit_button_data.audit_duplicate_button==="enable"){
                    auditData.duplicatable=true
                }else{
                    auditData.duplicatable=false
                }

                if(data[i].audit_button_data && data[i].audit_button_data.audit_delete_button==="enable"){
                    auditData.deletable=true
                }else{
                    auditData.deletable=false
                }


            }

            if (data[i].start_actual_time) {
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
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    });
                }
            }
            else {
                auditData.startTime="--";
            }

            if (data[i].expected_quantity && data[i].completed_quantity) {
                auditData.progress=((data[i].completed_quantity) / (data[i].expected_quantity) * 100);
            }

            else {
                auditData.progress=0;
                if (["audit_completed"].indexOf(data[i].audit_status)>-1) {
                    auditData.progress=100;
                }
            }

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

            if(data[i].cancel_request==="requested"){
                auditData.cancelling=nProps.context.intl.formatMessage(messages.auditCancellingText)
            }
            if(data[i].audit_status==='audit_created'){
                auditData.infoIcon="created"
            }
            let rejected_lines=0
            try{
                rejected_lines=data[i].audit_info.filter(function(audit_line){
                    return audit_line.audit_line_status==="audit_rejected"
                }).length
            }catch(ex){}
            if(data[i].audit_status==="audit_rejected" ||rejected_lines>0){
                auditData.auditInfo={total_lines:total_lines,rejected_lines:rejected_lines}
                auditData.infoIcon="rejected"
            }
            auditData.resolvedTask=data[i].resolved;
            auditData.isChecked = checkedAudit[data[i].audit_id] ? true :false;
            auditData.unresolvedTask=data[i].unresolved;
            auditDetails.push(auditData);
            auditData={};
        }
        return auditDetails;
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

    handlePageClick(data) {
        var url, appendTextFilterUrl="", makeDate, inc=0, value=[], paramValue="",
        selectedAuditType="",_queryParams=[];
        var currentDate=new Date();
        var filterApplied=false;
        var skuText="", arr=[], selectvalue;
        makeDate=addDateOffSet(currentDate, -30);

        if (!data) {
            /**
             * After clearing the applied filter,
             * It'll set the default state to the filters.
             */
             data={}
             this.props.auditfilterState({
                tokenSelected: {"AUDIT TYPE": [ANY], "STATUS": [ALL]},
                searchQuery: {},
                defaultToken: {"AUDIT TYPE": [ANY], "STATUS": [ALL]}
            })
             this.props.toggleAuditFilter(false)
             this.props.showTableFilter(false)

         }
//If user select both we are making it Any for backend support
if (data.searchQuery && data.tokenSelected[AUDIT_TYPE]) {
    selectvalue=(data.tokenSelected[AUDIT_TYPE].length=== 2) ? ANY : data.tokenSelected[AUDIT_TYPE][0];
    skuText=AUDIT_PARAM_TYPE + selectvalue;
    _queryParams.push([AUDIT_PARAM_TYPE,selectvalue].join("="))
    selectedAuditType=this._mappingString(selectvalue);

//Pushing the audit type into array to make it generic
for (let propt in data.searchQuery) {
    if (selectedAuditType=== 'any') {
        (propt !== AUDIT_TASK_ID && data.searchQuery[propt] !== "") ? value.push(data.searchQuery[propt]) : '';
    }
    else {
        (data.searchQuery[propt] !== "" && propt== selectedAuditType) ? value.push(data.searchQuery[propt]) : '';
    }

}
//Formatting the param value for single and multiple type       
if (value.length) {
    paramValue=(value.length > 1 || selectvalue=== ANY) ? "['" + value.join("','") + "']" : "'" + value[0] + "'";
    _queryParams.push([AUDIT_PARAM_VALUE, "['"+value.join("','")+"']"].join("="))
    skuText=skuText + AUDIT_PARAM_VALUE + paramValue;
}
}
//formating the audit status 
if (data.tokenSelected && data.tokenSelected["STATUS"][0] !== ALL) {
    let statusToken=data.tokenSelected["STATUS"];
    skuText=skuText + AUDIT_STATUS + "['" + statusToken.join("','") + "']";
    _queryParams.push([AUDIT_STATUS,"['"+statusToken.join("','")+"']" ].join("="))
}

if (data.searchQuery && data.searchQuery[AUDIT_TASK_ID]) {
    appendTextFilterUrl=FILTER_AUDIT_ID + data.searchQuery[AUDIT_TASK_ID];
    _queryParams.push([FILTER_AUDIT_ID, data.searchQuery[AUDIT_TASK_ID]].join("="))
    data.selected=1;
    filterApplied=true;
}


if (data.url=== undefined) {
    data.selected=data.selected ? data.selected : 1;
    if (data.columnKey && data.sortDir) {
        _queryParams.push(sortAuditHead[data.columnKey])
        _queryParams.push(sortOrder[data.sortDir])
    }
    _queryParams.push([GIVEN_PAGE,data.selected||1].join("="))
    _queryParams.push([GIVEN_PAGE_SIZE,20].join("="))
    url=[SEARCH_AUDIT_URL + makeDate,_queryParams.join("&")].join("&")
}
else {
    url=data.url;
}
this.setState({selected_page: data.selected});
let paginationData={
    'url': url,
    'method': GET,
    'cause': AUDIT_RETRIEVE,
    'token': this.props.auth_token,
    'contentType': APP_JSON
}
this.props.setAuditSpinner(true);
this.props.filterApplied(filterApplied);
this.props.getPageData(paginationData);
}

_setFilter() {
    var newState=!this.props.showFilter;
    this.props.showTableFilter(newState)
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

    startBulkAudit() {
        var auditId=[]; 
        auditId=Object.keys(this.props.checkedAudit);
        modal.add(StartAudit, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true,
            auditId: auditId,
            bulkFlag:true
        });
    }


//Render Function goes here
render() {
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
    var auditState={"auditCompleted": 0, "skuAudit": 0, "locationAudit": 0, "totalProgress": 0, auditIssue: 0};
    for (var i=auditData.length - 1; i >= 0; i--) {
        if (auditData[i].status=== GOR_COMPLETED_STATUS) {
            auditState["auditCompleted"]++;
        }

        if (auditData[i].status=== AUDIT_ISSUES_STATUS) {
            auditState["auditIssue"]++;
        }
        if (auditData[i].auditType=== SKU || auditData[i].auditType=== AUDIT_BY_PDFA) {
            auditState["skuAudit"]++;
        }
        if (auditData[i].auditType=== LOCATION) {
            auditState["locationAudit"]++;
        }
        totalProgress=auditData[i].progress + totalProgress;
        auditData[i].progress=auditData[i].progress.toFixed(1);

    }
    if (auditData.length && auditData.length !== 0) {
        auditState["totalProgress"]=(totalProgress) / (auditData.length);
    }

    renderTab=<AuditTable items={auditData}
    intlMessg={this.props.intlMessages}
    timeZoneString={headerTimeZone}
    totalAudits={this.props.totalAudits}
    sortHeaderState={this.props.auditHeaderSort}
    currentSortState={this.props.auditSortHeader}
    sortHeaderOrder={this.props.auditHeaderSortOrder}
    currentHeaderOrder={this.props.auditSortHeaderState}
    refreshData={this._clearFilter.bind(this)}
    setAuditFilter={this.props.auditFilterDetail} auditState={auditState}
    setFilter={this.props.showTableFilter} showFilter={this.props.showFilter}
    isFilterApplied={this.props.isFilterApplied}
    auditFilterStatus={this.props.auditFilterStatus} setCheckedAudit={this.props.setCheckedAudit} 
    checkedAudit={this.props.checkedAudit} 
    responseFlag={this.props.auditSpinner}
    onSortChange={this._refresh.bind(this)} cancelAudit={this._cancelAudit.bind(this)}/>

    let toolbar=<div>
    <div className="gor-filter-wrap"
    style={{'display': this.props.showFilter ? 'block' : 'none', height: filterHeight}}>
    <AuditFilter auditDetail={this.props.auditDetail} responseFlag={this.props.responseFlag}/>
    </div>
    <div className="gorToolBar">
    <div className="gorToolBarWrap">
    <div className="gorToolBarElements">
    <FormattedMessage id="audit.table.heading" description="Heading for audit table"
    defaultMessage="Audit Tasks"/>
    </div>

    </div>
    <div className="gor-audit-filter-create-wrap">

    <div className="gor-button-wrap">
    <button className="gor-add-btn gor-bulk-audit-btn" onClick={this.startBulkAudit.bind(this)}>
    <FormattedMessage id="audit.table.bulkaudit"
    description="button label for start bulk audit"
    defaultMessage="Start Bulk Audit "/>
    </button>
    </div>

    <div className="gor-button-wrap">
    <button className="gor-audit-create-btn" onClick={this.createAudit.bind(this)}>
    <div className="gor-filter-add-token"/>
    <FormattedMessage id="audit.table.buttonLable"
    description="button label for audit create"
    defaultMessage="Create New Task"/>
    </button>
    </div>
    <div className="gor-button-wrap">
    <button
    className={this.props.isFilterApplied ? "gor-filterBtn-applied" : "gor-filterBtn-btn"}
    onClick={this._setFilter.bind(this)}>
    <div className="gor-manage-task"/>
    <FormattedMessage id="gor.filter.filterLabel" description="button label for filter"
    defaultMessage="Filter data"/>
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
        checkedAudit: state.sortHeaderState.checkedAudit|| {},
        auditSortHeaderState: state.sortHeaderState.auditHeaderSortOrder || [],
        totalAudits: state.recieveAuditDetail.totalAudits || 0,
        auditSpinner: state.spinner.auditSpinner || false,
        auditDetail: state.recieveAuditDetail.auditDetail || [],
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

