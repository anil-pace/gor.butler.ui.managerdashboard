import {ORDERS_FULFIL_FETCH, ORDERS_SUMMARY_FETCH, ORDERS_CUT_OFF_TIME_FETCH, ORDERS_PER_PBT_FETCH, ORDERS_PER_PBT_FETCH_1, ORDERLINES_PER_ORDER_FETCH, ORDER_LIST_REFRESHED} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */

const order_fulfilment={
   'pps_count': 10,
   'total_products_count': 100,
   'picked_products_count': 75
}; 

const order_summary={
  'total_orders': 2000,
  'completed_orders': 100,
  'pending_orders': 260,
  'total_orderlines': 2000,
  'completed_orderlines': 100,
  'pending_orderlines': 260,
  'breached_orders': 378
};

const pbt_data = [{"picked_products_count":1,"cut_off_time":null,"total_orders":97,"total_products_count":1},{"picked_products_count":2,"cut_off_time":"2018-04-11T07:17:04.316Z","total_orders":2,"total_products_count":2},{"picked_products_count":0,"cut_off_time":"2018-04-12T07:17:34.336Z","total_orders":5,"total_products_count":25},{"picked_products_count":0,"cut_off_time":"2018-03-16 17:00:00","total_orders":8,"total_products_count":8},{"picked_products_count":1,"cut_off_time":"2018-02-22 14:00:00","total_orders":1,"total_products_count":1},{"picked_products_count":4,"cut_off_time":"2018-02-22 11:00:00","total_orders":6,"total_products_count":6},{"picked_products_count":0,"cut_off_time":"2018-03-20 13:00:00","total_orders":3,"total_products_count":7},{"picked_products_count":8,"cut_off_time":"2018-02-28 12:00:00","total_orders":3,"total_products_count":11},{"picked_products_count":0,"cut_off_time":"2018-03-16 10:00:00","total_orders":1,"total_products_count":1},{"picked_products_count":0,"cut_off_time":"2017-12-22 22:00:00","total_orders":2,"total_products_count":2},{"picked_products_count":0,"cut_off_time":"2018-02-12 19:00:00","total_orders":1,"total_products_count":1},{"picked_products_count":1,"cut_off_time":"2018-02-13 17:00:00","total_orders":5,"total_products_count":5},{"picked_products_count":0,"cut_off_time":"2018-02-27 12:00:00","total_orders":1,"total_products_count":1},{"picked_products_count":0,"cut_off_time":"2018-03-19 18:00:00","total_orders":12,"total_products_count":16},{"picked_products_count":4,"cut_off_time":"2018-03-01 23:00:00","total_orders":2,"total_products_count":4},{"picked_products_count":26,"cut_off_time":"2018-02-15 18:00:00","total_orders":18,"total_products_count":87},{"picked_products_count":0,"cut_off_time":"2018-02-13 18:00:00","total_orders":1,"total_products_count":1},{"picked_products_count":0,"cut_off_time":"2018-03-16 14:00:00","total_orders":6,"total_products_count":6}];
const order_data= [{
  "picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-04-04T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
}, {
  "picked_products_count": 1,
  "pps_bin_id": "7",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-02-28T11:49:49.975317+00:00",
  "order_id": "22Feb_08"
}
,
 {
"picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-02-28T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
}, {
"picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-02-28T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
}, {
"picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-02-28T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
}
/*,
{
  "picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-04-04T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
},{
  "picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-04-04T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
},{
  "picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-04-04T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
},{
  "picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-04-04T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
},{
  "picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-04-04T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
},{
  "picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-04-04T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
},{
  "picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-04-04T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
},{
  "picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-04-04T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
},{
  "picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-04-04T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
},{
  "picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-04-04T11:49:45.428761+00:00",
  "order_id": "22Feb_09",
  "status": "complete"
}*/];
const orderlines_data = {
  "pps_bin_id": "6",
  "total_orderlines": 1,
  "pending_orderlines": 0,
  "cut_off_time": "2018-04-11T07:17:04.316Z",
  "pps_id": "1",
  "orderlines": [{
    "status": "complete",
    "orderline_id": "22Feb_09",
    "pick_products_count": 1,
    "damaged_count": 0,
    "pdfa_values": ["[product_sku = 'Product_20F_1']"],
    "physically_damaged_count": 0,
    "total_products_count": 1,
    "unfulfillable_count": 0,
    "missing_count": 0
  },
          {
    "status": "complete",
    "orderline_id": "23Feb_09",
    "pick_products_count": 1,
    "damaged_count": 0,
    "pdfa_values": ["[product_sku = 'Product_20F_1']"],
    "physically_damaged_count": 0,
    "total_products_count": 1,
    "unfulfillable_count": 0,
    "missing_count": 0
  },{
    "status": "complete",
    "orderline_id": "24Feb_09",
    "pick_products_count": 1,
    "damaged_count": 0,
    "pdfa_values": ["[product_sku = 'Product_20F_1']"],
    "physically_damaged_count": 0,
    "total_products_count": 1,
    "unfulfillable_count": 0,
    "missing_count": 0
  }],
  "pick_info": "will not do",
  "is_breached": "todo",
  "completed_orderlines": 1,
  "username": ""
};



const order_data_1 = [{
  "picked_products_count": 11,
  "pps_bin_id": "166",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 11,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "start_date": "2018-04-04T09:49:45.428761+00:00",
  "completion_date": "2018-04-04T11:49:45.428761+00:00",
  "order_id": "22Feb_2019",
  "status": "complete"
}, {
  "picked_products_count": 12,
  "pps_bin_id": "17",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 12,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-02-28T11:49:49.975317+00:00",
  "order_id": "22Feb_2019"
}, {
"picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-02-28T11:49:45.428761+00:00",
  "order_id": "22Feb_2019",
  "status": "complete"
}, {
"picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-02-28T11:49:45.428761+00:00",
  "order_id": "22Feb_2019",
  "status": "complete"
}, {
"picked_products_count": 1,
  "pps_bin_id": "6",
  "damaged_count": 0,
  "physically_damaged_count": 0,
  "is_breached": "to_do_as_data_is_wrong",
  "total_products_count": 1,
  "unfulfillable_count": 0,
  "missing_count": 0,
  "is_at_breach_risk": "to_do_as_data_is_wrong",
  "pps_id": "1",
  "completion_date": "2018-02-28T11:49:45.428761+00:00",
  "order_id": "22Feb_2019",
  "status": "complete"
}];

export  function orderDetails(state={},action){
  switch (action.type) {
    case ORDERS_FULFIL_FETCH:
      return Object.assign({}, state, {
	    	//orderFulfilment: {...order_fulfilment} || [],
        orderFulfilment: action.data || [],
      });
      break;

    case ORDERS_SUMMARY_FETCH:
      return Object.assign({}, state, {
        //orderSummary: {...order_summary} || [],
        orderSummary: action.data || []
      });
      break;

    case ORDERS_CUT_OFF_TIME_FETCH:
      return Object.assign({}, state, {
        pbts: [...pbt_data] || [],
        //pbts: action.data || [],
      });
      break;

    case ORDERS_PER_PBT_FETCH:
      var res = action.data;
      return Object.assign({}, state, {
        ordersPerPbt: [...order_data]|| [],
        // ordersPerPbt: res.serviceRequests,
        // totalPages : res.totalPages,
        // totalOrders : res.totalElements
      });
      return state;
      break;

    case ORDERS_PER_PBT_FETCH_1:
      var res = action.data;
      return Object.assign({}, state, {
        ordersPerPbt: order_data.concat(order_data_1)|| [],
        // ordersPerPbt: res.serviceRequests,
        // totalPages : res.totalPages,
        // totalOrders : res.totalElements
      });
      return state;
      break;


    // case ORDERS_PER_PBT_FETCH_1:
    //   let res = action.data;
    //   let ordersData = action.saltParams.lazyData ? (state.ordersPerPbt || []) : [];
    //   return Object.assign({}, state, {
    //     "ordersPerPbt": ordersData.concat(res.serviceRequests) || [],
    //     "isInfiniteLoading":false,
    //     "dataFound":res.serviceRequests.length < 1,
    //     //"ordersPerPbt": res.serviceRequests,
    //     "totalPages" : res.totalPages,
    //     "totalOrders" : res.totaElements
    //   });
    //   break;

    case ORDERLINES_PER_ORDER_FETCH:
      return Object.assign({}, state, {
        orderLines: {...orderlines_data} || [],
        //orderLines: action.data || []
      });
      break;

    case ORDER_LIST_REFRESHED:
        return Object.assign({}, state, {
            "orderListRefreshed": new Date()
        })

    default:
      return state
  }
}
