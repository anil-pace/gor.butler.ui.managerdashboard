import {ORDERS_FULFIL_FETCH, ORDERS_SUMMARY_FETCH, ORDERS_CUT_OFF_TIME_FETCH , ORDERS_PER_PBT_FETCH, ORDERLINES_PER_ORDER_FETCH} from '../constants/frontEndConstants';
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

const pbt_data=[
  {'cut_off_time':"16:00", 'time_left': "30", 'total_products_count': 2000, 'picked_products_count':1000, 'total_orders':20},
  {'cut_off_time':"17:00", 'time_left': "60", 'total_products_count': 2000, 'picked_products_count':100, 'total_orders':200},
  {'cut_off_time':"18:00", 'time_left': "120",'total_products_count': 2000, 'picked_products_count':0, 'total_orders':2000},
  {'cut_off_time':"18:00", 'time_left': "120",'total_products_count': 0, 'picked_products_count':0, 'total_orders':2000},
  {'cut_off_time':"16:00", 'time_left': "30", 'total_products_count': 2000, 'picked_products_count':1000, 'total_orders':20},
  {'cut_off_time':"17:00", 'time_left': "60", 'total_products_count': 2000, 'picked_products_count':100, 'total_orders':200},
  {'cut_off_time':"18:00", 'time_left': "120",'total_products_count': 2000, 'picked_products_count':0, 'total_orders':2000},
  {'cut_off_time':"18:00", 'time_left': "120",'total_products_count': 0, 'picked_products_count':0, 'total_orders':2000},
  {'cut_off_time':"16:00", 'time_left': "30", 'total_products_count': 2000, 'picked_products_count':1000, 'total_orders':20},
  {'cut_off_time':"17:00", 'time_left': "60", 'total_products_count': 2000, 'picked_products_count':100, 'total_orders':200},
  {'cut_off_time':"18:00", 'time_left': "120",'total_products_count': 2000, 'picked_products_count':0, 'total_orders':2000},
  {'cut_off_time':"18:00", 'time_left': "120",'total_products_count': 0, 'picked_products_count':0, 'total_orders':2000},
  {'cut_off_time':"16:00", 'time_left': "30", 'total_products_count': 2000, 'picked_products_count':1000, 'total_orders':20},
  {'cut_off_time':"17:00", 'time_left': "60", 'total_products_count': 2000, 'picked_products_count':100, 'total_orders':200},
  {'cut_off_time':"18:00", 'time_left': "120",'total_products_count': 2000, 'picked_products_count':0, 'total_orders':2000},
  {'cut_off_time':"18:00", 'time_left': "120",'total_products_count': 0, 'picked_products_count':0, 'total_orders':2000}
];

const orderData = [
    {'order_id': "a1", 'pps_id': 1, 'pps_bin_id':1, 'start_date':"", 'completion_date':"", 'total_products_count':100,'picked_products_count':20,'status': 'Completed','is_breached': 'false','is_at_breach_risk': 'false','orderlines_in_audit': 20,'unfulfillable_count':1,'missing_count':1,'damaged_count':1,'physically_damaged_count':1},
    {'order_id': "a2", 'pps_id': 2, 'pps_bin_id':2, 'start_date':"", 'completion_date':"", 'total_products_count':100,'picked_products_count':2,'status': 'Completed','is_breached': 'false','is_at_breach_risk': 'false','orderlines_in_audit': 20,'unfulfillable_count':1,'missing_count':1,'damaged_count':1,'physically_damaged_count':1},
    {'order_id': "a3", 'pps_id': 3, 'pps_bin_id':3, 'start_date':"", 'completion_date':"", 'total_products_count':100,'picked_products_count':0,'status': 'Completed','is_breached': 'false','is_at_breach_risk': 'false','orderlines_in_audit': 20,'unfulfillable_count':1,'missing_count':1,'damaged_count':1,'physically_damaged_count':1},
    {'order_id': "a4", 'pps_id': 4, 'pps_bin_id':4, 'start_date':"", 'completion_date':"", 'total_products_count':0,'picked_products_count':0,'status': 'Completed','is_breached': 'false','is_at_breach_risk': 'false','orderlines_in_audit': 20,'unfulfillable_count':1,'missing_count':1,'damaged_count':1,'physically_damaged_count':1},
];

export  function orderDetails(state={},action){
  switch (action.type) {
    case ORDERS_FULFIL_FETCH:
      console.log("coming inside norderDetailsReducer => orderDetails => ORDERS_FULFIL_FETCH");
      return Object.assign({}, state, {
	    	orderFulfilment: {...order_fulfilment} || [],
      });
      break;

    case ORDERS_SUMMARY_FETCH:
      console.log("coming inside norderDetailsReducer => orderDetails => ORDERS_SUMMARY_FETCH");
      return Object.assign({}, state, {
        orderSummary: {...order_summary} || [],
      });
      break;

    case ORDERS_CUT_OFF_TIME_FETCH:
      console.log("coming inside norderDetailsReducer => orderDetails => ORDERS_CUT_OFF_TIME_FETCH");
      return Object.assign({}, state, {
        pbts: [...pbt_data] || [],
      });
      break;

    case ORDERS_PER_PBT_FETCH:
      console.log("coming inside norderDetailsReducer => orderDetails => ORDERS_PER_PBT_FETCH");
      return Object.assign({}, state, {
        ordersPerPbt: [...orderData] || [],
      });
      break;

    case ORDERLINES_PER_ORDER_FETCH:
      console.log("coming inside norderDetailsReducer => orderDetails => ORDERLINES_PER_ORDER_FETCH");
      return Object.assign({}, state, {
        orderLines: action.data || [],
      });
      break;


    default:
      return state
  }
}
