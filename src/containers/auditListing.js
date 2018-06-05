import React from 'react';
import Spinner from '../components/spinner/Spinner';
import { connect } from 'react-redux';
import { FILTER_AUDIT_ID, CANCEL_AUDIT_URL } from '../constants/configConstants';
import { getAuditData, setAuditRefresh, auditListRefreshed, setTextBoxStatus, cancelAudit, setAuditQuery } from '../actions/auditActions';
import AuditTable from './auditListingTab';
import { getPageData } from '../actions/paginationAction';
import { userRequest } from '../actions/userActions';
import { GTableHeader, GTableHeaderCell } from '../components/gor-table-component/tableHeader';
import { GTable } from '../components/gor-table-component/index'
import ViewDetailsAudit from '../containers/auditTab/viewDetailsAudit';
import AuditStart from '../containers/auditTab/auditStart';
import ActionDropDown from '../components/actionDropDown/actionDropDown';

import {
    AUDIT_RETRIEVE,
    GET, PUT,
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
    sortOrder, POST, START_AUDIT_TASK,AUDIT_CREATOR_NAME,
    ALL, FILTER_PPS_ID, AUDIT_START_TIME, AUDIT_END_TIME, AUDIT_CREATEDBY,
    ANY, WS_ONSEND, toggleOrder, CANCEL_AUDIT, SYSTEM_GENERATED, POLLING_INTERVAL,PAGE_DEFAULT_LIMIT
} from '../constants/frontEndConstants';
import {
    SEARCH_AUDIT_URL,
    GIVEN_PAGE,
    GIVEN_PAGE_SIZE, START_AUDIT_URL
} from '../constants/configConstants';
import { setAuditSpinner } from '../actions/auditActions';
import { auditHeaderSortOrder, setCheckedAudit } from '../actions/sortHeaderActions';
import { getDaysDiff } from '../utilities/getDaysDiff';
import { addDateOffSet } from '../utilities/processDate';
import GorPaginateV2 from '../components/gorPaginate/gorPaginateV2';
import { showTableFilter, filterApplied, auditfilterState, toggleAuditFilter, setClearIntervalFlag } from '../actions/filterAction';
import { hashHistory } from 'react-router'
import { updateSubscriptionPacket, setWsAction } from './../actions/socketActions'
import { wsOverviewData } from './../constants/initData.js';
import AuditFilter from './auditTab/auditFilter';
import { FormattedMessage,defineMessages } from 'react-intl';
import CreateAudit from './auditTab/createAudit';
import { modal } from 'react-redux-modal';
import FilterSummary from './../components/tableFilter/filterSummary'
import { mappingArray } from '../utilities/utils';
//Mesages for internationalization
const messages = defineMessages({
    auditNotStartedStatus: {
        id: "auditdetail.notyetstatus.status",
        defaultMessage: "Not yet started"
    },
    auditwaitingOperatorStatus: {
        id: "auditdetail.waitingoperator.status",
        defaultMessage: "Waiting for the operator to login"
    },
    auditCancelled: {
        id: "auditdetail.auditCancelled.prefix",
        defaultMessage: "Cancelled"
    },
    auditPausedStatus: {
        id: "auditdetail.paused.status",
        defaultMessage: "Paused"
    },
    auditCompletedStatus: {
        id: "auditdetail.complete.status",
        defaultMessage: "Completed"
    },
    auditSKU: {
        id: "auditdetail.sku.prefix",
        defaultMessage: "SKU"
    },
    auditLocation: {
        id: "auditdetail.location.prefix",
        defaultMessage: "Location"
    },
    pps: {
        id: "auditdetail.pps.prefix",
        defaultMessage: "PPS "
    },
    autoAssignpps: {
        id: "auditdetail.label.autoassignpps",
        defaultMessage: "Auto Assign PPS"
    },
    manualAssignpps: {
        id: "auditdetail.label.manualassignpps",
        defaultMessage: "Manually-Assign PPS"
    },
    completedOutof: {
       id: "auditdetail.label.completedoutof",
       defaultMessage: " completed out of "
    },
   linestobeResolved: {
       id: "auditdetail.label.linestoberesolved",
       defaultMessage: " lines to be resolved "
   },
   linesRejected: {
    id: "auditdetail.label.linesrejected",
    defaultMessage: " lines rejected"
},
linesApproved:{
    id: "auditdetail.label.linesapproved",
    defaultMessage: " lines approved"
},
auditConflictingOperatorStatus: {
    id: "auditdetail.auditConflictingOperatorStatus.status",
    defaultMessage: "Concerned MSU is in use"
},
auditwaitingStatus: {
    id: "auditdetail.auditwaitingStatus.status",
    defaultMessage: "Processing audit task"
}

});


class AuditTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selected_page: 1, query: null, auditListRefreshed: null, timerId: 0, intervalPage: 1};
        this._handelClick = this._handelClick.bind(this);
        this.polling = this.polling.bind(this);
        this.props.showTableFilter(false);

    }

    

    componentWillMount() {
        /**
         * It will update the last refreshed property of
         * overview details, so that updated subscription
         * packet can be sent to the server for data
         * update.
         */
        this.polling();
        this.props.auditListRefreshed()
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId);
        this.props.setClearIntervalFlag(true);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.socketAuthorized && nextProps.auditListRefreshed && nextProps.location.query && (!this.state.query ||( (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query))&&(JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query))) || nextProps.auditRefresh !== this.props.auditRefresh)) { //Changes to refresh the table after creating audit
            this.props.showFilter;
            let obj = {}, selectedToken;
            if (!this.state.pollTimerId) {
                selectedToken = (nextProps.location.query.auditType) ? (nextProps.location.query.auditType).constructor.name !== 'Array' ? [nextProps.location.query.auditType] : nextProps.location.query.auditType : [];
                obj.name = mappingArray(selectedToken);
                this.props.setTextBoxStatus(obj);
            }
            this.setState({ query: JSON.parse(JSON.stringify(nextProps.location.query)) });
            this.setState({ auditListRefreshed: nextProps.auditListRefreshed });
            this._subscribeData();
            this._refreshList(nextProps.location.query, nextProps.auditSortHeaderState.colSortDirs);
        }
    }
    _handelClick(field) {

        if (field.target.value == 'viewdetails') {
            this.viewAuditDetails();
        } else if (field.target.value == 'mannualassignpps') {
            this.startAudit();
        }
        else if (field.target.value == 'autoassignpps') {
            this.startAuditAuto();
        }

    }

    polling() {
        self = this;
        let timerId = 0;
        timerId = setInterval(function () {
            self._refreshList({}, 'polling');
        }, POLLING_INTERVAL);
        self.setState({ timerId: timerId });
    }

    startAuditAuto(auditId) {
        var auditId = this.props.checkedAudit;
        let formData = {
            audit_id_list: (auditId).constructor.name !== "Array" ? [auditId] : auditId,
            pps_list: []
        }
        let auditData = {
            'url': START_AUDIT_URL,
            'method': POST,
            'cause': START_AUDIT_TASK,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'formdata': formData,
            'token': sessionStorage.getItem('auth_token')
        }
        this.props.userRequest(auditData);
    }

    startAudit() {
        var auditId = this.props.checkedAudit;
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
        let updatedWsSubscription = this.props.wsSubscriptionData;
        this.props.initDataSentCall(updatedWsSubscription["default"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
    }

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

   
    _refreshList(query, auditParam) {
        var pageSize=10,pageNo=1;
        var auditbyUrl="",saltParams;
        let _query_params = [], _auditParamValue = [], _auditStatuses = [], _auditCretedBy = [], url = "";
        if (query.fromDate) {
            url = SEARCH_AUDIT_URL + AUDIT_START_TIME + "=" + query.fromDate;
        } else {
            url = SEARCH_AUDIT_URL + AUDIT_START_TIME + "=" + addDateOffSet(new Date(), -30)
        }
        if (query.toDate) {
            _query_params.push([AUDIT_END_TIME, query.toDate].join("="))
        }

        if (query.auditType && query.auditType.constructor !== Array) {
            query.auditType = [query.auditType]
        }

        if (query.auditType && query.auditType.length === 1) {
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
            let _flattened_statuses = []
            query.status = query.status.constructor === Array ? query.status : [query.status]
            query.status.forEach(function (status) {
                _flattened_statuses.push(status.split("__"))
            })
            _auditStatuses = [].concat.apply([], _flattened_statuses)
            _query_params.push([AUDIT_STATUS, "['" + _auditStatuses.join("','") + "']"].join("="))
        }
        if (query.createdBy) {
            let _flattened_createdBy = []
            query.createdBy = query.createdBy.constructor === Array ? query.createdBy : [query.createdBy]
            query.createdBy.forEach(function (createdBy) {
                _flattened_createdBy.push(createdBy.split("__"))
            })
            _auditCretedBy = [].concat.apply([], _flattened_createdBy)
            _query_params.push([AUDIT_CREATOR_NAME, "['" + _auditCretedBy.join("','") + "']"].join("="))
        }
        if (query.taskId) {
            _query_params.push([FILTER_AUDIT_ID, query.taskId].join("="))
        }
        if (query.ppsId) {
            _query_params.push([FILTER_PPS_ID, query.ppsId].join("="))
        }
        if(auditParam=='polling'){
        var current_page_no=this.props.auditFilterState.PAGE||1;
            pageNo=this.state.intervalPage;
            pageSize=current_page_no*pageSize;
        }
        else{
            pageSize=PAGE_DEFAULT_LIMIT;
            pageNo=query.page||1;
            this.props.setAuditSpinner(true);
        }
        _query_params.push([GIVEN_PAGE, pageNo].join("="))
        _query_params.push([GIVEN_PAGE_SIZE, pageSize].join("="))
        url = [url, _query_params.join("&")].join("&")
        url += auditbyUrl;

        if (Object.keys(query).filter(function (el) { return el !== 'page' && el !== 'saltParams' }).length !== 0) {
            this.props.toggleAuditFilter(true);
            this.props.filterApplied(true);
        } else {
            this.props.toggleAuditFilter(false);
            this.props.filterApplied(false);
        }
        saltParams=query.saltParams?query.saltParams:{lazyData:false}
        let paginationData = {
            'url': url,
            'method': GET,
            'cause': AUDIT_RETRIEVE,
            'token': this.props.auth_token,
            'contentType': APP_JSON,
            'saltParams':saltParams,
        }

        

        this.props.auditfilterState({
            tokenSelected: {
                "AUDIT TYPE": query.auditType ? query.auditType.constructor === Array ? query.auditType : [query.auditType] : [ANY],
                "STATUS": query.status ? query.status.constructor === Array ? query.status : [query.status] : [ALL],
                "CREATED BY": query.createdBy ? query.createdBy.constructor === Array ? query.createdBy : [query.createdBy] : [ALL]
            },
            searchQuery: {
                'SPECIFIC SKU ID': query.skuId || '',
                'SPECIFIC LOCATION ID': query.locationId || '',
                'AUDIT TASK ID': query.taskId || '',
                'SPECIFIC PPS ID': query.ppsId || '',
                'FROM DATE': query.fromDate || '',
                'TO DATE': query.toDate || ''
            },
            "PAGE": auditParam=='polling'? this.props.auditFilterState.PAGE:query.page,
            defaultToken: { "AUDIT TYPE": [ANY], "STATUS": [ALL], "CREATED BY": [ALL] }
        })
        this.props.setAuditQuery({ query: query })
        this.props.getPageData(paginationData);
        if (Object.keys(query).filter(function (el) { return el !== 'page' && el !== 'saltParams' }).length !== 0)
                {
                clearInterval(this.state.timerId);
                this.props.setClearIntervalFlag(true);
                }
            
    }
    /**
     *
     */
    _clearFilter() {
        hashHistory.push({ pathname: "/auditlisting", query: {} });
        this.polling();

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
        nProps = this;
        data = nProps.props.auditDetail;
        let notStarted = nProps.context.intl.formatMessage(messages.auditNotStartedStatus);
        let waitingOperator = nProps.context.intl.formatMessage(messages.auditwaitingOperatorStatus);
        let cancelled = nProps.context.intl.formatMessage(messages.auditCancelled);
        let paused = nProps.context.intl.formatMessage(messages.auditPausedStatus);
        let completed = nProps.context.intl.formatMessage(messages.auditCompletedStatus);
        let sku = nProps.context.intl.formatMessage(messages.auditSKU);
        let location = nProps.context.intl.formatMessage(messages.auditLocation);
        let pps = nProps.context.intl.formatMessage(messages.pps);
        let completedOutof = nProps.context.intl.formatMessage(messages.completedOutof);
          let linestobeResolved = nProps.context.intl.formatMessage(messages.linestobeResolved);
          let linesRejected = nProps.context.intl.formatMessage(messages.linesRejected);
          let linesApproved = nProps.context.intl.formatMessage(messages.linesApproved);
          let auditWaiting = nProps.context.intl.formatMessage(messages.auditwaitingStatus);
          let auditConflicting = nProps.context.intl.formatMessage(messages.auditConflictingOperatorStatus);
          
          
        var timeOffset = nProps.props.timeOffset || "";
        var checkedAudit = nProps.props.checkedAudit || {};

        var auditType = { "sku": sku, "location": location };
        var auditDetails = [], auditData = {};
        var i, limit = data.length;
        for (i = 0; i <= limit - 1; i++) {
            auditData.id = data[i].audit_id;
            auditData.display_id = data[i].display_id;
            auditData.progressBarflag = false;
            if (data[i].audit_name) {
                auditData.audit_name = data[i].audit_name;
            }
            else {
                auditData.audit_name = "";
            }
            auditData.auditBased = data[i].audit_type ? data[i].audit_type : "";
            auditData.pps_id = data[i].audit_status == 'audit_created' ? "" : (data[i].pps_id ? pps + data[i].pps_id : "");


            if (data[i].audit_status == "audit_created") {
                auditData.status = notStarted;

            } else if (data[i].audit_status == "audit_cancelled") {
                auditData.status = cancelled;
            }

            else if (data[i].audit_status == "audit_paused") {
                auditData.status = paused;
            }
            else if (data[i].audit_status == "audit_accepted") {
                auditData.status = waitingOperator;
            }
            else if (data[i].audit_status == "audit_conflicting") {
                auditData.status = auditConflicting;
            }
            else if (data[i].audit_status == "audit_waiting") {
                auditData.status = auditWaiting;
            }

            else if ((data[i].start_request_time && data[i].completion_time) || (data[i].audit_status == "audit_aborted")) {
                auditData.status = completed;

            }
            else if (data[i].audit_status == "audit_pending" || data[i].audit_status == "audit_started" || 
                data[i].audit_status == "audit_tasked" || data[i].audit_status == "audit_rejected" || 
                data[i].audit_status == "audit_pending_approval") {
                auditData.progressBarflag = true;
                auditData.status = data[i].audit_progress.completed +" "+completedOutof +" "+data[i].audit_progress.total;
            }
            else{
                auditData.status = data[i].audit_status;
            }

            auditData.progressStatus = data[i].audit_progress;

            if (data[i].audit_button_data && data[i].audit_button_data.audit_start_button === "enable") {
                auditData.startAudit = true;
            }

            else {
                auditData.startAudit = false;

            }

            if (data[i].audit_button_data && data[i].audit_button_data.audit_resolve_button === "enable") {
                auditData.resolveAudit = true;
            }

            else {
                auditData.resolveAudit = false;
            }

            //Create time need to be add
            if (data[i].start_request_time) {

                if (getDaysDiff(data[i].start_request_time) < 2) {
                    auditData.startTime = nProps.context.intl.formatRelative(data[i].start_request_time, {
                        timeZone: timeOffset,
                        units: 'day'
                    }) +
                        ", " + nProps.context.intl.formatTime(data[i].start_request_time, {
                            timeZone: timeOffset,
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false
                        });
                }
                else {
                    auditData.startTime = nProps.context.intl.formatDate(data[i].start_request_time,
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

                    if ((getDaysDiff(data[i].completion_time) == getDaysDiff(data[i].start_request_time))) {
                        auditData.endTime = nProps.context.intl.formatTime(data[i].completion_time, {
                            timeZone: timeOffset,
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false
                        });
                    }
                    else {
                        auditData.endTime = nProps.context.intl.formatDate(data[i].completion_time,
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
                    auditData.endTime = ""
            }
            var endTIme = (auditData.endTime !== "") ? " - " + auditData.endTime : "";
            auditData.totalTime = (auditData.startTime ? auditData.startTime : "") + (auditData.endTime ? endTIme : "");

            if (data[i].completion_time) {
                if (getDaysDiff(data[i].completion_time) < 2) {
                    auditData.completedTime = nProps.context.intl.formatRelative(data[i].completion_time, {
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
                    auditData.completedTime = nProps.context.intl.formatDate(data[i].completion_time,
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
                auditData.completedTime = "--";
            }
            auditData.resolved = data[i].resolved;
            if (data[i].audit_button_data.audit_resolve_button == 'enable') {
                auditData.lineResolveState = data[i].unresolved > 0 ? (data[i].unresolved +  linestobeResolved) : "";
            }
            if (data[i].audit_button_data.audit_reaudit_button == 'enable') {
                auditData.lineReAuditState = data[i].rejected > 0 ? (data[i].rejected +linesRejected) : "";
            }
            auditData.lineApprovedState = data[i].approved > 0 ? (data[i].approved +linesApproved) : "";
            

            auditData.button = data[i].audit_button_data;
            auditData.startButton = data[i].audit_button_data.audit_start_button === 'enable' ? true : false;
            auditData.resolveButton = data[i].audit_button_data.audit_resolve_button === 'enable' ? true : false;
            auditData.reauditButton = data[i].audit_button_data.audit_reaudit_button === 'enable' ? true : false;
            auditData.cancelButton = data[i].audit_button_data.audit_cancel_button === 'enable' ? true : false;
            auditData.deleteButton = data[i].audit_button_data.audit_delete_button === 'enable' ? true : false;
            auditData.duplicateButton = data[i].audit_button_data.audit_duplicate_button === 'enable' ? true : false;
            auditData.detailsButton = true;

            auditData.system_created_audit = data[i].audit_created_by === SYSTEM_GENERATED ? true : data[i].audit_creator_name;

            auditDetails.push(auditData);
            auditData = {};
        }
        return auditDetails;
    }

    headerCheckChange(e) {
        let checkedAudit = this.props.auditDetail;
        let arr = [];
        if (e.currentTarget.checked) {
            for (let i = 0, len = checkedAudit.length; i < len; i++) {
                if (checkedAudit[i].audit_button_data.audit_start_button === 'enable')
                    arr.push(checkedAudit[i].audit_id)
            }
            this.props.setCheckedAudit(arr);
        }
        else {
            this.props.setCheckedAudit([]);
        }

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


    _setFilter() {
        var newState = !this.props.showFilter;
        this.props.showTableFilter(newState);
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
    
    //Render Function goes here
    render() {
        let autoAssignpps = this.context.intl.formatMessage(messages.autoAssignpps);
        let manualAssignpps= this.context.intl.formatMessage(messages.manualAssignpps);
        
        let checkedAuditCount = this.props.checkedAudit.length;
        let auditCount = this.props.auditDetail;
        let totalStartAuditCount = 0;
        for (let i = 0, len = auditCount.length; i < len; i++) {
            if (auditCount[i].audit_button_data.audit_start_button === 'enable')
                totalStartAuditCount++;
        }
        var filterHeight = screen.height - 190;
        var renderTab = <div />,
            timeOffset = this.props.timeOffset || "",
            headerTimeZone = (this.context.intl.formatDate(Date.now(),
                {
                    timeZone: timeOffset,
                    year: 'numeric',
                    timeZoneName: 'long'
                })),
            totalProgress = 0;

        /*Extracting Time zone string for the specified time zone*/
        headerTimeZone = headerTimeZone.substr(5, headerTimeZone.length);

        var auditData = this._processAuditData();


        renderTab = <AuditTable refreshCallback={this._refreshList.bind(this)}  
        items={auditData} 
        setCheckedAudit={this.props.setCheckedAudit} 
        checkedAudit={this.props.checkedAudit} 
        userRequest={this.props.userRequest} 
        location={this.props.location} 
        currentPage={this.props.location ? this.props.location.query.page : 1} 
        totalPage= {this.props.totalPage || 0}  
        totalAudits={this.props.totalAudits||0}  
        />

        let toolbar = <div>
            <div className="gor-filter-wrap"
                style={{ 'display': this.props.showFilter ? 'block' : 'none', height: filterHeight }}>
                <AuditFilter auditDetail={this.props.auditDetail} responseFlag={this.props.responseFlag} pollingFunc={this.polling} pollTimerId={this.state.timerId} />
            </div>
            <div className="gorToolBar auditListingToolbar">
                <div className="gorToolBarWrap auditListingToolbarWrap">
                    <div className="auditHeaderContainer">
                        <label className="container">
                            <input type="checkbox" checked={this.props.checkedAudit.length == 0 ? '' : true} onChange={this.headerCheckChange.bind(this)} />
                            <span className={totalStartAuditCount == checkedAuditCount ? "checkmark" : "checkmark1"}></span>
                        </label>
                        <span className='auditHeader'><FormattedMessage id="audit.header.Audit"
                                description="button label for audit"
                                defaultMessage="Audits" /></span>
                    </div>
                    {(this.props.checkedAudit.length > 1) ? <div style={{ display: 'inline', 'border-left': '1px solid #aaaaaa', 'float': 'right' }}><ActionDropDown style={{ width: '115px', display: 'inline', float: 'right', 'padding-left': '25px' }} clickOptionBack={this._handelClick} data={[{ name:  manualAssignpps, value: 'mannualassignpps' }]}>
                        <button className="gor-add-btn gor-listing-button">
                        <FormattedMessage id="audit.start.Audit"
                                description="button label for start"
                                defaultMessage="START" />
      <div className="got-add-notch"></div>
                        </button>
                    </ActionDropDown></div> : ""}


                </div>
                <div className="gor-audit-filter-create-wrap">
                    <div className="gor-button-wrap">
                        <button className="gor-audit-create-btn" onClick={this.createAudit.bind(this)}>
                            <div className="gor-filter-add-token-white" />
                            <FormattedMessage id="audit.table.createAudit"
                                description="button label for audit create"
                                defaultMessage="CREATE AUDIT" />
                        </button>
                    </div>
                    <div className="gor-button-wrap">
                        <button
                            className={this.props.isFilterApplied ? "gor-filterBtn-applied" : "gor-filterBtn-btn"}
                            onClick={this._setFilter.bind(this)}>
                            <div className="gor-manage-task" />
                            <FormattedMessage id="audit.filter.filterLabel" description="button label for filter"
                                defaultMessage="FILTER DATA" />
                        </button>
                    </div>
                </div>
            </div>
            {/*Filter Summary*/}
            <FilterSummary total={this.props.totalAudits || 0} isFilterApplied={this.props.isFilterApplied} responseFlag={this.props.responseFlag}
                filterText={<FormattedMessage id="auditList.filter.search.bar"
                    description='total results for filter search bar'
                    defaultMessage='{total} results found'
                    values={{ total: this.props.totalAudits || '0' }} />}
                refreshList={this._clearFilter.bind(this)}
                refreshText={<FormattedMessage id="auditList.filter.search.bar.showall"
                    description="button label for show all"
                    defaultMessage="Show all results" />} />
        </div>


        return (
            <div>
                <div>
                    <div className="gor-Auditlist-table">
                        {!this.props.showFilter ?
                            <Spinner isLoading={this.props.auditSpinner} setSpinner={this.props.setAuditSpinner} /> : ""}
                        {toolbar}
                        {renderTab}
                    </div>
                </div>
                
            </div>
        );
    }
}
;





function mapStateToProps(state, ownProps) {
    return {
     
        checkedAudit: state.sortHeaderState.checkedAudit || [],
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
        auditListRefreshed: state.auditInfo.auditListRefreshed,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized
    };
}

var mapDispatchToProps = function (dispatch) {
    return {
     
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
        auditListRefreshed: function (data) {
            dispatch(auditListRefreshed(data))
        },
        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        initDataSentCall: function (data) {
            dispatch(setWsAction({ type: WS_ONSEND, data: data }));
        },
        setTextBoxStatus: function (data) {
            dispatch(setTextBoxStatus(data));
        },
        cancelAudit: function (data) {
            dispatch(cancelAudit(data))
        },
        setAuditQuery: function (data) {
            dispatch(setAuditQuery(data))
        },
        setCheckedAudit: function (data) {
            dispatch(setCheckedAudit(data))
        },
        userRequest: function (data) {
            dispatch(userRequest(data))
        },
        setClearIntervalFlag: function (data) {
            dispatch(setClearIntervalFlag(data))
        } 

    }
};

AuditTab.contextTypes = {
    intl: React.PropTypes.object.isRequired
}
AuditTab.PropTypes = {
   
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
    auditHeaderSortOrder: React.PropTypes.func,
    setAuditSpinner: React.PropTypes.func,
    getAuditData: React.PropTypes.func,
    getPageData: React.PropTypes.func,
    setAuditRefresh: React.PropTypes.func,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    setTextBoxStatus: React.PropTypes.func,
}


export default connect(mapStateToProps, mapDispatchToProps)(AuditTab);