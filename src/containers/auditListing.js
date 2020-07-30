import React from "react"
import Spinner from "../components/spinner/Spinner"
import { connect } from "react-redux"
import AuditListingTab from "./auditListingTab"
import { REQUEST_REPORT_SUCCESS } from "./../constants/messageConstants"

import viewDetailsAudit from "../containers/auditTab/viewDetailsAudit"
import AuditStart from "../containers/auditTab/auditStart"
import ActionDropDown from "../components/actionDropDown/actionDropDown"
import { graphql, withApollo, compose } from "react-apollo"
import gql from "graphql-tag"
import {
  PUT,
  APP_JSON,
  SPECIFIC_LOCATION_ID,
  SPECIFIC_SKU_ID,
  POST,
  START_AUDIT_TASK,
  ALL,
  ANY,
  WS_ONSEND,
  CANCEL_AUDIT,
  PAUSE_AUDIT,
  SYSTEM_GENERATED
} from "../constants/frontEndConstants"
import { getDaysDiff } from "../utilities/getDaysDiff"

import { hashHistory } from "react-router"
import AuditFilter from "./auditTab/auditFilter"
import { FormattedMessage, defineMessages } from "react-intl"
import CreateAudit from "./auditTab/createAudit"
import { modal } from "react-redux-modal"
import FilterSummary from "./../components/tableFilter/filterSummary"

import {
  notifyfeedback,
  notifySuccess,
  notifyFail
} from "../actions/validationActions"
import { setNotification } from "../actions/notificationAction"
import { AuditParse } from "../utilities/auditResponseParser"

import {
  auditClientData,
  auditNeedRefreshFlag,
  auditSelectedData,
  auditSpinnerState
} from "../../src/containers/auditTab/query/clientQuery"
import {
  AUDIT_QUERY,
  AUDIT_REQUEST_QUERY
} from "../../src/containers/auditTab/query/serverQuery"
import suggestedAudit from "./auditTab/suggestedAudit"

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
    defaultMessage: "completed out of"
  },
  linestobeResolved: {
    id: "auditdetail.label.linestoberesolved",
    defaultMessage: "lines to be resolved"
  },
  linesRejected: {
    id: "auditdetail.label.linesrejected",
    defaultMessage: "lines rejected"
  },
  linesApproved: {
    id: "auditdetail.label.linesapproved",
    defaultMessage: "lines approved"
  },
  auditConflictingOperatorStatus: {
    id: "auditdetail.auditConflictingOperatorStatus.status",
    defaultMessage: "Concerned MSU is in use"
  },
  auditwaitingStatus: {
    id: "auditdetail.auditwaitingStatus.status",
    defaultMessage: "Processing audit task"
  }
})

const GENERATE_AUDIT_REPORT_QUERY = gql`
  query GenerateAuditReport($input: GenerateAuditReportParams) {
    GenerateAuditReport(input: $input) {
      list {
        create_time
        approved
        rejected
        actual_quantity
        audit_created_by
        audit_id
        audit_name
        audit_creator_name
        audit_info
        audit_param_name
        audit_param_type
        audit_param_value
        audit_status
        audit_type
        cancel_request
        completed_quantity
        completion_time
        description
        display_id
        expected_quantity
        pps_id
        resolved
        start_actual_time
        start_request_time
        unresolved
        kq

        audit_button_data {
          audit_cancel_button
          audit_delete_button
          audit_duplicate_button
          audit_edit_button
          audit_pause_button
          audit_reaudit_button
          audit_resolve_button
          audit_start_button
        }
        audit_progress {
          completed
          total
        }
        __typename
      }
      page
      page_results
      total_pages
      total_results
    }
  }
`

class AuditTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_page: 1,
      query: null,
      auditListRefreshed: null,
      timerId: 0,
      intervalPage: 1,
      AuditList: this.props.AuditList || [],
      totalAudits: 0,
      totalPage: 1,
      generateAuditReport: ""
    }
    this._handelClick = this._handelClick.bind(this)
    this.showAuditFilter = this.props.showAuditFilter.bind(this)
    this.generateAuditReport = this.generateAuditReport.bind(this)
    this.flag = true
    this.props.setAuditDetails(this.state.AuditList)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auditRefreshFlag !== this.props.auditRefreshFlag) {
      this._refreshList(nextProps.location.query)
    }
    if (
      JSON.stringify(this.props.AuditList) !==
        JSON.stringify(nextProps.AuditList) ||
      nextProps.AuditList.length == 0
    ) {
      this.setState({
        AuditList: nextProps.AuditList,
        totalAudits: nextProps.TotalResults,
        totalPage: nextProps.TotalPage
      })
      this.props.setAuditDetails(nextProps.AuditList)
      this.props.setCurrentPageNumber(nextProps.CurrentPageNo)
      this.props.setAuditSpinner(false)
    }
  }

  _handelClick(field) {
    if (field.target.value == "viewdetails") {
      this.viewAuditDetails()
    } else if (field.target.value == "mannualassignpps") {
      this.startAudit()
    } else if (field.target.value == "autoassignpps") {
      this.startAuditAuto()
    }
  }

  generateAuditReport() {
    let pageNo = this.props.currentPageNumber
    let pageSize = pageNo * 10 || 10
    this.props.client
      .query({
        query: GENERATE_AUDIT_REPORT_QUERY,
        variables: {
          input: {
            skuId: this.props.location.query.skuId || "",
            locationId: this.props.location.query.locationId || "",
            taskId: this.props.location.query.taskId || "",
            ppsId: this.props.location.query.ppsId || "",
            operatingMode: this.props.location.query.operatingMode || "",
            status: this.props.location.query.status || "",
            fromDate: this.props.location.query.fromDate || "",
            toDate: this.props.location.query.toDate || "",
            auditType: this.props.location.query.auditType || "",
            createdBy: this.props.location.query.createdBy || "",
            pageSize: pageSize,
            pageNo: 1
          }
        }
      })
      .then(result => {
        this.props.notifySuccess(REQUEST_REPORT_SUCCESS)
      })
  }

  startAuditAuto(auditId) {
    var _this = this
    var auditId = this.props.checkedAudit
    let formData = {
      audit_id_list: auditId.constructor.name !== "Array" ? [auditId] : auditId,
      pps_list: []
    }
    let auditData = {
      method: POST,
      cause: START_AUDIT_TASK,
      formdata: formData
    }
    var dataToSent = JSON.stringify(auditData)
    this.props.client
      .query({
        query: AUDIT_REQUEST_QUERY,
        variables: (function() {
          return {
            input: {
              data: dataToSent
            }
          }
        })(),
        fetchPolicy: "network-only"
      })
      .then(data => {
        _this.props.setAuditSpinner(false)
        var AuditRequestSubmit = data.data.AuditRequestSubmit
          ? JSON.parse(data.data.AuditRequestSubmit.list)
          : ""

        AuditParse(AuditRequestSubmit, "START_AUDIT", _this)
      })
  }

  startAudit() {
    var auditId = this.props.checkedAudit
    modal.add(AuditStart, {
      title: "",
      size: "large",
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true, // (optional) if you don't wanna show the top right close button
      auditID: auditId
      //.. all what you put in here you will get access in the modal props ;),
    })
  }

  viewAuditDetails() {
    modal.add(viewDetailsAudit, {
      title: "",
      size: "large",
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;),
    })
  }

  _refreshList(query) {
    this.props.setAuditSpinner(true)
    var me = this
    if (this.props.currentPageNumber < this.props.TotalPage)
      this.callGraphql(query)
    else {
      if (query.shouldRefresh) {
        this._clearFilter()
        this.callGraphql(query)
      }
      me.props.setAuditSpinner(false)
    }
  }

  callGraphql(query) {
    var me = this
    if (query.scrolling) {
      var pageNo = this.props.currentPageNumber + 1
      this.props.setCurrentPageNumber(pageNo)
      query = this.props.location.query
      query.scrolling = true
    }
    if (query)
      this.props.auditfilterState({
        tokenSelected: {
          __typename: "AuditFilterTokenSelected",
          AUDIT_TYPE: query.auditType
            ? query.auditType.constructor === Array
              ? query.auditType
              : [query.auditType]
            : [ANY],
          STATUS: query.status
            ? query.status.constructor === Array
              ? query.status
              : [query.status]
            : [ALL],
          CREATED_BY: query.createdBy
            ? query.createdBy.constructor === Array
              ? query.createdBy
              : [query.createdBy]
            : [ALL],
          INVENTORY_FOUND: query.inventoryFound
            ? query.inventoryFound.constructor === Array
              ? query.inventoryFound
              : [query.inventoryFound]
            : [ALL],
          SOURCE: query.creatorName
            ? query.creatorName.constructor === Array
              ? query.creatorName
              : [query.creatorName]
            : [ALL]
        },
        searchQuery: {
          __typename: "AuditFilterSearchQuery",
          SPECIFIC_SKU_ID: query.skuId || "",
          SPECIFIC_LOCATION_ID: query.locationId || "",
          AUDIT_TASK_ID: query.taskId || "",
          AUDIT_TASK_NAME: query.taskName || "",
          ORDER_NO: query.orderNo || "",
          SPECIFIC_PPS_ID: query.ppsId || "",
          FROM_DATE: query.fromDate || "",
          TO_DATE: query.toDate || ""
        },
        defaultToken: {
          __typename: "AuditFilterDefaultToken",
          AUDIT_TYPE: [ANY],
          STATUS: [ALL],
          CREATED_BY: [ALL],
          INVENTORY_FOUND: [ALL],
          SOURCE: [ALL]
        }
      })
    this.props.client
      .query({
        query: AUDIT_QUERY,
        variables: {
          input: {
            skuId: this.props.location.query.skuId || "",
            locationId: this.props.location.query.locationId || "",
            taskId: this.props.location.query.taskId || "",
            taskName: this.props.location.query.taskName || "",
            orderNo: this.props.location.query.orderNo || "",
            ppsId: this.props.location.query.ppsId || "",
            operatingMode: this.props.location.query.operatingMode || "",
            status: this.props.location.query.status || "",
            fromDate: this.props.location.query.fromDate || "",
            toDate: this.props.location.query.toDate || "",
            auditType: this.props.location.query.auditType || "",
            createdBy: this.props.location.query.createdBy || "",
            inventoryFound: this.props.location.query.inventoryFound || "",
            creatorName: this.props.location.query.creatorName || "",
            pageSize: 10,
            pageNo: pageNo || 1
          }
        },
        fetchPolicy: "network-only"
      })
      .then(data => {
        me.props.setAuditSpinner(false)
        var a = JSON.stringify(
          data.data.AuditList ? data.data.AuditList.list : []
        )

        me.props.listDataAudit(a)
        let stateData, finalData
        stateData = me.state.AuditList
        if (query.scrolling) {
          finalData = stateData.concat(data.data.AuditList.list)
        } else {
          finalData = data.data.AuditList.list
        }
        me.setState({ AuditList: finalData })
        me.props.setAuditDetails(finalData)
      })
      .catch(err => {
        me.props.setAuditSpinner(false)
      })
  }
  /**
   *
   */
  _clearFilter() {
    this.props.auditfilterState({
      tokenSelected: {
        AUDIT_TYPE: [ANY],
        STATUS: [ALL],
        CREATED_BY: [ALL],
        __typename: "AuditFilterTokenSelected"
      },
      searchQuery: {
        SPECIFIC_SKU_ID: null,
        SPECIFIC_LOCATION_ID: null,
        AUDIT_TASK_ID: null,
        SPECIFIC_PPS_ID: null,
        FROM_DATE: null,
        TO_DATE: null,
        __typename: "AuditFilterSearchQuery"
      },
      defaultToken: {
        AUDIT_TYPE: [ANY],
        STATUS: [ALL],
        CREATED_BY: [ALL],
        __typename: "AuditFilterDefaultToken"
      }
    })
    this.props.filterApplied(false)
    hashHistory.push({ pathname: "/audit/auditlisting", query: {} })
  }

  _cancelAudit(auditId) {
    let cancelAuditData = {
      auditId: auditId,
      method: PUT,
      cause: CANCEL_AUDIT,
      contentType: APP_JSON
    }
    let dataToSent = JSON.stringify(cancelAuditData)

    this.props.setAuditSpinner(true)
    this.props.client
      .query({
        query: AUDIT_REQUEST_QUERY,
        variables: (function() {
          return {
            input: {
              data: dataToSent
            }
          }
        })(),
        fetchPolicy: "network-only"
      })
      .then(data => {
        _this.props.setAuditSpinner(false)
      })
  }

  pauseAudit(auditId) {
    var _this = this
    let audit_id =
      auditId.constructor.name !== "Array" ? auditId : auditId.toString()
    let pauseAuditData = {
      auditId: audit_id,
      method: PUT,
      cause: PAUSE_AUDIT,
      contentType: APP_JSON
    }
    let dataToSent = JSON.stringify(pauseAuditData)
    this.props.setAuditSpinner(true)
    this.props.client
      .query({
        query: AUDIT_REQUEST_QUERY,
        variables: (function() {
          return {
            input: {
              data: dataToSent
            }
          }
        })(),
        fetchPolicy: "network-only"
      })
      .then(data => {
        _this.props.setAuditSpinner(false)
        var AuditRequestSubmit = data.data.AuditRequestSubmit
          ? JSON.parse(data.data.AuditRequestSubmit.list)
          : ""

        AuditParse(AuditRequestSubmit, "pause", _this)
      })
  }

  _processAuditData(data, nProps) {
    if (!this.state.AuditList) {
      return []
    }
    nProps = this
    data = this.state.AuditList

    let notStarted = nProps.context.intl.formatMessage(
      messages.auditNotStartedStatus
    )
    let waitingOperator = nProps.context.intl.formatMessage(
      messages.auditwaitingOperatorStatus
    )
    let cancelled = nProps.context.intl.formatMessage(messages.auditCancelled)
    let paused = nProps.context.intl.formatMessage(messages.auditPausedStatus)
    let completed = nProps.context.intl.formatMessage(
      messages.auditCompletedStatus
    )
    let sku = nProps.context.intl.formatMessage(messages.auditSKU)
    let location = nProps.context.intl.formatMessage(messages.auditLocation)
    let completedOutof = nProps.context.intl.formatMessage(
      messages.completedOutof
    )
    let linestobeResolved = nProps.context.intl.formatMessage(
      messages.linestobeResolved
    )
    let linesRejected = nProps.context.intl.formatMessage(
      messages.linesRejected
    )
    let linesApproved = nProps.context.intl.formatMessage(
      messages.linesApproved
    )
    let auditWaiting = nProps.context.intl.formatMessage(
      messages.auditwaitingStatus
    )
    let auditConflicting = nProps.context.intl.formatMessage(
      messages.auditConflictingOperatorStatus
    )

    var timeOffset = nProps.props.timeOffset || ""
    var checkedAudit = nProps.props.checkedAudit || {}

    var auditType = { sku: sku, location: location }
    var auditDetails = [],
      auditData = {}
    var i,
      limit = data.length
    for (i = 0; i <= limit - 1; i++) {
      auditData.id = data[i].audit_id
      auditData.display_id = data[i].display_id
      auditData.progressBarflag = false
      if (data[i].audit_name) {
        auditData.audit_name = data[i].audit_name
      } else {
        auditData.audit_name = ""
      }
      auditData.auditBased = data[i].audit_type ? data[i].audit_type : ""
      auditData.pps_id =
        data[i].audit_status == "audit_created"
          ? ""
          : data[i].pps_id
          ? data[i].pps_id
          : ""

      if (data[i].audit_status == "audit_created") {
        auditData.status = notStarted
      } else if (data[i].audit_status == "audit_cancelled") {
        auditData.status = cancelled
      } else if (data[i].audit_status == "audit_paused") {
        auditData.status = paused
      } else if (data[i].audit_status == "audit_accepted") {
        auditData.status = waitingOperator
      } else if (data[i].audit_status == "audit_conflicting") {
        auditData.status = auditConflicting
      } else if (data[i].audit_status == "audit_waiting") {
        auditData.status = auditWaiting
      } else if (
        (data[i].start_request_time && data[i].completion_time) ||
        data[i].audit_status == "audit_aborted"
      ) {
        auditData.status = completed
      } else if (
        data[i].audit_status == "audit_pending" ||
        data[i].audit_status == "audit_started" ||
        data[i].audit_status == "audit_tasked" ||
        data[i].audit_status == "audit_rejected" ||
        data[i].audit_status == "audit_pending_approval"
      ) {
        auditData.progressBarflag = true
        auditData.status =
          data[i].audit_progress.completed +
          " " +
          completedOutof +
          " " +
          data[i].audit_progress.total
      } else {
        auditData.status = data[i].audit_status
      }

      auditData.progressStatus = data[i].audit_progress

      if (
        data[i].audit_button_data &&
        data[i].audit_button_data.audit_start_button === "enable"
      ) {
        auditData.startAudit = true
      } else {
        auditData.startAudit = false
      }

      if (
        data[i].audit_button_data &&
        data[i].audit_button_data.audit_resolve_button === "enable"
      ) {
        auditData.resolveAudit = true
      } else {
        auditData.resolveAudit = false
      }

      //Create time need to be add
      if (data[i].start_request_time) {
        if (getDaysDiff(data[i].start_request_time) < 2) {
          auditData.startTime =
            nProps.context.intl.formatRelative(data[i].start_request_time, {
              timeZone: timeOffset,
              units: "day"
            }) +
            ", " +
            nProps.context.intl.formatTime(data[i].start_request_time, {
              timeZone: timeOffset,
              hour: "numeric",
              minute: "numeric",
              hour12: false
            })
        } else {
          auditData.startTime = nProps.context.intl.formatDate(
            data[i].start_request_time,
            {
              timeZone: timeOffset,
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }
          )
        }

        if (data[i].completion_time) {
          if (
            getDaysDiff(data[i].completion_time) ==
            getDaysDiff(data[i].start_request_time)
          ) {
            auditData.endTime = nProps.context.intl.formatTime(
              data[i].completion_time,
              {
                timeZone: timeOffset,
                hour: "numeric",
                minute: "numeric",
                hour12: false
              }
            )
          } else {
            auditData.endTime = nProps.context.intl.formatDate(
              data[i].completion_time,
              {
                timeZone: timeOffset,
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              }
            )
          }
        } else auditData.endTime = ""
      }
      var endTIme = auditData.endTime !== "" ? " - " + auditData.endTime : ""
      auditData.totalTime =
        (auditData.startTime ? auditData.startTime : "") +
        (auditData.endTime ? endTIme : "")

      if (data[i].completion_time) {
        if (getDaysDiff(data[i].completion_time) < 2) {
          auditData.completedTime =
            nProps.context.intl.formatRelative(data[i].completion_time, {
              timeZone: timeOffset,
              units: "day"
            }) +
            ", " +
            nProps.context.intl.formatTime(data[i].completion_time, {
              timeZone: timeOffset,
              hour: "numeric",
              minute: "numeric",
              hour12: false
            })
        } else {
          auditData.completedTime = nProps.context.intl.formatDate(
            data[i].completion_time,
            {
              timeZone: timeOffset,
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }
          )
        }
      } else {
        auditData.completedTime = "--"
      }
      auditData.resolved = data[i].resolved
      if (data[i].audit_button_data.audit_resolve_button == "enable") {
        auditData.lineResolveState =
          data[i].unresolved > 0
            ? data[i].unresolved + " " + linestobeResolved
            : ""
      }
      if (data[i].audit_button_data.audit_reaudit_button == "enable") {
        auditData.lineReAuditState =
          data[i].rejected > 0 ? data[i].rejected + " " + linesRejected : ""
      }
      auditData.lineApprovedState =
        data[i].approved > 0 ? data[i].approved + " " + linesApproved : ""

      auditData.button = data[i].audit_button_data
      auditData.startButton =
        data[i].audit_button_data.audit_start_button === "enable" ? true : false
      auditData.resolveButton =
        data[i].audit_button_data.audit_resolve_button === "enable"
          ? true
          : false
      auditData.reauditButton =
        data[i].audit_button_data.audit_reaudit_button === "enable"
          ? true
          : false
      auditData.cancelButton =
        data[i].audit_button_data.audit_cancel_button === "enable"
          ? true
          : false
      auditData.deleteButton =
        data[i].audit_button_data.audit_delete_button === "enable"
          ? true
          : false
      auditData.duplicateButton =
        data[i].audit_button_data.audit_duplicate_button === "enable"
          ? true
          : false
      auditData.detailsButton = true

      auditData.system_created_audit =
        data[i].audit_created_by === SYSTEM_GENERATED
          ? true
          : data[i].audit_creator_name

      auditDetails.push(auditData)
      auditData = {}
    }
    return auditDetails
  }

  headerCheckChange(e) {
    let checkedAudit = this.state.AuditList
    let arr = []

    if (e.currentTarget.checked) {
      for (let i = 0, len = checkedAudit.length; i < len; i++) {
        if (checkedAudit[i].audit_button_data.audit_start_button === "enable") {
          arr.push(checkedAudit[i].audit_id)
        }
      }
      this.props.setCheckedAudit(arr)
    } else {
      this.props.setCheckedAudit([])
    }
  }

  _mappingString(selectvalue) {
    switch (selectvalue) {
      case "sku":
        return SPECIFIC_SKU_ID
      case "location":
        return SPECIFIC_LOCATION_ID
      default:
        return "any"
    }
  }

  _setFilter() {
    var newState = !this.props.showFilter
    this.props.showTableFilter(newState)
  }

  createAudit() {
    modal.add(CreateAudit, {
      title: "",
      size: "large",
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;),
    })
  }

  suggestedAudit() {
    modal.add(suggestedAudit, {
      title: "",
      size: "large",
      closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true, // (optional) if you don't wanna show the top right close button
      refreshList: this._refreshList.bind(this)
      //.. all what you put in here you will get access in the modal props ;),
    })
  }

  //Render Function goes here
  render() {
    let autoAssignpps = this.context.intl.formatMessage(messages.autoAssignpps)
    let manualAssignpps = this.context.intl.formatMessage(
      messages.manualAssignpps
    )

    let checkedAuditCount = this.props.checkedAudit.length
    let auditCount = this.state.AuditList
    let totalStartAuditCount = 0
    for (let i = 0, len = auditCount.length; i < len; i++) {
      if (auditCount[i].audit_button_data.audit_start_button === "enable")
        totalStartAuditCount++
    }
    var filterHeight = screen.height - 190
    var timeOffset = this.props.timeOffset || "",
      headerTimeZone = this.context.intl.formatDate(Date.now(), {
        timeZone: timeOffset,
        year: "numeric",
        timeZoneName: "long"
      }),
      totalProgress = 0

    /*Extracting Time zone string for the specified time zone*/
    headerTimeZone = headerTimeZone.substr(5, headerTimeZone.length)

    var auditData = this._processAuditData()

    var renderTab = (
      <AuditListingTab
        items={auditData}
        refreshCallback={this._refreshList.bind(this)}
        setCheckedAudit={this.props.setCheckedAudit}
        setCheckedAuditName={this.props.setCheckedAuditName}
        checkedAudit={this.props.checkedAudit}
        checkedAuditName={this.props.checkedAuditName}
        location={this.props.location}
        currentPage={this.props.location ? this.props.location.query.page : 1}
        totalPage={this.props.totalPage || 0}
        totalAudits={this.state.totalAudits || 0}
        pauseAudit={this.pauseAudit.bind(this)}
      />
    )

    let toolbar = (
      <div>
        <div
          className="gor-filter-wrap"
          style={{
            display: this.props.showFilter ? "block" : "none",
            height: filterHeight
          }}
        >
          <AuditFilter
            auditDetail={this.props.AuditList}
            pollingFunc={this.polling}
            pollTimerId={this.state.timerId}
            showAuditFilter={this.showAuditFilter}
            isFilterApplied={this.props.isFilterApplied}
            auditfilterState={this.props.auditFilterStatus || null}
            query={this.props.location.query}
          />
        </div>
        <div className="gorToolBar auditListingToolbar">
          <div className="gorToolBarWrap auditListingToolbarWrap">
            <div className="auditHeaderContainer">
              <label className="container">
                <input
                  type="checkbox"
                  checked={this.props.checkedAudit.length == 0 ? "" : true}
                  onChange={this.headerCheckChange.bind(this)}
                />
                <span
                  className={
                    totalStartAuditCount == checkedAuditCount
                      ? "checkmark"
                      : "checkmark1"
                  }
                />
              </label>
              <span className="auditHeader">
                <FormattedMessage
                  id="audit.header.Audit"
                  description="button label for audit"
                  defaultMessage="Audits"
                />
              </span>
            </div>
            {this.props.checkedAudit.length > 1 ? (
              <div
                style={{
                  display: "inline",
                  "border-left": "1px solid #aaaaaa",
                  float: "right"
                }}
              >
                <ActionDropDown
                  style={{
                    width: "115px",
                    display: "inline",
                    float: "right",
                    "padding-left": "25px"
                  }}
                  clickOptionBack={this._handelClick}
                  data={[{ name: manualAssignpps, value: "mannualassignpps" }]}
                >
                  <button className="gor-add-btn gor-listing-button">
                    <FormattedMessage
                      id="audit.start.Audit"
                      description="button label for start"
                      defaultMessage="START"
                    />
                    <div className="got-add-notch" />
                  </button>
                </ActionDropDown>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="gor-audit-filter-create-wrap">
            <div className="gor-button-wrap">
              <button
                disabled={this.props.TotalResults > 0 ? false : true}
                className={
                  this.props.TotalResults > 0
                    ? "gor-audit-generate-report-btn"
                    : "gor-audit-generate-report-btn disabled"
                }
                onClick={this.generateAuditReport.bind(this)}
              >
                <FormattedMessage
                  id="audit.table.generateAuditReport"
                  description="button label for generate report"
                  defaultMessage="GENERATE REPORT"
                />
              </button>
            </div>

            <div className="gor-button-wrap">
              <button
                className="gor-audit-create-btn"
                onClick={this.createAudit.bind(this)}
              >
                <div className="gor-filter-add-token-white" />
                <FormattedMessage
                  id="audit.table.createAudit"
                  description="button label for audit create"
                  defaultMessage="CREATE AUDIT"
                />
              </button>
            </div>
            <div className="gor-button-wrap">
              <button
                className="gor-suggested-audit-btn"
                onClick={this.suggestedAudit.bind(this)}
              >
                <FormattedMessage
                  id="audit.table.suggestedAudit"
                  description="button label for audit suggest"
                  defaultMessage="SUGGESTED AUDIT"
                />
              </button>
            </div>
            <div className="gor-button-wrap">
              <button
                className={
                  this.props.isFilterApplied
                    ? "gor-filterBtn-applied"
                    : "gor-filterBtn-btn"
                }
                onClick={this.showAuditFilter.bind(this, true)}
              >
                <div className="gor-manage-task" />
                <FormattedMessage
                  id="audit.filter.filterLabel"
                  description="button label for filter"
                  defaultMessage="FILTER DATA"
                />
              </button>
            </div>
          </div>
        </div>
        {/*Filter Summary*/}
        <FilterSummary
          total={this.state.totalAudits || 0}
          isFilterApplied={this.props.isFilterApplied}
          filterText={
            <FormattedMessage
              id="auditList.filter.search.bar"
              description="total results for filter search bar"
              defaultMessage="{total} results found"
              values={{ total: this.state.totalAudits || "0" }}
            />
          }
          refreshList={this._clearFilter.bind(this)}
          refreshText={
            <FormattedMessage
              id="auditList.filter.search.bar.showall"
              description="button label for show all"
              defaultMessage="Show all results"
            />
          }
        />
      </div>
    )

    return (
      <div>
        <div>
          <div className="gor-Auditlist-table">
            {!this.props.showFilter ? (
              <Spinner
                isLoading={this.props.auditSpinner}
                setSpinner={this.props.setAuditSpinner}
              />
            ) : (
              ""
            )}
            {toolbar}
            {renderTab}
          </div>
        </div>
      </div>
    )
  }
}
AuditTab.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    intlMessages: state.intl.messages,
    timeOffset: state.authLogin.timeOffset
  }
}

var mapDispatchToProps = function(dispatch) {
  return {
    notifyfeedback: function(data) {
      dispatch(notifyfeedback(data))
    },
    setNotification: function(data) {
      dispatch(setNotification(data))
    },
    notifySuccess: function(data) {
      dispatch(notifySuccess(data))
    },
    notifyFail: function(data) {
      dispatch(notifyFail(data))
    }
  }
}

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
  getAuditData: React.PropTypes.func,
  showTableFilter: React.PropTypes.func,
  setTextBoxStatus: React.PropTypes.func
}

const withQuery = graphql(AUDIT_QUERY, {
  props: function(data) {
    return {
      AuditList: data.data.AuditList ? data.data.AuditList.list : [],
      PageResult: data.data.AuditList ? data.data.AuditList.page_results : 10,
      TotalPage: data.data.AuditList ? data.data.AuditList.total_pages : 0,
      TotalResults: data.data.AuditList ? data.data.AuditList.total_results : 0,
      CurrentPageNo: data.data.AuditList ? data.data.AuditList.page : 1
    }
  },
  options: ({ match, location }) => ({
    variables: (function() {
      return {
        input: {
          skuId: location.query.skuId || "",
          locationId: location.query.locationId || "",
          taskId: location.query.taskId || "",
          ppsId: location.query.ppsId || "",
          operatingMode: location.query.operatingMode || "",
          status: location.query.status || "",
          fromDate: location.query.fromDate || "",
          toDate: location.query.toDate || "",
          auditType: location.query.auditType || "",
          createdBy: location.query.createdBy || "",
          pageSize: 10,
          pageNo: location.query.page || 1
        }
      }
    })(),
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only"
  })
})

const SET_VISIBILITY = gql`
  mutation setAuditFiler($filter: String!) {
    setShowAuditFilter(filter: $filter) @client
  }
`

const SET_FILTER_APPLIED = gql`
  mutation setFilterApplied($isFilterApplied: String!) {
    setAuditFilterApplied(isFilterApplied: $isFilterApplied) @client
  }
`

const SET_PAGE_NUMBER = gql`
  mutation setPageNumber($pageNumber: Int!) {
    setAuditPageNumber(pageNumber: $pageNumber) @client
  }
`
const SET_AUDIT_SPINNER_STATE = gql`
  mutation setauditSpinner($auditSpinner: String!) {
    setAuditSpinnerState(auditSpinner: $auditSpinner) @client
  }
`

const SET_LIST_DATA = gql`
  mutation setListData($listData: String!) {
    setAuditListData(listData: $listData) @client
  }
`
const SET_FILTER_STATE = gql`
  mutation setFilterState($state: String!) {
    setAuditFilterState(state: $state) @client
  }
`
const SET_CHECKED_AUDIT = gql`
  mutation setCheckedAudit($checkedAudit: Array!) {
    setCheckedAudit(checkedAudit: $checkedAudit) @client
  }
`

const withClientData = graphql(auditClientData, {
  props: data => ({
    showFilter: data.data.auditFilter.display,
    isFilterApplied: data.data.auditFilter.isFilterApplied,
    currentPageNumber: data.data.auditFilter.pageNumber,
    auditFilterStatus: JSON.parse(
      JSON.stringify(data.data.auditFilter.filterState)
    )
  })
})
const clientauditNeedRefreshFlag = graphql(auditNeedRefreshFlag, {
  props: data => ({
    auditRefreshFlag: data.data.auditNeedRefreshFlag
      ? data.data.auditNeedRefreshFlag.auditRefreshFlag
      : false
  })
})

const clientAuditSelectedData = graphql(auditSelectedData, {
  props: data => ({
    checkedAudit: data.data.ppsCheckedData.checkedAudit
  })
})
const clientAuditSpinnerState = graphql(auditSpinnerState, {
  props: data => ({
    auditSpinner: data.data.auditSpinnerstatus.auditSpinner
  })
})

const checkedAudit = graphql(SET_CHECKED_AUDIT, {
  props: ({ mutate, ownProps }) => ({
    setCheckedAudit: function(data) {
      mutate({ variables: { checkedAudit: data } })
    }
  })
})

const setVisibilityFilter = graphql(SET_VISIBILITY, {
  props: ({ mutate, ownProps }) => ({
    showAuditFilter: function(show) {
      mutate({ variables: { filter: show } })
    }
  })
})
const setFilterApplied = graphql(SET_FILTER_APPLIED, {
  props: ({ mutate, ownProps }) => ({
    filterApplied: function(applied) {
      mutate({ variables: { isFilterApplied: applied } })
    }
  })
})

const setPageNumber = graphql(SET_PAGE_NUMBER, {
  props: ({ mutate, ownProps }) => ({
    setCurrentPageNumber: function(number) {
      mutate({ variables: { pageNumber: number } })
    }
  })
})
const setListData = graphql(SET_LIST_DATA, {
  props: ({ mutate, ownProps }) => ({
    listDataAudit: function(data) {
      mutate({ variables: { listData: data } })
    }
  })
})

const setFilterState = graphql(SET_FILTER_STATE, {
  props: ({ mutate, ownProps }) => ({
    auditfilterState: function(state) {
      mutate({ variables: { state: state } })
    }
  })
})
const setSpinnerState = graphql(SET_AUDIT_SPINNER_STATE, {
  props: ({ mutate, ownProps }) => ({
    setAuditSpinner: function(spinnerState) {
      mutate({ variables: { auditSpinner: spinnerState } })
    }
  })
})

const SET_AUDIT_DETAILS = gql`
  mutation setauditListRefresh($auditDetails: String!) {
    setAuditDetails(auditDetails: $auditDetails) @client
  }
`
const setAuditListDetails = graphql(SET_AUDIT_DETAILS, {
  props: ({ mutate, ownProps }) => ({
    setAuditDetails: function(auditDetails) {
      mutate({ variables: { auditDetails: auditDetails } })
    }
  })
})

const SET_AUDIT_LIST_REFRESH_STATE = gql`
  mutation setauditListRefresh($auditRefreshFlag: String!) {
    setAuditListRefreshState(auditRefreshFlag: $auditRefreshFlag) @client
  }
`
const setAuditListRefreshState = graphql(SET_AUDIT_LIST_REFRESH_STATE, {
  props: ({ mutate, ownProps }) => ({
    setAuditListRefresh: function(auditRefreshFlag) {
      mutate({ variables: { auditRefreshFlag: auditRefreshFlag } })
    }
  })
})

export default compose(
  withClientData,
  setListData,
  setVisibilityFilter,
  setFilterApplied,
  setPageNumber,
  setFilterState,
  checkedAudit,
  setAuditListDetails,
  clientAuditSelectedData,
  withQuery,
  withApollo,
  setSpinnerState,
  clientAuditSpinnerState,
  clientauditNeedRefreshFlag,
  setAuditListRefreshState
)(connect(mapStateToProps, mapDispatchToProps)(AuditTab))
