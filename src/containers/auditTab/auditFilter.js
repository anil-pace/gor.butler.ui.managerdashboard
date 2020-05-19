import React from "react"
import { FormattedMessage } from "react-intl"
import Filter from "../../components/tableFilter/filter"

import { connect } from "react-redux"
import FilterInputFieldWrap from "../../components/tableFilter/filterInputFieldWrap"
import FilterTokenWrap from "../../components/tableFilter/filterTokenContainer"
import {
  handelTokenClick,
  handleInputQuery
} from "../../components/tableFilter/tableFilterCommonFunctions"
import {
  ANY,
  ALL,
  SKU,
  LOCATION,
  SPECIFIC_LOCATION_ID,
  SPECIFIC_SKU_ID,
  SPECIFIC_PPS_ID,
  AUDIT_TASK_ID,
  FROM_DATE,
  TO_DATE,
  NOT_YET_STARTED,
  TO_BE_RESOLVED,
  REJECTED, //audit_rejected
  AUDIT_PAUSED,
  AUDIT_TYPE,
  AUDIT_TASK_NAME,
  LESS_THAN_EXPECTED,
  MORE_THAN_EXPECTED,
  ORDER_NO,
  AUDIT_COMPLETED,
  AUDIT_CANCELLED,
  INPROGRESS,
  SINGLE,
  SYSTEM_TAG,
  MANUAL_TAG
} from "../../constants/frontEndConstants"
import { hashHistory } from "react-router"
import { mappingArray, arrayDiff } from "../../utilities/utils"
import { graphql, withApollo, compose } from "react-apollo"
import gql from "graphql-tag"
import { AUDIT_USER_FETCH_QUERY } from "./query/serverQuery"
import { auditClientData } from "./query/clientQuery"

var isDisabledApplyButton = false
class AuditFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tokenSelected: {
        AUDIT_TYPE: [ANY],
        STATUS: [ALL],
        CREATED_BY: [ALL],
        INVENTORY_FOUND: [ALL],
        SOURCE: [ALL]
      },
      searchQuery: {},
      textboxStatus: null,
      defaultToken: {
        AUDIT_TYPE: [ANY],
        STATUS: [ALL],
        CREATED_BY: [ALL],
        INVENTORY_FOUND: [ALL],
        SOURCE: [ALL]
      }
    }
    this._applyFilter = this._applyFilter.bind(this)
    this._closeFilter = this._closeFilter.bind(this)
    this._clearFilter = this._clearFilter.bind(this)
    this._disableApplyButton = this._disableApplyButton.bind(this)
  }

  _closeFilter() {
    this.props.showAuditFilter(false)
  }
  _disableApplyButton = data => {
    isDisabledApplyButton = data
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auditFilterState) {
      if (
        nextProps.auditFilterState &&
        JSON.stringify(this.state) !==
          JSON.stringify(nextProps.auditFilterState)
      ) {
        this.setState(nextProps.auditFilterState)
      }
    }
  }

  _processAuditSearchField() {
    const filterInputFields = [
      {
        value: AUDIT_TASK_ID,
        label: (
          <FormattedMessage
            id="audit.inputField.id"
            defaultMessage="AUDIT ID"
          />
        )
      },
      {
        value: AUDIT_TASK_NAME,
        label: (
          <FormattedMessage
            id="audit.inputField.name"
            defaultMessage="AUDIT NAME"
          />
        )
      },
      {
        value: SPECIFIC_PPS_ID,
        label: (
          <FormattedMessage id="audit.inputField.pps" defaultMessage="PPS ID" />
        )
      },
      {
        value: SPECIFIC_SKU_ID,
        label: (
          <FormattedMessage id="audit.inputField.sku" defaultMessage="SKU ID" />
        )
      },
      {
        value: SPECIFIC_LOCATION_ID,
        label: (
          <FormattedMessage
            id="audit.inputField.location"
            defaultMessage="LOCATION ID"
          />
        )
      },
      {
        value: ORDER_NO,
        label: (
          <FormattedMessage
            id="audit.inputField.order_no"
            defaultMessage="ORDER NO (Max. 100)"
          />
        )
      },
      {
        value: FROM_DATE,
        by2value: true,
        type: "date",
        label: (
          <FormattedMessage
            id="audit.inputField.fromdate"
            defaultMessage="FROM DATE"
          />
        )
      },
      {
        value: TO_DATE,
        by2value: true,
        type: "date",
        label: (
          <FormattedMessage
            id="audit.inputField.todate"
            defaultMessage="TO DATE"
          />
        )
      }
    ]

    var inputValue = this.state.searchQuery
    var textboxStatus = this.state.textboxStatus || null
    var inputField = (
      <FilterInputFieldWrap
        disableApplyButton={this._disableApplyButton.bind(this)}
        inputText={filterInputFields}
        handleInputText={this._handleInputQuery.bind(this)}
        inputValue={inputValue}
        textboxStatus={textboxStatus}
      />
    )
    return inputField
  }

  _processFilterToken() {
    var tokenAuditTypeField = {
      value: "AUDIT_TYPE",
      label: (
        <FormattedMessage
          id="audit.tokenfield.typeAudit"
          defaultMessage="AUDIT TYPE"
        />
      )
    }
    let userArr = this.props.auditUserList || []
    let labelC3 = [
      {
        value: ALL,
        label: <FormattedMessage id="audit.token3.all" defaultMessage="Any" />
      }
    ]
    userArr.forEach(data => {
      labelC3.push({
        value: data,
        label: data
      })
    })

    var tokenStatusField = {
      value: "STATUS",
      label: (
        <FormattedMessage
          id="audit.tokenfield.STATUS"
          defaultMessage="STATUS"
        />
      )
    }
    var tokenCreatedByField = {
      value: "CREATED_BY",
      label: (
        <FormattedMessage
          id="audit.tokenfield.createdby"
          defaultMessage="CREATED BY"
        />
      )
    }

    var tokenInventoryFoundField = {
      value: "INVENTORY_FOUND",
      label: (
        <FormattedMessage
          id="audit.tokenfield.inventoryfound"
          defaultMessage="INVENTORY FOUND"
        />
      )
    }
    var tokenSourceField = {
      value: "SOURCE",
      label: (
        <FormattedMessage
          id="audit.tokenfield.source"
          defaultMessage="SOURCE"
        />
      )
    }
    const labelC1 = [
      {
        value: ANY,
        label: <FormattedMessage id="audit.token1.all" defaultMessage="Any" />
      },
      {
        value: SKU,
        label: <FormattedMessage id="audit.token1.sku" defaultMessage="SKU" />
      },
      {
        value: LOCATION,
        label: (
          <FormattedMessage
            id="audit.token1.location"
            defaultMessage="Location"
          />
        )
      }
    ]
    const labelC2 = [
      {
        value: ALL,
        label: <FormattedMessage id="audit.token2.all" defaultMessage="Any" />
      },
      {
        value: NOT_YET_STARTED,
        label: (
          <FormattedMessage
            id="audit.token2.notyetstarted"
            defaultMessage="Not yet started"
          />
        )
      },
      {
        value: INPROGRESS,
        label: (
          <FormattedMessage
            id="audit.token2.inProgress"
            defaultMessage="In progress"
          />
        )
      },
      {
        value: REJECTED,
        label: (
          <FormattedMessage
            id="audit.token2.auditrejected"
            defaultMessage="Rejected"
          />
        )
      },
      {
        value: TO_BE_RESOLVED,
        label: (
          <FormattedMessage
            id="audit.token2.toberesolved"
            defaultMessage="To be resolved"
          />
        )
      },
      {
        value: AUDIT_CANCELLED,
        label: (
          <FormattedMessage
            id="audit.token2.cancelled"
            defaultMessage="Cancelled"
          />
        )
      },
      {
        value: AUDIT_COMPLETED,
        label: (
          <FormattedMessage
            id="audit.token2.completed"
            defaultMessage="Completed"
          />
        )
      },
      {
        value: AUDIT_PAUSED,
        label: (
          <FormattedMessage id="audit.token2.paused" defaultMessage="Paused" />
        )
      }
    ]
    const labelC4 = [
      {
        value: ALL,
        label: <FormattedMessage id="audit.token4.all" defaultMessage="Any" />
      },
      {
        value: LESS_THAN_EXPECTED,
        label: (
          <FormattedMessage
            id="audit.token4.less_than_expected"
            defaultMessage="Less Than Expected"
          />
        )
      },
      {
        value: MORE_THAN_EXPECTED,
        label: (
          <FormattedMessage
            id="audit.token4.more_than_expected"
            defaultMessage="More Than Expected"
          />
        )
      }
    ]
    const labelC5 = [
      {
        value: ALL,
        label: <FormattedMessage id="audit.token4.all" defaultMessage="Any" />
      },
      {
        value: SYSTEM_TAG,
        label: (
          <FormattedMessage id="audit.token4.system" defaultMessage="System" />
        )
      },
      {
        value: MANUAL_TAG,
        label: (
          <FormattedMessage id="audit.token4.manual" defaultMessage="Manual" />
        )
      }
    ]

    var selectedToken = this.state.tokenSelected
    var column1 = (
      <FilterTokenWrap
        field={tokenStatusField}
        tokenCallBack={this._handelTokenClick.bind(this)}
        label={labelC2}
        selectedToken={selectedToken}
      />
    )
    var column2 = (
      <FilterTokenWrap
        field={tokenAuditTypeField}
        tokenCallBack={this._handelTokenClick.bind(this)}
        label={labelC1}
        selectedToken={selectedToken}
        selection={SINGLE}
      />
    )
    var column3 = (
      <FilterTokenWrap
        field={tokenCreatedByField}
        tokenCallBack={this._handelTokenClick.bind(this)}
        label={labelC3}
        selectedToken={selectedToken}
      />
    )
    var column4 = (
      <FilterTokenWrap
        field={tokenInventoryFoundField}
        tokenCallBack={this._handelTokenClick.bind(this)}
        label={labelC4}
        selectedToken={selectedToken}
        selection={SINGLE}
      />
    )
    var column5 = (
      <FilterTokenWrap
        field={tokenSourceField}
        tokenCallBack={this._handelTokenClick.bind(this)}
        label={labelC5}
        selectedToken={selectedToken}
        selection={SINGLE}
      />
    )

    var columnDetail = {
      column1token: column1,
      column2token: column2,
      column3token: column3,
      column4token: column4,
      column5token: column5
    }
    return columnDetail
  }

  _handelTokenClick(field, value, state) {
    var tempArray = [SPECIFIC_SKU_ID, SPECIFIC_LOCATION_ID]
    var obj = {},
      queryField,
      tokentoRemove
    var selectedToken = null
    var token = [value]
    this.setState(
      {
        tokenSelected: handelTokenClick(field, value, state, this.state)
      },
      () => {
        selectedToken = this.state.tokenSelected["AUDIT_TYPE"]
        if (state !== "addDefault") {
          obj.name = mappingArray(selectedToken)
          tokentoRemove = mappingArray(token, selectedToken)
          queryField =
            selectedToken.toString() === ANY
              ? tokentoRemove
              : arrayDiff(tempArray, obj.name)
          if (queryField && queryField.length !== 0) {
            this.setState({
              searchQuery: handleInputQuery("", queryField, this.state)
            })
          }
        }
        if (field == "AUDIT_TYPE")
          this.setState({ textboxStatus: JSON.stringify(obj) })
      }
    )
  }

  _handleInputQuery(inputQuery, queryField) {
    this.setState({
      searchQuery: handleInputQuery(inputQuery, queryField, this.state)
    })
  }

  _applyFilter() {
    var filterState = this.state,
      _query = {}

    if (
      JSON.stringify(this.state) !== JSON.stringify(this.props.auditFilterState)
    ) {
      this.props.setCurrentPageNumber(0)
    }

    if (
      filterState.tokenSelected[AUDIT_TYPE] &&
      filterState.tokenSelected[AUDIT_TYPE][0] !== ANY
    ) {
      _query.auditType = filterState.tokenSelected[AUDIT_TYPE]
    }
    if (
      filterState.tokenSelected["STATUS"] &&
      filterState.tokenSelected["STATUS"][0] !== ALL
    ) {
      _query.status = filterState.tokenSelected["STATUS"]
    }
    if (
      filterState.tokenSelected["CREATED_BY"] &&
      filterState.tokenSelected["CREATED_BY"][0] !== ALL
    ) {
      _query.createdBy = filterState.tokenSelected["CREATED_BY"]
    }
    if (
      filterState.tokenSelected["INVENTORY_FOUND"] &&
      filterState.tokenSelected["INVENTORY_FOUND"][0] !== ALL
    ) {
      _query.inventoryFound = filterState.tokenSelected["INVENTORY_FOUND"]
    }

    if (
      filterState.tokenSelected["SOURCE"] &&
      filterState.tokenSelected["SOURCE"][0] !== ALL
    ) {
      _query.creatorName = filterState.tokenSelected["SOURCE"]
    }

    if (filterState.searchQuery && filterState.searchQuery[AUDIT_TASK_ID]) {
      _query.taskId = filterState.searchQuery[AUDIT_TASK_ID]
    }
    if (filterState.searchQuery && filterState.searchQuery[AUDIT_TASK_NAME]) {
      _query.taskName = filterState.searchQuery[AUDIT_TASK_NAME]
    }
    if (filterState.searchQuery && filterState.searchQuery[SPECIFIC_SKU_ID]) {
      _query.skuId = filterState.searchQuery[SPECIFIC_SKU_ID]
    }
    if (
      filterState.searchQuery &&
      filterState.searchQuery[SPECIFIC_LOCATION_ID]
    ) {
      _query.locationId = filterState.searchQuery[SPECIFIC_LOCATION_ID]
    }
    if (filterState.searchQuery && filterState.searchQuery[SPECIFIC_PPS_ID]) {
      _query.ppsId = filterState.searchQuery[SPECIFIC_PPS_ID]
    }
    if (filterState.searchQuery && filterState.searchQuery[ORDER_NO]) {
      _query.orderNo = filterState.searchQuery[ORDER_NO]
    }

    if (filterState.searchQuery && filterState.searchQuery[FROM_DATE]) {
      _query.fromDate = filterState.searchQuery[FROM_DATE]
    }
    if (filterState.searchQuery && filterState.searchQuery[TO_DATE]) {
      _query.toDate = filterState.searchQuery[TO_DATE]
    }
    _query.pageNo = this.props.currentPage
    _query.pageSize = this.props.totalResults
    this.setFilterState(_query)
    this.props.filterApplied(true)
    hashHistory.push({ pathname: "/audit/auditlisting", query: _query })
    this.props.showAuditFilter(false)
  }

  setFilterState(query = {}) {
    this.props.auditfilterState({
      tokenSelected: {
        AUDIT_TYPE: query.auditType || [ANY],
        STATUS: query.status || [ALL],
        CREATED_BY: query.createdBy || [ALL],
        INVENTORY_FOUND: query.inventoryFound || [ALL],
        SOURCE: query.creatorName || [ALL],
        __typename: "AuditFilterTokenSelected"
      },
      searchQuery: {
        SPECIFIC_SKU_ID: query.skuId || null,
        SPECIFIC_LOCATION_ID: query.locationId || null,
        AUDIT_TASK_ID: query.taskId || null,
        AUDIT_TASK_NAME: query.taskName || null,
        ORDER_NO: query.orderNo || null,
        SPECIFIC_PPS_ID: query.ppsId || null,
        FROM_DATE: query.fromDate || null,
        TO_DATE: query.toDate || null,
        __typename: "AuditFilterSearchQuery"
      },
      defaultToken: {
        AUDIT_TYPE: [ANY],
        STATUS: [ALL],
        CREATED_BY: [ALL],
        INVENTORY_FOUND: [ALL],
        SOURCE: [ALL],
        __typename: "AuditFilterDefaultToken"
      }
    })
  }

  _clearFilter() {
    this.setFilterState()
    this.props.filterApplied(false)
    hashHistory.push({ pathname: "/audit/auditlisting", query: {} })
    this.props.showAuditFilter(false)
  }

  render() {
    var noOrder = this.props.noResultFound
    var auditSearchField = this._processAuditSearchField()
    var auditFilterToken = this._processFilterToken()
    return (
      <div>
        <Filter>
          <div className="gor-filter-header">
            <div className="gor-filter-header-h1">
              <FormattedMessage
                id="gor.filter.filterLabel"
                description="label for filter"
                defaultMessage="Filter data"
              />
            </div>
            <div className="gor-filter-header-h2" onClick={this._closeFilter}>
              <FormattedMessage
                id="gor.filter.hide"
                description="label for hide"
                defaultMessage="Hide"
              />
            </div>
          </div>
          <div>
            {noOrder ? (
              <div className="gor-no-result-filter">
                <FormattedMessage
                  id="gor.filter.noResult"
                  description="label for no result"
                  defaultMessage="No results found, please try again"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="gor-filter-body">
            <div className="gor-filter-body-input-wrap">{auditSearchField}</div>
            <div className="gor-filter-body-filterToken-wrap">
              <div className="gor-filter-body-filterToken-section1">
                {auditFilterToken.column1token}
              </div>
              <div className="gor-filter-body-filterToken-section2">
                {auditFilterToken.column2token}
              </div>
              <div className="gor-filter-body-filterToken-section2">
                {auditFilterToken.column3token}
              </div>
              <div className="gor-filter-body-filterToken-section2">
                {auditFilterToken.column5token}
              </div>
              <div className="gor-filter-body-filterToken-section1">
                {auditFilterToken.column4token}
              </div>
            </div>
          </div>
          <div className="gor-filter-footer">
            <span className="gor-filter-footer-h2" onClick={this._clearFilter}>
              <FormattedMessage
                id="gor.filter.reset"
                description="label for reset"
                defaultMessage="Reset"
              />
            </span>
            <div className="gor-filter-btn-wrap">
              <button
                disabled={isDisabledApplyButton}
                className="gor-add-btn"
                onClick={this._applyFilter}
              >
                {!this.props.auditSpinner ? (
                  <FormattedMessage
                    id="gor.filter.heading"
                    description="filter heading"
                    defaultMessage="Apply filter"
                  />
                ) : (
                  <div className="spinnerImage" />
                )}
              </button>
            </div>
          </div>
        </Filter>
      </div>
    )
  }
}
const withClientData = graphql(auditClientData, {
  props: data => ({
    auditFilterState: data.data.auditFilter
      ? JSON.parse(JSON.stringify(data.data.auditFilter.filterState))
      : null
  })
})

AuditFilter.PropTypes = {
  showFilter: React.PropTypes.bool,
  auditSpinner: React.PropTypes.bool,
  totalAudits: React.PropTypes.number,
  showTableFilter: React.PropTypes.func,
  filterApplied: React.PropTypes.func,
  auditFilterStatus: React.PropTypes.bool,
  showAuditFilter: React.PropTypes.func
}
const SET_TEXT_BOX_STATUS = gql`
  mutation setFilterTextBox($textBoxName: String!) {
    setAuditFilterTextBox(textBoxName: $textBoxName) @client
  }
`
const SET_FILTER_APPLIED = gql`
  mutation setFilterApplied($isFilterApplied: String!) {
    setAuditFilterApplied(isFilterApplied: $isFilterApplied) @client
  }
`
const SET_UPDATE_SUBSCRIPTION = gql`
  mutation setUpdateSubscription($isUpdateSubsciption: String!) {
    setAuditUpdateSubscription(isUpdateSubsciption: $isUpdateSubsciption)
      @client
  }
`
const SET_FILTER_STATE = gql`
  mutation setFilterState($state: String!) {
    setAuditFilterState(state: $state) @client
  }
`
const SET_PAGE_NUMBER = gql`
  mutation setPageNumber($pageNumber: Int!) {
    setAuditPageNumber(pageNumber: $pageNumber) @client
  }
`
const setPageNumber = graphql(SET_PAGE_NUMBER, {
  props: ({ mutate, ownProps }) => ({
    setCurrentPageNumber: function(number) {
      mutate({ variables: { pageNumber: number } })
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
const setUpdateSubscription = graphql(SET_UPDATE_SUBSCRIPTION, {
  props: ({ mutate, ownProps }) => ({
    updateSubscription: function(applied) {
      mutate({ variables: { isUpdateSubsciption: applied } })
    }
  })
})

const setTextBoxStatus = graphql(SET_TEXT_BOX_STATUS, {
  props: ({ mutate, ownProps }) => ({
    setTextBoxStatus: function(textBoxName) {
      mutate({ variables: { textBoxName: textBoxName } })
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

const initialQuery = graphql(AUDIT_USER_FETCH_QUERY, {
  props: function(data) {
    var list = { pps_list: [] }
    if (!data || !data.data.AuditFetchUser || !data.data.AuditFetchUser.list) {
      auditUserList: list.users
      return {}
    }

    return {
      auditUserList: data.data.AuditFetchUser.list.users
    }
  },
  options: ({ match, location }) => ({
    variables: {},
    fetchPolicy: "network-only"
  })
})
export default compose(
  initialQuery,
  withApollo,
  withClientData,
  setTextBoxStatus,
  setFilterApplied,
  setFilterState,
  setUpdateSubscription,
  setPageNumber
)(connect()(AuditFilter))
