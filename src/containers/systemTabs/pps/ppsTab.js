/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React from "react"
import PPStable from "./PPStable"
import { connect } from "react-redux"
import { changePPSmode } from "../../../actions/ppsModeChangeAction"
import { FormattedMessage } from "react-intl"
import Spinner from "../../../components/spinner/Spinner"
import { stringConfig } from "../../../constants/backEndConstants"
import { defineMessages } from "react-intl"
import { hashHistory } from "react-router"
import { setWsAction } from "./../../../actions/socketActions"
import { wsOverviewData } from "./../../../constants/initData.js"
import PPSFilter from "./ppsFilter"
import FilterSummary from "../../../components/tableFilter/filterSummary"
import Dropdown from "../../../components/gor-dropdown-component/dropdown"
import {
  ppsStatusFailure,
  ppsStatusSuccess,
  ppsModeFailure,
  ppsModeSuccess
} from "../../../constants/messageConstants"
import { notifySuccess, notifyFail } from "./../../../actions/validationActions"
import {
  WS_ONSEND,
  PPS_STATUS_OPEN,
  PPS_STATUS_CLOSE,
  PPS_STATUS_FCLOSE,
  GOR_FIRST_LAST,
  GOR_ON_STATUS
} from "../../../constants/frontEndConstants"
import {
  PPS_LIST_SUBSCRIPTION,
  PPS_LIST_QUERY,
  ppsClientData,
  SET_VISIBILITY,
  SET_FILTER_APPLIED,
  SET_FILTER_STATE,
  SET_CHECKED_PPS,
  CHANGE_PPS_STATUS_QUERY,
  CHANGE_PPS_MODE_QUERY,
  CHANGE_PPS_PROFILE_QUERY,
  PPS_BIN_LIST_QUERY
} from "./queries/ppsTab"
import { graphql, withApollo, compose } from "react-apollo"
import { modal } from "react-redux-modal"
import ClosePPSList from "./closePPSList"
import ConfirmChangePPSMode from "./confirmChangePPSMode"

//Mesages for internationalization
const messages = defineMessages({
  namePrefix: {
    id: "ppsDetail.name.prefix",
    description: "prefix for pps id in ppsDetail",
    defaultMessage: "PPS-{ppsId}"
  },
  perfPrefix: {
    id: "ppsDetail.performance.prefix.items",
    description: "prefix for pps id in ppsDetail",
    defaultMessage: "{performance} items/hr"
  },
  ppsBinFooter: {
    id: "ppsDetail.name.ppsBinFooter",
    description: "show currently active bins",
    defaultMessage: "{currentPpsId}/{totalPpsId} bins active"
  }
})

class PPS extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: null,
      sortedDataList: null,
      openCount: 0,
      closeCount: 0,
      Modes: {
        pick: 0,
        put: 0,
        audit: 0,
        search: 0
      },
      legacyDataSubscribed: false
    }
    this._clearFilter = this._clearFilter.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.changePPSStatus = this.changePPSStatus.bind(this)
    this.changePPSProfile = this.changePPSProfile.bind(this)
    this._subscribeLegacyData = this._subscribeLegacyData.bind(this)
    this.props.showPPSFilter(false)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.query &&
      (!this.state.query ||
        JSON.stringify(nextProps.location.query) !==
          JSON.stringify(this.state.query))
    ) {
      this.setState({ query: nextProps.location.query })
      this._refreshList(nextProps.location.query)
    }

    this._processCheckedPPS(nextProps)
    if (
      nextProps.data &&
      !this.props.data.PPSListSystem &&
      nextProps.data.PPSListSystem &&
      !this.subscription &&
      !nextProps.loading
    ) {
      this.updateSubscription(nextProps.location.query)
    }
    if (!this.state.legacyDataSubscribed && nextProps.socketAuthorized) {
      this.setState(
        {
          legacyDataSubscribed: true
        },
        () => {
          this._subscribeLegacyData()
        }
      )
    }
  }

  _subscribeLegacyData() {
    this.props.initDataSentCall(wsOverviewData["default"])
  }

  updateSubscription(variables) {
    if (this.subscription) {
      this.subscription()
    }
    this.subscription = this.props.data.subscribeToMore({
      variables: variables,
      document: PPS_LIST_SUBSCRIPTION,
      notifyOnNetworkStatusChange: true,
      updateQuery: (previousResult, newResult) => {
        return Object.assign(
          {},
          {
            PPSListSystem: {
              list: newResult.subscriptionData.data.PPSListSystem.list,
              __typename: previousResult.PPSListSystem.__typename
            }
          }
        )
      }
    })
  }
  /**
   * The method will update the subscription packet
   * and will fetch the data from the socket.
   * @private
   */
  _refreshList(query) {
    //this.props.setPpsSpinner(true)
    let filterSubsData = Object.assign({}, query)

    if (query.pps_id) {
      filterSubsData["pps_id"] = Number(query.pps_id)
    }
    if (query.pps_status) {
      filterSubsData["pps_status"] =
        query.pps_status.constructor === String
          ? [query.pps_status]
          : query.pps_status
    }
    if (query.current_task) {
      filterSubsData["current_task"] =
        query.current_task.constructor === String
          ? [query.current_task]
          : query.current_task
    }

    if (query.minRange || query.maxRange) {
      filterSubsData["performance"] = [query.minRange, query.maxRange]
    }

    if (
      Object.keys(query).filter(function(el) {
        return el !== "page"
      }).length !== 0
    ) {
      this.props.filterApplied(true)
    } else {
      this.props.filterApplied(false)
    }

    this.props.ppsfilterState({
      tokenSelected: {
        __typename: "tokenSelected",
        STATUS: filterSubsData.pps_status ? filterSubsData.pps_status : ["all"],
        MODE: query.current_task
          ? query.current_task.constructor === Array
            ? query.current_task
            : [query.current_task]
          : ["all"]
      },
      searchQuery: {
        __typename: "searchQuery",
        OPERATOR_ASSIGNED: filterSubsData.operators_assigned || null,
        PPS_ID: filterSubsData.pps_id || null
      },
      defaultToken: {
        STATUS: ["all"],
        MODE: ["all"],
        __typename: "defaultToken"
      }
    })
  }

  _processCheckedPPS(nextProps) {
    var closeCount = 0
    var openCount = 0
    var Modes = {
      put: 0,
      pick: 0,
      audit: 0,
      search: 0
    }
    for (let k in nextProps.checkedPps) {
      if (
        nextProps.checkedPps[k].statusPriority === 0 ||
        nextProps.checkedPps[k].statusPriority === 1
      ) {
        closeCount++
      } else {
        openCount++
      }

      if (nextProps.checkedPps[k].allowedModes) {
        for (let i = 0; i < nextProps.checkedPps[k].allowedModes.length; i++) {
          let allowedModes = nextProps.checkedPps[k].allowedModes[i]
          if (allowedModes === "put") {
            Modes.put++
          }
          if (allowedModes === "pick") {
            Modes.pick++
          }
          if (allowedModes === "audit") {
            Modes.audit++
          }
          if (allowedModes === "search") {
            Modes.search++
          }
        }
      }
    }

    this.setState({
      openCount: openCount,
      closeCount: closeCount,
      Modes: Modes
    })
  }

  _clearFilter() {
    hashHistory.push({ pathname: "/system/pps", query: {} })
  }
  _filterList(init_data, input_variables) {
    input_variables = Object.assign(
      {
        pps_id: null,
        operator: null,
        current_task: null,
        pps_status: null,
        performance: null
      },
      input_variables
    )
    return init_data.filter(function(pps) {
      let matchPPSId = !input_variables["pps_id"],
        matchOperator = !input_variables["operator"],
        matchCurrentTask = !input_variables["current_task"],
        matchStatus = !input_variables["pps_status"],
        matchPerformance = !input_variables["performance"]
      for (let key in input_variables) {
        if (key === "pps_id" && input_variables[key]) {
          if (pps[key] && pps[key].toString() === input_variables[key]) {
            matchPPSId = true
          } else {
            matchPPSId = false
          }
        } else if (key === "operator" && input_variables[key]) {
          if (
            pps[key] &&
            pps[key][0].toString().replace(",", " ") === input_variables[key]
          ) {
            matchOperator = true
          } else {
            matchOperator = false
          }
        } else if (
          (key === "current_task" || key === "pps_status") &&
          input_variables[key]
        ) {
          let isStatus = key === "pps_status"
          if (input_variables[key].constructor === Array) {
            for (let i = 0, len = input_variables[key].length; i < len; i++) {
              if (
                input_variables[key][i].toUpperCase() === pps[key].toUpperCase()
              ) {
                if (isStatus) {
                  matchStatus = true
                } else {
                  matchCurrentTask = true
                }
              }
            }
          } else {
            if (
              input_variables[key].toUpperCase() === "ANY" ||
              input_variables[key].toUpperCase() === pps[key].toUpperCase()
            ) {
              if (isStatus) {
                matchStatus = true
              } else {
                matchCurrentTask = true
              }
            } else {
              if (isStatus) {
                matchStatus = false
              } else {
                matchCurrentTask = false
              }
            }
          }
        } else if (key === "performance" && input_variables[key]) {
          let performance = input_variables[key].split(",")
          performance[0] =
            Number(performance[0]) === 0 ? -1 : Number(performance[0])
          if (
            performance[0] <= Number(pps[key]) &&
            Number(performance[1]) >= Number(pps[key])
          ) {
            matchPerformance = true
          } else {
            matchPerformance = false
          }
        }
      }
      return (
        matchPPSId &&
        matchOperator &&
        matchCurrentTask &&
        matchStatus &&
        matchPerformance
      )
    })
  }

  _processPPSData() {
    var binDetailsList = this.props.binDetails
    var PPSData = [],
      detail = {},
      ppsId,
      performance,
      totalUser = 0
    var nProps = this
    var pps_data = nProps.props.data.PPSListSystem
      ? nProps.props.data.PPSListSystem.list
      : [] //nProps.props.PPSDetail.PPStypeDetail;
    var data = Object.keys(nProps.props.location.query).length
      ? this._filterList(pps_data, nProps.props.location.query)
      : pps_data
    let OPEN, CLOSE, FCLOSE, PERFORMANCE, ppsBinDetails
    let pick = nProps.context.intl.formatMessage(stringConfig.pick)
    let put = nProps.context.intl.formatMessage(stringConfig.put)
    let audit = nProps.context.intl.formatMessage(stringConfig.audit)
    let search = nProps.context.intl.formatMessage(stringConfig.search)
    var currentTask = { pick: pick, put: put, audit: audit, search: search }
    var priStatus = { open: 2, close: 0, force_close: 1 }
    var checkedPPS = this.props.checkedPps || {}
    var requestedStatusText = "--"
    detail.totalOperator = 0
    for (var i = data.length - 1; i >= 0; i--) {
      detail = {}
      ppsId = data[i].pps_id
      if (binDetailsList) {
        for (var j = 0; j < binDetailsList.length; j++) {
          if (ppsId === parseInt(binDetailsList[j].pps_id)) {
            let activeBins, totalBins
            activeBins = binDetailsList[j].active_bins
            totalBins = binDetailsList[j].total_bins
            ppsBinDetails = nProps.context.intl.formatMessage(
              messages.ppsBinFooter,
              { currentPpsId: activeBins, totalPpsId: totalBins }
            )
          }
        }
      }
      performance = data[i].performance < 0 ? 0 : data[i].performance
      OPEN = nProps.context.intl.formatMessage(stringConfig.open)
      CLOSE = nProps.context.intl.formatMessage(stringConfig.close)
      FCLOSE = nProps.context.intl.formatMessage(stringConfig.fclose)
      PERFORMANCE = nProps.context.intl.formatMessage(messages.perfPrefix, {
        performance: performance ? performance : "0"
      })
      if (data[i]["requested_status"] === PPS_STATUS_OPEN) {
        requestedStatusText = OPEN
      } else if (data[i]["requested_status"] === PPS_STATUS_CLOSE) {
        requestedStatusText = CLOSE
      } else if (data[i]["requested_status"] === PPS_STATUS_FCLOSE) {
        requestedStatusText = FCLOSE
      } else {
        requestedStatusText = "--"
      }
      detail.id = ppsId
      detail.ppsId = ppsId
      detail.pickPal = data[i].pps_tags ? data[i].pps_tags[0] : ""
      detail.binDetails = ppsBinDetails
      detail.requested_status = requestedStatusText
      detail.pps_requested_mode = data[i]["pps_requested_mode"]
      detail.isChecked = checkedPPS[data[i].pps_id] ? true : false
      if (data[i].pps_status === PPS_STATUS_OPEN) {
        detail.status = OPEN
        detail.statusPriority = priStatus[data[i].pps_status]
      } else if (data[i].pps_status === PPS_STATUS_CLOSE) {
        detail.status = CLOSE
        detail.statusPriority = 0
      } else {
        detail.status = FCLOSE
        detail.statusPriority = 1
      }
      detail.allowedModes = data[i].allowed_modes
      detail.statusClass = data[i].pps_status
      detail.operatingMode = currentTask[data[i].current_task]
      detail.operatingModeClass = data[i].current_task
      detail.performance = PERFORMANCE ///  orders /items
      detail.ppsThroughput = data[i].performance < 0 ? 0 : data[i].performance
      if (!data[i].operators_assigned) {
        detail.operatorAssigned = "--"
      } else {
        var userFirstLast
        totalUser = totalUser + data[i].operators_assigned.length
        for (var j = data[i].operators_assigned.length - 1; j >= 0; j--) {
          if (GOR_FIRST_LAST) {
            userFirstLast =
              (data[i].operators_assigned[j][0]
                ? data[i].operators_assigned[j][0]
                : "") +
              " " +
              (data[i].operators_assigned[j][1]
                ? data[i].operators_assigned[j][1]
                : "")
          } else {
            userFirstLast =
              (data[i].operators_assigned[j][1]
                ? data[i].operators_assigned[j][1]
                : "") +
              " " +
              (data[i].operators_assigned[j][0]
                ? data[i].operators_assigned[j][0]
                : "")
          }
          if (detail.operatorAssigned) {
            detail.operatorAssigned =
              detail.operatorAssigned + ", " + userFirstLast
          } else {
            detail.operatorAssigned = userFirstLast
          }
        }
        detail.totalOperator =
          detail.totalOperator + data[i].operators_assigned.length
      }
      detail.totalUser = totalUser
      detail.profiles = data[i].pps_profiles || []
      PPSData.push(detail)
    }
    return PPSData
  }

  _setFilter() {
    this.props.showPPSFilter(!this.props.showFilter)
  }

  updateSortedDataList(updatedList) {
    this.setState({ sortedDataList: updatedList })
  }

  changePPSStatus(requestObj) {
    let _this = this
    _this.props.client
      .query({
        query: CHANGE_PPS_STATUS_QUERY,
        variables: {
          input: {
            pps_id: JSON.stringify(requestObj)
          }
        },
        fetchPolicy: "network-only"
      })
      .then(data => {
        if (data.data.ChangePPSStatus) {
          let statusChangeData = JSON.parse(data.data.ChangePPSStatus.list)
          let unsuccessfulData = Object.keys(statusChangeData.unsuccessful)
            .length
          let successfulData = statusChangeData.successful.length
          if (unsuccessfulData) {
            _this.props.notifyFail(
              ppsStatusFailure
                .replace("{unsuccessful}", unsuccessfulData)
                .replace("{totalCount}", successfulData + unsuccessfulData)
            )
            _this.props.setCheckedPps(
              JSON.stringify(
                _this._getUnSuccessfulPPS(
                  Object.keys(statusChangeData.unsuccessful)
                )
              )
            )
          } else {
            _this.props.notifySuccess(ppsStatusSuccess)
            _this.props.setCheckedPps("{}")
          }
        }
      })
  }
  _getUnSuccessfulPPS(unSuccessfulPPS) {
    const checkedPPS = this.props.checkedPps || {}
    var unSuccessfulPPSList = {}
    for (let k in checkedPPS) {
      for (let j = 0, innerLen = unSuccessfulPPS.length; j < innerLen; j++) {
        if (k === unSuccessfulPPS["pps_id"]) {
          unSuccessfulPPSList[k] = checkedPPS["pps_id"]
        }
      }
    }
    return unSuccessfulPPSList
  }
  changePPSProfile(pps_id, profile) {
    let _this = this
    _this.props.client.query({
      query: CHANGE_PPS_PROFILE_QUERY,
      variables: {
        input: {
          pps_id: pps_id,
          profile: profile
        }
      },
      fetchPolicy: "network-only"
    })
  }

  /*handler for status change*/
  handleStatusChange(selection, requestObj) {
    var checkedPPS = [],
      j = 0,
      sortedIndex

    if (selection.value === "close") {
      if (!requestObj) {
        let selectedPps = this.props.checkedPps,
          openPps = {}
        for (let k in selectedPps) {
          if (selectedPps[k].statusPriority === 2) {
            // status priority for open is 2
            openPps[k] = selectedPps[k]
          }
        }
        modal.add(ClosePPSList, {
          title: "",
          heading: (
            <FormattedMessage
              id="pps.close.heading"
              description="Heading for Close PPS"
              defaultMessage="Close PPS"
            />
          ),
          size: "large", // large, medium or small,
          closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
          hideCloseButton: true,
          checkedPPS: openPps,
          handleStatusChange: this.handleStatusChange
        })
      } else {
        this.changePPSStatus(requestObj)
      }
    } else if (selection.value === "open") {
      let formData = {},
        checkedPps = this.props.checkedPps,
        selectedPps = {}
      for (let k in this.props.checkedPps) {
        selectedPps[k] = "open"
      }
      formData["requested_pps_status"] = selectedPps
      this.changePPSStatus(formData)
    }
  }
  changePPSmode(params) {
    let _this = this
    _this.props.client
      .query({
        query: CHANGE_PPS_MODE_QUERY,
        variables: {
          input: params
        },
        fetchPolicy: "network-only"
      })
      .then(data => {
        if (data.data.ChangePPSMode) {
          let modeChangeData = JSON.parse(data.data.ChangePPSMode.list)
          let unsuccessfulData = Object.keys(modeChangeData.unsuccessful).length
          let successfulData = modeChangeData.successful.length
          if (unsuccessfulData) {
            _this.props.notifyFail(
              ppsModeFailure
                .replace("{unsuccessful}", unsuccessfulData)
                .replace("{totalCount}", successfulData + unsuccessfulData)
            )
          } else {
            _this.props.notifySuccess(ppsModeSuccess)
          }
        }
      })
  }

  handleModeChange(data) {
    var checkedPPS = [],
      j = 0,
      mode = data.value,
      sortedIndex,
      formData = {}
    checkedPPS = Object.keys(this.props.checkedPps)
    formData["pps_id"] = checkedPPS
    formData["requested_pps_mode"] = mode
    this.changePPSmode(formData)
  }

  modeChangeConfirmation(data) {
    if (
      this.props.data.PPSListSystem.list.length ===
      Object.keys(this.props.checkedPps).length
    ) {
      let self = this
      modal.add(ConfirmChangePPSMode, {
        title: "",
        size: "large", // large, medium or small,
        closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
        hideCloseButton: true, // (optional) if you don't wanna show the top right close button
        applyMode: self.handleModeChange.bind(this, data)
      })
    } else {
      this.handleModeChange(data)
    }
  }

  render() {
    let filterHeight = screen.height - 190 - 50
    let updateStatusIntl = ""
    let operationMode = { pick: 0, put: 0, audit: 0, notSet: 0, search: 0 }
    let data,
      operatorNum = 0,
      itemNumber = 5,
      ppsOn = 0,
      avgThroughput = 0
    if (this.props.data.PPSListSystem !== undefined) {
      data = this._processPPSData()
      for (var i = data.length - 1; i >= 0; i--) {
        if (data[i].operatingModeClass !== null) {
          operationMode[data[i].operatingModeClass]++
        } else {
          operationMode = { Pick: "--", Put: "--", Audit: "--", NotSet: "--" }
          operatorNum = "--"
        }

        if (operatorNum < data[i].totalUser) {
          operatorNum = data[i].totalUser
        }

        if (data[i].statusClass.toLowerCase() === GOR_ON_STATUS.toLowerCase()) {
          ppsOn++
        }

        if (data[i].ppsThroughput) {
          avgThroughput = avgThroughput + data[i].ppsThroughput
        }
      }

      if (data.length) {
        avgThroughput = (avgThroughput / data.length).toFixed(1)
      }
    }

    let drop,
      selected = 0,
      statusDrop
    let pickDrop = (
      <FormattedMessage
        id="PPS.table.pickDrop"
        description="pick dropdown option for PPS"
        defaultMessage="Put"
      />
    )
    let putDrop = (
      <FormattedMessage
        id="PPS.table.putDrop"
        description="put dropdown option for PPS"
        defaultMessage="Pick"
      />
    )
    let auditDrop = (
      <FormattedMessage
        id="PPS.table.auditDrop"
        description="audit dropdown option for PPS"
        defaultMessage="Audit"
      />
    )
    let searchDrop = (
      <FormattedMessage
        id="PPS.table.searchDrop"
        description="Item Search dropdown option for PPS"
        defaultMessage="Item Search"
      />
    )
    let openStatusLabel = (
      <FormattedMessage
        id="PPS.table.openStatusLabel"
        description="audit dropdown option for Status change"
        defaultMessage="Open Selected PPS"
      />
    )
    let closeStatusLabel = (
      <FormattedMessage
        id="PPS.table.closeStatusLabel"
        description="audit dropdown option for Status change"
        defaultMessage="Close Selected PPS"
      />
    )
    let statusDropPHolder = (
      <FormattedMessage
        id="PPS.table.statusPlaceholder"
        description="Placeholder for status dropdown"
        defaultMessage="Change PPS Status"
      />
    )
    let modeDropPHolder = (
      <FormattedMessage
        id="PPS.table.modePlaceholder"
        description="Placeholder for mode dropdown"
        defaultMessage="Change PPS Mode"
      />
    )

    var openCount = this.state.openCount
    var closeCount = this.state.closeCount
    var Modes = this.state.Modes
    var count = openCount + closeCount
    const bDropRender = this.props.checkedPps
      ? Object.keys(this.props.checkedPps).length
        ? false
        : true
      : true
    const status = [
      {
        value: "open",
        disabled: closeCount ? false : true,
        label: openStatusLabel
      },
      {
        value: "close",
        disabled: openCount ? false : true,
        label: closeStatusLabel
      }
    ]
    const modes = [
      {
        value: "put",
        disabled: Modes.put === count ? false : true,
        label: pickDrop
      },
      {
        value: "pick",
        disabled: Modes.pick === count ? false : true,
        label: putDrop
      },
      {
        value: "audit",
        disabled: Modes.audit === count ? false : true,
        label: auditDrop
      },
      {
        value: "search",
        disabled: Modes.search === count ? false : true,
        label: searchDrop
      }
    ]

    drop = (
      <Dropdown
        options={modes}
        onSelectHandler={e => this.modeChangeConfirmation(e)}
        disabled={bDropRender}
        resetOnSelect={true}
        placeholder={modeDropPHolder}
      />
    )

    statusDrop = (
      <Dropdown
        options={status}
        onSelectHandler={e => this.handleStatusChange(e)}
        disabled={bDropRender}
        resetOnSelect={true}
        placeholder={statusDropPHolder}
      />
    )

    if (this.props.checkedPps) {
      selected = Object.keys(this.props.checkedPps).length
    }

    return (
      <div>
        <div>
          <div className="gorTesting gor-pps-tab">
            {this.props.data.loading && (
              <Spinner isLoading={this.props.data.loading} setSpinner={null} />
            )}
            {data ? (
              <div>
                <div
                  className="gor-filter-wrap"
                  style={{
                    width: this.props.showFilter ? "350px" : "0px",
                    height: filterHeight
                  }}
                >
                  <PPSFilter
                    noResults={data.length === 0}
                    isFilterApplied={this.props.isFilterApplied}
                    ppsfilterState={this.props.ppsfilterState}
                    setCheckedPps={this.props.setCheckedPps}
                    showTableFilter={this.props.showPPSFilter}
                    filterState={this.props.filterState}
                    responseFlag={this.props.responseFlag}
                  />
                </div>

                <div className="gorToolBar">
                  <div className="gorToolBarWrap">
                    <div className="gorToolBarElements">
                      <FormattedMessage
                        id="pps.table.heading"
                        description="Heading for PPS"
                        defaultMessage="Pick Put Stations"
                      />
                      <div className="gorHeaderSubText">
                        <FormattedMessage
                          id="PPStable.selected"
                          description="selected pps for ppsSelected"
                          defaultMessage="{selected} selected"
                          values={{ selected: selected ? selected : "0" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="filterWrapper">
                    <div className="gorToolBarDropDown pps">{statusDrop}</div>
                    <div className="gorToolBarDropDown pps">{drop}</div>
                    <div className="gorToolBarDropDown">
                      <div className="gor-button-wrap">
                        <div className="gor-button-sub-status">
                          {this.props.lastUpdatedText} {this.props.lastUpdated}{" "}
                        </div>
                        <button
                          className={
                            this.props.isFilterApplied
                              ? "gor-filterBtn-applied"
                              : "gor-filterBtn-btn"
                          }
                          onClick={this._setFilter.bind(this)}
                        >
                          <div className="gor-manage-task" />
                          <FormattedMessage
                            id="gor.filter.filterLabel"
                            description="button label for filter"
                            defaultMessage="Filter data"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/*Filter Summary*/}
                <FilterSummary
                  total={data.length || 0}
                  isFilterApplied={this.props.isFilterApplied}
                  responseFlag={this.props.responseFlag}
                  filterText={
                    <FormattedMessage
                      id="ppsList.filter.search.bar"
                      description="total pps for filter search bar"
                      defaultMessage="{total} Stations found"
                      values={{ total: data.length || 0 }}
                    />
                  }
                  refreshList={this._clearFilter}
                  refreshText={
                    <FormattedMessage
                      id="ppsList.filter.search.bar.showall"
                      description="button label for show all"
                      defaultMessage="Show all Stations"
                    />
                  }
                />
              </div>
            ) : null}

            <PPStable
              updateSortedDataList={this.updateSortedDataList.bind(this)}
              items={data}
              itemNumber={itemNumber}
              operatorNum={operatorNum}
              operationMode={operationMode}
              modeChange={this.props.changePPSmode}
              intlMessg={this.props.intlMessages}
              sortHeaderState={this.props.ppsHeaderSort}
              currentSortState={this.props.ppsSortHeader}
              sortHeaderOrder={this.props.ppsHeaderSortOrder}
              currentHeaderOrder={this.props.ppsSortHeaderState}
              setCheckedPps={this.props.setCheckedPps}
              checkedPps={this.props.checkedPps}
              ppsOnState={ppsOn}
              renderDdrop={this.props.setDropDisplay}
              bDropRender={this.props.bDropRender}
              setCheckAll={this.props.setCheckAll}
              getCheckAll={this.props.getCheckAll}
              setPpsFilter={this.props.ppsFilterDetail}
              getPpsFilter={this.props.ppsFilter}
              avgThroughput={avgThroughput}
              ppsFilterState={this.props.ppsFilterState}
              isFilterApplied={this.props.isFilterApplied}
              lastUpdatedText={updateStatusIntl}
              lastUpdated={updateStatusIntl}
              showFilter={this.props.showFilter}
              setFilter={this.props.showPPSFilter}
              refreshList={this._clearFilter}
              changePPSProfile={this.changePPSProfile}
            />
          </div>
        </div>
      </div>
    )
  }
}
const withQuery = graphql(PPS_LIST_QUERY, {
  props: data => data,
  options: ({ match, location }) => ({
    variables: {},
    fetchPolicy: "network-only"
  })
})

const withClientData = graphql(ppsClientData, {
  props: data => ({
    showFilter: data.data.ppsFilter ? data.data.ppsFilter.display : false,
    isFilterApplied: data.data.ppsFilter
      ? data.data.ppsFilter.isFilterApplied
      : false,
    checkedPps: data.data.checkedPPS
      ? JSON.parse(data.data.checkedPPS.checkedPPSList)
      : null,
    filterState: data.data.ppsFilter ? data.data.ppsFilter.filterState : {}
  })
})

const withQueryGetPpsConfigDetails = graphql(PPS_BIN_LIST_QUERY, {
  props: function(data) {
    if (!data || !data.data.PpsBinList || !data.data.PpsBinList.list) {
      return {}
    }
    return {
      binDetails: data.data.PpsBinList.list
    }
  },
  options: ({ match, location }) => ({
    variables: {},
    fetchPolicy: "network-only"
  })
})

const setVisibilityFilter = graphql(SET_VISIBILITY, {
  props: ({ mutate, ownProps }) => ({
    showPPSFilter: function(show) {
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
const setCheckedPps = graphql(SET_CHECKED_PPS, {
  props: ({ mutate, ownProps }) => ({
    setCheckedPps: function(checkedPPSList) {
      mutate({ variables: { checkedPPSList: checkedPPSList } })
    }
  })
})
const setFilterState = graphql(SET_FILTER_STATE, {
  props: ({ mutate, ownProps }) => ({
    ppsfilterState: function(state) {
      mutate({ variables: { state: state } })
    }
  })
})

PPS.contextTypes = {
  intl: React.PropTypes.object.isRequired
}
PPS.PropTypes = {
  ppsFilter: React.PropTypes.string,
  getCheckAll: React.PropTypes.bool,
  bDropRender: React.PropTypes.bool,
  ppsSortHeader: React.PropTypes.string,
  ppsSortHeaderState: React.PropTypes.string,
  ppsSpinner: React.PropTypes.bool,
  PPSDetail: React.PropTypes.array,
  showFilter: React.PropTypes.bool,
  ppsFilterState: React.PropTypes.bool,
  ppsFilterDetail: React.PropTypes.func,
  changePPSmode: React.PropTypes.func,
  setPpsSpinner: React.PropTypes.func,
  ppsHeaderSort: React.PropTypes.func,
  ppsHeaderSortOrder: React.PropTypes.func,
  setCheckedPps: React.PropTypes.func,
  setDropDisplay: React.PropTypes.func,
  setCheckAll: React.PropTypes.func,
  showTableFilter: React.PropTypes.func,
  filterApplied: React.PropTypes.func,
  isFilterApplied: React.PropTypes.bool,
  wsSubscriptionData: React.PropTypes.object
}
function mapStateToProps(state, ownProps) {
  return {
    intlMessages: state.intl.messages,
    socketAuthorized: state.recieveSocketActions.socketAuthorized
  }
}
function mapDispatchToProps(dispatch) {
  return {
    notifySuccess: function(data) {
      dispatch(notifySuccess(data))
    },
    notifyFail: function(data) {
      dispatch(notifyFail(data))
    },
    initDataSentCall: function(data) {
      dispatch(setWsAction({ type: WS_ONSEND, data: data }))
    }
  }
}

export default compose(
  withClientData,
  withApollo,
  withQuery,
  setVisibilityFilter,
  setFilterApplied,
  setCheckedPps,
  withQueryGetPpsConfigDetails,
  setFilterState
)(connect(mapStateToProps, mapDispatchToProps)(PPS))
