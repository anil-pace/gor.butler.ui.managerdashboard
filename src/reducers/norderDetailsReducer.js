import {ORDERS_FULFIL_FETCH, ORDERS_SUMMARY_FETCH, ORDERS_CUT_OFF_TIME_FETCH, ORDERS_PER_PBT_FETCH, ORDERS_PER_PBT_FETCH_1, ORDERLINES_PER_ORDER_FETCH, ORDER_LIST_REFRESHED} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */


export  function orderDetails(state={},action){
  switch (action.type) {
    case ORDERS_FULFIL_FETCH:
      return Object.assign({}, state, {
        orderFulfilment: action.data || [],
      });
      break;

    case ORDERS_SUMMARY_FETCH:
      return Object.assign({}, state, {
        orderSummary: action.data || []
      });
      break;

    case ORDERS_CUT_OFF_TIME_FETCH:
      return Object.assign({}, state, {
        pbts: action.data || [],
      });
      break;

    case ORDERS_PER_PBT_FETCH:
      let res = action.data;
      let ordersData = action.saltParams.lazyData ? (state.ordersPerPbt || []) : [];
      return Object.assign({}, state, {
        "ordersPerPbt": ordersData.concat(res.serviceRequests) || [],
        "isInfiniteLoading":false,
        "dataFound":res.serviceRequests.length < 1,
        "totalPages" : res.totalPages,
        "totalOrders" : res.totaElements
      });
      break;

    case ORDERLINES_PER_ORDER_FETCH:
      return Object.assign({}, state, {
        orderLines: action.data || []
      });
      break;

    case ORDER_LIST_REFRESHED:
        return Object.assign({}, state, {
            "orderListRefreshed": new Date()
        })
        break;

    default:
      return state
  }
}
