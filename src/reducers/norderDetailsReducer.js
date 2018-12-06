import {ORDERS_FULFIL_FETCH, 
  ORDERS_SUMMARY_FETCH,
  ORDERS_CUT_OFF_TIME_FETCH, 
  ORDERS_PER_PBT_FETCH, 
  ORDERLINES_PER_ORDER_FETCH, 
  SET_ORDER_PRIORITY,
  ORDER_LIST_REFRESHED, 
  TOGGLE_ACTIVE_PBT,
  UNSET_ALL_ACTIVE_PBT
} from '../constants/frontEndConstants';
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
let filterApplied=action.params;
let pbts_data=action.data||[];
if(JSON.stringify(action.data)===JSON.stringify(state.pbts)){
  return state
}else{
pbts_data.map(function(pbt,index){
  if(state.pbts && state.pbts[index]){
    let pbtsValue=state.pbts[index]?state.pbts[index].opened:false;
    pbt.opened=filterApplied && pbtsValue?false:pbtsValue;
    pbt.ordersPerPbt=state.pbts[index].ordersPerPbt;
  }
})
let activePbtIndex=null;
activePbtIndex =Number.isInteger(action.data.activeIndex)?action.data.activeIndex:null;
  return Object.assign({}, state, {
    pbts: pbts_data,
    activePbtIndex:activePbtIndex,
    isGroupedById: true
  });  
}

break;


case TOGGLE_ACTIVE_PBT:
let target_cut_off_time_2=action.data.pbt.cut_off_time
let pbts=state.pbts;
let activePbtIndex=null;
pbts.map(function(pbt, idx){
    if(pbt.cut_off_time === target_cut_off_time_2){
      pbt.opened=!pbt.opened;
      if (pbt.opened){
      activePbtIndex =Number.isInteger(action.data.activeIndex)?action.data.activeIndex:null;
    }
    }
    return pbt
})

return Object.assign({}, state, {
  activePbtIndex: activePbtIndex,
  pbts:pbts
});
break;


case UNSET_ALL_ACTIVE_PBT:

    let pbts_list= state.pbts;
    pbts_list.map(function(pbt){
        pbt.opened=false
    })
    return Object.assign({}, state, {
      pbts:pbts_list
    });
    break;


case ORDERS_PER_PBT_FETCH:
let res = action.data;
let target_cut_off_time=action.saltParams.cut_off_time
let isLazyData= action.saltParams.lazyData

let expected_pbts=[{}]; // create one empty pbt list...which is mandatory as per our json structure
if(state.pbts && state.pbts.length>=1){
    expected_pbts = state.pbts.map(function(pbt, idx){
    if(pbt.cut_off_time===target_cut_off_time){
      if(res.serviceRequests.constructor === Array && res.serviceRequests.length>0){
        let ordersData = isLazyData? pbt.ordersPerPbt.orders.concat(res.serviceRequests):res.serviceRequests;
        pbt["opened"] = false;
        pbt.ordersPerPbt={
            "orders": ordersData,
            "isInfiniteLoading":false,
            "dataFound":res.serviceRequests.length < 1,
            "totalPages" : res.totalPages,
            "totalOrders" : res.totalElements
        }
      }
    }
    return pbt
  })
}
else{
    if(res.serviceRequests.constructor === Array && res.serviceRequests.length>0){
      expected_pbts[0]["cut_off_time"]=target_cut_off_time;
      expected_pbts[0]["opened"] = false;
      expected_pbts[0].ordersPerPbt={
            "orders": res.serviceRequests,
            "isInfiniteLoading":false,
            "dataFound":res.serviceRequests.length < 1,
            "totalPages" : res.totalPages,
            "totalOrders" : res.totalElements,
            "isGroupedById": false
        }
    }
}
if (Number.isInteger(state.activePbtIndex) && expected_pbts[state.activePbtIndex]){
    expected_pbts[state.activePbtIndex].opened = true
}
return Object.assign({},state,{
  pbts: expected_pbts
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

  case SET_ORDER_PRIORITY:
    return Object.assign({}, state, {
      orderPriority: action.data
    });
  break;

default:
return state
}
}