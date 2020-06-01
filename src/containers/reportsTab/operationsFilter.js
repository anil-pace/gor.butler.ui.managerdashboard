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
import { REPORTS_FILTER_PARAMS } from "../../constants/filterParams"
import { hashHistory } from "react-router"
import { SINGLE } from "../../constants/frontEndConstants"

class OperationsFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.filterState
    this._closeFilter = this._closeFilter.bind(this)
    this._applyFilter = this._applyFilter.bind(this)
    this._processSearchField = this._processSearchField.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.filterState &&
      JSON.stringify(this.state) !== JSON.stringify(nextProps.filterState)
    ) {
      this.setState(nextProps.filterState)
    }
    /**
     * Hide the filter as soon as data in the list get updated.
     */
    if (
      nextProps.data.length > 0 &&
      this.props.refreshedAt !== nextProps.refreshedAt
    ) {
      this.props.showOperationsLogFilter(false)
    }
  }

  _closeFilter() {
    this.props.showOperationsLogFilter(false)
  }

  _processSearchField(filterInputFields) {
    let inputValue = this.state.searchQuery
    let inputField = (
      <FilterInputFieldWrap
        inputText={filterInputFields}
        handleInputText={this._handleInputQuery.bind(this)}
        inputValue={inputValue}
      />
    )
    return inputField
  }

  _processFilterParams() {
    var filterParams = JSON.parse(JSON.stringify(REPORTS_FILTER_PARAMS))
    var filterInputFields = [],
      statusToken = {},
      statusLabels = [],
      timePeriodToken = {},
      timePeriodLabels = [],
      operatingModeToken = {},
      operatingModeLabels = []
    for (let i = 0, len = filterParams.length; i < len; i++) {
      let filter = filterParams[i],
        textInput = {},
        tokenInput
      if (filter["type"] === "text") {
        textInput["value"] = filter.name
        textInput["label"] = filter.labelText
        filterInputFields.push(textInput)
      } else if (filter["type"] === "token") {
        let tokens = filter["tokens"]
        if (filter["name"] === "status") {
          statusToken["value"] = filter["name"]
          statusToken["label"] = filter["labelText"]
        } else if (filter["name"] === "timeperiod") {
          timePeriodToken["value"] = filter["name"]
          timePeriodToken["label"] = filter["labelText"]
        } else if (filter["name"] === "operatingMode") {
          operatingModeToken["value"] = filter["name"]
          operatingModeToken["label"] = filter["labelText"]
        }
        for (let k in tokens) {
          let token = {}
          token.value = k
          token.label = tokens[k]
          if (filter["name"] === "status") {
            statusLabels.push(token)
          } else if (filter["name"] === "timeperiod") {
            timePeriodLabels.push(token)
          } else if (filter["name"] === "operatingMode") {
            operatingModeLabels.push(token)
          }
        }
      }
    }
    return {
      filterInputFields,
      statusLabels,
      statusToken,
      timePeriodLabels,
      timePeriodToken,
      operatingModeToken,
      operatingModeLabels
    }
  }

  _processFilterToken(filterParams) {
    let selectedToken = this.state.tokenSelected
    let statusColumn = (
      <FilterTokenWrap
        field={filterParams.statusToken}
        tokenCallBack={this._handelTokenClick.bind(this)}
        label={filterParams.statusLabels}
        selectedToken={selectedToken}
      />
    )
    let timePeriodColumn = (
      <FilterTokenWrap
        selection={SINGLE}
        field={filterParams.timePeriodToken}
        tokenCallBack={this._handelTokenClick.bind(this)}
        label={filterParams.timePeriodLabels}
        selectedToken={selectedToken}
      />
    )
    let operatingModeColumn = (
      <FilterTokenWrap
        field={filterParams.operatingModeToken}
        tokenCallBack={this._handelTokenClick.bind(this)}
        label={filterParams.operatingModeLabels}
        selectedToken={selectedToken}
      />
    )
    let columnDetail = {
      column1token: statusColumn,
      column2token: timePeriodColumn,
      column3token: operatingModeColumn
    }
    return columnDetail
  }

  _handelTokenClick(field, value, state) {
    var stateObject = JSON.parse(JSON.stringify(this.state))
    this.setState({
      tokenSelected: handelTokenClick(field, value, state, stateObject)
    })
  }

  _handleInputQuery(inputQuery, queryField) {
    var stateObject = JSON.parse(JSON.stringify(this.state))
    this.setState({
      searchQuery: handleInputQuery(inputQuery, queryField, stateObject)
    })
  }

  _applyFilter() {
    this.props.resetPage()
    let filterState = this.state,
      _query = {}
    if (filterState.searchQuery) {
      if (filterState.searchQuery["request_id"]) {
        _query.request_id = filterState.searchQuery["request_id"]
      }

      if (filterState.searchQuery["external_id"]) {
        _query.external_id = filterState.searchQuery["external_id"]
      }
      if (filterState.searchQuery["source_id"]) {
        _query.source_id = filterState.searchQuery["source_id"]
      }
      if (filterState.searchQuery["destination_id"]) {
        _query.destination_id = filterState.searchQuery["destination_id"]
      }
      if (filterState.searchQuery["pps_id"]) {
        _query.pps_id = filterState.searchQuery["pps_id"]
      }
      if (filterState.searchQuery["sku_id"]) {
        _query.sku_id = filterState.searchQuery["sku_id"]
      }
      if (filterState.searchQuery["user_id"]) {
        _query.user_id = filterState.searchQuery["user_id"]
      }

      if (
        filterState.tokenSelected["status"] &&
        filterState.tokenSelected["status"][0] !== "any"
      ) {
        _query.status = filterState.tokenSelected["status"]
      }
      if (
        filterState.tokenSelected["timeperiod"] &&
        filterState.tokenSelected["timeperiod"][0] !== "realtime"
      ) {
        _query.time_period = filterState.tokenSelected["timeperiod"]
      }
      if (
        filterState.tokenSelected["operatingMode"] &&
        filterState.tokenSelected["operatingMode"][0] !== "any"
      ) {
        _query.operatingMode = filterState.tokenSelected["operatingMode"]
      }
      hashHistory.push({ pathname: "/reports/operationsLog", query: _query })
    }
  }

  render() {
    var filterParams = this._processFilterParams()
    let olSearchField = this._processSearchField(filterParams.filterInputFields)
    let olFilterToken = this._processFilterToken(filterParams)
    var noData = this.props.noResults
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
            {noData ? (
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
            <div className="gor-filter-body-filterToken-wrap">
              <div className="gor-filter-body-filterToken-section1">
                {olFilterToken.column1token}
                <div>{olFilterToken.column3token}</div>
              </div>
              <div className="gor-filter-body-filterToken-section2">
                {olFilterToken.column2token}
              </div>
            </div>
            <div className="gor-filter-body-input-wrap">{olSearchField}</div>
          </div>
          <div className="gor-filter-footer">
            <span
              className="gor-filter-footer-h2"
              onClick={this.props.refreshList}
            >
              <FormattedMessage
                id="gor.filter.reset"
                description="label for reset"
                defaultMessage="Reset"
              />
            </span>
            <div className="gor-filter-btn-wrap">
              <button className="gor-add-btn" onClick={this._applyFilter}>
                {!this.props.responseFlag ? (
                  <FormattedMessage
                    id="gor.filter.heading"
                    description="filter heading"
                    defaultMessage="Apply filter"
                  />
                ) : (
                    <div className="spinnerImage"></div>
                  )}
              </button>
            </div>
          </div>
        </Filter>
      </div>
    )
  }
}
OperationsFilter.propTypes = {
  filters: React.PropTypes.object,
  pageSize: React.PropTypes.string,
  hideLayer: React.PropTypes.bool,
  responseFlag: React.PropTypes.bool
}
OperationsFilter.defaultProps = {
  filters: {},
  pageSize: "25",
  hideLayer: true,
  responseFlag: false
}

export default OperationsFilter
