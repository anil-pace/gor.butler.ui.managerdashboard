import {ORDERS_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function ordersInfo(state={},action){
  switch (action.type) {
    case ORDERS_DATA:
      //state.selectedAction = action.type;
      //window.localStore.setItem('auth_token',action.data.auth_token)
          var status='',avg=0,count_pending=0,eta='',time_current='',res;
          res=action.data;
          if(res.aggregate_data){
              status=res.aggregate_data.status;
              avg=res.aggregate_data.avg_per_hr;
              count_pending=res.aggregate_data.count_pending;
              eta=res.aggregate_data.eta;
              time_current=res.aggregate_data.time_current;            
          }
            var ordersData={
              "status":status,
              "avg":avg,
              "count_pending":count_pending,
              "eta":eta,
              "time_current":time_current            
            }
          // console.log('Orders data: ');
          // console.log(ordersData);
            return Object.assign({}, state, {
            "ordersData" : ordersData
            })

    default:
      return state
  }
}