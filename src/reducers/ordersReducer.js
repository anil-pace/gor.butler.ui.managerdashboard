import {ORDERS_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function ordersInfo(state={},action){
  switch (action.type) {
    case ORDERS_DATA:
          var count_pending=0,cut_off=0,eta=0,count_risk=0,wave_end='',res;
          
          res=action.data;
          if(res.aggregate_data){
            if(res.aggregate_data.cut_off_time)
              cut_off=Number(res.aggregate_data.cut_off_time);
            if(res.aggregate_data.pending_orders)
              count_pending=Number(res.aggregate_data.pending_orders);
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
              "eta":eta,
              "wave_end":wave_end            
            }
            return Object.assign({}, state, {
            "ordersData" : ordersData
            })

    default:
      return state
  }
}