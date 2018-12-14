import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { hashHistory } from "react-router";
import { modal } from "react-redux-modal";

import OrderFilter from "./orderFilter";
import OrderListTable from "./orderListTable";
import Spinner from "../../components/spinner/Spinner";
import OrderTile from "../../containers/orderTab/OrderTile";
import ViewOrderLine from "../../containers/orderTab/viewOrderLine";
import FilterSummary from "../../components/tableFilter/filterSummary";

import {
  setOrderListSpinner,
  orderListRefreshed,
  setOrderQuery
} from "../../actions/orderListActions";

import {
  showTableFilter,
  filterApplied,
  orderfilterState,
  toggleOrderFilter
} from "../../actions/filterAction";
import {
  updateSubscriptionPacket,
  setWsAction
} from "./../../actions/socketActions";
import { makeAjaxCall } from "../../actions/ajaxActions";

import { wsOverviewData } from "./../../constants/initData.js";

import {
  WS_ONSEND,
  APP_JSON,
  POST,
  ORDERS_FULFIL_FETCH,
  ORDERS_SUMMARY_FETCH,
  ORDERS_CUT_OFF_TIME_FETCH,
  ORDERS_POLLING_INTERVAL,
  ORDERS_REPORT_DOWNLOAD_REQUEST
} from "../../constants/frontEndConstants";

import { setInfiniteSpinner } from "../../actions/notificationAction";
import { unSetAllActivePbts } from "../../actions/norderDetailsAction";

import {
  ORDERS_FULFIL_URL,
  ORDERS_SUMMARY_URL,
  ORDERS_CUT_OFF_TIME_URL,
  ORDERS_REPORT_DOWNLOAD_URL
} from "../../constants/configConstants";
import moment from "moment-timezone";

class OrderListTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._resetState();
    this.props.showTableFilter(false);
    this._viewOrderLine = this._viewOrderLine.bind(this);
    this._handleCollapseAll = this._handleCollapseAll.bind(this);
    this._setPolling = this._setPolling.bind(this);
    this._clearFilter = this._clearFilter.bind(this);
    this._requestReportDownload = this._requestReportDownload.bind(this);
    moment.locale(props.intl.locale);
  }

  _resetState() {
    return {
      isPanelOpen: true,
      collapseAllBtnState: true,
      date: new Date(),
      totalSize: this.props.totalSize || null,
      selected_page: 1,
      query: null,
      orderListRefreshed: null,
      startDateForOrders: null,
      endDateForOrders: null,
      ppsIdFilterForOrders: null,
      statusFilterForOrders: null,
      timerId: null
    };
  }

  _requestReportDownload(){
      let formData = {"start_date":"2018-09-15T18:30:00.000Z","end_date":"2018-12-13T18:29:59.000Z"}  // local testing 
      // let formData = {
      //   "start_date": this.state.startDateForOrders,
      //   "end-data": this.state.endDateForOrders,
      //   "filtered_order_status": this.state.statusFilterForOrders,
      //   "filtered_ppsId": this.state.ppsIdFilterForOrders
      // };
      let params={
              'url':ORDERS_REPORT_DOWNLOAD_URL,
              'method':POST,
              'contentType': APP_JSON,
              'cause':ORDERS_REPORT_DOWNLOAD_REQUEST,
              'token': this.props.auth_token,
              'responseType': "arraybuffer",
              'formdata':formData,
              'accept': APP_JSON
          }
      this.props.makeAjaxCall(params);
}

  _reqCutOffTime(startDate, endDate, filteredPpsId, filteredOrderStatus, isFilterApplied = 'false') {
    let formData = {
      start_date: startDate,
      end_date: endDate,
      filter_applied: isFilterApplied
    };
    //Session storage being used in AJAX Parser
    sessionStorage.setItem("startDate", startDate);
    sessionStorage.setItem("endDate", endDate);
    if (filteredPpsId) {
      formData["filtered_ppsId"] = filteredPpsId;
      sessionStorage.setItem("filtered_ppsId", filteredPpsId);
    }

    if (filteredOrderStatus) {
      /*Need to convert filteredOrderStatus into string as 
            react-router provides single query in string*/
      if (filteredOrderStatus.constructor === String) {
        filteredOrderStatus = [filteredOrderStatus];
      }
      formData["filtered_order_status"] = filteredOrderStatus.slice(0);
      sessionStorage.setItem(
        "filtered_order_status",
        JSON.stringify(filteredOrderStatus)
      );
    }

    let params = {
      url: ORDERS_CUT_OFF_TIME_URL,
      method: POST,
      contentType: APP_JSON,
      accept: APP_JSON,
      cause: ORDERS_CUT_OFF_TIME_FETCH,
      formdata: formData
    };

    this.props.makeAjaxCall(params);
  }
  componentWillMount() {
    this.props.orderListRefreshed();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.socketAuthorized && !this.state.subscribed) {
      this.setState({ subscribed: true }, function() {
        this._subscribeData(nextProps);
      });
    }

    if (
      JSON.stringify(nextProps.location.query) !==
      JSON.stringify(this.state.query)
    ) {
      this.setState(
        {
          query: JSON.parse(JSON.stringify(nextProps.location.query)),
          orderListRefreshed: nextProps.orderListRefreshed
        },
        this._refreshList(nextProps.location.query)
      );
    }
    if (!this.state.timerId && !this.props.isFilterApplied) {
      this._setPolling();
    } else if (this.props.isFilterApplied && this.state.timerId) {
      clearInterval(this.state.timerId);
      this.setState({
        timerId: null
      });
    }
  }

  _refreshList(query) {
    this.props.setOrderListSpinner(true);
    if (query.orderId) {
      this._viewOrderLine(query.orderId);
      this.props.filterApplied(false);
    }
    let timeOffset = null;
    if (this.props.timeOffset) {
      timeOffset = this.props.timeOffset;
    } else {
      timeOffset = "";
    }
    if (!query.fromDate) {
      query.fromDate = moment
        .tz(timeOffset)
        .startOf("day")
        .format("YYYY-MM-DD");
    }
    if (!query.toDate) {
      query.toDate = moment
        .tz(timeOffset)
        .endOf("day")
        .format("YYYY-MM-DD");
    }
    if (!query.fromTime) {
      query.fromTime = moment
        .tz(timeOffset)
        .startOf("day")
        .format("HH:mm:ss");
    }
    if (!query.toTime) {
      query.toTime = moment
        .tz(timeOffset)
        .endOf("day")
        .format("HH:mm:ss");
    }

    let startDateFilter = moment(
      query.fromDate + " " + query.fromTime
    ).toISOString();
    let endDateFilter = moment(query.toDate + " " + query.toTime).toISOString();
    this.setState(
      {
        startDateForOrders: startDateFilter,
        endDateForOrders: endDateFilter,
        statusFilterForOrders: query.status,
        ppsIdFilterForOrders: query.ppsId
      },
      () => {
        // Start the backend calls
        if(this.props.isFilterApplied){
          this._reqCutOffTime(
            startDateFilter,
            endDateFilter,
            query.ppsId,
            query.status,
            "true"
          );
          this._reqOrdersFulfillment(startDateFilter, endDateFilter, "true");
          this._reqOrdersSummary(startDateFilter, endDateFilter, "true");
        }
        else{
          this._reqCutOffTime(
            startDateFilter,
            endDateFilter,
            query.ppsId,
            query.status,
          );
          this._reqOrdersFulfillment(startDateFilter, endDateFilter);
          this._reqOrdersSummary(startDateFilter, endDateFilter);
        }
        
      }
    );
  }

  _setPolling() {
    //set interval for polling
    let self = this;
    let timerId = 0;
    timerId = setInterval(function() {
      let query = {};
      query.startDate = sessionStorage.getItem("startDate");
      query.endDate = sessionStorage.getItem("endDate");
      query.filteredPpsId = sessionStorage.getItem("filtered_ppsId");
      query.filteredOrderStatus = JSON.parse(
        sessionStorage.getItem("filtered_order_status")
      );
      self._refreshList(query);
    }, ORDERS_POLLING_INTERVAL);
    self.setState({ timerId: timerId });
  }

  _clearFilter() {
    this.props.filterApplied(false);
    hashHistory.push({ pathname: "/orders", query: {} });
    sessionStorage.removeItem("filtered_ppsId");
    sessionStorage.removeItem("filtered_order_status");
    this.props.orderfilterState({
      tokenSelected: {
          "ORDER TAGS": ["any"],
          "STATUS": ["any"]
      },
      searchQuery: {ORDER_ID: '', PPS_ID: ''},
    });
    this.setState(this._resetState(), () => {
      if (!this.state.timerId) {
        this._setPolling();
      }
      this._refreshList(this.state.query);
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
    this.setState({
      timerId: null
    });
  }

  _subscribeData() {
    let updatedWsSubscription = this.props.wsSubscriptionData;
    this.props.initDataSentCall(updatedWsSubscription["default"]);
    this.props.updateSubscriptionPacket(updatedWsSubscription);
  }

  _handleClickRefreshButton() {
    this._refreshList(
      this.state.query,
      this.props.orderSortHeaderState
        ? this.props.orderSortHeaderState.colSortDirs
        : null
    );
  }
  /**
   * The method will update the subscription packet
   * and will fetch the data from the socket.
   * @private
   */

  _setFilter() {
    var newState = !this.props.showFilter;
    this.props.showTableFilter(newState);
  }

  _viewOrderLine = orderId => {
    modal.add(ViewOrderLine, {
      orderId: orderId,
      title: "",
      size: "large",
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;),
    });
  };

  _reqOrdersFulfillment(startDate, endDate, isFilterApplied = 'false') {
    let formData = {
      start_date: startDate,
      end_date: endDate,
      filter_applied: isFilterApplied
    };

    let params = {
      url: ORDERS_FULFIL_URL,
      method: POST,
      contentType: APP_JSON,
      accept: APP_JSON,
      cause: ORDERS_FULFIL_FETCH,
      formdata: formData
    };
    this.props.makeAjaxCall(params);
  }

  _reqOrdersSummary(startDate, endDate, isFilterApplied = 'false') {
    let formData = {
      start_date: startDate,
      end_date: endDate,
      filter_applied: isFilterApplied
    };

    let params = {
      url: ORDERS_SUMMARY_URL,
      method: POST,
      contentType: APP_JSON,
      accept: APP_JSON,
      cause: ORDERS_SUMMARY_FETCH,
      formdata: formData
    };
    this.props.makeAjaxCall(params);
  }

  _handleCollapseAll() {
    this.props.unSetAllActivePbts();
  }

  render() {
    let duration = null;
    const {timeOffset}= this.props;
    const durDiff = moment
      .duration(
        moment(this.state.endDateForOrders).tz(timeOffset).diff(
          moment(this.state.startDateForOrders).tz(timeOffset)
        )
      )
      .asDays();
    if (Math.floor(durDiff) > 0) {
      duration =
        moment(this.state.startDateForOrders).tz(timeOffset).format("DD MMM") +
        "-" +
        moment(this.state.endDateForOrders).tz(timeOffset).format("DD MMM YYYY");
    } else {
      duration = moment(this.state.startDateForOrders).tz(timeOffset).format("DD MMM YYYY");
    }
    var filterHeight = screen.height - 150;
    var itemNumber = 6,
      table,
      pages;
    var currentPage = this.props.filterOptions.currentPage,
      totalPage = this.props.orderData.totalPage;
    var orderDetail,
      alertNum = 0,
      orderInfo;

    let orderDetails = this.props.pbts;
    let noOfRecords = 0;
    if (orderDetails.length > 1) {
      // get the total number of orders filtered
      noOfRecords = orderDetails.length;
    } else if (
      orderDetails &&
      orderDetails.length > 0 &&
      orderDetails[0].ordersPerPbt
    ) {
      // get the total number of orders filtered
      noOfRecords = orderDetails[0].ordersPerPbt.totalOrders || 0;
    }

    return (
      <div>
        <div className="gor-Orderlist-table">
          {!this.props.showFilter ? (
            <Spinner
              isLoading={this.props.orderListSpinner}
              setSpinner={this.props.setOrderListSpinner}
            />
          ) : (
            ""
          )}
          <div>
            <div
              className="gor-filter-wrap"
              style={{
                width: "400px",
                display: this.props.showFilter ? "block" : "none",
                height: filterHeight
              }}
            >
              <OrderFilter
                orderDetails={orderDetails}
                responseFlag={this.props.responseFlag}
              />
            </div>

            <div>
              <OrderTile
                pbtsData={this.props.pbts}
                date={duration}
                orderFulfilData={this.props.orderFulfilment}
                orderSummaryData={this.props.orderSummary}
                timeOffset={this.props.timeOffset}
              />

              <div
                style={{ position: "absolute", right: "0", top: "7px" }}
                className="filterWrapper"
              >
                <div className="gorToolBarDropDown">
                  <div className="gor-button-wrap">
                    <div className="gor-button-sub-status">
                      {this.props.lastUpdatedText} {this.props.lastUpdated}
                    </div>

                    <div className="orderButtonWrapper">
                      <div className="gorButtonWrap">
                        <button
                        /*
                          disabled={
                            this.props.pbts.filter(pbt => pbt.opened).length < 1
                          }
                          */
                          className="gor-filterBtn-btn genReport"
                          onClick={this._requestReportDownload}
                        >
                          <FormattedMessage
                            id="orders.action.generateReport"
                            description="button label for Generate Report"
                            defaultMessage="GENERATE REPORT"
                          />
                        </button>
                      </div>
                      <div className="gorButtonWrap">
                        <button
                          disabled={
                            this.props.pbts.filter(pbt => pbt.opened).length < 1
                          }
                          className="gor-filterBtn-btn"
                          onClick={this._handleCollapseAll}
                        >
                          <FormattedMessage
                            id="orders.action.collapseAll"
                            description="button label for collapse all"
                            defaultMessage="COLLAPSE ALL "
                          />
                        </button>
                      </div>
                      <div className="gorButtonWrap">
                        <button
                          className={
                            this.props.orderFilterStatus
                              ? "gor-filterBtn-applied"
                              : "gor-filterBtn-btn"
                          }
                          onClick={this._setFilter.bind(this)}
                        >
                          <div className="gor-manage-task" />
                          <FormattedMessage
                            id="orders.action.filterLabel"
                            description="button label for filter"
                            defaultMessage="FILTER DATA"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Filter Summary*/}
            <FilterSummary
              total={orderDetails.length || 0}
              isFilterApplied={this.props.isFilterApplied}
              responseFlag={this.props.responseFlag}
              refreshList={this._clearFilter}
              filterText={
                <FormattedMessage
                  id="orderlist.filter.search.count"
                  description="total orders for filter search bar"
                  defaultMessage="{total} Records found"
                  values={{ total: noOfRecords || 0 }}
                />
              }
              refreshText={
                <FormattedMessage
                  id="orderlist.filter.search.bar.showall"
                  description="button label for show all"
                  defaultMessage="Show all Orders"
                />
              }
            />
          </div>

          {this.props.pbts.length > 0 && (
            <OrderListTable
              pbts={this.props.pbts}
              startDate={this.state.startDateForOrders}
              endDate={this.state.endDateForOrders}
              ppsIdFilter={this.state.ppsIdFilterForOrders}
              statusFilter={this.state.statusFilterForOrders}
              intervalIdForCutOffTime={this.state.timerId}
              isFilterApplied={this.props.isFilterApplied}
              enableCollapseAllBtn={this._enableCollapseAllBtn}
              disableCollapseAllBtn={this._disableCollapseAllBtn}
              isPanelOpen={this.state.isPanelOpen}
            />
          )}
          {!this.props.orderListSpinner &&
            this.props.pbts.length === 0 && (
              <div className="noOrdersPresent">
                {" "}
                <FormattedMessage
                  id="orders.noOrders.noOrders"
                  description="display no orders"
                  defaultMessage="No orders available"
                />{" "}
              </div>
            )}
          {this.props.orderListSpinner && <div className="noOrdersPresent" />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    orderFilter: state.sortHeaderState.orderFilter || "",
    orderSortHeaderState: state.sortHeaderState.orderHeaderSortOrder || [],
    orderListSpinner: state.spinner.orderListSpinner || false,
    filterOptions: state.filterOptions || {},
    orderData: state.getOrderDetail || {},
    statusFilter: state.filterOptions.statusFilter || null,
    intlMessages: state.intl.messages,
    timeOffset: state.authLogin.timeOffset || Intl.DateTimeFormat().resolvedOptions().timeZone,
    auth_token: state.authLogin.auth_token,
    showFilter: state.filterInfo.filterState || false,
    isFilterApplied: state.filterInfo.isFilterApplied || false,
    orderFilterStatus: state.filterInfo.orderFilterStatus,
    wsSubscriptionData:
      state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
    socketAuthorized: state.recieveSocketActions.socketAuthorized,
    orderListRefresh: state.orderDetails.orderListRefreshed,
    pageNumber: state.filterInfo.orderFilterState
      ? state.filterInfo.orderFilterState.PAGE
      : 1,

    orderFulfilment: state.orderDetails.orderFulfilment,
    orderSummary: state.orderDetails.orderSummary,
    pbts: state.orderDetails.pbts,
    orderLines: state.orderDetails.orderLines,
    orderData: state.getOrderDetail || {}
  };
}

var mapDispatchToProps = function(dispatch) {
  return {
    setOrderListSpinner: function(data) {
      dispatch(setOrderListSpinner(data));
    },

    showTableFilter: function(data) {
      dispatch(showTableFilter(data));
    },
    filterApplied: function(data) {
      dispatch(filterApplied(data));
    },
    orderfilterState: function(data) {
      dispatch(orderfilterState(data));
    },
    toggleOrderFilter: function(data) {
      dispatch(toggleOrderFilter(data));
    },
    orderListRefreshed: function(data) {
      dispatch(orderListRefreshed(data));
    },
    updateSubscriptionPacket: function(data) {
      dispatch(updateSubscriptionPacket(data));
    },
    initDataSentCall: function(data) {
      dispatch(setWsAction({ type: WS_ONSEND, data: data }));
    },
    setOrderQuery: function(data) {
      dispatch(setOrderQuery(data));
    },
    makeAjaxCall: function(params) {
      dispatch(makeAjaxCall(params));
    },
    unSetAllActivePbts: function() {
      dispatch(unSetAllActivePbts());
    },
    setInfiniteSpinner: function(data) {
      dispatch(setInfiniteSpinner(data));
    }
  };
};

OrderListTab.defaultProps = {
  orderFulfilment: {},
  orderSummary: {},
  pbts: []
};

OrderListTab.PropTypes = {
  orderFilter: React.PropTypes.string,
  orderSortHeader: React.PropTypes.string,
  orderSortHeaderState: React.PropTypes.array,
  orderListSpinner: React.PropTypes.bool,
  filterOptions: React.PropTypes.object,
  orderData: React.PropTypes.object,
  statusFilter: React.PropTypes.bool,
  timeOffset: React.PropTypes.number,
  auth_token: React.PropTypes.object,
  showFilter: React.PropTypes.bool,
  isFilterApplied: React.PropTypes.bool,
  orderFilterDetail: React.PropTypes.func,
  orderHeaderSort: React.PropTypes.func,
  orderHeaderSortOrder: React.PropTypes.func,
  getPageData: React.PropTypes.func,
  getStatusFilter: React.PropTypes.func,
  getTimeFilter: React.PropTypes.func,
  getPageSizeOrders: React.PropTypes.func,
  currentPage: React.PropTypes.func,
  lastRefreshTime: React.PropTypes.func,
  setOrderListSpinner: React.PropTypes.func,
  showTableFilter: React.PropTypes.func,
  filterApplied: React.PropTypes.func,
  orderFilterStatus: React.PropTypes.bool,
  orderFulfilment: React.PropTypes.object,
  orderSummary: React.PropTypes.object,
  pbts: React.PropTypes.array,
  getPageSizeOrders: React.PropTypes.func,
  showFilter: React.PropTypes.bool,
  ordersPerPbt: []
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(OrderListTab));
