import {ORDERS_DATA,ORDER_LIST_REFRESHED} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function ordersInfo(state={},action){
  switch (action.type) {
    case ORDERS_DATA:
          var count_pending=0,count_total=0,cut_off=0,eta=0,count_risk=0,wave_end='',res;
          
          res=action.data;
          if(res.aggregate_data){
            if(res.aggregate_data.cut_off_time)
              cut_off=Number(res.aggregate_data.cut_off_time);
            if(res.aggregate_data.pending_orders)
              count_pending=Number(res.aggregate_data.pending_orders);
            if(res.aggregate_data.total_orders)
              count_total=Number(res.aggregate_data.total_orders);
            if(res.aggregate_data.estimated_completion_time)
              eta=Number(res.aggregate_data.estimated_completion_time);
            if(res.aggregate_data.orders_at_risk)
              count_risk=Number(res.aggregate_data.orders_at_risk);
            if(res.aggregate_data.wave_ending_time)
              wave_end=res.aggregate_data.wave_ending_time;            
          }
            var ordersData={
              "cut_off":cut_off,
              "count_pending":count_pending,
              "count_risk":count_risk,
              "count_total":count_total,
              "eta":eta,
              "wave_end":wave_end            
            }
            return Object.assign({}, state, {
            "ordersData" : ordersData
            })

      case ORDER_LIST_REFRESHED:
          return Object.assign({}, state, {
              "orderListRefreshed": new Date()
          })


    default:
      return state
  }
}