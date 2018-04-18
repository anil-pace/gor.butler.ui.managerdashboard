import {ORDERS_FULFIL_FETCH, ORDERS_SUMMARY_FETCH, ORDERS_CUT_OFF_TIME_FETCH, ORDERS_PER_PBT_FETCH, ORDERLINES_PER_ORDER_FETCH, ORDER_LIST_REFRESHED, SET_ACTIVE_PBT_INDEX} from '../constants/frontEndConstants';
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
      let pbts_data=action.data||[]
      pbts_data.map(function(pbt,index){
        if(state.pbts && state.pbts[index]){
        pbt.opened=state.pbts[index].opened  
        pbt.ordersPerPbt=state.pbts[index].ordersPerPbt
        }
        
        return pbt
      })
        return Object.assign({}, state, {
          pbts: pbts_data,
          activePbtIndex:state.activePbtIndex||null
        });
      break;

    case SET_ACTIVE_PBT_INDEX:
    let pbts=state.pbts
    pbts[action.data.index].opened=!pbts[action.data.index].opened
      return Object.assign({}, state, {
        activePbtIndex: action.data.index,
        pbts:pbts
      });
      break;

    case ORDERS_PER_PBT_FETCH:
      let res = action.data;
      //let ordersData = action.saltParams.lazyData ? (state.ordersPerPbt || []) : [];
      //let state=JSON.parse(JSON.stringify(state))
      let openPbt = [state.activePbtIndex];
      state.pbts[state.activePbtIndex].ordersPerPbt={
        "openPbts": openPbt.push(state.activePbtIndex),
        "orders": res.serviceRequests,
        "isInfiniteLoading":false,
        "dataFound":res.serviceRequests.length < 1,
        "totalPages" : res.totalPages,
        "totalOrders" : res.totaElements
      }
      return Object.assign({},state,{});
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
