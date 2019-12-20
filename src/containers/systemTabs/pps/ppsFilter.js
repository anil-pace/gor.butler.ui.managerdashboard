import React from "react"
import { FormattedMessage } from "react-intl"
import Filter from "../../../components/tableFilter/filter"
import FilterInputFieldWrap from "../../../components/tableFilter/filterInputFieldWrap"
import FilterTokenWrap from "../../../components/tableFilter/filterTokenContainer"
import {
  handelTokenClick,
  handleInputQuery
} from "../../../components/tableFilter/tableFilterCommonFunctions"
import RangeSlider from "../../../components/rangeSlider/RangeSlider"
import { filterMarks } from "../../../constants/frontEndConstants"
import { hashHistory } from "react-router"

class PPSFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tokenSelected: { STATUS: ["all"], MODE: ["all"] },
      searchQuery: {},
      defaultToken: { STATUS: ["all"], MODE: ["all"] },
      rangeSelected: { minValue: ["-1"], maxValue: ["500"] }
    }
    this._closeFilter = this._closeFilter.bind(this)
    this._clearFilter = this._clearFilter.bind(this)
    this._applyFilter = this._applyFilter.bind(this)
  }

  _closeFilter() {
    this.props.showTableFilter(false)
  }

  _processPPSSearchField() {
    const filterInputFields = [
      {
        value: "PPS_ID",
        label: (
          <FormattedMessage id="pps.inputField.id" defaultMessage="PPS ID" />
        )
      },
      {
        value: "OPERATOR_ASSIGNED",
        label: (
          <FormattedMessage
            id="pps.inputField.oprator"
            defaultMessage="OPERATOR ASSIGNED"
          />
        )
      }
    ]
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

  componentWillReceiveProps(nextProps) {
    /**
     * It will update the state as soon as
     * filters are cleared.
     */
    if (
      nextProps.filterState &&
      JSON.stringify(this.state) !== JSON.stringify(nextProps.filterState)
    ) {
      this.setState(nextProps.filterState)
    }

    /* Hide the filter as soon as data in the list get updated.*/

    if (nextProps.noResults !== this.props.noResults) {
      this.props.showTableFilter(nextProps.noResults ? true : false)
    }
  }

  _processFilterToken() {
    let tokenField1 = {
      value: "STATUS",
      label: <FormattedMessage id="pps.token.status" defaultMessage="STATUS" />
    }
    let tokenField2 = {
      value: "MODE",
      label: (
        <FormattedMessage id="pps.token.timePeriod" defaultMessage="MODE" />
      )
    }
    let labelC1 = [
      {
        value: "all",
        label: <FormattedMessage id="pps.STATUS.all" defaultMessage="Any" />
      },
      {
        value: "open",
        label: (
          <FormattedMessage id="pps.STATUS.stopped" defaultMessage="Open" />
        )
      },
      {
        value: "close",
        label: <FormattedMessage id="pps.STATUS.error" defaultMessage="Close" />
      },
      {
        value: "force_close",
        label: (
          <FormattedMessage
            id="pps.STATUS.fclose"
            defaultMessage="Force Close"
          />
        )
      }
    ]
    let labelC2 = [
      {
        value: "all",
        label: <FormattedMessage id="pps.MODE.all" defaultMessage="Any" />
      },
      {
        value: "pick",
        label: <FormattedMessage id="pps.MODE.pick" defaultMessage="Pick" />
      },
      {
        value: "put",
        label: <FormattedMessage id="pps.MODE.put" defaultMessage="Put" />
      },
      {
        value: "audit",
        label: <FormattedMessage id="pps.MODE.audit" defaultMessage="Audit" />
      },
      {
        value: "search",
        label: (
          <FormattedMessage id="v.MODE.search" defaultMessage="Item Search" />
        )
      },
      {
        value: "notset",
        label: <FormattedMessage id="v.MODE.notset" defaultMessage="Not set" />
      }
    ]
    let selectedToken = this.state.tokenSelected
    let column1 = (
      <FilterTokenWrap
        field={tokenField1}
        tokenCallBack={this._handelTokenClick.bind(this)}
        label={labelC1}
        selectedToken={selectedToken}
      />
    )
    let column2 = (
      <FilterTokenWrap
        field={tokenField2}
        tokenCallBack={this._handelTokenClick.bind(this)}
        label={labelC2}
        selectedToken={selectedToken}
      />
    )
    let columnDetail = { column1token: column1, column2token: column2 }
    return columnDetail
  }

  _handleRangeSlider() {
    return (
      <div>
        <span className="sliderHeaderText">PERFORMANCE RANGE</span>

        <RangeSlider.Range
          min={0}
          max={500}
          step={100}
          marks={filterMarks}
          maxValue={500}
          defaultValue={[0, 500]}
          allowCross={false}
          onChange={this._changeSliderRange.bind(this)}
        />
      </div>
    )
  }

  _handelTokenClick(field, value, state) {
    this.setState({
      tokenSelected: handelTokenClick(field, value, state, this.state)
    })
  }

  _handleInputQuery(inputQuery, queryField) {
    this.setState({
      searchQuery: handleInputQuery(inputQuery, queryField, this.state)
    })
  }

  _applyFilter() {
    let filterState = this.state,
      _query = {}
    if (filterState.searchQuery) {
      if (
        filterState.searchQuery &&
        filterState.searchQuery["OPERATOR_ASSIGNED"]
      ) {
        _query.user_name = filterState.searchQuery["OPERATOR_ASSIGNED"]
      }

      if (filterState.searchQuery && filterState.searchQuery["PPS_ID"]) {
        _query.pps_id = filterState.searchQuery["PPS_ID"]
      }

      if (
        filterState.rangeSelected &&
        (filterState.rangeSelected["maxValue"] ||
          filterState.rangeSelected["minValue"])
      ) {
        let minRange = filterState.rangeSelected["minValue"]
        _query.performance = `${minRange},${filterState.rangeSelected["maxValue"]}`
      }
      if (
        filterState.tokenSelected["STATUS"] &&
        filterState.tokenSelected["STATUS"][0] !== "all"
      ) {
        _query.status = filterState.tokenSelected["STATUS"]
      }
      if (
        filterState.tokenSelected["MODE"] &&
        filterState.tokenSelected["MODE"][0] !== "all"
      ) {
        _query.mode = filterState.tokenSelected["MODE"]
      }
      hashHistory.push({ pathname: "/system/pps", query: _query })
      this.props.setCheckedPps("{}")
    }
  }

  _clearFilter() {
    this.props.ppsfilterState({
      tokenSelected: {
        STATUS: ["all"],
        MODE: ["all"],
        __typename: "tokenSelected"
      },
      searchQuery: {
        OPERATOR_ASSIGNED: "",
        PPS_ID: "",
        __typename: "searchQuery"
      },
      defaultToken: {
        STATUS: ["all"],
        MODE: ["all"],
        __typename: "defaultToken"
      }
    })
    hashHistory.push({ pathname: "/system/pps", query: {} })
  }

  _changeSliderRange(sliderVal) {
    this.setState({
      rangeSelected: {
        minValue: sliderVal[0] ? sliderVal[0] : -1,
        maxValue: sliderVal[1]
      }
    })
  }
  render() {
    var noOrder = this.props.noResults //ppsDetail.noResultFound;
    let ppsSearchField = this._processPPSSearchField()
    let ppsFilterToken = this._processFilterToken()
    let rangeSlider = this._handleRangeSlider()
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
            <div className="gor-filter-body-input-wrap">{ppsSearchField}</div>
            <div className="gor-filter-body-filterToken-wrap">
              <div className="gor-filter-body-filterToken-section1">
                {ppsFilterToken.column1token}
              </div>
              <div className="gor-filter-body-filterToken-section1">
                {ppsFilterToken.column2token}
              </div>
            </div>
            <div className="gor-filter-body-slider-wrap">{rangeSlider}</div>
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
              <button className="gor-add-btn" onClick={this._applyFilter}>
                {!this.props.ppsFilterSpinnerState ? (
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

PPSFilter.PropTypes = {
  PPSDetail: React.PropTypes.array,
  showFilter: React.PropTypes.bool,
  orderData: React.PropTypes.object,
  wsSubscriptionData: React.PropTypes.object,
  orderListSpinner: React.PropTypes.bool,
  isFilterApplied: React.PropTypes.bool,
  ppsFilterState: React.PropTypes.bool,
  showTableFilter: React.PropTypes.func,
  filterApplied: React.PropTypes.func,
  updateSubscriptionPacket: React.PropTypes.func,
  togglePPSFilter: React.PropTypes.func
}

export default PPSFilter
