/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React from "react"
import { connect } from "react-redux"
import {
  INVENTORY_HISTOGRAM_CONFIG,
  LEGEND_ROUND,
  INV_LINE_LEGEND_IPICKED_COLOR,
  INV_LINE_LEGEND_CONFIG,
  INV_LINE_LEGEND_IPUT_COLOR,
  INV_HIST_LEGEND_COLOR,
  INV_HIST_LEGEND_CONFIG,
  CATEGORY_COLOR_MAP,
  WS_ONSEND
} from "./../constants/frontEndConstants"
import Legend from "./../components/legend/legend"
import { setWsAction } from "./../actions/socketActions"
import { wsOverviewData } from "./../constants/initData.js"
import InventoryHistogram from "./inventoryTab/inventoryHistogram"
import PickPutLineGraph from "./../components/inventory/pickPutLineGraph"
import SnapShot from "./../components/inventory/snapShot"
import ItemCategoryTable from "./../components/inventory/itemCategoryTable"
import InventoryStacked from "./../containers/inventoryTab/inventoryStacked"
import { FormattedMessage } from "react-intl"
import moment from "moment"
import "moment-timezone"
import { graphql, withApollo, compose } from "react-apollo"
import gql from "graphql-tag"
import Spinner from "./../components/spinner/Spinner"

const InventoryHistorySubscription = gql`
  subscription InventoryHistory {
    InventoryHistory {
      list {
        cbm_used
        items_put
        total_skus
        opening_stock
        warehouse_utilization
        exception_qty
        items_picked
        items_put
        date
        __typename
      }
    }
    __typename
  }
`

class InventoryTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedData: null,
      selectedData: null,
      legacyDataSubscribed: false
    }
    this.subscription = null
    this._subscribeLegacyData = this._subscribeLegacyData.bind(this)
  }

  _onClickCallBack(data) {
    this.props.setInventoryDate(data.customData)
  }
  _subscribeLegacyData() {
    this.props.initDataSentCall(wsOverviewData["default"])
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data) ||
      !this.subscription
    ) {
      this.formatData(nextProps.data || [])
    }

    if (!this.subscription && nextProps.subscribeToMore) {
      this.updateSubscription(nextProps.subscribeToMore, {})
    }
    if (!this.state.legacyDataSubscribed && nextProps.socketAuthorized) {
      this.setState(
        () => {
          return { legacyDataSubscribed: true }
        },
        () => {
          this._subscribeLegacyData()
        }
      )
    }
  }

  updateSubscription(subscription, variables) {
    if (this.subscription) {
      this.subscription()
    }
    this.subscription = subscription({
      variables: variables,
      document: InventoryHistorySubscription,
      notifyOnNetworkStatusChange: true,
      updateQuery: (previousResult, newResult) => {
        return Object.assign({}, previousResult, {
          InventoryHistory: {
            list: newResult.subscriptionData.data.InventoryHistory.list
          }
        })
      }
    })
  }

  formatData(data) {
    let return_data = {}
    let self = this
    const { timeOffset } = self.props
    let currentDate = data[0] ? data[0].date : moment.utc().format()
    data.forEach(function(inv, index) {
      let graphInfo = {},
        inventory_data,
        current_stock = 0,
        unusedSpace = 100,
        colorCode = CATEGORY_COLOR_MAP[CATEGORY_COLOR_MAP.length - 1],
        inv_date = inv
          ? moment(inv.date)
              .tz(timeOffset)
              .format("YYYY-MM-DD")
          : moment()
              .tz(timeOffset)
              .subtract(index, "days")
              .format("YYYY-MM-DD")
      if (inv) {
        inventory_data = JSON.parse(JSON.stringify(inv))
        current_stock =
          inv["opening_stock"] + inv["items_put"] - inv["items_picked"]
        unusedSpace = 100 - inv["warehouse_utilization"]

        if (inventory_data.category_data) {
          inventory_data.category_data = inventory_data.category_data.map(
            function(category, index) {
              category.colorCode =
                CATEGORY_COLOR_MAP[index] ||
                CATEGORY_COLOR_MAP[CATEGORY_COLOR_MAP.length - 1]
              return category
            }
          )
        }
      }

      let otherInfo = {
        ...inventory_data,
        current_stock,
        unusedSpace,
        colorCode
      }
      let timeinMS = moment(inv_date)
        .toDate()
        .getTime()
      graphInfo.xAxisData = [Math.random(), inv_date.split("-")[2]].join("_")
      graphInfo.yAxisData = current_stock
      graphInfo.items_picked = inv ? inv.items_picked : 0
      graphInfo.items_put = inv ? inv.items_put : 0
      graphInfo.date = inv_date //.toDate()
      graphInfo.customData = timeinMS //inv_date.toDate().getTime()
      return_data[timeinMS] = { graphInfo, otherInfo }
    })

    this.setState(
      { formattedData: return_data, currentDate: currentDate },
      function() {
        self.selectData()
      }
    )
  }

  selectData(timeStamp) {
    if (timeStamp) {
      this.setState({
        selectedData: this.state.formattedData[timeStamp].otherInfo
      })
    } else {
      let firstIndexData = Object.keys(this.state.formattedData)[0]
      if (firstIndexData) {
        this.setState({
          selectedData: this.state.formattedData[firstIndexData].otherInfo
        })
      }
    }
  }

  render() {
    var histogramLegend = {
      data: [
        {
          color: INV_HIST_LEGEND_COLOR,
          name: (
            <FormattedMessage
              id="inventory.histogram.legend"
              description="Inventory Histogram Legend"
              defaultMessage="Items Stocked"
            >
              {message => <tspan>{message}</tspan>}
            </FormattedMessage>
          )
        }
      ],
      config: INV_HIST_LEGEND_CONFIG
    }
    var lineChartLagend = {
      data: [
        {
          color: INV_LINE_LEGEND_IPICKED_COLOR,
          name: (
            <FormattedMessage
              id="inventory.linechart.legendPicked"
              description="Inventory Linechart Legend for picked"
              defaultMessage="Items Picked"
            >
              {message => <tspan>{message}</tspan>}
            </FormattedMessage>
          )
        },
        {
          color: INV_LINE_LEGEND_IPUT_COLOR,
          name: (
            <FormattedMessage
              id="inventory.linechart.legendPut"
              description="Inventory Linechart Legend for put"
              defaultMessage="Items Put"
            >
              {message => <tspan>{message}</tspan>}
            </FormattedMessage>
          )
        }
      ],
      config: INV_LINE_LEGEND_CONFIG
    }

    const timeOffset = this.props.timeOffset
    return (
      <div className="gorInventory wrapper">
        <div>
          <div className="head">
            <div className="labelCnt">
              <span>
                <FormattedMessage
                  id="inventory.header"
                  description="Inventory Header Message"
                  defaultMessage="Inventory"
                />{" "}
              </span>
            </div>
          </div>
          {this.props.result === undefined ? (
            <Spinner isLoading={true} />
          ) : (
            <Spinner isLoading={false} />
          )}
          {/* {!this.props.result && <Spinner isLoading={true} setSpinner={null} />} */}
          {this.state.formattedData && (
            <div>
                <Spinner isLoading={false} />
              <div className="histCnt">
                <div>
                  <div className="histLbl">
                    <FormattedMessage
                      id="inventory.histogram.header"
                      description="Inventory Histogram Header Message"
                      defaultMessage="Stock level history"
                    />
                  </div>
                  <div className="legendCnt">
                    <Legend legendData={histogramLegend} />
                  </div>
                  <div className="histogram">
                    <InventoryHistogram
                      selectData={this.selectData.bind(this)}
                      noData={this.props.noData}
                      recreatedData={this.state.formattedData}
                    />
                  </div>
                  <div className="histLbl">
                    <FormattedMessage
                      id="inventory.linechart.header"
                      description="Inventory Line Chart Header Message"
                      defaultMessage="Item Movements"
                    />
                  </div>
                  <div className="legendCnt">
                    <Legend
                      legendData={lineChartLagend}
                      legendType={LEGEND_ROUND}
                    />
                  </div>
                  <div className="lineGraph">
                    <PickPutLineGraph
                      noData={this.props.noData}
                      recreatedData={this.state.formattedData}
                    />
                  </div>
                </div>
              </div>
              <div className="stkSnapSht">
                <div className="snapShtWrap">
                  <SnapShot
                    currentDate={this.state.currentDate}
                    timeOffset={this.props.timeOffset}
                    snapshotTabData={this.state.selectedData || {}}
                  />
                  <InventoryStacked
                    snapshotData={this.state.selectedData || {}}
                  />
                  <ItemCategoryTable
                    snapshotData={this.state.selectedData || {}}
                  />
                </div>
              </div>
            </div>
          )}{" "}
          */}
        </div>
      </div>
    )
  }
}
const InventoryHistoryQuery = gql`
  query InventoryHistory {
    InventoryHistory {
      list {
        cbm_used
        items_put
        total_skus
        opening_stock
        warehouse_utilization
        exception_qty
        items_picked
        items_put
        date
      }
    }
  }
`

const withNetworkData = graphql(InventoryHistoryQuery, {
  props: function(result) {
    if (!result.data.InventoryHistory || !result.data.InventoryHistory.list) {
      return null
    }
    return {
      data: result.data.InventoryHistory.list,
      subscribeToMore: result.data.subscribeToMore
    }
  },
  options: ({ match, location }) => ({
    variables: {},
    fetchPolicy: "network-only"
  })
})

const mapStateToProps = function(state, ownProps) {
  return {
    intlMessages: state.intl.messages,
    socketAuthorized: state.recieveSocketActions.socketAuthorized,
    timeOffset:
      state.authLogin.timeOffset ||
      Intl.DateTimeFormat().resolvedOptions().timeZone
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    initDataSentCall: function(data) {
      dispatch(setWsAction({ type: WS_ONSEND, data: data }))
    }
  }
}

export default compose(withNetworkData)(
  connect(mapStateToProps, mapDispatchToProps)(InventoryTab)
)
